# Senior Language Learning App

A mobile application designed for seniors to learn foreign languages with vocabulary, quizzes, speaking practice, and progress tracking.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React Native (Expo) |
| Backend | Java Spring Boot |
| Database | MongoDB |

## Project Structure

```
S-Edu/
├── mobile/                    # React Native frontend (Expo)
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens
│   │   ├── services/       # API client & services
│   │   └── navigation/    # Navigation config
│   ├── package.json
│   ├── app.json
│   └── babel.config.js
│
├── backend/                  # Spring Boot API
│   ├── src/
│   │   ├── main/java/      # Java source code
│   │   └── test/java/      # Test files
│   ├── pom.xml
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── mvnw
│
└── README.md
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

## API Endpoints

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

### Frontend Setup
```bash
cd mobile
npm install
npx expo start
```

## License

MIT