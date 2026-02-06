# STAGE 1: Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# STAGE 2: Servire con Nginx
FROM nginx:stable-alpine
# Nota: "dist/hack-hub-frontend" dipende dal nome del progetto in angular.json
COPY --from=build /app/dist/hack-hub-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
