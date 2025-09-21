# Moody Player 🎵

A web application that detects user's mood through facial expressions and recommends songs based on their emotional state. The application uses face detection and expression recognition to create a personalized music experience.

## Features 🌟

- Real-time facial expression detection
- Mood-based song recommendations
- Audio player with play/pause functionality
- Support for multiple mood categories (Happy, Sad, Angry, Neutral)

## Tech Stack 🛠

### Frontend
- React.js
- Vite
- face-api.js (for facial expression detection)
- Axios (for API calls)
- Remixicon (for icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- dotenv (for environment variables)

## Installation and Setup 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup
1. Clone the repository
```bash
git clone <repository-url>
cd Moody-Player/Backend
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the Backend directory
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the server
```bash
npm start
```

The backend server will start running on http://localhost:3000

### Frontend Setup
1. Navigate to the Frontend directory
```bash
cd ../Frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The frontend application will start running on http://localhost:5173

## Project Structure 📁

```
Moody-Player/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── db/
│   │   ├── models/
│   │   ├── routes/
│   │   └── service/
│   └── server.js
└── Frontend/
    ├── public/
    │   └── models/
    └── src/
        ├── components/
        │   ├── FacialExpression.jsx
        │   └── MoodSongs.jsx
        └── App.jsx
```

## How It Works 🎯

1. The application uses your device's camera to detect facial expressions
2. Click the "Detect Mood" button to analyze your current mood
3. Based on the detected mood (Happy, Sad, Angry, or Neutral), the application fetches relevant songs from the database
4. Play/pause songs using the intuitive audio player interface

## API Endpoints 🔌

- `GET /songs?mood={mood}` - Get songs based on mood
- Additional endpoints documentation coming soon...

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 🙏

- face-api.js for facial expression detection
- All contributors who have helped with the project
