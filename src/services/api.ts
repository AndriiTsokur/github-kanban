import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com/repos';

export const fetchRepoIssues = async (repoAddress: string) => {
	return await axios.get(`/${repoAddress}/issues`);
};

export const fetchRepoStars = async (repoAddress: string) => {
	return await axios.get(`/${repoAddress}`);
};
