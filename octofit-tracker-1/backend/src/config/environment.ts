export const environment = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit',
    API_URL: process.env.CODESPACE_NAME 
        ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev` 
        : 'http://localhost:8000'
};