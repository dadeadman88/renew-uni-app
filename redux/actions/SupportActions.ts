import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../utils/AxiosInterceptor';
import { infoEndpoints, supportEndpoints } from '../../utils/Endpoints';
import { convertDataToFormData } from '../../utils/constants';

export const SupportActions = {
  getFAQs: createAsyncThunk(
    'support/getFAQs',
    async (params: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      order?: 'ASC' | 'DESC';
    }) => {
      const queryParams = new URLSearchParams(params as any).toString();
      const apiCall = await client.get(`${infoEndpoints.faqs}?${queryParams}`);
      return apiCall.data;
    }
  ),

  getMyTickets: createAsyncThunk(
    'support/getMyTickets',
    async (_) => {
      const apiCall = await client.get(supportEndpoints.myTickets);
      return apiCall.data;
    }
  ),

  createTicket: createAsyncThunk(
    'support/createTicket',
    async (data: {
      subject: string;
      description: string;
      category?: string;
      priority?: string;
    }) => {
      const formData = convertDataToFormData(data);
      const apiCall = await client.post(supportEndpoints.createTicket, formData);
      return apiCall.data;
    }
  ),
};

