FROM node:alpine
EXPOSE 3000
WORKDIR /app
COPY *.* ./
RUN npm ci --only=production
COPY server ./server
COPY public ./public
CMD ["node", "app.js"]
