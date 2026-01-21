
FROM eclipse-temurin:17-jdk-alpine AS builder

# To compile with pom and create a maven repository with dependencies in the image
WORKDIR /app
COPY ./pom.xml .
COPY ./.mvn ./.mvn
COPY ./mvnw .

# primera capa para descargarse solo las dependencias de maven
RUN ./mvnw dependency:go-offline
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw
# RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target

COPY ./src ./src
# creates the jar independently from dependencies
RUN ./mvnw clean package -DskipTests

# multi stage para que solo guarde el JAR y no el repositorio y dependencias de maven
FROM eclipse-temurin:17-jdk-alpine AS production

WORKDIR /app

# defined in spring application.properties logging.file.path=/app/logs
RUN mkdir ./logs

COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
