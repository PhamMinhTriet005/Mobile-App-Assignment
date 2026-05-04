# Build stage using official Maven image (bypasses Windows line-ending issues)
FROM maven:3-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src src
# Build the application skipping tests explicitly using the maven image
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the application port
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
