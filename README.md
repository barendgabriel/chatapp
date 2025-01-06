Chat App (React Native)
Overview
This is a simple chat application built with React Native and Expo. The app consists of two screens:

Start Screen: Where the user enters their name and selects a background color.
Chat Screen: Displays a greeting message with the user’s name and sets the background color based on their selection.
The app is designed to help you understand React Navigation, passing data between screens, and styling in React Native.

Features
Start Screen:
A text input field for the user to enter their name.
A color picker to select the background color.
A button to navigate to the Chat screen.
Chat Screen:
Displays a greeting message with the user’s name.
Shows the user-selected background color.
Installation
Prerequisites
Before running this project, you need to have the following installed:

Node.js
Expo CLI
Steps to Set Up
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/chatapp.git
Navigate into the project directory:

bash
Copy code
cd chatapp
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
expo start
This will open Expo Developer Tools in your browser. From there, you can run the app in the iOS simulator, Android emulator, or on your physical device by scanning the QR code.

Navigation
The app uses React Navigation to navigate between the two screens:

Start Screen: The user enters their name and selects a background color.
Chat Screen: Displays a greeting with the user's name and applies the selected background color.
File Structure
bash
Copy code
chatapp/
├── assets/
│ └── chatappbackground.jpg # Background image for the app
├── src/
│ └── screens/
│ ├── Start.tsx # Start screen component
│ └── Chat.tsx # Chat screen component
├── App.tsx # Entry point of the app
└── package.json # Project dependencies
App Flow
Start Screen:
The user enters their name and selects a color.
Clicking the "Enter Chat" button navigates to the Chat screen.
Chat Screen:
Displays the user’s name in the greeting.
Background color reflects the user's choice from the Start screen.
Contribution
Feel free to fork this repository, create issues, and submit pull requests for any improvements or new features.

License
This project is open-source and available under the MIT License.
