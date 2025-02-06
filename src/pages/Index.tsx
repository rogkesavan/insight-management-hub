import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Users, Smartphone, AppWindow, Activity, CreditCard, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Globe from '@/components/Globe';

// Mock API responses
const mockData = {
  userManagement: {
    total_users: 15240,
    verified_users: 12600,
    unverified_users: 2640
  },
  deviceManagement: {
    total_devices: 22540,
    active_devices: 17850,
    inactive_devices: 4690,
    devices_per_user: 1.48,
    device_usage_trends: "+8.2% increase in active devices last month",
    device_locations: [
      {
        device_id: "D-90234",
        location: {
          city: "New York",
          state: "NY",
          country: "USA",
          latitude: 40.7128,
          longitude: -74.0060
        },
        status: "Active",
        last_active: "2025-02-06T07:45:00Z"
      },
      {
        device_id: "D-45678",
        location: {
          city: "San Francisco",
          state: "CA",
          country: "USA",
          latitude: 37.7749,
          longitude: -122.4194
        },
        status: "Inactive",
        last_active: "2025-02-05T23:30:00Z"
      }
    ]
  },
  applicationServices: {
    total_applications: 320,
    active_applications: 280,
    inactive_applications: 40,
    cluster_status: "Healthy"
  },
  userPayout: {
    total_payouts: 157600,
    pending_payouts: 12450,
    completed_payouts: 145150
  },
  recentActivity: [
    {
      id: 1,
      user: "John Doe",
      action: "Logged in",
      timestamp: "2025-02-06T08:30:00Z",
      icon: "login"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated profile",
      timestamp: "2025-02-06T09:15:00Z",
      icon: "profile"
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Added new device",
      timestamp: "2025-02-06T10:00:00Z",
      icon: "device"
    }
  ]
};

const fetchData = async (endpoint: string) => {
  // Simulate API call with mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch (endpoint) {
    case '/user-management':
      return mockData.userManagement;
    case '/device-management':
      return mockData.deviceManagement;
    case '/application-services':
      return mockData.applicationServices;
    case '/user-payout':
      return mockData.userPayout;
    case '/recent-activity':
      return mockData.recentActivity;
    default:
      throw new Error('Invalid endpoint');
  }
};

interface UserData {
  total_users: number;
  verified_users: number;
  unverified_users: number;
}

interface DeviceData {
  total_devices: number;
  active_devices: number;
  inactive_devices: number;
  devices_per_user: number;
  device_usage_trends: string;
  device_locations: Array<{
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
  }>;
}

interface AppData {
  total_applications: number;
  active_applications: number;
  inactive_applications: number;
  cluster_status: string;
}

interface PayoutData {
  total_payouts: number;
  pending_payouts: number;
  completed_payouts: number;
}

interface ActivityData {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  icon: string;
}

const Index = () => {
  const { data: userData } = useQuery<UserData>({
    queryKey: ['user-management'],
    queryFn: () => fetchData('/user-management'),
  });

  const { data: deviceData } = useQuery<DeviceData>({
    queryKey: ['device-management'],
    queryFn: () => fetchData('/device-management'),
  });

  const { data: appData } = useQuery<AppData>({
    queryKey: ['application-services'],
    queryFn: () => fetchData('/application-services'),
  });

  const { data: payoutData } = useQuery<PayoutData>({
    queryKey: ['user-payout'],
    queryFn: () => fetchData('/user-payout'),
  });

  const { data: activityData } = useQuery<ActivityData[]>({
    queryKey: ['recent-activity'],
    queryFn: () => fetchData('/recent-activity'),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value={userData?.total_users || 0}
              description={`${userData?.verified_users || 0} verified`}
              trend={{ value: 12.5, isPositive: true }}
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Active Devices"
              value={deviceData?.active_devices || 0}
              description={deviceData?.device_usage_trends || ""}
              trend={{ value: 8.2, isPositive: true }}
              icon={<Smartphone className="h-6 w-6" />}
            />
            <StatsCard
              title="Applications"
              value={appData?.total_applications || 0}
              description={`${appData?.active_applications || 0} active`}
              trend={{ value: 3.2, isPositive: true }}
              icon={<AppWindow className="h-6 w-6" />}
            />
            <StatsCard
              title="Total Payouts"
              value={`$${(payoutData?.total_payouts || 0).toLocaleString()}`}
              description={`$${(payoutData?.pending_payouts || 0).toLocaleString()} pending`}
              trend={{ value: 5.8, isPositive: true }}
              icon={<CreditCard className="h-6 w-6" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activityData ? (
                activityData.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-muted-foreground">{formatDate(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Loading activity...</p>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Device Locations</h3>
            {deviceData?.device_locations ? (
              <>
                <div className="mb-6">
                  <Globe locations={deviceData.device_locations} />
                </div>
                <div className="space-y-4">
                  {deviceData.device_locations.map((device) => (
                    <div key={device.device_id} className="flex items-center space-x-4 text-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white">
                          <span className="font-medium">{device.device_id}</span>
                        </p>
                        <p className="text-muted-foreground">
                          {device.location.city}, {device.location.state}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {formatDate(device.last_active)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        device.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Loading device locations...</p>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
