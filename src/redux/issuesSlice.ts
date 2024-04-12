import { createSlice } from '@reduxjs/toolkit';
import { DataT } from '@/services';

// const initialState: DataT = issuesJSON;
const initialState: DataT = {
	issuesState: [],
};

const issuesSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {
		addRepo(state, action) {
			state.issuesState.unshift(action.payload);
		},
		clearHistory(state) {
			state.issuesState.splice(1);
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
export const { addRepo, clearHistory, moveIssue, moveIssueToTop } =
	issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
