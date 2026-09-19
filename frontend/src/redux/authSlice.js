import { createSlice } from "@reduxjs/toolkit";

// createSlice automatically generates action creators and action types
// based on the reducers we define here
const authSlice = createSlice({
  name: "auth", // The name of this slice (used for debugging)
  initialState: {
    loading: false, // Tracks if an API request (like login/signup) is in progress
  },
  reducers: {
    // This function updates the 'loading' state.
    // action.payload will be either true or false.
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export the action so components can dispatch it
export const { setLoading } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
