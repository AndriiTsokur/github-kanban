import { createSlice } from '@reduxjs/toolkit';
import { DataT, issuesJSON } from '@/services';

const initialState: DataT = issuesJSON;

// const initialState: DataT = {
// 	issuesState: [
// 		{
// 			owner: '',
// 			profileURL: '',
// 			repoName: '',
// 			repoURL: '',
// 			repoStars: '',
// 			issuesList: [],
// 		},
// 	],
// };

const issuesSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {
		moveIssue(state, action) {
			state.issuesState[0].issuesList = action.payload;
		},
	},
});

export const getIssues = (state: { issues: DataT }) => state.issues.issuesState;
export const { moveIssue } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
