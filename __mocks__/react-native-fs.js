export default {
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
};  