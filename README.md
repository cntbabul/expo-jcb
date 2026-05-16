# Ryde - Modern Uber Clone 🚗

Ryde is a full-stack mobile application that brings the Uber experience to your fingertips. Built with a focus on performance, scalability, and premium design, it features real-time location services, secure authentication, and a sleek user interface.

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## ✨ Features

- **📍 Real-time Location**: Integrated Google Maps and Geoapify for precise location tracking and route calculation.
- **🔐 Secure Auth**: Robust authentication flow powered by **Clerk**, supporting email, password, and social logins.
- **✨ Premium UI**: Modern, glassmorphic design system built with **NativeWind** (Tailwind CSS for React Native).
- **🛤️ File-based Routing**: Seamless navigation using **Expo Router**, making the app feel like a modern web application.
- **💾 Data Persistence**: Serverless API routes connecting to **MongoDB** via **Mongoose** for user and ride data.
- **📱 Responsive Layout**: Optimized for both iOS and Android devices with fluid transitions and haptic feedback.
- **💳 Stripe Ready**: Architecture ready for Stripe payment integration for seamless transactions.

---

## 🛠 Tech Stack

- **Core**: [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (v3+)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Mapping**: [Google Maps API](https://developers.google.com/maps), [Geoapify](https://www.geoapify.com/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Payments**: [Stripe](https://stripe.com/)

---

## 📂 Project Structure

```text
src/
├── app/              # Expo Router (File-based Routing)
│   ├── (api)/        # Serverless API Routes (MongoDB integration)
│   ├── (auth)/       # Authentication Screens (Sign In/Up)
│   ├── (root)/       # Protected Application Routes
│   │   ├── (tabs)/   # Main Bottom Tab Navigation
│   │   └── _layout.tsx
│   └── _layout.tsx   # Root Layout & Provider Configuration
├── components/       # Reusable UI Components
├── constants/        # App Constants, Images, and Mock Data
├── lib/              # Core Logic (Auth, Fetch, Maps, Mongoose)
├── models/           # Mongoose Data Models
├── types/            # TypeScript Interface Definitions
assets/               # Branding, Fonts, and Static Media
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your mobile device OR an Emulator (Android/iOS)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/uber-clone.git
cd uber-clone

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and fill in your credentials:

```env
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Database (MongoDB)
DATABASE_URL=mongodb+srv://...

# Maps & Location
EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_key
EXPO_PUBLIC_PLACES_API_KEY=your_google_places_key
EXPO_PUBLIC_DIRECTIONS_API_KEY=your_google_directions_key

# Payments (Stripe)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# API Base URL
EXPO_PUBLIC_SERVER_URL=https://your-domain.com/ # or your local IP
```

### 4. Running the App

```bash
# Start the Expo development server
npx expo start
```

- Press **`a`** for Android
- Press **`i`** for iOS
- Scan the QR code with **Expo Go** on your physical device

---

## 🧹 Maintenance Scripts

| Command | Action |
| :--- | :--- |
| `npm start` | Starts the Expo dev server |
| `npm run android` | Runs the app on an Android emulator |
| `npm run ios` | Runs the app on an iOS simulator |
| `npm run lint` | Runs ESLint to check for code quality |
| `npm run reset-project` | Resets the project to a clean state |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for the Developer Community</p>

