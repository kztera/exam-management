import to from 'await-to-js';

// Base API configuration
const API_BASE_URL = 'http://localhost:3000/api/v1';
const DEFAULT_TIMEOUT = 10000;

// Custom API Error class
export class ApiError extends Error {
  public statusCode: number;
  public response?: any;

  constructor(message: string, statusCode: number, response?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

// Helper function to create fetch options
const createFetchOptions = (method: string, data?: any): RequestInit => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  return options;
};

// Helper function to handle fetch requests
const fetchWithErrorHandling = async <T>(url: string, options: RequestInit): Promise<T> => {
  console.log(`🚀 ${options.method?.toUpperCase()} ${url}`);
  
  const [error, response] = await to(fetch(url, options));
  
  if (error) {
    console.error(`❌ Fetch Error: ${error.message}`);
    throw new ApiError(`Network error: ${error.message}`, 0);
  }

  if (!response.ok) {
    console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
    
    // Try to parse error response as JSON
    const [jsonError, errorData] = await to(response.json());
    
    if (!jsonError && errorData) {
      // If we can parse the error response, use the message from backend
      const errorMessage = errorData.message || response.statusText;
      throw new ApiError(errorMessage, response.status, errorData);
    } else {
      // Fallback to status text if JSON parsing fails
      throw new ApiError(response.statusText, response.status);
    }
  }

  console.log(`✅ ${response.status} ${url}`);
  
  const [jsonError, data] = await to(response.json());
  
  if (jsonError) {
    console.error(`❌ JSON Parse Error: ${jsonError.message}`);
    throw new ApiError(`Failed to parse response: ${jsonError.message}`, response.status);
  }

  return data;
};

// Generic API methods
export const apiService = {
  // GET request
  get: async <T>(endpoint: string): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = createFetchOptions('GET');
    return fetchWithErrorHandling<T>(url, options);
  },

  // POST request
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = createFetchOptions('POST', data);
    return fetchWithErrorHandling<T>(url, options);
  },

  // PUT request
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = createFetchOptions('PUT', data);
    return fetchWithErrorHandling<T>(url, options);
  },

  // DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = createFetchOptions('DELETE');
    return fetchWithErrorHandling<T>(url, options);
  },

  // PATCH request
  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = createFetchOptions('PATCH', data);
    return fetchWithErrorHandling<T>(url, options);
  },
};

export default apiService;
