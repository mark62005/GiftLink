FROM node:lts-alpine

WORKDIR /app


# Copy package files
COPY server/package.json ./
COPY server/pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

COPY server/ ./

RUN pnpm build

# Expose port
EXPOSE 5001

# Start the app
CMD ["node", "dist/index.js"]

