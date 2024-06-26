export type { DataT, IssueColumnT, IssueContentT, RepoT } from './types';

import issuesJSON from './issues.json';
export { issuesJSON };

export { fetchRepoIssues, fetchRepoStars } from './api';
