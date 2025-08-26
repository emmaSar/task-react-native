import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/userService';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (count: number = 10, { rejectWithValue }) => {
    try {
      const users = await userService.fetchUsers(count);
      return users;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch users',
      );
    }
  },
);
