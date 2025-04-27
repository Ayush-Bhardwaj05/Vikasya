# Vikasya - Community Feedback and Emotion Detection Platform

## Overview
Vikasya is a web application designed to collect and analyze community feedback on public services. It leverages advanced AI models to detect emotions from voice and text inputs, providing actionable insights to improve public services.

## Features
- **Voice and Text Feedback**: Users can submit feedback via voice or text input.
- **Emotion Detection**: AI-powered emotion analysis for voice inputs.
- **Community Feedback Summary**: Aggregates and summarizes feedback for public services.
- **Category-Based Feedback**: Organizes feedback into categories like sanitation, road conditions, and public safety.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Components

### UI Components
- **Button**: Customizable button component.
- **Input**: Styled input fields.
- **Toast**: Notification system for user feedback.
- **Sidebar**: Collapsible sidebar for navigation.
- **Card**: Modular card components for displaying content.

### Roadmap Section
The roadmap section outlines the project's development stages, including:
1. Building Our Own Dataset
2. Data Processing & Cleaning
3. Choosing the Right Model
4. Model Training
5. Building a Modern Web App
6. User Testing & Refinement

## API Documentation

### Base URL
```
http://127.0.0.1:8000
```

### Endpoints

#### 1. Predict Emotion (Indian Accent)
- **URL**: `/predict-indian`
- **Method**: `POST`
- **Description**: Predicts emotion from audio input with an Indian accent.
- **Request**:
  - **Headers**: `Content-Type: multipart/form-data`
  - **Body**: 
    - `file`: Audio file in WAV format.
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "emotion": "happy"
    }
    ```
- **Example**:
  ```sh
  curl -X POST http://127.0.0.1:8000/predict-indian \
       -H "Content-Type: multipart/form-data" \
       -F "file=@path/to/your/audio.wav"
  ```

#### 2. Predict Emotion (Foreign Accent)
- **URL**: `/predict-emotion`
- **Method**: `POST`
- **Description**: Predicts emotion from audio input with a foreign accent.
- **Request**:
  - **Headers**: `Content-Type: multipart/form-data`
  - **Body**: 
    - `file`: Audio file in WAV format.
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "emotion": "sad"
    }
    ```
- **Example**:
  ```sh
  curl -X POST http://127.0.0.1:8000/predict-emotion \
       -H "Content-Type: multipart/form-data" \
       -F "file=@path/to/your/audio.wav"
  ```

#### 3. Predict Echo
- **URL**: `/predict-echo`
- **Method**: `POST`
- **Description**: Predicts emotion using the Echo model.
- **Request**:
  - **Headers**: `Content-Type: multipart/form-data`
  - **Body**: 
    - `file`: Audio file in WAV format.
- **Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "emotion": "neutral"
    }
    ```
- **Example**:
  ```sh
  curl -X POST http://127.0.0.1:8000/predict-echo \
       -H "Content-Type: multipart/form-data" \
       -F "file=@path/to/your/audio.wav"
  ```

## Page Routes

### Home Page
- **URL**: `/`
- **Description**: The main landing page of the application.
- **Components**:
  - Hero Section with 3D Robot
  - Roadmap Section

### About Page
- **URL**: `/about`
- **Description**: Provides information about the team and the project.
- **Components**:
  - Team Section
  - Mission Statement

### Auth Page
- **URL**: `/auth`
- **Description**: Handles user authentication (Login/Sign Up).
- **Components**:
  - Login Form
  - Sign Up Form

### Models Page
- **URL**: `/models`
- **Description**: Displays the available AI models and allows users to interact with them.
- **Components**:
  - Model Cards
  - Recording and Emotion Detection

### Feedback Page - Vikasya

This file contains the implementation of the feedback page for the Vikasya application. The page allows users to provide feedback on public services, either through voice or text input. It also displays a community feedback summary for the selected service.

---

## Features

- **Voice Input**: Users can record their feedback using their microphone.
- **Text Input**: Users can type their feedback if voice input is not supported or preferred.
- **Community Feedback Summary**: Displays aggregated feedback from other users in the same district.
- **Dynamic Service Categories**: Feedback is categorized based on the selected service.

---

## Key Components

### 1. **Voice Input**
- Uses the browser's `SpeechRecognition` API to capture and transcribe voice input.
- Handles errors gracefully and provides fallback to text input if the browser does not support speech recognition.

### 2. **Text Input**
- A styled textarea component for users to type their feedback.
- Includes character count and validation to ensure feedback is provided before submission.

### 3. **Community Feedback Summary**
- Fetches and displays a summary of feedback submitted by other users in the same district and for the same service category.
- Provides a fallback message if no feedback is available or if the fetch request fails.

---

## API Endpoints

### 1. Submit Feedback
- **URL**: `/submit_feedback/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "district_name": "Mailsandra",
    "service_type": "Public Sanitation",
    "user_feedback": "The public toilets are not clean."
  }
  ```

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Ayush-Bhardwaj05/vikasya.git
    ```
2. Navigate to the project directory:
    ```sh
    cd emotion-detection
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Alternatively, you can install dependencies from `requirements.txt`:
    ```sh
    npm install $(cat requirements.txt | xargs)
    ```

## Usage
1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## License
This project is licensed under the MIT License.
