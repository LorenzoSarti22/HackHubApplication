# STAGE 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# ... (parte build precedente)

# STAGE 2: Servire con Nginx
FROM nginx:stable-alpine

# Rimuovi i file di default
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/hack-hub-frontend/browser/. /usr/share/nginx/html/

# Copia la config di nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
