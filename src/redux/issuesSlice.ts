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
		addRepo(state, action) {
			// console.log('STATE: ', state.issuesState[0].owner);
			// console.log('PAYLOAD: ', action.payload);
			state.issuesState.unshift(action.payload);
		},
		moveIssue(state, action) {
			state.issuesState[0].issuesList = action.payload;
		},
		moveIssueToTop(state, action) {
			const issueToMoveIdx = action.payload;
			const issueToMove = state.issuesState.splice(issueToMoveIdx, 1)[0];
			state.issuesState.unshift(issueToMove);
		},
	},
});

export const selectIssues = (state: { issues: DataT }) =>
	state.issues.issuesState;
export const { addRepo, moveIssue, moveIssueToTop } = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
