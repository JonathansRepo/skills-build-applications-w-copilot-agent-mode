export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export const environment = {
  PORT: Number(process.env.PORT) || 8000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
  API_URL: getApiBaseUrl()
};
