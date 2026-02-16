import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


// Mock API function for login
const mockLoginAPI = async ({ email, password }) => {
    console.log(`API: Attempting login for ${email}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    if (email === 'test@example.com' && password === 'password') {
        console.log('API: Login successful');
        // Real API would return user data and a token
        return {
            user: { id: 'u123', name: 'Test Bruker', email },
            token: 'fake-jwt-token-12345',
        };
    } else {
        console.log('API: Login failed');
        throw new Error('Ugyldig e-post eller passord');
    }
};

// Async thunk for the login action
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        // credentials = { email, password }
        try {
            const data = await mockLoginAPI(credentials);
            // Returned value becomes the fulfilled action payload
            return data;
        } catch (error) {
            // Use rejectWithValue to return a specific error payload
            return rejectWithValue(error.message);
        }
    },
);


const initialState = {
    user: null,
    token: null,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = "succeeded";
            state.error = null;
        }, 
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Handle async actions like login and register here
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })  
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = "succeeded";
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

// Selector examples (often placed here or in a separate selectors file)
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.user;