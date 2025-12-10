import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../utils/AxiosInterceptor';
import { searchEndpoints } from '../../utils/Endpoints';

export const SearchActions = {
  getSearchHome: createAsyncThunk(
    'search/getSearchHome',
    async (params: { heroLimit: number; videosLimit: number }) => {
      const queryParams = new URLSearchParams(params as any).toString();
      const apiCall = await client.get(`${searchEndpoints.home}?${queryParams}`);
      return apiCall.data;
    }
  ),

  getSuggestions: createAsyncThunk(
    'search/getSuggestions',
    async (params: { q: string; limit: number }) => {
      const queryParams = new URLSearchParams(params as any).toString();
      const apiCall = await client.get(`${searchEndpoints.suggest}?${queryParams}`);
      return apiCall.data;
    }
  ),

  getTrending: createAsyncThunk(
    'search/getTrending',
    async (_) => {
      const apiCall = await client.get(searchEndpoints.trending);
      return apiCall.data;
    }
  ),

  search: createAsyncThunk(
    'search/search',
    async (params: {
      q: string;
      type?: 'all' | 'video' | 'series' | 'group' | 'attachment';
      page?: number;
      limit?: number;
      sort?: 'relevance' | 'newest' | 'popular';
      category?: string;
      minDuration?: number;
      maxDuration?: number;
      inSeriesId?: string;
      inGroupId?: string;
      onlyNew?: 'true' | 'false';
    }) => {
      const queryParams = new URLSearchParams(params as any).toString();
      const apiCall = await client.get(`${searchEndpoints.search}?${queryParams}`);
      return apiCall.data;
    }
  ),
};

