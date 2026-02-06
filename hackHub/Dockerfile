# STAGE 1: Build (Usiamo JDK 21)
FROM gradle:8-jdk21 AS build
WORKDIR /app
COPY build.gradle.kts settings.gradle.kts ./
COPY src ./src
# Compiliamo il JAR
RUN gradle clean bootJar --no-daemon

# STAGE 2: Runtime (Usiamo JRE 21)
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]