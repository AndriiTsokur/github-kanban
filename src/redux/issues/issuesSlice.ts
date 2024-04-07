import { createSlice } from '@reduxjs/toolkit';
import issues from '@/services/issues.json';

const initialState = JSON.stringify(issues);

const issuesSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {},
});

export const issuesReducer = issuesSlice.reducer;
