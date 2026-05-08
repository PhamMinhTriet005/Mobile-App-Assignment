# S-Edu Backend API

A Spring Boot 4.0.6 REST API backend for a language learning mobile application with MongoDB database integration, built with **Modular Monolith Architecture**.

## 📋 Overview

**S-Edu** is a mobile application backend designed for language learning. It provides a robust API for managing languages, topics, vocabulary, practice questions, AI-powered pronunciation assessment, and subscription management with multiple payment gateways. The backend follows a **Modular Monolith** architecture with clear module boundaries, making it easy to understand, maintain, and scale.

### Tech Stack
- **Java**: 21 (LTS)
- **Spring Boot**: 4.0.6
- **Spring Data MongoDB**: 5.0.5
- **MongoDB**: Latest
- **Security**: Spring Security & JWT (JJWT)
- **AI Integration**: Microsoft Azure Speech SDK & Levenshtein Distance Algorithm
- **Payment**: VietQR, PayPal, Debit Card (Abstract Factory Pattern)
- **API Documentation**: SpringDoc OpenAPI 2.8.4 (Swagger UI)
- **Validation**: Jakarta Bean Validation (Hibernate Validator)
- **Build Tool**: Maven 3
- **Containerization**: Docker & Docker Compose
- **Server**: Apache Tomcat 11

## 🏗️ Architecture

### Modular Monolith Pattern
```text
com.mobiledev.SEdu/
│
├── auth/                          ← Authentication Module
│   ├── controller/                  AuthController
│   ├── service/                     AuthService
│   ├── repository/                  UserRepository
│   ├── model/                       User, Role, AuthProvider
│   └── dto/                         LoginRequest, RegisterRequest, AuthResponse, GoogleLoginRequest
│
├── learning/                      ← Learning Content Module
│   ├── controller/                  LanguageController, TopicController, VocabularyController
│   ├── service/                     LanguageService, TopicService, VocabularyService
│   ├── repository/                  LanguageRepository, TopicRepository, VocabularyRepository
│   └── model/                       Language, Topic, Vocabulary
│
├── assessment/                    ← Quiz & Pronunciation Module
│   ├── controller/                  QuestionController, TestResultController, PronunciationController
│   ├── service/                     QuestionService, TestResultService, TextEvaluationService
│   ├── repository/                  QuestionRepository, TestResultRepository
│   ├── model/                       Question, TestResult
│   ├── dto/                         AssessmentResult, TextEvaluationRequest, TestGenerationRequest
│   └── ai/                          PronunciationAssessmentService, AzureImpl, GoogleImpl, ProviderFactory
│
├── subscription/                  ← Payment & Subscription Module
│   ├── controller/                  SubscriptionController
│   ├── service/                     SubscriptionService
│   ├── repository/                  SubscriptionRepository
│   ├── model/                       Subscription, SubscriptionPlan, PaymentMethod
│   ├── dto/                         PaymentResponse, SubscriptionPlanResponse, SubscriptionPurchaseRequest
│   └── payment/                     PaymentProcessor, VietQR, PayPal, DebitCard, PaymentProcessorFactory
│
├── shared/                        ← Cross-cutting Concerns
│   ├── config/                      MongoConfig, DataSeeder
│   ├── controller/                  HealthController
│   ├── security/                    SecurityConfig, JwtService, JwtFilter, UserDetailsImpl, CustomUserDetailsService
│   ├── exception/                   GlobalExceptionHandler, ResourceNotFoundException
│   └── dto/                         ApiResponse
│
└── SEduApplication.java           ← Application Entry Point
```

### Design Patterns Used
| Pattern | Usage |
|---|---|
| **Modular Monolith** | Codebase organized by feature modules, not technical layers |
| **Abstract Factory** | `PaymentProcessorFactory` — user selects VietQR, PayPal, or Debit Card |
| **Strategy** | `PronunciationProviderFactory` — swappable AI providers (Azure, Google) |
| **Repository** | Spring Data MongoDB repositories per module |

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
- **Backend API**: Running on port `8080`, automatically connecting to your MongoDB Atlas Cloud instance via the `.env` configuration.

#### 2. Verify Services
```bash
docker-compose ps
docker logs backend-sedu -f
```

#### 3. Stop Services
```bash
docker-compose down
```

---

### Option 2: Local Development

#### 1. Update Configuration
Ensure you have created a `.env` file in the `backend` directory:
```bash
SPRING_DATA_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/SEdu_db?appName=SeniorEducation
```

#### 2. Build and Run
```bash
mvn clean package -DskipTests
mvn spring-boot:run
```

---

## 📡 API Documentation

### Interactive Swagger UI
Once the backend is running, access the interactive OpenAPI documentation:
- **Swagger Dashboard**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Raw OpenAPI JSON**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

### Core API Endpoints

#### Authentication (`auth` module)
- `POST /api/v1/auth/login` - Local user login (Returns JWT)
- `POST /api/v1/auth/register` - Local user registration
- `POST /api/v1/auth/google` - Google OAuth token verification & login
- `POST /api/v1/auth/guest` - Generate guest session

#### AI & Pronunciation (`assessment` module)
- `POST /api/v1/ai/pronunciation/assess` - Upload audio for Azure Pronunciation Assessment
- `POST /api/v1/ai/pronunciation/evaluate-text` - Evaluate text similarity (for ML Kit STT fallback)

#### Subscriptions & Payments (`subscription` module)
- `GET /api/v1/subscriptions/plans` - Browse available plans with benefits & pricing *(Public)*
- `GET /api/v1/subscriptions/me` - Get current user's active subscription
- `POST /api/v1/subscriptions/purchase` - Purchase a subscription (user picks payment method)
- `POST /api/v1/subscriptions/cancel` - Cancel active subscription
- `GET /api/v1/subscriptions/history` - View subscription history

**Supported Payment Methods** (Abstract Factory Pattern — user's choice):
| Method | Description |
|---|---|
| `VIETQR` | Returns a VietQR image URL for bank transfer via QR scan |
| `PAYPAL` | Returns a PayPal checkout redirect URL |
| `DEBIT_CARD` | Processes card payment (mock gateway) |

**Subscription Plans:**
| Plan | Price (VND) | Key Benefits |
|---|---|---|
| `FREE` | 0 | Basic lessons, 3 topics, 5 tests/day, ads |
| `PREMIUM_MONTHLY` | 49,000 | Unlimited everything, AI feedback, offline, ad-free |
| `PREMIUM_YEARLY` | 399,000 | Everything monthly + 32% savings |

#### System (`shared` module)
- `GET /api/health` - Check backend system health and uptime

#### Languages (`learning` module)
- `GET /api/languages` - Get all languages
- `POST /api/languages` - Create language
- `GET /api/languages/{id}` - Get language by ID
- `DELETE /api/languages/{id}` - Delete language

#### Topics (`learning` module)
- `GET /api/topics` - Get all topics
- `GET /api/topics/language/{languageId}` - Get topics by language
- `POST /api/topics` - Create topic
- `GET /api/topics/{id}` - Get topic by ID
- `DELETE /api/topics/{id}` - Delete topic

#### Vocabulary (`learning` module)
- `GET /api/vocabularies` - Get all vocabularies
- `GET /api/vocabularies/topic/{topicId}` - Get vocabulary by topic
- `POST /api/vocabularies` - Create vocabulary
- `GET /api/vocabularies/{id}` - Get vocabulary by ID
- `DELETE /api/vocabularies/{id}` - Delete vocabulary

#### Questions & Tests (`assessment` module)
- `GET /api/questions` - Get all questions
- `GET /api/questions/topic/{topicId}` - Get questions by topic
- `POST /api/questions/generate-test` - Generate a random test for a topic
- `POST /api/test-results` - Submit test results

### Standard Response Format
All API responses map to an `ApiResponse<T>` wrapper for consistency:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2026-05-08T13:52:51.890Z"
}
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)
```bash
# MongoDB
SPRING_DATA_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/SEdu_db?appName=SeniorEducation

# Server
SERVER_PORT=8080

# AI Providers (Azure / Local Text Evaluation)
AI_SPEECH_PROVIDER=AZURE
AZURE_SPEECH_KEY=your_azure_subscription_key_here
AZURE_SPEECH_REGION=your_azure_region_here
```

### Application Properties (`application.yaml`)
`lazy-initialization` is set to `false` to guarantee Springdoc OpenAPI mapping compatibility.

## 🐛 Troubleshooting

### 1. Connecting to MongoDB Atlas fails
**Problem**: Connection timeouts or ECONNREFUSED when trying to connect to the cloud database.
**Solution**: Ensure your current IP address is whitelisted in your MongoDB Atlas Network Access settings, and verify your credentials in the `.env` file.

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

### Security
- All endpoints except `/api/v1/auth/**`, `/api/v1/subscriptions/plans`, `/api/health`, and Swagger UI require a valid JWT Bearer token.
- The `User.password` field is annotated with `@JsonIgnore` to prevent password hash leaks in API responses.

---

**Last Updated**: May 8, 2026
**Version**: 0.0.1-SNAPSHOT
