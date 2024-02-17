FROM flink:1.18.1-scala_2.12-java11

ADD ./dinky-release-1.18-1.0.0-rc4  /dinky
ADD ./libs/ /opt/flink/lib
COPY /data/ip.xdb /opt/ip.xdb

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && mkdir ./plugins/s3-fs-hadoop \
    && cp /opt/flink/opt/flink-s3-fs-hadoop-1.18.1.jar /opt/flink/plugins/s3-fs-hadoop/ \
    && mkdir ./plugins/s3-fs-presto \
    && cp /opt/flink/opt/flink-s3-fs-presto-1.18.1.jar /opt/flink/plugins/s3-fs-presto/ \
    && cp /opt/flink/opt/flink-table-planner_2.12-1.18.1.jar /opt/flink/lib/ \
    && rm -rf /opt/flink/lib/flink-table-planner-loader* \
    && mv /dinky/jar/dinky-app-1.18-1.0.0-rc4-jar-with-dependencies.jar /opt/flink/lib