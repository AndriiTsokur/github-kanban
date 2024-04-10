import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepoIssues, fetchRepoStars } from '@/services';

export const fetchIssuesThunk = createAsyncThunk(
	'fetchedIssues/fetchIssuesThunk',
	async (repoAddress: string, thunkApi) => {
		try {
			const { data } = await fetchRepoIssues(repoAddress);
			return { data, repoAddress };
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	},
);

export const fetchStarsThunk = createAsyncThunk(
	'fetchedIssues/fetchStarsThunk',
	async (repoAddress: string, thunkApi) => {
		try {
			const { data } = await fetchRepoStars(repoAddress);
			return data.stargazers_count;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	},
);
