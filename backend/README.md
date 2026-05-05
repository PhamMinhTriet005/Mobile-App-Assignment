# S-Edu Backend API

A Spring Boot 4.0.6 REST API backend for a language learning mobile application with MongoDB database integration, built with Layered Architecture pattern.

## 📋 Overview

**S-Edu** is a mobile application backend designed for language learning. It provides a robust API for managing languages, topics, vocabulary, and practice questions. The backend follows strict **Layered Architecture** principles with separated concerns across presentation, business logic, persistence, and domain layers.

### Tech Stack
- **Java**: 21 (LTS)
- **Spring Boot**: 4.0.6
- **Spring Data MongoDB**: 5.0.5
- **MongoDB**: Latest
- **API Documentation**: SpringDoc OpenAPI 2.5.0 (Swagger UI)
- **Build Tool**: Maven 3
- **Containerization**: Docker & Docker Compose
- **Server**: Apache Tomcat 11

## 🏗️ Architecture

### Layered Architecture Pattern
```
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
- **`presentation`**: REST Controllers, Global Exception Handler, API Response Wrapper
- **`business`**: Service layer with business logic
- **`persistence`**: Spring Data MongoDB Repository interfaces
- **`domain`**: Entity classes with @Document annotations
- **`config`**: Application configuration and data seeding

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/mobiledev/SEdu/
│   │   │   ├── SEduApplication.java          # Spring Boot entry point
│   │   │   ├── domain/                       # Entity classes
│   │   │   │   ├── Language.java
│   │   │   │   ├── Topic.java
│   │   │   │   ├── Vocabulary.java
│   │   │   │   ├── Question.java
│   │   │   │   └── TestResult.java
│   │   │   ├── persistence/                  # MongoDB repositories
│   │   │   │   ├── LanguagePersistence.java
│   │   │   │   ├── TopicPersistence.java
│   │   │   │   ├── VocabularyPersistence.java
│   │   │   │   ├── QuestionPersistence.java
│   │   │   │   └── TestResultPersistence.java
│   │   │   ├── business/                     # Business logic
│   │   │   │   ├── LanguageBusiness.java
│   │   │   │   ├── TopicBusiness.java
│   │   │   │   ├── VocabularyBusiness.java
│   │   │   │   ├── QuestionBusiness.java
│   │   │   │   └── TestResultBusiness.java
│   │   │   ├── presentation/                 # REST Controllers
│   │   │   │   ├── LanguageController.java
│   │   │   │   ├── TopicController.java
│   │   │   │   ├── VocabularyController.java
│   │   │   │   ├── QuestionController.java
│   │   │   │   ├── TestResultController.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ApiResponse.java
│   │   │   └── config/                       # Configuration
│   │   │       └── DataSeeder.java           # Auto data population
│   │   └── resources/
│   │       └── application.yaml              # Spring Boot config
│   └── test/
│       └── java/com/mobiledev/SEdu/
│           └── SEduApplicationTests.java
├── docker-compose.yml                        # Multi-container orchestration
├── Dockerfile                                # Docker image build
├── .env                                      # Environment variables
├── pom.xml                                   # Maven dependencies
└── README.md                                 # This file
```

## 🚀 Getting Started

### Prerequisites
- **Docker** & **Docker Compose** (for containerized setup - recommended)
- **Java 21** (for local development)
- **Maven 3.6+** (for local build)
- **MongoDB** (local instance if not using Docker)

### Option 1: Using Docker Compose (Recommended) ✅

#### 1. Build the Docker Image
```bash
cd backend
docker-compose build --no-cache
```

#### 2. Start Services
```bash
docker-compose up -d
```

This starts:
- **MongoDB**: Running on `mongodb://mongodb:27017`
- **Backend API**: Running on `http://localhost:8080`

#### 3. Verify Services
```bash
# Check containers
docker-compose ps

# View backend logs
docker-compose logs -f backend

# View MongoDB logs
docker-compose logs -f mongodb
```

#### 4. Stop Services
```bash
docker-compose down
```

---

### Option 2: Local Development

#### 1. Start MongoDB Locally
```bash
# Make sure MongoDB is installed and running
mongod --dbpath ./data --port 27017
```

#### 2. Update Configuration
Edit `src/main/resources/application.yaml`:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/SEdu_db
```

#### 3. Build and Run
```bash
# Maven clean build
mvn clean package -DskipTests

# Run the application
mvn spring-boot:run
```

---

## 📡 API Documentation

### Swagger UI
Once the backend is running, access interactive API documentation:
- **URL**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### API Endpoints

#### Languages
- `GET /api/v1/languages` - Get all languages
- `POST /api/v1/languages` - Create language
- `GET /api/v1/languages/{id}` - Get language by ID
- `PUT /api/v1/languages/{id}` - Update language
- `DELETE /api/v1/languages/{id}` - Delete language

#### Topics
- `GET /api/v1/topics` - Get all topics
- `GET /api/v1/topics/language/{languageId}` - Get topics by language
- `POST /api/v1/topics` - Create topic
- `GET /api/v1/topics/{id}` - Get topic by ID

#### Vocabulary
- `GET /api/v1/vocabularies` - Get all vocabularies
- `GET /api/v1/vocabularies/topic/{topicId}` - Get vocabulary by topic
- `POST /api/v1/vocabularies` - Create vocabulary

#### Questions
- `GET /api/v1/questions` - Get all questions
- `GET /api/v1/questions/topic/{topicId}` - Get questions by topic
- `POST /api/v1/questions` - Create question

#### Test Results
- `GET /api/v1/test-results` - Get all test results
- `POST /api/v1/test-results` - Submit test result

### Response Format
All API responses follow the standard `ApiResponse<T>` wrapper:

```json
{
  "data": {...},
  "success": true,
  "message": "Operation successful"
}
```

Error response:
```json
{
  "data": null,
  "success": false,
  "message": "Error description"
}
```

---

## 🗄️ Database Schema

### Collections

#### Languages
```json
{
  "_id": ObjectId,
  "code": "en",
  "name": "English"
}
```

#### Topics
```json
{
  "_id": ObjectId,
  "languageId": ObjectId,
  "name": "Animals"
}
```

#### Vocabularies
```json
{
  "_id": ObjectId,
  "topicId": ObjectId,
  "english": "Cat",
  "vietnamese": "Con mèo",
  "partOfSpeech": "noun",
  "example": null,
  "imageUrl": null
}
```

#### Questions
```json
{
  "_id": ObjectId,
  "topicId": ObjectId,
  "question": "What is a cat?",
  "options": ["Con mèo", "Con chó", "Con cá", "Con bò"],
  "correctAnswerIndex": 0,
  "imageUrl": null
}
```

#### Test Results
```json
{
  "_id": ObjectId,
  "topicId": ObjectId,
  "score": 85,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "attemptDate": ISODate,
  "timeSpent": 300000
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

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_MOBILEDEV=DEBUG
```

### Application Properties (`application.yaml`)
```yaml
spring:
  application:
    name: SEdu
  data:
    mongodb:
      uri: mongodb://mongodb:27017/SEdu_db
  main:
    lazy-initialization: true

server:
  port: 8080
  servlet:
    context-path: /

springdoc:
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
```

---

## 🐳 Docker Setup Details

### Dockerfile
Multi-stage build to minimize image size:
- **Build Stage**: Uses Maven 3.21 to compile and package
- **Runtime Stage**: Uses Eclipse Temurin JRE 21 for minimal footprint

### Docker Compose Services

#### MongoDB Service
- **Image**: `mongo:latest`
- **Container Name**: `mongodb-sedu`
- **Port**: `27017:27017`
- **Volume**: `mongodb_data:/data/db` (persistent storage)
- **Network**: `backend_default`

#### Backend Service
- **Build**: Local Dockerfile
- **Container Name**: `backend-sedu`
- **Port**: `8080:8080`
- **Depends On**: MongoDB service
- **Environment**: SPRING_DATA_MONGODB_URI set to Docker service hostname
- **Network**: `backend_default`

---

## 🔧 Building & Running

### Full Docker Build
```bash
cd backend

# Build image (no cache, fresh build)
docker-compose build --no-cache

# Start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

### Maven Build (Local)
```bash
# Clean and package (skip tests)
mvn clean package -DskipTests

# Run with Maven
mvn spring-boot:run

# Or run JAR directly
java -jar target/SEdu-0.0.1-SNAPSHOT.jar
```

### Useful Docker Commands
```bash
# Build image
docker-compose build

# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# Remove all data
docker-compose down -v

# View real-time logs
docker-compose logs -f backend

# Execute command in container
docker exec backend-sedu ps aux

# Check environment variables
docker exec backend-sedu env | grep SPRING_DATA_MONGODB
```

---

## 🧪 Testing

### Test Endpoints with curl
```bash
# Get all languages
curl http://localhost:8080/api/v1/languages

# Create a language
curl -X POST http://localhost:8080/api/v1/languages \
  -H "Content-Type: application/json" \
  -d '{"code":"en","name":"English"}'

# Get Swagger UI
curl http://localhost:8080/swagger-ui.html

# Health check
curl http://localhost:8080/actuator/health
```

### Data Seeding
The application automatically seeds mock data on startup if the database is empty:
- **3 Languages**: English, Chinese, Japanese
- **3 Topics**: Family, Animals, Scenery
- **12 Vocabularies**: 4 per topic
- **2 Sample Questions**: For testing

---

## 📊 Monitoring

### Logs
```bash
# View backend logs
docker logs backend-sedu --tail 100

# Follow logs in real-time
docker logs backend-sedu -f

# Search logs
docker logs backend-sedu | grep "ERROR"
```

### Database Status
```bash
# Connect to MongoDB
docker exec -it mongodb-sedu mongosh

# Within mongosh:
> use SEdu_db
> db.languages.find()
> db.topics.find()
> exit
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem**: `MongoSocketOpenException: Exception opening socket`

**Solution**:
1. Ensure MongoDB container is running: `docker-compose ps`
2. Check URI in application.yaml uses correct hostname: `mongodb` (not localhost)
3. Verify network connectivity: `docker exec backend-sedu ping mongodb`
4. Restart containers: `docker-compose down && docker-compose up -d`

### Swagger UI Not Loading
**Problem**: "Failed to load API definition - 500 error"

**Solution**:
1. Check backend logs for errors: `docker logs backend-sedu`
2. Verify `springdoc-openapi` dependency is in pom.xml
3. Ensure controllers have proper @RestController annotations
4. Clear browser cache and retry

### Port Already in Use
**Problem**: `Error binding to port 8080`

**Solution**:
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
# Change "8080:8080" to "8081:8080"
```

---

## 📈 Performance Considerations

1. **Lazy Initialization**: Enabled to speed up startup
2. **Connection Pooling**: MongoDB driver handles automatic pooling
3. **Multi-stage Docker Build**: Reduces image size from 1GB+ to ~450MB
4. **Persistent Volumes**: MongoDB data persists between container restarts
5. **Spring Data MongoDB**: Efficient document-to-object mapping

---

## 🔐 Security Notes

- **Production**: Add authentication (Basic, JWT, OAuth2)
- **CORS**: Configure in GlobalExceptionHandler or SecurityConfig
- **Validation**: Add @NotNull, @NotBlank, @Size annotations
- **Logging**: Avoid logging sensitive information (passwords, tokens)

---

## 📝 Development Notes

### Adding New Endpoints
1. Create Entity in `domain/`
2. Create Repository in `persistence/`
3. Create Business Service in `business/`
4. Create REST Controller in `presentation/`
5. Follow @RestController → Service → Repository pattern

### Error Handling
All errors are handled by `GlobalExceptionHandler` and wrapped in `ApiResponse<T>` with:
- Success flag
- Error message
- HTTP status code

---

## 🤝 Contributing

Follow the Layered Architecture pattern:
1. **Presentation**: Handle HTTP concerns only
2. **Business**: Implement business logic
3. **Persistence**: Abstract database operations
4. **Domain**: Keep entities clean of business logic

---

## 📞 Support & Documentation

- **Spring Boot**: https://spring.io/projects/spring-boot
- **Spring Data MongoDB**: https://spring.io/projects/spring-data-mongodb
- **SpringDoc OpenAPI**: https://springdoc.org/
- **MongoDB**: https://docs.mongodb.com/

---

## 📄 License

This project is part of S-Edu mobile application.

---

**Last Updated**: May 5, 2026
**Version**: 0.0.1-SNAPSHOT
