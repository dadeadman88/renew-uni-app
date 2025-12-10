import { AppDispatch } from '@/redux/store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SupportActions } from '../SupportActions';

export const useGetFAQs = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
      order?: 'ASC' | 'DESC';
    }) => {
      try {
        const result = await dispatch(SupportActions.getFAQs(params || {}));
        return SupportActions.getFAQs.fulfilled.match(result);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useGetMyTickets = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(SupportActions.getMyTickets());
      return SupportActions.getMyTickets.fulfilled.match(result);
    } catch (error) {
      console.error('Error fetching my tickets:', error);
      return false;
    }
  }, [dispatch]);
};

export const useCreateTicket = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (data: {
      subject: string;
      description: string;
      category?: string;
      priority?: string;
    }) => {
      try {
        const result = await dispatch(SupportActions.createTicket(data));
        return SupportActions.createTicket.fulfilled.match(result);
      } catch (error) {
        console.error('Error creating ticket:', error);
        return false;
      }
    },
    [dispatch]
  );
};

