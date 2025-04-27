# Emotion Detection Project

## Overview
This project is designed to detect emotions using advanced machine learning models. The web application is built using Next.js and FastAPI, with a focus on performance and user experience.

## Features
- **Emotion Detection**: Detects emotions from user inputs.
- **Modern Web App**: Built with Next.js, FastAPI, prop drilling, and lazy loading.
- **User-Friendly Interface**: Easy to navigate and use.

## Components
### UI Components
- **Dialog**: Includes `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, and `DialogDescription`.
- **Drawer**: Includes `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, and `DrawerDescription`.
- **Form**: Includes `FormControl`, `FormDescription`, and `FormMessage`.
- **Toast**: Includes `Toast`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`, and `ToastViewport`.

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

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/emotion-detection.git
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
