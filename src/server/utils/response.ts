interface ApiResponse {
  success: boolean;
  data: any;
  message: string;
  timestamp: string;
}

/**
 * Creates a standardized API response object
 * @param {boolean} success - Indicates if the operation was successful
 * @param {any} data - The data payload to be returned
 * @param {string} message - A message describing the response
 * @returns {ApiResponse} Standardized response object
 */
export const createResponse = (success: boolean, data: any = null, message: string = ""): ApiResponse => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

/**
 * Creates a success response
 * @param {any} data - The data to be returned
 * @param {string} message - Optional success message
 * @returns {ApiResponse} Success response object
 */
export const successResponse = (data: any, message: string = "Success"): ApiResponse => 
  createResponse(true, data, message);

/**
 * Creates an error response
 * @param {string} message - Error message
 * @param {any} data - Optional error details
 * @returns {ApiResponse} Error response object
 */
export const errorResponse = (message: string = "Error", data: any = null): ApiResponse => 
  createResponse(false, data, message);
