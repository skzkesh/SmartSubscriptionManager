# Smart Subscription Manager
**Project Demo Link**: [Current Project Demo](https://drive.google.com/file/d/1s0IO-DWOHprpDHoC4wyBtl-VLDCIBK1x/view?usp=sharing)
## Overview
**Smart Subscription Manager** is a mobile application developed using **React Native**, **TypeScript**, **JavaScript**, and **Node.js**. This app helps individuals to store and manage their active subscription. The app leverages **MongoDB** to store and retrieve user and subscription data. Its core purpose is to provide a centralized platform for users to keep track of all their subscriptions. Additional features are currently under development to further enhance the app’s functionality and user experience.

## Features
- **User Authentication**: Sign up and log in.
- **Mange Subscription**: Create a new subscription information and add it to the list.
- **Gather Insights**: Track total expenses
- **Manaage Subscriber List**: Add and remove subscription.

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
cd postSchedule
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
Navigate to the backend directory:

bash
Copy
Edit
cd ../backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add your environment variables:

bash
Copy
Edit
touch .env
Add the following:

ini
Copy
Edit
MONGO_URI=your-mongodb-connection-string
PORT=5000
Start the backend server:

bash
Copy
Edit
npm run dev
🔗 Connect Frontend to Backend
Update the API base URL:

Open frontend/config.js

Replace with your local IP or deployed backend URL:

js
Copy
Edit
const BASE_URL = 'http://YOUR_LOCAL_IP:5000'; // e.g., http://192.168.0.10:5000
export default BASE_URL;
🧪 Test the App
Open the Expo app on a physical device or emulator

Ensure both devices are on the same Wi-Fi

Verify functions: add subscription, view details, delete, etc.

🛠️ Troubleshooting
AsyncStorage not working: Try clearing Expo cache

bash
Copy
Edit
npx expo start -c
Backend not connecting: Ensure MongoDB is running and BASE_URL is correct

404 or 500 errors: Check API logs and backend routes









