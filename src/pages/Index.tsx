import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Users, Smartphone, AppWindow, Activity, CreditCard, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fetchUserSummary, fetchDeviceSummary, fetchClusterSummary, fetchTrackingLogs, fetchUserPayout, fetchDeviceLocations } from '@/services/api';

const Index = () => {
  const { data: userSummary } = useQuery({
    queryKey: ['user-summary'],
    queryFn: fetchUserSummary
  });

  const { data: deviceSummary } = useQuery({
    queryKey: ['device-summary'],
    queryFn: fetchDeviceSummary
  });

  const { data: clusterSummary } = useQuery({
    queryKey: ['cluster-summary'],
    queryFn: fetchClusterSummary
  });

  const { data: userPayout } = useQuery({
    queryKey: ['user-payout'],
    queryFn: fetchUserPayout
  });

  const { data: trackingLogs } = useQuery({
    queryKey: ['tracking-logs'],
    queryFn: fetchTrackingLogs
  });

  const { data: deviceLocations } = useQuery({
    queryKey: ['device-locations'],
    queryFn: fetchDeviceLocations
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
              value={userSummary?.total || 0}
              description={`${userSummary?.verified || 0} verified users`}
              trend={{ value: 12.5, isPositive: true }}
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Active Devices"
              value={deviceSummary?.active || 0}
              description={deviceSummary?.usage_trends || ""}
              trend={{ value: 8.2, isPositive: true }}
              icon={<Smartphone className="h-6 w-6" />}
            />
            <StatsCard
              title="Clusters"
              value={clusterSummary?.total || 0}
              description={`${clusterSummary?.active || 0} active clusters`}
              trend={{ value: 3.2, isPositive: true }}
              icon={<AppWindow className="h-6 w-6" />}
            />
            <StatsCard
              title="Total Payouts"
              value={`$${(userPayout?.total_payouts || 0).toLocaleString()}`}
              description={`$${(userPayout?.pending_payouts || 0).toLocaleString()} pending`}
              trend={{ value: 5.8, isPositive: true }}
              icon={<CreditCard className="h-6 w-6" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {trackingLogs?.user_activity_logs?.map((activity) => (
                <div key={`${activity.user_id}-${activity.timestamp}`} className="flex items-center space-x-4 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-medium">User {activity.user_id}</span> {activity.activity}
                    </p>
                    <p className="text-muted-foreground">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Device Locations</h3>
            <div className="space-y-4">
              {deviceLocations?.device?.map((device) => (
                <div key={device.device_id} className="flex items-center space-x-4 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-medium">Device {device.device_id}</span>
                    </p>
                    <p className="text-muted-foreground">
                      {device.location.city}, {device.location.state}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last active: {formatDate(device.last_active)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    device.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {device.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;