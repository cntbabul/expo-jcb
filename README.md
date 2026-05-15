# Ryde - Uber Clone 🚗

Ryde is a full-stack mobile application built with **Expo**, **React Native**, **NativeWind (Tailwind CSS)**, and **Clerk** for authentication. It features real-time location tracking, map integration, and a sleek UI inspired by modern ride-sharing apps.

## 🚀 Features

- **Authentication**: Secure sign-up and login with Clerk.
- **Onboarding**: Smooth onboarding flow with interactive screens.
- **Map Integration**: Real-time map view with Google Maps and Geoapify.
- **Ride Booking**: Effortless ride booking process.
- **Responsive UI**: Styled with NativeWind for a consistent look across devices.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Authentication**: [Clerk](https://clerk.com/)
- **State Management**: React Hooks
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based)
- **Maps**: [Google Maps API](https://developers.google.com/maps), [Geoapify](https://www.geoapify.com/)
- **Payments**: [Stripe](https://stripe.com/)

## 📂 Project Structure

```text
src/
├── app/              # Expo Router file-based routing
│   ├── (root)/       # Main application screens
│   ├── (tabs)/       # Bottom tab navigation
│   └── _layout.tsx   # Root layout configuration
├── components/       # Reusable UI components (CustomButton, InputField, etc.)
├── constants/        # Application constants (images, icons, onboarding data)
├── lib/              # Utility functions and API wrappers (fetch, map logic)
├── types/            # TypeScript type definitions
assets/               # Fonts, icons, and static images
```

## ⚙️ Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (for testing)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd uber-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following keys:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
   EXPO_PUBLIC_PLACES_API_KEY=
   EXPO_PUBLIC_DIRECTIONS_API_KEY=
   DATABASE_URL=
   EXPO_PUBLIC_SERVER_URL=https://uber.dev/
   EXPO_PUBLIC_GEOAPIFY_API_KEY=
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   STRIPE_SECRET_KEY=
   ```

## 🏃‍♂️ Running the App

Start the Expo development server:

```bash
npx expo start
```

Use the following options to open the app:

- **Android**: Press `a` to open in an Android emulator.
- **iOS**: Press `i` to open in an iOS simulator.
- **Expo Go**: Scan the QR code with your mobile device.

## 🏗 Build Steps

To generate a production build, you can use EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure the project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🧹 Linting

Keep the code clean:

```bash
npm run lint
```

## 📄 License

This project is licensed under the MIT License.
