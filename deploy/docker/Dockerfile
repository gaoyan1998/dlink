FROM  node:18.15.0-alpine3.17 AS ui-build
WORKDIR /build/dinky

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV UMI_ENV=production

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD ./dinky-web/package.json /build/dinky/package.json
RUN npm install --legacy-peer-deps
ADD ./dinky-web .
RUN npm run build




FROM flink:1.17.2-scala_2.12-java11 as base

ENV TZ=Asia/Shanghai


FROM maven:3.9.6-amazoncorretto-11 AS build
WORKDIR /build/dinky

ADD . .
COPY --from=ui-build /build/dinky/dist/ /build/dinky/dinky-web/dist/

RUN mvn package -Dmaven.test.skip=true -P prod,scala-2.12,flink-single-version,flink-1.17 && \
    cd build && \
    tar -C /dinky -xvf dinky-release-*.tar.gz && \
    mv /dinky/dinky-release-* /dinky/dinky


FROM base

ARG DINKY_VERSION
ENV DINKY_VERSION=${DINKY_VERSION}
WORKDIR /opt/dinky/

COPY --from=build /dinky/dinky /opt/

USER root
RUN mkdir -p /opt/dinky/run && mkdir -p /opt/dinky/logs &&  touch /opt/dinky/logs/dinky.log
RUN chmod -R 777 /opt/dinky/

EXPOSE 8888

CMD  ./auto.sh restart && tail -f /opt/dinky/logs/dinky.log