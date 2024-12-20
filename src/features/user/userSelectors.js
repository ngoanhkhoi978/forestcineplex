export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const selectUserId = (state) => state.user.user._id;
export const selectSubscriptionPlan = (state) => state.user.user.subscriptionPlan;
