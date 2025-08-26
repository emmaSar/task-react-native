# Task React Native App

A React Native application for managing user data with a modern, optimized architecture.

## 🚀 Features

- **User Management**: View, edit, and manage user information
- **Modern UI Components**: Reusable components with consistent design system
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Form Handling**: Advanced form management with react-hook-form
- **Navigation**: Stack-based navigation with React Navigation
- **Performance Optimized**: React.memo, useCallback, and useMemo implementations
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **TypeScript**: Full TypeScript support for better development experience

## 📱 Screens

- **UserList**: Display all users with search and filtering capabilities
- **Detail**: View detailed user information with action options
- **Edit**: Add or edit user information with form validation

## 🛠 Tech Stack

- **React Native** - Mobile app framework
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **React Hook Form** - Form management
- **React Native Vector Icons** - Icon library
- **ESLint & Prettier** - Code quality tools

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**

   **Android:**
   ```bash
   npm run android
   ```

   **iOS:**
   ```bash
   npm run ios
   ```

## 📝 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Design System

The app uses a centralized design system with:

- **Colors**: Defined in `src/config/Colors.ts`
- **Typography**: Custom Text component with predefined types
- **Components**: Reusable UI components with consistent styling
- **Icons**: Vector icons from react-native-vector-icons

### Color Palette

- `primary` - Main brand color
- `secondary` - Secondary brand color
- `gray0` - Pure white
- `gray05` - Light gray background
- `gray100` - Dark text
- `black` - Pure black
- `overlay` - Modal overlay

### Typography

- `little` - 11px, 500 weight
- `bodyS` - 12px, 500 weight
- `bodyM` - 14px, 600 weight
- `bodyMRegular` - 14px, 400 weight
- `subTitle` - 18px, 600 weight
- `title` - 22px, 600 weight

## 🔧 Development

### Code Quality

The project uses ESLint and Prettier for code quality:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **VS Code Integration**: Automatic formatting on save

### Performance Optimizations

- `React.memo` for component memoization
- `useCallback` for function memoization
- `useMemo` for expensive calculations
- Optimized re-renders with proper dependency arrays

### State Management

- **Redux Toolkit**: Centralized state management
- **Async Thunks**: For API operations
- **Optimistic Updates**: For better UX
- **Error Handling**: Comprehensive error management

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler port conflict**
   ```bash
   # Find and kill the process using port 8081
   netstat -ano | findstr :8081
   taskkill /PID <PID> /F
   ```

2. **iOS build issues**
   ```bash
   cd ios
   bundle exec pod install
   cd ..
   ```

3. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request
