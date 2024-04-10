import { createSlice } from '@reduxjs/toolkit';
import { fetchIssuesThunk, fetchStarsThunk } from './operations';

const initialState = {
	fetchedIssuesState: [],
	path: '',
	stars: '',
	isLoading: false,
	error: null,
};

const fetchedIssuesSlice = createSlice({
	name: 'fetchedIssues',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// Fetching Issues
			.addCase(fetchIssuesThunk.pending, (state) => {
				state.fetchedIssuesState = [];
				state.path = '';
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchIssuesThunk.fulfilled, (state, action) => {
				state.fetchedIssuesState = action.payload.data;
				state.path = action.payload.repoAddress;
				state.isLoading = false;
			})
			.addCase(fetchIssuesThunk.rejected, (state, action: { payload: any }) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// Fetching Stars
			.addCase(fetchStarsThunk.pending, (state) => {
				state.stars = '';
			})
			.addCase(fetchStarsThunk.fulfilled, (state, action) => {
				state.stars = action.payload;
			}),
});

export const selectFetchedIssues = (state: any) => state.fetchedIssues;
export const fetchedIssuesReducer = fetchedIssuesSlice.reducer;
