# CT8.pl Auto Login Script
This script allows you to automatically log in to the CT8.pl panel in order to extend the expiration date.

# Login methods
- [x] Puppeteer
- [ ] Axios

# Installation
1. Clone the repository
2. Install dependencies with your favorite package manager
3. Build it using `build` script or `start` script to run directly
If you use `build`, you can run it directly with `dist` script or `node dist/index.js`

# Docker
You can build the image yourself: `docker build -t ct8-autologin .`
Or pull the prebuilt one: `docker pull ghcr.io/jotkauser/ct8-autologin`
Prebuilt image is for aarch64 and x86_64

## Usage
If using manual built image, you can run it with:
`docker run --env-file .env ct8-autologin` - if you want to get variables from `.env`
You could also use `-e` to pass them directly

If using prebuilt image, you can run it with:
`docker run --env-file .env ghcr.io/jotkauser/ct8-autologin`
Same as above, you could also use `-e` to pass them directly

# Environment variables
- `PANEL_URL` - URL of the CT8.pl/Serv00 panel
- `PANEL_USERNAME` - username
- `PANEL_PASSWORD` - password

