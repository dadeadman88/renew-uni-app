import { AppDispatch, RootState } from '@/redux/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LibraryActions } from '../LibraryActions';

export const useLibraryState = () => {
  return useSelector((state: RootState) => state.library);
};

export const useLibraryHome = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(LibraryActions.getLibraryHome());
      return LibraryActions.getLibraryHome.fulfilled.match(result);
    } catch (error) {
      console.error('Error fetching library home:', error);
      return false;
    }
  }, [dispatch]);
};

export const useBookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (params?: {
      targetType?: 'VIDEO' | 'SERIES' | 'SMALL_GROUP';
      page?: number;
      limit?: number;
      q?: string;
    }) => {
      try {
        const result = await dispatch(LibraryActions.getBookmarks(params || {}));
        return LibraryActions.getBookmarks.fulfilled.match(result);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (params?: {
      completed?: string;
      inProgress?: string;
      page?: number;
      limit?: number;
      q?: string;
    }) => {
      try {
        const result = await dispatch(LibraryActions.getHistory(params || {}));
        return LibraryActions.getHistory.fulfilled.match(result);
      } catch (error) {
        console.error('Error fetching history:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useDownloads = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (params?: { page?: number; limit?: number; q?: string }) => {
      try {
        const result = await dispatch(LibraryActions.getDownloads(params || {}));
        return LibraryActions.getDownloads.fulfilled.match(result);
      } catch (error) {
        console.error('Error fetching downloads:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useToggleBookmark = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (data: { targetId: string; targetType: 'VIDEO' | 'SERIES' | 'SMALL_GROUP' }) => {
      try {
        const result = await dispatch(LibraryActions.toggleBookmark(data));
        return LibraryActions.toggleBookmark.fulfilled.match(result);
      } catch (error) {
        console.error('Error toggling bookmark:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useClearHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(LibraryActions.clearHistory());
      return LibraryActions.clearHistory.fulfilled.match(result);
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  }, [dispatch]);
};

export const useRemoveFromHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (videoId: string) => {
      try {
        const result = await dispatch(LibraryActions.removeFromHistory(videoId));
        return LibraryActions.removeFromHistory.fulfilled.match(result);
      } catch (error) {
        console.error('Error removing from history:', error);
        return false;
      }
    },
    [dispatch]
  );
};

