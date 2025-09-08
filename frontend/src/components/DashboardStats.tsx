import { useEffect, useState } from 'react';
import { useApiWithToasts } from '@/lib/http';
import { Spinner } from '@/components/ui/spinner';
import { lazy, Suspense } from 'react';

const SeverityChart = lazy(() => import('./stats/SeverityChart').then(m => ({ default: m.SeverityChart })));
const StatusChart = lazy(() => import('./stats/StatusChart').then(m => ({ default: m.StatusChart })));
const RecentList = lazy(() => import('./stats/RecentList').then(m => ({ default: m.RecentList })));

type SeverityKey = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
type StatusKey = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

interface StatsData {
  severities: Record<string, number>;
  statuses: Record<string, number>;
  recent: { id: number; name: string; reported_at: string }[];
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useApiWithToasts();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/vulnerabilities/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-10"><Spinner /></div>;
  }

  if (!stats) {
    return <p className="text-center text-red-500">Could not load statistics.</p>;
  }

  const severityData = Object.entries(stats.severities).map(([name, value]) => ({ name: name as SeverityKey, value }));
  const statusData = Object.entries(stats.statuses).map(([name, value]) => ({ name: name as StatusKey, value }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><Spinner /></div>}>
        <SeverityChart data={severityData as any} />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><Spinner /></div>}>
        <StatusChart data={statusData as any} />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center"><Spinner /></div>}>
        <RecentList items={stats.recent as any} />
      </Suspense>
    </div>
  );
}
