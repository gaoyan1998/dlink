ARG FLINK_VERSION
ARG DINKY_VERSION

FROM flink:${FLINK_VERSION}-scala_2.12-java8 as flink-base

FROM  node:18.15.0-alpine3.17 AS ui-build
WORKDIR /build/

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV UMI_ENV=production

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD ./dinky-web/package.json /build/package.json
RUN npm install --legacy-peer-deps
ADD ./dinky-web .
RUN npm run build

FROM maven:3.9.6-amazoncorretto-11 AS build
WORKDIR /build/
ARG FLINK_VERSION
ENV FLINK_VERSION=${FLINK_VERSION}
ENV DINKY_VERSION=${DINKY_VERSION}

ADD . .
COPY --from=ui-build /build/dist/ /build/dinky-web/dist/

RUN mvn package -Dmaven.test.skip=true -P prod,scala-2.12,flink-single-version,flink-${FLINK_VERSION},fast
RUN mkdir release &&  \
    tar -C release -xvf build/dinky-release-${FLINK_VERSION}-${DINKY_VERSION}.tar.gz && \
    mv release/dinky-release-* release/dinky


FROM openjdk:8-jdk-alpine

ARG FLINK_VERSION
ENV FLINK_VERSION=${FLINK_VERSION}
ENV DINKY_HOME=/opt/dinky/

WORKDIR /opt/dinky/

COPY --from=build /build/release/dinky /opt/
COPY --from=flink-base /opt/flink/lib/ /opt/dinky/extends/
COPY --from=flink-base  /opt/flink/lib/*.jar  /dinky/extends/flink${FLINK_VERSION}/
RUN rm -f  /dinky/extends/flink${FLINK_VERSION}/flink-table-planner-loader*.jar && \
    curl -o /opt/dinky/lib/mysql-connector-j-8.0.33.jar "https://repo1.maven.org/maven2/com/mysql/mysql-connector-j/8.0.33/mysql-connector-j-8.0.33.jar"

COPY --from=flink-base  /opt/flink/opt/flink-table-planner*.jar /dinky/extends/flink${FLINK_VERSION}/

USER root
RUN mkdir /opt/dinky/customJar && chmod -R 777 /opt/dinky/

EXPOSE 8888

CMD  ./auto.sh startOnPending