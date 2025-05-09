FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dist"]