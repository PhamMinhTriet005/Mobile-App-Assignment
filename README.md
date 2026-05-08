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
1. Configure your environment variables: Create a `.env` file in the `backend` folder with your MongoDB Atlas Cloud URI:
   ```bash
   SPRING_DATA_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/SEdu_db?appName=SeniorEducation
   ```
2. Run the server:
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

The MIT License (MIT)
Copyright © 2026 Pham Minh Triet, Nguyen Huu Thien, Tran Trong Tin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.