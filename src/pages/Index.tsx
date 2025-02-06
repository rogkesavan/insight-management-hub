import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Users, Smartphone, AppWindow, Activity, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    device_usage_trends: "+8.2% increase in active devices last month"
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
  }
};

const fetchData = async (endpoint: string) => {
  // Simulate API call with mock data
  await new Promise(resolve => setTimeout(resolve, 500)); // Add slight delay for realism
  
  switch (endpoint) {
    case '/user-management':
      return mockData.userManagement;
    case '/device-management':
      return mockData.deviceManagement;
    case '/application-services':
      return mockData.applicationServices;
    case '/user-payout':
      return mockData.userPayout;
    default:
      throw new Error('Invalid endpoint');
  }
};

const Index = () => {
  const { data: userData } = useQuery({
    queryKey: ['user-management'],
    queryFn: () => fetchData('/user-management'),
  });

  const { data: deviceData } = useQuery({
    queryKey: ['device-management'],
    queryFn: () => fetchData('/device-management'),
  });

  const { data: appData } = useQuery({
    queryKey: ['application-services'],
    queryFn: () => fetchData('/application-services'),
  });

  const { data: payoutData } = useQuery({
    queryKey: ['user-payout'],
    queryFn: () => fetchData('/user-payout'),
  });

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
              description={deviceData?.device_usage_trends}
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
              <p className="text-muted-foreground">Loading activity...</p>
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Device Locations</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;