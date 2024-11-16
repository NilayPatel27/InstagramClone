jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('react-native-fs', () => ({
    DocumentDirectoryPath: '/mocked/path',
    DownloadDirectoryPath: '/mocked/download/path',
    ExternalDirectoryPath: '/mocked/external/path',
    readFile: jest.fn(() => Promise.resolve('mocked file content')),
    writeFile: jest.fn(() => Promise.resolve()),
    unlink: jest.fn(() => Promise.resolve()),
    exists: jest.fn(() => Promise.resolve(true)),
    mkdir: jest.fn(() => Promise.resolve()),
    moveFile: jest.fn(() => Promise.resolve()),
    copyFile: jest.fn(() => Promise.resolve()),
    stat: jest.fn(() => Promise.resolve({ isFile: () => true })),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
    const { EventEmitter } = require('events');
    return EventEmitter;
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-document-picker', () => ({
    pick: jest.fn(() => Promise.resolve([{ uri: 'mocked-uri', type: 'mocked-type', name: 'mocked-name' }])),
    pickSingle: jest.fn(() => Promise.resolve({ uri: 'mocked-uri', type: 'mocked-type', name: 'mocked-name' })),
    types: {
        images: 'mocked-images',
        videos: 'mocked-videos',
        pdf: 'mocked-pdf',
    },
}));