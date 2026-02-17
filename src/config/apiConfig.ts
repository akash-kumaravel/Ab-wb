// Environment configuration
// This will be used for API endpoints

const getApibaseURL = (): string => {
  // For development
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  // For production - use Hugging Face space URL
  // You can set REACT_APP_API_URL environment variable in Vercel
  // Example: https://username-autima-admin-api.hf.space
  return process.env.REACT_APP_API_URL || 'https://autima-admin-api.hf.space';
};

export default getApibaseURL;
