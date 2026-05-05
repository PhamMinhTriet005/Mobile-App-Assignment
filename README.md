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