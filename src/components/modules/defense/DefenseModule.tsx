import React, { useState, useEffect } from 'react';
import { Upload, Shield, AlertTriangle, Activity, Layers, Server, Cpu, Wifi, Lock, Clock, Loader } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import GlassContainer from '../../ui-custom/GlassContainer';
import { cn } from '@/lib/utils';

interface NetworkEvent {
  id: string;
  timestamp: string;
  type: 'connection' | 'authentication' | 'data' | 'error';
  source: string;
  destination: string;
  status: 'normal' | 'suspicious' | 'malicious';
  details: string;
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
}

interface AnomalyData {
  category: string;
  normal: number;
  suspicious: number;
  malicious: number;
}

const generateRandomTimeseries = (points = 24, baseline = 50, variance = 20, trend = 0) => {
  return Array.from({ length: points }, (_, i) => {
    const value = Math.max(0, Math.min(100, baseline + (Math.random() - 0.5) * variance + trend * i));
    return {
      time: `${i}:00`,
      value: Math.round(value)
    };
  });
};

const generateRandomEvents = (count = 10): NetworkEvent[] => {
  const eventTypes = ['connection', 'authentication', 'data', 'error'];
  const statuses = ['normal', 'normal', 'normal', 'normal', 'suspicious', 'suspicious', 'malicious'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)] as NetworkEvent['type'];
    const status = statuses[Math.floor(Math.random() * statuses.length)] as NetworkEvent['status'];
    const timestamp = new Date(Date.now() - Math.random() * 3600000 * 24).toISOString();
    
    return {
      id: `evt-${i}`,
      timestamp,
      type,
      source: `192.168.1.${Math.floor(Math.random() * 255)}`,
      destination: `10.0.0.${Math.floor(Math.random() * 255)}`,
      status,
      details: `${type.charAt(0).toUpperCase() + type.slice(1)} event detected`
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const anomalyData: AnomalyData[] = [
  { category: 'Login Attempts', normal: 87, suspicious: 11, malicious: 2 },
  { category: 'Network Traffic', normal: 92, suspicious: 5, malicious: 3 },
  { category: 'File Access', normal: 94, suspicious: 6, malicious: 0 },
  { category: 'System Events', normal: 89, suspicious: 8, malicious: 3 },
];

const DefenseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [networkTraffic, setNetworkTraffic] = useState(generateRandomTimeseries(24, 60, 30));
  const [cpuUsage, setCpuUsage] = useState(generateRandomTimeseries(24, 35, 15));
  const [events, setEvents] = useState<NetworkEvent[]>(generateRandomEvents(15));
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 42, max: 100, unit: '%' },
    { name: 'Memory Usage', value: 3.7, max: 8, unit: 'GB' },
    { name: 'Disk Usage', value: 186, max: 500, unit: 'GB' },
    { name: 'Network Speed', value: 28, max: 100, unit: 'Mbps' },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileUpload = () => {
    setIsLoading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsLoading(false);
      setUploadSuccess(true);
      
      // Refresh the data
      setNetworkTraffic(generateRandomTimeseries(24, 65, 35));
      setCpuUsage(generateRandomTimeseries(24, 40, 25));
      setEvents(generateRandomEvents(15));
      
      // Reset upload success message
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  const getStatusColor = (status: NetworkEvent['status']) => {
    switch (status) {
      case 'malicious':
        return 'text-cybershield-danger';
      case 'suspicious':
        return 'text-cybershield-warning';
      case 'normal':
      default:
        return 'text-cybershield-success';
    }
  };
  
  const getStatusIcon = (status: NetworkEvent['status']) => {
    switch (status) {
      case 'malicious':
        return <AlertTriangle className="w-5 h-5 text-cybershield-danger" />;
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-cybershield-warning" />;
      case 'normal':
      default:
        return <Shield className="w-5 h-5 text-cybershield-success" />;
    }
  };
  
  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassContainer 
          className={cn(
            "p-4 flex items-center",
            activeTab === 'dashboard' ? 'border-cybershield-accent/50' : ''
          )}
          onClick={() => setActiveTab('dashboard')}
          intensity="low"
        >
          <Activity className="w-5 h-5 text-cybershield-accent mr-3 shrink-0" />
          <div>
            <h3 className="font-medium">Dashboard</h3>
            <p className="text-xs text-cybershield-400">System overview</p>
          </div>
        </GlassContainer>
        
        <GlassContainer 
          className={cn(
            "p-4 flex items-center",
            activeTab === 'logs' ? 'border-cybershield-accent/50' : ''
          )}
          onClick={() => setActiveTab('logs')}
          intensity="low"
        >
          <Layers className="w-5 h-5 text-cybershield-accent mr-3 shrink-0" />
          <div>
            <h3 className="font-medium">Event Logs</h3>
            <p className="text-xs text-cybershield-400">Network activity</p>
          </div>
        </GlassContainer>
        
        <GlassContainer 
          className={cn(
            "p-4 flex items-center",
            activeTab === 'analysis' ? 'border-cybershield-accent/50' : ''
          )}
          onClick={() => setActiveTab('analysis')}
          intensity="low"
        >
          <Server className="w-5 h-5 text-cybershield-accent mr-3 shrink-0" />
          <div>
            <h3 className="font-medium">Analysis</h3>
            <p className="text-xs text-cybershield-400">Anomaly detection</p>
          </div>
        </GlassContainer>
        
        <GlassContainer 
          className={cn(
            "p-4 flex items-center",
            activeTab === 'upload' ? 'border-cybershield-accent/50' : ''
          )}
          onClick={() => setActiveTab('upload')}
          intensity="low"
        >
          <Upload className="w-5 h-5 text-cybershield-accent mr-3 shrink-0" />
          <div>
            <h3 className="font-medium">Upload Logs</h3>
            <p className="text-xs text-cybershield-400">Import log files</p>
          </div>
        </GlassContainer>
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <GlassContainer key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cybershield-400 text-sm">{metric.name}</span>
                  {index === 0 && <Cpu className="w-4 h-4 text-cybershield-accent" />}
                  {index === 1 && <Server className="w-4 h-4 text-cybershield-accent" />}
                  {index === 2 && <Layers className="w-4 h-4 text-cybershield-accent" />}
                  {index === 3 && <Wifi className="w-4 h-4 text-cybershield-accent" />}
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold">
                    {metric.value}
                    <span className="text-sm text-cybershield-400 ml-1">{metric.unit}</span>
                  </div>
                  <div className="text-sm text-cybershield-400">
                    of {metric.max} {metric.unit}
                  </div>
                </div>
                <div className="mt-2 w-full bg-cybershield-100/30 rounded-full h-2">
                  <div 
                    className="bg-cybershield-accent h-2 rounded-full" 
                    style={{ width: `${(metric.value / metric.max) * 100}%` }}
                  ></div>
                </div>
              </GlassContainer>
            ))}
          </div>
          
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Status</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Time</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Type</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Source</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Destination</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 5).map((event) => (
                    <tr key={event.id} className="border-b border-white/5">
                      <td className="py-2 px-4">
                        {getStatusIcon(event.status)}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 text-sm capitalize">{event.type}</td>
                      <td className="py-2 px-4 text-sm font-mono">{event.source}</td>
                      <td className="py-2 px-4 text-sm font-mono">{event.destination}</td>
                      <td className="py-2 px-4 text-sm text-cybershield-400">{event.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassContainer>
        </div>
      )}
      
      {activeTab === 'logs' && (
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Network Event Logs</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cybershield-success mr-1"></div>
                <span className="text-xs text-cybershield-400">Normal</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cybershield-warning mr-1"></div>
                <span className="text-xs text-cybershield-400">Suspicious</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cybershield-danger mr-1"></div>
                <span className="text-xs text-cybershield-400">Malicious</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Date</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Time</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Type</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Source</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Destination</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr 
                    key={event.id} 
                    className={cn(
                      "border-b border-white/5",
                      event.status === 'malicious' && "bg-cybershield-danger/5",
                      event.status === 'suspicious' && "bg-cybershield-warning/5"
                    )}
                  >
                    <td className="py-2 px-4">
                      {getStatusIcon(event.status)}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2 px-4 text-sm capitalize">{event.type}</td>
                    <td className="py-2 px-4 text-sm font-mono">{event.source}</td>
                    <td className="py-2 px-4 text-sm font-mono">{event.destination}</td>
                    <td className="py-2 px-4 text-sm text-cybershield-400">{event.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassContainer>
      )}
      
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassContainer className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Anomaly Detection</h3>
                <div className="text-xs text-cybershield-400">By Category</div>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={anomalyData}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      type="number"
                      tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                      tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    />
                    <YAxis 
                      dataKey="category" 
                      type="category"
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
                    <Bar dataKey="normal" name="Normal" stackId="a" fill="#10B981" />
                    <Bar dataKey="suspicious" name="Suspicious" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="malicious" name="Malicious" stackId="a" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassContainer>
            
            <GlassContainer className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Event Distribution</h3>
                <div className="text-xs text-cybershield-400">By Status</div>
              </div>
              <div className="h-60 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Normal', value: events.filter(e => e.status === 'normal').length },
                        { name: 'Suspicious', value: events.filter(e => e.status === 'suspicious').length },
                        { name: 'Malicious', value: events.filter(e => e.status === 'malicious').length }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '0.5rem'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </GlassContainer>
          </div>
          
          <GlassContainer className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Advanced Anomaly Detection</h3>
                <p className="text-sm text-cybershield-400 mb-4">
                  The system uses machine learning algorithms to establish a baseline of normal network behavior and detect deviations that may indicate security threats.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-cybershield-accent" />
                      <span className="font-medium">Behavioral Analysis</span>
                    </div>
                    <p className="mt-1 text-sm text-cybershield-400">
                      Monitors user and system behaviors to detect unusual patterns that may indicate compromise
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-cybershield-accent" />
                      <span className="font-medium">Network Flow Analysis</span>
                    </div>
                    <p className="mt-1 text-sm text-cybershield-400">
                      Analyzes network traffic patterns to identify unusual data transfers or communications
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-cybershield-accent" />
                      <span className="font-medium">Real-time Monitoring</span>
                    </div>
                    <p className="mt-1 text-sm text-cybershield-400">
                      Continuous analysis of system and network events with immediate alerts for potential threats
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium mb-3">Detection Methods</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Statistical Anomaly Detection</span>
                      <span className="text-xs text-cybershield-400">92% accuracy</span>
                    </div>
                    <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                      <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Machine Learning Models</span>
                      <span className="text-xs text-cybershield-400">88% accuracy</span>
                    </div>
                    <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                      <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Rule-based Detection</span>
                      <span className="text-xs text-cybershield-400">95% accuracy</span>
                    </div>
                    <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                      <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Behavioral Analytics</span>
                      <span className="text-xs text-cybershield-400">86% accuracy</span>
                    </div>
                    <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                      <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-cybershield-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/5 mt-4">
                  <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                  <p className="text-sm text-cybershield-400">
                    Based on current analysis, we recommend implementing additional monitoring for authentication events, as they show the highest anomaly rate in your network.
                  </p>
                </div>
              </div>
            </div>
          </GlassContainer>
        </div>
      )}
      
      {activeTab === 'upload' && (
        <GlassContainer className="p-6">
          <div className="text-center max-w-md mx-auto py-8">
            <div className="w-16 h-16 bg-cybershield-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-cybershield-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Upload Log Files</h3>
            <p className="text-cybershield-400 text-sm mb-6">
              Upload network logs (PCAP), system logs, or security event logs for analysis and anomaly detection
            </p>
            
            <div className="border-2 border-dashed border-cybershield-100 rounded-lg p-8 mb-4 text-center">
              <input type="file" className="hidden" id="log-file-input" accept=".pcap,.xml,.log,.csv,.json" />
              <label 
                htmlFor="log-file-input"
                className="cursor-pointer block"
              >
                <div className="text-sm text-cybershield-400 mb-2">
                  Drag and drop files here, or click to browse
                </div>
                <div className="text-xs text-cybershield-300">
                  Supported formats: .pcap, .xml, .log, .csv, .json
                </div>
              </label>
            </div>
            
            <button
              onClick={handleFileUpload}
              disabled={isLoading}
              className="cybershield-button w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload & Analyze
                </>
              )}
            </button>
            
            {uploadSuccess && (
              <div className="mt-4 text-cybershield-success text-sm flex items-center justify-center animate-fade-in">
                <Shield className="w-4 h-4 mr-2" />
                Log file processed successfully. View results in the Dashboard.
              </div>
            )}
            
            <div className="mt-8 text-sm text-cybershield-400">
              <h4 className="font-medium mb-2">Note:</h4>
              <p>
                In this demo version, we simulate log processing. In a production environment, 
                this module would analyze actual network and system logs to detect real anomalies.
              </p>
            </div>
          </div>
        </GlassContainer>
      )}
    </div>
  );
};

export default DefenseModule;
