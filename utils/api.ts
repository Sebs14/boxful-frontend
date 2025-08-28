// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      error: errorData,
    });
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Helper function to make API requests
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${apiConfig.baseURL}${endpoint}`;

  console.log('🌐 API Request:', {
    url,
    method: options.method || 'GET',
    headers: options.headers,
  });

  const config: RequestInit = {
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    console.log('✅ API Response:', {
      url,
      status: response.status,
      ok: response.ok,
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('❌ API Request Failed:', {
      url,
      error: error instanceof Error ? error.message : error,
    });
    throw error;
  }
};

// Test CORS function
export const testCors = async (): Promise<any> => {
  return apiRequest('/test-cors', {
    method: 'GET',
  });
};
