import { createSlice } from '@reduxjs/toolkit';
import { SearchActions } from '../actions/SearchActions';

interface SearchState {
  searchHome: any | null;
  suggestions: any[];
  trending: any[];
  searchResults: any | null;
}

const initialState: SearchState = {
  searchHome: null,
  suggestions: [],
  trending: [],
  searchResults: null,
};

const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = null;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SearchActions.getSearchHome.fulfilled, (state, action) => {
      state.searchHome = action.payload?.data || action.payload;
    });

    builder.addCase(SearchActions.getSuggestions.fulfilled, (state, action) => {
      state.suggestions = action.payload?.data || action.payload;
    });

    builder.addCase(SearchActions.getTrending.fulfilled, (state, action) => {
      state.trending = action.payload?.data || action.payload;
    });

    builder.addCase(SearchActions.search.fulfilled, (state, action) => {
      state.searchResults = action.payload?.data || action.payload;
    });
  },
});

export const { clearSearchResults, clearSuggestions } = SearchSlice.actions;
export default SearchSlice.reducer;

