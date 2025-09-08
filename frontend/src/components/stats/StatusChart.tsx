import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatusKey = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

const STATUS_COLORS: Record<StatusKey, string> = {
  Open: '#3b82f6',
  'In Progress': '#f97316',
  Resolved: '#22c55e',
  Closed: '#6b7280',
};

export function StatusChart({ data }: { data: { name: StatusKey; value: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerabilities by Status</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [value, 'Vulnerabilities']} />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#82ca9d'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-center text-gray-500">No vulnerability data.</p>}
      </CardContent>
    </Card>
  );
}
