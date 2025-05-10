import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../api/authServices';
import { UserType, LoginPayload, RegisterPayload } from '../../type/auth';

interface AuthState {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { user: UserType; authorization: { token: string } },
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await authService.login(payload);
    return response;
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      'Login gagal. Email atau password salah.';
    return rejectWithValue(errorMsg);
  }
});

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const response = await authService.register(payload);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Registration failed'
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response.user;
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...action.payload.user,
          role_type: Number(action.payload.user.role_type),
        };
        state.token = action.payload.authorization.token;
        localStorage.setItem('token', action.payload.authorization.token);
        state.user.role_type = action.payload.user.role_type;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        const errorPayload = action.payload as { message?: string };

        if (typeof errorPayload === 'string') {
          state.error = errorPayload;
        } else if (errorPayload?.message) {
          state.error = errorPayload.message;
        } else {
          state.error = 'Login failed. Please try again.';
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
