FROM node AS build

WORKDIR /build

COPY . /build

RUN npm i --force && \
    npm run build && \
    npm i -g serve

FROM build as production

WORKDIR /app

RUN mv /build/build /app && \
    rm -rf /build

EXPOSE 3000

ENTRYPOINT [ "serve", "-s", "build" ]