import { AppDispatch } from '@/redux/store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ProfileActions } from '../ProfileActions';

export const useGetProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(ProfileActions.getProfile());
      return ProfileActions.getProfile.fulfilled.match(result);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return false;
    }
  }, [dispatch]);
};

export const useUpdateProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      avatar?: any;
    }) => {
      try {
        const result = await dispatch(ProfileActions.updateProfile(data));
        return ProfileActions.updateProfile.fulfilled.match(result);
      } catch (error) {
        console.error('Error updating profile:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
      try {
        const result = await dispatch(ProfileActions.changePassword(data));
        return ProfileActions.changePassword.fulfilled.match(result);
      } catch (error) {
        console.error('Error changing password:', error);
        return false;
      }
    },
    [dispatch]
  );
};

export const useGetPreferences = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(async () => {
    try {
      const result = await dispatch(ProfileActions.getPreferences());
      return ProfileActions.getPreferences.fulfilled.match(result);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      return false;
    }
  }, [dispatch]);
};

export const useUpdatePreferences = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (data: {
      language?: string;
      theme?: string;
      autoPlay?: boolean;
      downloadQuality?: string;
    }) => {
      try {
        const result = await dispatch(ProfileActions.updatePreferences(data));
        return ProfileActions.updatePreferences.fulfilled.match(result);
      } catch (error) {
        console.error('Error updating preferences:', error);
        return false;
      }
    },
    [dispatch]
  );
};

