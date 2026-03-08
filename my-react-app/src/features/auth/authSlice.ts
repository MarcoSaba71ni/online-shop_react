import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



const mockLoginAPI = async ({ email, password }) => {
    console.log(`API: Attempting login for ${email}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    if (email === 'test@example.com' && password === 'password') {
        return {
            user: { id: 'u123', name: 'Test Bruker', email },
            token: 'fake-jwt-token-12345',
        };
    } else {
        console.log('API: Login failed');
        throw new Error('Ugyldig e-post eller passord');
    }
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await mockLoginAPI(credentials);
            return data;
        } catch (error) {
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