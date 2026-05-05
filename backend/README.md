# S-Edu Backend API

A Spring Boot 4.0.6 REST API backend for a language learning mobile application with MongoDB database integration, built with the Layered Architecture pattern.

## 📋 Overview

**S-Edu** is a mobile application backend designed for language learning. It provides a robust API for managing languages, topics, vocabulary, and practice questions. The backend follows strict **Layered Architecture** principles with separated concerns across presentation, business logic, persistence, and domain layers.

### Tech Stack
- **Java**: 21 (LTS)
- **Spring Boot**: 4.0.6
- **Spring Data MongoDB**: 5.0.5
- **MongoDB**: Latest
- **API Documentation**: SpringDoc OpenAPI 2.8.4 (Swagger UI)
- **Validation**: Jakarta Bean Validation (Hibernate Validator)
- **Build Tool**: Maven 3
- **Containerization**: Docker & Docker Compose
- **Server**: Apache Tomcat 11

## 🏗️ Architecture

### Layered Architecture Pattern
```text
┌─────────────────────────────────────────────────┐
│         Presentation Layer (Controllers)         │
│  HTTP Endpoints & API Response Handling          │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│         Business Logic Layer (Services)          │
│  Business Rules & Data Processing               │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│       Persistence Layer (Repositories)           │
│  MongoDB Queries & Data Access                  │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│          Domain Layer (Entities)                 │
│  Data Models & Business Objects                 │
└─────────────────────────────────────────────────┘
```

### Key Packages
- **`presentation`**: REST Controllers, Global Exception Handler, API Response Wrapper.
- **`business`**: Service layer with business logic rules.
- **`persistence`**: Spring Data MongoDB Repository interfaces.
- **`domain`**: Entity classes mapping to database collections (`@Document`).
- **`config`**: Application configuration (Mongo setup, Data Seeding).

## 🚀 Getting Started

### Prerequisites
- **Docker** & **Docker Compose** (for containerized setup - highly recommended)
- **Java 21** & **Maven 3.6+** (for local development)

### Option 1: Using Docker Compose (Recommended) ✅

#### 1. Build and Start Services
```bash
cd backend
docker-compose up -d --build
```
This multi-stage Docker build handles Maven compilation and JVM execution automatically. It launches:
- **MongoDB**: Database running on the Docker network (`mongodb://mongodb:27017`).
- **Backend API**: Running on port `8080`.

#### 2. Verify Services
```bash
# Check if containers are running
docker-compose ps

# View backend logs to monitor database seeding and startup
docker logs backend-sedu -f
```

#### 3. Stop Services
```bash
docker-compose down
```

---

## 📡 API Documentation

### Interactive Swagger UI
Once the backend is running, access the interactive OpenAPI documentation:
- **Swagger Dashboard**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Raw OpenAPI JSON**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

### Core API Endpoints

#### System
- `GET /api/health` - Check backend system health and uptime

#### Languages
- `GET /api/v1/languages` - Get all languages
- `POST /api/v1/languages` - Create language
- `GET /api/v1/languages/{id}` - Get language by ID
- `DELETE /api/v1/languages/{id}` - Delete language

#### Topics
- `GET /api/v1/topics` - Get all topics
- `GET /api/v1/topics/language/{languageId}` - Get topics by language
- `POST /api/v1/topics` - Create topic
- `GET /api/v1/topics/{id}` - Get topic by ID
- `DELETE /api/v1/topics/{id}` - Delete topic

#### Vocabulary
- `GET /api/v1/vocabularies` - Get all vocabularies
- `GET /api/v1/vocabularies/topic/{topicId}` - Get vocabulary by topic
- `POST /api/v1/vocabularies` - Create vocabulary
- `GET /api/v1/vocabularies/{id}` - Get vocabulary by ID
- `DELETE /api/v1/vocabularies/{id}` - Delete vocabulary

#### Questions & Tests
- `GET /api/v1/questions` - Get all questions
- `GET /api/v1/questions/topic/{topicId}` - Get questions by topic
- `POST /api/v1/questions/generate-test` - Generate a random test for a topic
- `POST /api/v1/test-results` - Submit test results

### Standard Response Format
All API responses map to an `ApiResponse<T>` wrapper for consistency:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2026-05-05T01:52:51.890Z"
}
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)
```bash
# MongoDB
SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/SEdu_db
MONGODB_HOST=mongodb
MONGODB_PORT=27017
MONGODB_DATABASE=SEdu_db

# Server
SERVER_PORT=8080
```

### Application Properties (`application.yaml`)
`lazy-initialization` is set to `false` to guarantee Springdoc OpenAPI mapping compatibility.

## 🐛 Troubleshooting

### 1. MongoDB Driver connects to `localhost:27017` in Docker
**Problem**: The Mongo driver defaults to localhost despite container environment variables.
**Solution**: This is actively overridden by the custom `MongoConfig` configuration class, avoiding Spring Boot auto-configuration conflicts. Always ensure `mvn clean package -DskipTests` maps the compiled config to the container.

### 2. Swagger UI shows "Failed to load API definition" (500 Error)
**Problem**: A 500 error on `/v3/api-docs`.
**Solution**: 
- **Dependency Issues**: We use `springdoc-openapi-starter-webmvc-ui` version `2.8.4` (or newer) to guarantee compatibility with Spring Boot 4.0.6.
- **Validation**: Requires `spring-boot-starter-validation` to introspect payloads. 
- **Lazy Initialization**: Confirmed disabled (`spring.main.lazy-initialization: false`).

---

## 📝 Development Notes

### Data Seeding
The backend intelligently detects if the database is empty upon startup via the `DataSeeder` class. If empty, it injects sample languages, topics, vocabulary words, and questions. If data already exists, it skips seeding automatically.

### Error Handling
All application and routing errors are intercepted by `GlobalExceptionHandler`, resolving custom exceptions (e.g., `ResourceNotFoundException`) and runtime errors cleanly into the standardized `ApiResponse<T>` HTTP layout.

---

## 📄 License
This project is part of the S-Edu mobile application.

---

**Last Updated**: May 5, 2026
**Version**: 0.0.1-SNAPSHOT
