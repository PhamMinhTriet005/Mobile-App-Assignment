# Senior Language Learning App

A mobile application designed for seniors to learn foreign languages with vocabulary, quizzes, speaking practice, and progress tracking.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile | React Native (Expo) |
| Backend | Java Spring Boot |
| Database | MongoDB |

## Architecture

```
view → service → controller → database
```

- **Presentation Layer**: React Native screens & components
- **Business Layer**: Services/hooks with business logic
- **Persistence Layer**: REST controllers handling requests/responses
- **Database Layer**: MongoDB models & repositories

## Project Structure

```
senior-lang-app/
├── mobile/                    # React Native frontend
│   └── src/
│       ├── features/         # Feature-based modules
│       │   ├── auth/        # Login, register, guest mode
│       │   ├── vocabulary/ # Vocab display, audio, examples
│       │   ├── quiz/       # Quiz system (choice/listen/speak)
│       │   ├── speaking/   # Recording, speech-to-text
│       │   └── progress/   # Progress tracking
│       ├── core/           # Shared: API client, auth context
│       ├── components/     # Reusable UI components
│       ├── navigation/    # React Navigation
│       ├── theme/         # Colors, typography, spacing
│       └── types/         # TypeScript interfaces
│
├── backend/                # Spring Boot API
│   └── src/main/java/com/seniorlang/
│       ├── controller/   # REST APIs
│       ├── service/     # Business logic
│       ├── model/       # MongoDB documents
│       ├── repository/ # Data access
│       ├── dto/        # Request/Response objects
│       ├── config/     # Security, MongoDB config
│       ├── security/   # JWT, password encoding
│       └── exception/ # Custom exceptions
│
└── docs/                  # Documentation
```

## Features

### Security
- Authentication/Authorization with JWT
- Password hashing (BCrypt)
- Guest user support with full feature access

### Vocabulary
- Display vocabulary with definitions
- Audio pronunciation playback
- Example sentences

### Quiz System
- Multiple choice quizzes
- Listening quizzes (audio-based)
- Speaking quizzes (voice input)
- Score calculation on completion

### Speaking Practice
- Voice recording
- Speech-to-text conversion
- Pronunciation accuracy comparison

### Progress Tracking
- Track completed lessons
- Learning history (vocabulary)
- Progress analytics

## API Endpoints (Draft)

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/guest` - Guest access

### Vocabulary
- `GET /api/vocabulary` - List vocabulary
- `GET /api/vocabulary/{id}` - Get vocabulary detail
- `GET /api/vocabulary/{id}/audio` - Get audio pronunciation

### Quiz
- `GET /api/quiz` - List quizzes
- `POST /api/quiz/{id}/submit` - Submit quiz answers
- `GET /api/quiz/{id}/result` - Get quiz result

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update progress
- `GET /api/progress/history` - Learning history

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- MongoDB

### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

### Mobile Setup
```bash
cd mobile
npm install
npx expo start
```

## License

MIT