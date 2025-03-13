
import React from 'react';
import { Shield, Cpu, Server, Layers, Wifi } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassContainer from '../../../ui-custom/GlassContainer';
import { SystemMetric, NetworkEvent } from '../types';
import { MetricsGrid } from '../components/MetricsGrid';
import { EventTable } from '../components/EventTable';

interface DashboardTabProps {
  networkTraffic: Array<{ time: string; value: number }>;
  cpuUsage: Array<{ time: string; value: number }>;
  events: NetworkEvent[];
  metrics: SystemMetric[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({ 
  networkTraffic,
  cpuUsage,
  events,
  metrics
}) => {
  return (
    <div className="space-y-6">
      <MetricsGrid metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Network Traffic</h3>
            <div className="text-xs text-cybershield-400">Last 24 hours</div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={networkTraffic}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#54C5EB" 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#54C5EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#54C5EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>
        
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">CPU Usage</h3>
            <div className="text-xs text-cybershield-400">Last 24 hours</div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cpuUsage}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 1 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>
      </div>
      
      <GlassContainer className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Recent Network Events</h3>
          <div className="text-xs text-cybershield-400">Last 24 hours</div>
        </div>
        <EventTable events={events.slice(0, 5)} />
      </GlassContainer>
    </div>
  );
};

export default DashboardTab;
