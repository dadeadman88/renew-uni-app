import { createSlice } from '@reduxjs/toolkit';
import { LibraryActions } from '../actions/LibraryActions';

interface LibraryState {
  libraryHome: any | null;
  bookmarks: any | null;
  history: any | null;
  downloads: any | null;
}

const initialState: LibraryState = {
  libraryHome: null,
  bookmarks: null,
  history: null,
  downloads: null,
};

const LibrarySlice = createSlice({
  name: 'Library',
  initialState,
  reducers: {
    clearLibrary: (state) => {
      state.libraryHome = null;
      state.bookmarks = null;
      state.history = null;
      state.downloads = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LibraryActions.getLibraryHome.fulfilled, (state, action) => {
      state.libraryHome = action.payload?.data || action.payload;
    });

    builder.addCase(LibraryActions.getBookmarks.fulfilled, (state, action) => {
      if (action.payload?.data?.page === 1 || action.payload?.page === 1) {
        state.bookmarks = action.payload?.data || action.payload;
      } else {
        const currentData = state.bookmarks?.data || state.bookmarks?.items || [];
        const newData = action.payload?.data?.data || action.payload?.data?.items || action.payload?.items || [];
        state.bookmarks = {
          ...(action.payload?.data || action.payload),
          data: [...currentData, ...newData],
          items: [...currentData, ...newData],
        };
      }
    });

    builder.addCase(LibraryActions.getHistory.fulfilled, (state, action) => {
      if (action.payload?.data?.page === 1 || action.payload?.page === 1) {
        state.history = action.payload?.data || action.payload;
      } else {
        const currentData = state.history?.data || state.history?.items || [];
        const newData = action.payload?.data?.data || action.payload?.data?.items || action.payload?.items || [];
        state.history = {
          ...(action.payload?.data || action.payload),
          data: [...currentData, ...newData],
          items: [...currentData, ...newData],
        };
      }
    });

    builder.addCase(LibraryActions.getDownloads.fulfilled, (state, action) => {
      if (action.payload?.data?.page === 1 || action.payload?.page === 1) {
        state.downloads = action.payload?.data || action.payload;
      } else {
        const currentData = state.downloads?.data || state.downloads?.items || [];
        const newData = action.payload?.data?.data || action.payload?.data?.items || action.payload?.items || [];
        state.downloads = {
          ...(action.payload?.data || action.payload),
          data: [...currentData, ...newData],
          items: [...currentData, ...newData],
        };
      }
    });
  },
});

export const { clearLibrary } = LibrarySlice.actions;
export default LibrarySlice.reducer;

