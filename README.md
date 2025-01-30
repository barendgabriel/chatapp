# Chat App (React Native)

## Overview

This is a simple chat application built with React Native, Expo, and Firebase. The app allows users to enter their name and select a background color on the Start screen, then navigate to the Chat screen where they can send and receive real-time messages.

The app uses Firebase Authentication for anonymous sign-in and Firestore for storing and retrieving messages.

### Features:

- **Start Screen**:
  - A text input field for the user to enter their name.
  - A color picker to select the background color.
  - A button to navigate to the Chat screen.
- **Chat Screen**:
  - Displays a greeting message with the user's name.
  - Shows the user-selected background color.
  - Supports real-time messaging through Firebase Firestore.

### Firebase Integration:

- **Authentication**: The app allows users to sign in anonymously via Firebase Authentication.
- **Firestore**: Messages are stored in Firestore in real-time. The app listens for new messages and updates the chat instantly.

## Installation

### Prerequisites

Before running this project, you need to have the following installed:

- Node.js
- Expo CLI
- Firebase account and project

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chatapp.git
   ```

2. Navigate into the project directory:

   ```bash
   cd chatapp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   expo start
   ```

   This will open Expo Developer Tools in your browser. From there, you can run the app in the iOS simulator, Android emulator, or on your physical device by scanning the QR code.

### Firebase Setup

1. Create a Firebase project and enable **Firestore** and **Authentication**.
2. In your Firebase project, obtain the configuration details (API key, Auth domain, etc.).
3. Add the Firebase config to the `App.tsx` file.

### Firebase Authentication:

- The app uses **Firebase Anonymous Authentication** to sign in users. No login or signup is required, users are authenticated with a unique ID.

### Firebase Firestore:

- The app stores messages in **Firestore**, and real-time updates are fetched via the Firestore SDK.
- A `messages` collection is used to store chat messages with fields like `text`, `createdAt`, `userId`, and `userName`.

## Navigation

The app uses **React Navigation** to navigate between the two screens:

1. **Start Screen**: The user enters their name and selects a background color.
2. **Chat Screen**: Displays a greeting with the user's name and applies the selected background color. Users can send messages that are stored in Firestore and displayed in real-time.

## File Structure

```bash
chatapp/
├── assets/
│   └── chatappbackground.jpg   # Background image for the app
├── src/
│   └── screens/
│       ├── Start.tsx           # Start screen component
│       └── Chat.tsx            # Chat screen component
├── App.tsx                     # Entry point of the app
└── package.json                # Project dependencies
```

## App Flow

### Start Screen:

1. The user enters their name and selects a color.
2. Clicking the "Enter Chat" button navigates to the Chat screen.

### Chat Screen:

1. Displays the user’s name in the greeting.
2. The background color reflects the user's choice from the Start screen.
3. Users can send messages that are saved in Firebase Firestore.
4. Messages are displayed in real-time as they are fetched from Firestore.

## Contribution

Feel free to fork this repository, create issues, and submit pull requests for any improvements or new features.

## License

This project is open-source and available under the MIT License.

---

### Additional Notes:

- Ensure you have correctly set up Firebase Authentication and Firestore with the appropriate configuration.
- The real-time messaging feature uses Firebase Firestore’s `onSnapshot()` to listen for new messages and update the chat instantly.

```

### Key Changes:
1. **Firebase Setup**: Added clear instructions for setting up Firebase, including how to set up Firebase Authentication and Firestore.
2. **Real-time Messaging**: Clarified the app’s use of Firestore for real-time message fetching and storage.
3. **Anonymous Authentication**: Noted that the app uses Firebase Anonymous Authentication to authenticate users.

```
