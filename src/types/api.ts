export interface UserSummary {
  total: number;
  verified: number;
  unverified: number;
}

export interface DeviceSummary {
  total: number;
  active: number;
  inactive: number;
  devices_per_user: number;
  usage_trends: string;
}

export interface DeviceLocation {
  device_id: string;
  location: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  status: string;
  last_active: string;
}

export interface DeviceResponse {
  device: DeviceLocation[];
}

export interface ClusterSummary {
  total: number;
  active: number;
  inactive: number;
}

export interface ActivityLog {
  user_id: number;
  activity: string;
  timestamp: string;
}

export interface DeviceTrackingData {
  device_id: string;
  location: string;
  status: string;
  last_active: string;
}

export interface TrackingLogs {
  user_activity_logs: ActivityLog[];
  device_tracking_data: DeviceTrackingData[];
}

export interface PayoutTransaction {
  user_id: number;
  amount: number;
  status: string;
  date: string;
}

export interface UserPayout {
  total_payouts: number;
  pending_payouts: number;
  completed_payouts: number;
  payout_transactions: PayoutTransaction[];
}