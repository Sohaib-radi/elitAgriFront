export function getErrorMessage(error: unknown): string {
  // Handle plain string errors
  if (typeof error === 'string') return error;

  // Handle native JS Error instances
  if (error instanceof Error) return error.message || 'An error occurred';

  // Handle object errors (like Axios)
  if (typeof error === 'object' && error !== null) {
    const errObj = error as any;

    // ✅ Support both full Axios error and raw data object
    const data = errObj?.response?.data || errObj;

    // Handle string data responses
    if (typeof data === 'string') return data;

    if (typeof data === 'object') {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        const knownKeys = ['non_field_errors', 'detail', 'error'];
        const key = knownKeys.find(k => k in data) || keys[0];
        const firstError = data[key];

        if (Array.isArray(firstError)) return firstError[0];
        if (typeof firstError === 'string') return firstError;
      }
    }

    // Fallback to error.message if available
    if (errObj.message && typeof errObj.message === 'string') {
      return errObj.message;
    }
  }

  return 'Unknown error occurred.';
}
