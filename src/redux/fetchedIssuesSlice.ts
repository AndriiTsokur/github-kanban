import { createSlice } from '@reduxjs/toolkit';
import { fetchIssuesThunk, fetchStarsThunk } from './operations';

const initialState = {
	issues: [],
	path: '',
	stars: '',
	isLoading: false,
	error: null,
};

const fetchedIssuesSlice = createSlice({
	name: 'fetchedIssues',
	initialState,
	reducers: {
		setToInitialState(state) {
			state.issues = [];
			state.path = '';
			state.stars = '';
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) =>
		builder
			// Fetching Issues
			.addCase(fetchIssuesThunk.pending, (state) => {
				state.issues = [];
				state.path = '';
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchIssuesThunk.fulfilled, (state, action) => {
				state.issues = action.payload.data;
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
export const { setToInitialState } = fetchedIssuesSlice.actions;
export const fetchedIssuesReducer = fetchedIssuesSlice.reducer;
