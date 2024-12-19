module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'module:@react-native/babel-preset',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: false
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@instagram': './src',
        },
      },
    ],
  ],
};