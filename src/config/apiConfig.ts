
const getApiBaseURL = () => {
  // Check if we are in production or development
  if (import.meta.env.PROD) {
    return 'https://akashkumaravel-abweb.hf.space';
  }
  // Fallback to localhost for development
  return 'http://localhost:7860';
};

export default getApiBaseURL;
