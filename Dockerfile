#FROM  node:18.15.0-alpine3.17 AS ui-build
#WORKDIR /user/src/app
#
#ENV NODE_OPTIONS=--openssl-legacy-provider
#ENV UMI_ENV=production
#
## 单独分离 package.json，是为了安装依赖可最大限度利用缓存
#ADD dinky-web/package.json /user/src/app/package.json
#RUN npm config set registry http://10.2.4.16:8081/repository/group-npm && \
#    npm install --legacy-peer-deps
#ADD ./dinky-web .
#RUN npm run build
#
#FROM maven:3.6-jdk-11 AS build
#WORKDIR /user/src/app
#ADD . .
#COPY --from=ui-build /user/src/app/dist/ /user/src/app/dinky-web/dist/
#ADD settings.xml ~/.m2/settings.xml
#ADD settings.xml /user/share/maven/conf/settings.xml
#RUN mvn install -Dmaven.test.skip=true -P prod,scala-2.12,flink-single-version,1.18,jdk11,fast,aliyun && \
#    mvn package -Dmaven.test.skip=true -P prod,scala-2.12,flink-single-version,1.18,jdk11,fast,aliyun && \
#    cd build && \
#    tar -xvf dinky-release-1.18-1.0.0-rc4.tar.gz && \
#    mv dinky-release-1.18-1.0.0-rc4 /dinky

FROM flink:1.18.1-scala_2.12-java11

ADD ./libs/* /opt/flink/lib/
ADD ./dinky /dinky

RUN set -eux && \
    ln -snf /user/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    mkdir ./plugins/s3-fs-hadoop && \
    cp /opt/flink/opt/flink-s3-fs-hadoop-*.jar /opt/flink/plugins/s3-fs-hadoop/ && \
    mkdir ./plugins/s3-fs-presto && \
    cp /opt/flink/opt/flink-s3-fs-presto-*.jar /opt/flink/plugins/s3-fs-presto/ && \
    rm -rf /opt/flink/lib/flink-table-planner-loader* && \
    mv  /opt/flink/opt/flink-table-planner_2.12-1.18.1.jar /opt/flink/lib && \
    mv /dinky/jar/dinky-app-*.jar /opt/flink/lib && \
    rm -rf /dinky/lib/log4j* && \
    chmod -R 777 /opt/flink/lib && \
    curl -o /opt/flink/lib/mysql.jar "http://10.2.4.16:8081/repository/maven-public/com/mysql/mysql-connector-j/8.0.32/mysql-connector-j-8.0.32.jar"


