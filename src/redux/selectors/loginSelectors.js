// Login Selectors
export const selectLoginState = (state) => state.login;

export const selectUser = (state) => state.login.user;
export const selectIsAuthenticated = (state) => state.login.isAuthenticated;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectLoginError = (state) => state.login.error;
export const selectToken = (state) => state.login.token;

// Combined selectors for common use cases
export const selectAuthStatus = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
  isLoading: state.login.isLoading,
  user: state.login.user,
  error: state.login.error
}); 