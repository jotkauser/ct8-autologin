FROM node:lts-bullseye-slim

# Setup for Puppeteer

ENV LANG=en_US.UTF-8 \
    PUPPETEER_CACHE_DIR=/home/nodejs/.cache/puppeteer \
    DBUS_SESSION_BUS_ADDRESS=autolaunch:

		RUN apt-get update && apt-get install -y \
		wget \
		ca-certificates \
		fonts-liberation \
		libatk-bridge2.0-0 \
		libatk1.0-0 \
		libcups2 \
		libdbus-1-3 \
		libx11-xcb1 \
		libxcomposite1 \
		libxdamage1 \
		libxrandr2 \
		libgbm1 \
		libasound2 \
		libpangocairo-1.0-0 \
		libpango-1.0-0 \
		libjpeg-dev \
		libxss1 \
		libnss3 \
		lsb-release \
		libxfixes3 \
		libxkbcommon0 \
		xdg-utils \
		--no-install-recommends \
		&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs && chown -R nodejs:nodejs /app && mkdir /home/nodejs && chown -R nodejs:nodejs /home/nodejs
USER nodejs

RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dist"]