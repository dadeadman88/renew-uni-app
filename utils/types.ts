import { ToastProps } from "react-native-ui-lib";

export interface Others {
  loading: boolean;
  toast: ToastProps | null;
}

export interface Auth {
  user: User | null;
  isLoggedIn: boolean;
  refreshToken: string;
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  preferences: {
    id: string;
    theme: string;
    notifyAll: boolean;
    notifyNewVideo: boolean;
    notifyNewSeries: boolean;
    notifyNewSmallGroup: boolean;
    notifyAnnouncements: boolean;
    downloadOnWifiOnly: boolean;
    language: string;
  };
  profile: {
    id: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    country: string;
  };
}

// Series Type
export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  thumbnailStoragePath: string | null;
  thumbnailSignedExpiresAt: string | null;
  episodesCount: number;
  isNew: boolean;
  isFeatured: boolean;
  featuredOrder: number | null;
  category: any | null;
  slug: string | null;
  visibility: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Episode Type
export interface Episode {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  duration: number | null;
  thumbnailUrl: string | null;
  thumbnailStoragePath: string | null;
  thumbnailSignedExpiresAt: string | null;
  videoUrl: string | null;
  videoStoragePath: string | null;
  videoSignedExpiresAt: string | null;
  seriesId: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Series Detail Response Type
export interface SeriesDetail extends Series {
  episodes: Episode[];
  progress?: {
    completedEpisodesCount: number;
    totalEpisodesCount: number;
    progressPercentage: number;
    lastWatchedEpisode?: Episode;
  };
  isBookmarked?: boolean;
}

// Series Home Response Type
export interface SeriesHomeResponse {
  hero: Series[];
  explore: {
    data: Series[];
    total: number;
    page: number;
    limit: number;
  };
}

// API Error Response Type
export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}
