module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@libs': './src/libs',
          '@mocks': './src/mocks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@interfaces': './src/interfaces',
          '@util': './src/util',
          '@component': './src/component',
          '@redux': './src/redux',
          '@services': './src/services',
          '@routeName': './src/navigation/routeName',
        },
      },
    ],
  ],
};
