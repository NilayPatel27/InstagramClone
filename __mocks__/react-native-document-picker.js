jest.mock('react-native-document-picker', () => ({
    pick: jest.fn(() => Promise.resolve([{ uri: 'mocked-uri', type: 'mocked-type', name: 'mocked-name' }])),
    pickSingle: jest.fn(() => Promise.resolve({ uri: 'mocked-uri', type: 'mocked-type', name: 'mocked-name' })),
    types: {
        images: 'mocked-images',
        videos: 'mocked-videos',
        pdf: 'mocked-pdf',
    },
}));
