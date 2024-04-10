import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { issuesReducer } from './issuesSlice';
import { fetchedIssuesReducer } from './fetchedIssuesSlice';

const issuesPersistConfig = {
	key: 'issues',
	storage,
	whitelist: ['issuesState'],
};

export const store = configureStore({
	reducer: {
		issues: persistReducer(issuesPersistConfig, issuesReducer),
		fetchedIssues: fetchedIssuesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
