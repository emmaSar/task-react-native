import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './operations';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age?: number;
  picture?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location?: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        user => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { updateUser, deleteUser, clearError } = userSlice.actions;
export default userSlice.reducer;
