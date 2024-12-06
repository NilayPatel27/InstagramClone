module.exports = {
  preset: 'react-native',
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "react-native-fs": "<rootDir>/__mocks__/react-native-fs.js",
    'react-native-document-picker': '<rootDir>/__mocks__/react-native-document-picker.js',
    'react-native-image-crop-picker': '<rootDir>/__mocks__/react-native-image-crop-picker.js'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|@rneui|react-native-ratings|react-native-size-matters|react-native-fs|react-native-image-crop-picker|react-native-raw-bottom-sheet|react-native-keyboard-aware-scroll-view|react-native-elements)/)"
  ],
  setupFiles: ["<rootDir>/jestSetupFile.js"]
};