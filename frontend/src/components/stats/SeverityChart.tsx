import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SeverityKey = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

const SEVERITY_COLORS: Record<SeverityKey, string> = {
  Critical: '#dc2626',
  High: '#f97316',
  Medium: '#facc15',
  Low: '#3b82f6',
  Informational: '#6b7280',
};

export function SeverityChart({ data }: { data: { name: SeverityKey; value: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vulnerabilities by Severity</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Vulnerabilities']} />
            </PieChart>
          </ResponsiveContainer>
        ) : <p className="text-center text-gray-500">No vulnerability data.</p>}
      </CardContent>
    </Card>
  );
}
