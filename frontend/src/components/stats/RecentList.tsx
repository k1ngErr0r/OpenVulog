import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface RecentItem { id: number; name: string; reported_at: string }

export function RecentList({ items }: { items: RecentItem[] }) {
  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Recent Vulnerabilities</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map(vuln => (
              <li key={vuln.id} className="text-sm truncate">
                <Link to={`/vulnerabilities/${vuln.id}`} className="hover:underline">
                  {vuln.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="text-center text-gray-500">No recent vulnerabilities.</p>}
      </CardContent>
    </Card>
  );
}
