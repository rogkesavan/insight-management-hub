import { UserSummary, DeviceSummary, DeviceResponse, ClusterSummary, TrackingLogs, UserPayout } from '@/types/api';

const BASE_URL = '/api';

export const fetchUserSummary = async (): Promise<UserSummary> => {
  const response = await fetch(`${BASE_URL}/user/v3/summary`);
  if (!response.ok) throw new Error('Failed to fetch user summary');
  return response.json();
};

export const fetchDeviceSummary = async (): Promise<DeviceSummary> => {
  const response = await fetch(`${BASE_URL}/device/v3/summary`);
  if (!response.ok) throw new Error('Failed to fetch device summary');
  return response.json();
};

export const fetchDeviceLocations = async (): Promise<DeviceResponse> => {
  const response = await fetch(`${BASE_URL}/device/v3/`);
  if (!response.ok) throw new Error('Failed to fetch device locations');
  return response.json();
};

export const fetchClusterSummary = async (): Promise<ClusterSummary> => {
  const response = await fetch(`${BASE_URL}/device/v3/cluster/summary`);
  if (!response.ok) throw new Error('Failed to fetch cluster summary');
  return response.json();
};

export const fetchTrackingLogs = async (): Promise<TrackingLogs> => {
  const response = await fetch(`${BASE_URL}/tracking-logs`);
  if (!response.ok) throw new Error('Failed to fetch tracking logs');
  return response.json();
};

export const fetchUserPayout = async (): Promise<UserPayout> => {
  const response = await fetch(`${BASE_URL}/user-payout`);
  if (!response.ok) throw new Error('Failed to fetch user payout');
  return response.json();
};