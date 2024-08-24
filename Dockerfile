FROM node AS build

WORKDIR /build

COPY . /build

RUN npm i && \
    npm run build

FROM build as production

WORKDIR /app

RUN mv /app/build /app && \
    rm -rf /build

EXPOSE 3000