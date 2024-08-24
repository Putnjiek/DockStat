FROM node AS dockstat

WORKDIR /build

COPY . /build

RUN npm i --force && \
    npm run build && \
    npm i -g serve

WORKDIR /app

RUN mv /build/build /app && \
    rm -rf /build

EXPOSE 3000

ENTRYPOINT [ "serve", "-s", "build" ]
