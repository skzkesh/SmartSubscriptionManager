# Smart Subscription Manager
**Project Demo Link**: [Current Project Demo](https://drive.google.com/file/d/1PJ11oVmFcd0hLwUIIRN0-vOegGCiNFXb/view?usp=sharing)
## Overview
**Smart Subscription Manager** is a mobile application developed using **React Native**, **TypeScript**, **JavaScript**, and **Node.js**. This app helps individuals to store and manage their active subscription. The app leverages **MongoDB** to store and retrieve user and subscription data. Its core purpose is to provide a centralized platform for users to keep track of all their subscriptions. Additional features are currently under development to further enhance the app’s functionality and user experience.

## Features
- **User Authentication**: Sign up and log in.
- **Manage Subscription**: Create a new subscription information and add it to the list.
- **Gather Insights**: Track total expenses
- **Manage Subscriber List**: Modify the status of current subscription (Active, Cancelled).

## Project Plan
### Current features in development
- Spending Chart
- Push Notification for renewal reminder
- Modify current subscription
- Search and filter system

## Installation
### Prerequisites
- Expo CLI
- MongoDB
- Node.js
- Expo Go
- Express
##
The project also uses the following libraries:
- `axios` - for making HTTP requests
- `@react-native-async-storage/async-storage` - for local data storage
- `expo` - for developing and testing

## 🔄 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## Frontend Setup (Expo)
1. Navigate to the this directory:

```bash
cd PostSchedule
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the Expo server:

```bash
npm start
# or
yarn start
```

## 🔧 Backend Setup (Node.js + Express + MongoDB)
Open to a new terminal and navigate to PostSchedule again

1. Install dependencies:

```bash
npm install
```

2. Create a .env file and add your environment variables:

```bash
touch .env
```

3. Add the following:

```bash
MONGO_URI=your-mongodb-connection-string
PORT=5000
```

4. Start the backend server:

```bash
node server.js
```

## 🔗 Connect Frontend to Backend
1. Update the API base URL:

Create a config.js file in the current directory and add your local IP.

```bash
const BASE_URL = 'http://YOUR_LOCAL_IP:5000'; // e.g., http://192.168.0.10:5000
export default BASE_URL;
```

## 🧪 Test the App
Open the Expo app on a physical device or emulator and ensure both devices are on the same Wi-Fi










