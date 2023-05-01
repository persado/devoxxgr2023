FROM openjdk:17-jdk-alpine
RUN mkdir /app
WORKDIR /app
COPY target/*.jar /app/app.jar
RUN adduser -D -u 1000 demo
RUN chown -R demo:demo /app
EXPOSE 8080
VOLUME ["/data", "/h2", "/tmp"]
USER demo
ENTRYPOINT ["java","-jar","app.jar"]
