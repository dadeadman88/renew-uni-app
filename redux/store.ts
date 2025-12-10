import { configureStore } from '@reduxjs/toolkit';
import { setStoreReference } from '../utils/AxiosInterceptor';
import AuthReducer from './slices/AuthSlice';
import ContentReducer from './slices/ContentSlice';
import FeedReducer from './slices/FeedSlice';
import LibraryReducer from './slices/LibrarySlice';
import OtherReducer from './slices/OtherSlice';
import SearchReducer from './slices/SearchSlice';

export const store = configureStore({
    reducer: {
        other: OtherReducer,
        auth: AuthReducer,
        feed: FeedReducer,
        search: SearchReducer,
        content: ContentReducer,
        library: LibraryReducer,
    },
});

// Set store reference for AxiosInterceptor to avoid circular dependency
setStoreReference(() => store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;