'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { Calendar } from 'lucide-react';

const COLORS = ['#D4AF37', '#3A86FF', '#10B981', '#EF4444', '#A0A7B5'];

const dummyOccupancyData = [
  { month: 'Jan', rate: 65, revenue: 45000 }, { month: 'Feb', rate: 59, revenue: 42000 },
  { month: 'Mar', rate: 80, revenue: 68000 }, { month: 'Apr', rate: 81, revenue: 70000 },
  { month: 'May', rate: 86, revenue: 78000 }, { month: 'Jun', rate: 95, revenue: 95000 },
  { month: 'Jul', rate: 98, revenue: 105000 }, { month: 'Aug', rate: 92, revenue: 98000 },
  { month: 'Sep', rate: 85, revenue: 75000 }, { month: 'Oct', rate: 75, revenue: 65000 },
  { month: 'Nov', rate: 68, revenue: 52000 }, { month: 'Dec', rate: 88, revenue: 85000 },
];

export default function AdminReportsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports').then(r => r.json()).then(d => { setStats(d); setLoading(false); });
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>;

  const pieData = stats?.revenueByType?.map(r => ({ name: r.type, value: r.count })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass" style={{ padding: 12, border: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--warm-white)' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, fontSize: '0.85rem' }}>
              {entry.name}: {entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.name === 'Rate' ? `${entry.value}%` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div><h2>Reports & Analytics</h2><p className="subtitle">Hotel performance metrics</p></div>
        <div className="btn btn-ghost btn-sm" style={{ pointerEvents: 'none' }}><Calendar size={14} /> This Year</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Revenue & Occupancy Trend */}
        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ marginBottom: 24 }}>Occupancy & Revenue Trends (YTD)</h4>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyOccupancyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--cool-gray)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="var(--cool-gray)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--cool-gray)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '0.8rem', paddingTop: 10 }} />
                <Line yAxisId="left" type="monotone" dataKey="rate" name="Rate" stroke="var(--electric)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="var(--gold)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Type Distribution */}
        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ marginBottom: 24 }}>Room Inventory Distribution</h4>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.2)" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '0.8rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: 24 }}>
        <h4 style={{ marginBottom: 24 }}>Projected Revenue by Room Type</h4>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.revenueByType || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="type" stroke="var(--cool-gray)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--cool-gray)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="avgPrice" name="Avg. Daily Rate" fill="var(--gold)" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
