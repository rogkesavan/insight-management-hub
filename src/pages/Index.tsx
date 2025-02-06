import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsCard } from '@/components/StatsCard';
import { Users, Smartphone, AppWindow, Activity, CreditCard, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { data: userData } = useQuery({
    queryKey: ['user-management'],
    queryFn: () => mockData.userManagement,
  });

  const { data: deviceData } = useQuery({
    queryKey: ['device-management'],
    queryFn: () => mockData.deviceManagement,
  });

  const { data: appData } = useQuery({
    queryKey: ['application-services'],
    queryFn: () => mockData.applicationServices,
  });

  const { data: payoutData } = useQuery({
    queryKey: ['user-payout'],
    queryFn: () => mockData.userPayout,
  });

  const { data: activityData } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => mockData.recentActivity,
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
        {/* Stats Cards Section */}
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
              title="Clusters & Services"
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

        {/* Activity and Device Location Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
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

          {/* Device Locations Card */}
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Device Locations</h3>
            <div className="space-y-4">
              {deviceData?.device_locations ? (
                deviceData.device_locations.map((device) => (
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
                ))
              ) : (
                <p className="text-muted-foreground">Loading device locations...</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;