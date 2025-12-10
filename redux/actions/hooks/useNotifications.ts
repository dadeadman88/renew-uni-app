import { AppDispatch } from '@/redux/store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationsActions } from '../NotificationsActions';

export const useGetNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (params?: {
      read?: 'all' | 'read' | 'unread';
      type?: 'ONBOARDING' | 'NEW_VIDEO' | 'NEW_SERIES' | 'NEW_SMALL_GROUP' | 'ANNOUNCEMENT' | 'SYSTEM';
    }) => {
      try {
        const result = await dispatch(
          NotificationsActions.getNotifications(params || { read: 'all' })
        );
        return NotificationsActions.getNotifications.fulfilled.match(result);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useMarkNotificationsRead = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (notificationIds: string[]) => {
      try {
        const result = await dispatch(NotificationsActions.markRead(notificationIds));
        return NotificationsActions.markRead.fulfilled.match(result);
      } catch (error) {
        console.error('Error marking notifications as read:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useMarkAllNotificationsRead = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(NotificationsActions.markAllRead({}));
      return NotificationsActions.markAllRead.fulfilled.match(result);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }, [dispatch]);
};

export const useRemoveNotification = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (id: string) => {
      try {
        const result = await dispatch(NotificationsActions.removeNotification(id));
        return NotificationsActions.removeNotification.fulfilled.match(result);
      } catch (error) {
        console.error('Error removing notification:', error);
        return false;
      }
    },
    [dispatch]
  );
};

