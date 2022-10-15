# # # Build Stage
# # FROM node:16.0.0-alpine3.12 AS development
# # WORKDIR /app
# # ENV HOST=0.0.0.0
# # ENV PORT=3000
# # ENV NODE_ENV=development
# # EXPOSE 3000
# # CMD [ "yarn", "dev" ]

# # FROM node:16.0.0-alpine3.12 AS dependencies
# # ENV NODE_ENV=production
# # ENV BASE_URL=https://api-dev.spleet.africa/v1/
# # ENV CLOUDINARY_URL=https://api.cloudinary.com/v1_1/spleet-kanmi/upload
# # ENV CLOUDINARY_PRESET=pjbxkdk0
# # ENV GOOGLE_CLIENT_ID=996944685007-5boo1kvn1f7bsuacc5720ov1oah2gdrb.apps.googleusercontent.com
# # ENV DOMAIN=spleet.africa
# # ENV PAYSTACK_PUBLIC=pk_test_4efc2288b6a51480eb411de037b896c712cb3b0d
# # ENV FLUTTERWAVE_PUBLIC=FLWPUBK_TEST-2a261c4a3f121a449a7473397226b776-X
# # ENV CONFIGURE_LOGIN=https://spleet-inc.evolvefinance.co/login
# # ENV EMAIL_VERIFICATION_PAGE=https://playfront.spleet.africa/verify
# # ENV FORGET_PASSWORD_PAGE=https://playfront.spleet.africa/reset-password
# # ENV WELCOME_PAGE=https://playfront.spleet.africa/welcome
# # ENV VERIFY_CALLBACKURL=https://playfront.spleet.africa/tenants
# # ENV GOOGLE_MAP_KEY=AIzaSyBMAYODSWcmdTJ5cZ5tErd2OwZJshPCdDE
# # WORKDIR /app
# # COPY package.json yarn.lock ./
# # RUN yarn install --frozen-lockfile

# # FROM node:16.0.0-alpine3.12 AS builder
# # ENV NODE_ENV=development
# # WORKDIR /app
# # COPY . .
# # RUN yarn install --frozen-lockfile && NODE_ENV=production yarn build

# # FROM node:16.0.0-alpine3.12 AS production
# # WORKDIR /app
# # ENV HOST=0.0.0.0
# # ENV PORT=80
# # ENV NODE_ENV=production
# # ENV BASE_URL=https://api-dev.spleet.africa/v1/
# # ENV CLOUDINARY_URL=https://api.cloudinary.com/v1_1/spleet-kanmi/upload
# # ENV CLOUDINARY_PRESET=pjbxkdk0
# # ENV GOOGLE_CLIENT_ID=996944685007-5boo1kvn1f7bsuacc5720ov1oah2gdrb.apps.googleusercontent.com
# # ENV DOMAIN=spleet.africa
# # ENV PAYSTACK_PUBLIC=pk_test_4efc2288b6a51480eb411de037b896c712cb3b0d
# # ENV FLUTTERWAVE_PUBLIC=FLWPUBK_TEST-2a261c4a3f121a449a7473397226b776-X
# # ENV CONFIGURE_LOGIN=https://spleet-inc.evolvefinance.co/login
# # ENV EMAIL_VERIFICATION_PAGE=https://playfront.spleet.africa/verify
# # ENV FORGET_PASSWORD_PAGE=https://playfront.spleet.africa/reset-password
# # ENV WELCOME_PAGE=https://playfront.spleet.africa/welcome
# # ENV VERIFY_CALLBACKURL=https://playfront.spleet.africa/tenants
# # ENV GOOGLE_MAP_KEY=AIzaSyBMAYODSWcmdTJ5cZ5tErd2OwZJshPCdDE

# # COPY --from=builder /app/nuxt.config.js ./nuxt.config.js
# # COPY --from=builder  /app/assets ./assets
# # COPY --from=builder  /app/components ./components
# # COPY --from=builder  /app/helpers ./helpers
# # COPY --from=builder  /app/layouts ./layouts
# # COPY --from=builder  /app/middleware ./middleware
# # COPY --from=builder  /app/pages ./pages
# # COPY --from=builder  /app/plugins ./plugins
# # COPY --from=builder  /app/static ./static
# # COPY --from=builder  /app/store ./store
# # COPY --from=builder /app/.nuxt ./.nuxt
# # COPY --from=builder /app/dist ./dist
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder  /app/package.json /package.json

# # EXPOSE 80
# # CMD [ "yarn", "start" ]



# # FROM node:lts as builder

# # WORKDIR /app
# # COPY . .

# # RUN yarn install \
# #   --prefer-offline \
# #   --frozen-lockfile \
# #   --non-interactive \
# #   --production=false

# # RUN yarn build

# # RUN rm -rf node_modules && yarn install
# # #   --prefer-offline \
# # #   --pure-lockfile \
# # #   --non-interactive 

# # FROM node:lts

# # WORKDIR /app
# # COPY ./package.json /package.json
# # COPY --from=builder /app .
# # ENV  NODE_ENV=production
# # ENV BASE_URL=https://api-dev.spleet.africa/v1/
# # ENV CLOUDINARY_URL=https://api.cloudinary.com/v1_1/spleet-kanmi/upload
# # ENV CLOUDINARY_PRESET=pjbxkdk0
# # ENV GOOGLE_CLIENT_ID=996944685007-5boo1kvn1f7bsuacc5720ov1oah2gdrb.apps.googleusercontent.com
# # ENV DOMAIN=spleet.africa
# # ENV PAYSTACK_PUBLIC=pk_test_4efc2288b6a51480eb411de037b896c712cb3b0d
# # ENV FLUTTERWAVE_PUBLIC=FLWPUBK_TEST-2a261c4a3f121a449a7473397226b776-X
# # ENV CONFIGURE_LOGIN=https://spleet-inc.evolvefinance.co/login
# # ENV EMAIL_VERIFICATION_PAGE=https://playfront.spleet.africa/verify
# # ENV FORGET_PASSWORD_PAGE=https://playfront.spleet.africa/reset-password
# # ENV WELCOME_PAGE=https://playfront.spleet.africa/welcome
# # ENV VERIFY_CALLBACKURL=https://playfront.spleet.africa/tenants
# # ENV GOOGLE_MAP_KEY=AIzaSyBMAYODSWcmdTJ5cZ5tErd2OwZJshPCdDE
# # EXPOSE 80

# # CMD [ "yarn", "start" ]




# FROM node:lts-alpine as build-stage
# WORKDIR /app

# COPY package.json ./
# RUN npm install
# ENV BASE_URL=https://api-dev.spleet.africa/v1/
# ENV CLOUDINARY_URL=https://api.cloudinary.com/v1_1/spleet-kanmi/upload
# ENV CLOUDINARY_PRESET=pjbxkdk0
# ENV GOOGLE_CLIENT_ID=996944685007-5boo1kvn1f7bsuacc5720ov1oah2gdrb.apps.googleusercontent.com
# ENV DOMAIN=spleet.africa
# ENV PAYSTACK_PUBLIC=pk_test_4efc2288b6a51480eb411de037b896c712cb3b0d
# ENV FLUTTERWAVE_PUBLIC=FLWPUBK_TEST-2a261c4a3f121a449a7473397226b776-X
# ENV CONFIGURE_LOGIN=https://spleet-inc.evolvefinance.co/login
# ENV EMAIL_VERIFICATION_PAGE=https://playfront.spleet.africa/verify
# ENV FORGET_PASSWORD_PAGE=https://playfront.spleet.africa/reset-password
# ENV WELCOME_PAGE=https://playfront.spleet.africa/welcome
# ENV VERIFY_CALLBACKURL=https://playfront.spleet.africa/tenants
# ENV GOOGLE_MAP_KEY=AIzaSyBMAYODSWcmdTJ5cZ5tErd2OwZJshPCdDE
# COPY . .

# RUN npm run generate

# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build-stage /app/nuxt.config.js /usr/share/nginx/nuxt.config.js
# COPY --from=build-stage /app/.nuxt /usr/share/nginx/.nuxt
# COPY --from=build-stage /app/nginx.conf /usr/share/nginx/nginx.conf
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:16.0.0

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ./
RUN yarn install
EXPOSE 80
ENV HOST=0.0.0.0
ENV NUXT_PORT=80

CMD ["yarn", "prod"]
