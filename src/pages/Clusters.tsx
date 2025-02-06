import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { mockData } from '@/data/mockData';

const Clusters = () => {
  const { data: clusterData } = useQuery({
    queryKey: ['application-services'],
    queryFn: () => mockData.applicationServices,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white mb-6">Clusters</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold text-white mb-4">Cluster Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Clusters</span>
                <span className="text-white font-semibold">{clusterData?.total_applications || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Clusters</span>
                <span className="text-white font-semibold">{clusterData?.active_applications || 0}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clusters;