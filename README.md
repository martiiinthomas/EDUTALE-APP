# Edutale

Welcome to the repository for Edutale, a React Native app built with Expo. An app I created to get familiar with mobile development as well as playing around with Open AI's new assistant API's currently in beta as of writing this.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

## Getting Started

Follow these steps to get the app running locally:

### 1. Install Dependencies

Navigate to the root directory of the project and run the following command to install the necessary npm packages:
`npm install`

### 2. Set Up Environment Variables

Go to OpenAI and create an API Key. You will need to load some credit into it as its no longer pay as you go. Create a `.env` file in the root directory of the project. You will need to add the following environment variable:
`EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here` Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 4. Start the App

You can now start the app by running: `npx expo start`

## Running on a Device

To run the app on your physical device, download the Expo Go app from the App Store (iOS) or Google Play Store (Android). Scan the QR code provided by the Expo developer tools with your device to open the app.
