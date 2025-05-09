import puppeteer from "puppeteer";
import { config } from "dotenv";
config({ path: "./.env" });

console.log('[!] Starting...');
if (!process.env.PANEL_URL) {
	console.log('[!!] PANEL_URL is not set.');
	process.exit(1);
}
if (!process.env.PANEL_USERNAME) {
	console.log('[!!] PANEL_USERNAME is not set.');
	process.exit(1);
}
if (!process.env.PANEL_PASSWORD) {
	console.log('[!!] PANEL_PASSWORD is not set.');
	process.exit(1);
}
console.log(`[!] Using URL: ${process.env.PANEL_URL || "https://panel.ct8.pl"}`);
console.log(`[!] Using username: ${process.env.PANEL_USERNAME || ""}`);
console.log(`[!] Using password: ${process.env.PANEL_PASSWORD.replace(/./g, "*") || ""}`);
const type = process.argv[2];
const loginByPuppeteer = async () => {
	const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
	const page = await browser.newPage();
	await page.goto(process.env.PANEL_URL || "https://ct8.pl");
	await page.waitForSelector('input[name="username"]');
	// enter text
	await page.type('input[name="username"]', process.env.PANEL_USERNAME || "");
	await page.type('input[name="password"]', process.env.PANEL_PASSWORD || "");
	await page.click('button[name="submit"]');
	await page.waitForNavigation();
	await page.click('a[href="/www/"]');
	await new Promise((r) => setTimeout(r, 3000));
	// log out
	await page.goto(`${process.env.PANEL_URL}/logout`);
	console.log('[!] Renewal complete')
	await new Promise((r) => setTimeout(r, 1000));
	await browser.close();
};

const main = async () => {
	try {
		await loginByPuppeteer();
	} catch (e) {
		console.log(`*`.repeat(20));
		console.log('[!!] Login failed. Probably invalid credentials, blocked account or an internal error.');
		console.log('[!] If this is a selector error, it most likely failed to log in.')
		console.error(e);
		process.exit(1);
	}
}

main();