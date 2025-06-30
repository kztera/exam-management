import ky from 'ky';

// Create a ky instance with default configuration
const api = ky.create({
  prefixUrl: '/api/v1',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get', 'post', 'put', 'delete'],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(`🚀 ${request.method.toUpperCase()} ${request.url}`);
      }
    ],
    afterResponse: [
      (_request, _options, response) => {
        console.log(`✅ ${response.status} ${response.url}`);
        return response;
      }
    ],
    beforeError: [
      (error) => {
        console.error(`❌ ${error.name}: ${error.message}`);
        return error;
      }
    ]
  }
});

// Generic API methods
export const apiService = {
  // GET request
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await api.get(endpoint);
    return await response.json();
  },

  // POST request
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await api.post(endpoint, {
      json: data,
    });
    return await response.json();
  },

  // PUT request
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await api.put(endpoint, {
      json: data,
    });
    return await response.json();
  },

  // DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await api.delete(endpoint);
    return await response.json();
  },

  // PATCH request
  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    const response = await api.patch(endpoint, {
      json: data,
    });
    return await response.json();
  },
};

export default apiService;
