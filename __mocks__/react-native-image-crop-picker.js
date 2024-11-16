export default {
    openPicker: jest.fn(() => Promise.resolve({ path: 'mocked-path', mime: 'mocked-mime' })),
    openCamera: jest.fn(() => Promise.resolve({ path: 'mocked-path', mime: 'mocked-mime' })),
    clean: jest.fn(() => Promise.resolve()),
};
