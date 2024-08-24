FROM node AS dockstat

WORKDIR /build

COPY . /build

RUN npm i --force && \
    npm run build && \
    npm i -g serve && \
    chmod +x entrypoint.sh

WORKDIR /app

RUN mv /build/build /app && \
    mv /build/entrypoint.sh /app && \
    rm -rf /build

EXPOSE 3000

ENTRYPOINT [ "bash", "/app/entrypoint.sh" ]
