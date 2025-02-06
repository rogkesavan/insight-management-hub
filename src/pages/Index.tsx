import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Users, Smartphone, Apps, Activity, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

const fetchData = async (endpoint: string) => {
  const response = await fetch(`/api${endpoint}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
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
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Active Devices"
              value={deviceData?.active_devices || 0}
              description={deviceData?.device_usage_trends}
              icon={<Smartphone className="h-6 w-6" />}
            />
            <StatsCard
              title="Applications"
              value={appData?.total_applications || 0}
              description={`${appData?.active_applications || 0} active`}
              icon={<Apps className="h-6 w-6" />}
            />
            <StatsCard
              title="Total Payouts"
              value={`$${(payoutData?.total_payouts || 0).toLocaleString()}`}
              icon={<CreditCard className="h-6 w-6" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {/* We'll implement the activity feed in the next iteration */}
              <p className="text-muted-foreground">Loading activity...</p>
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Device Locations</h3>
            <div className="space-y-4">
              {/* We'll implement the map in the next iteration */}
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;