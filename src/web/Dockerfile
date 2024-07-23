#Use node to build
FROM node:lts AS build

# Set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN yarn install

COPY . .

RUN yarn build

# Use nginx for deploy
FROM nginx:alpine

# Copy the build output to the Nginx directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
