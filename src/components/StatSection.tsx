
import { useState, useEffect, useRef } from 'react';
import { useStats, Stat } from '@/lib/hooks/useStats';
import { formatNumber } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function StatSection() {
  const { stats, chartData, isLoading } = useStats();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 mb-4">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Powerful Analytics</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-time insights to drive growth</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor your performance with our advanced analytics dashboard. Make data-driven decisions quickly and effectively.
          </p>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-gray-100 dark:bg-gray-800/50 p-6 h-36 animate-pulse"></div>
            ))
          ) : (
            stats.map((stat, i) => (
              <StatCard 
                key={stat.id}
                stat={stat}
                isVisible={visible}
                delay={i * 100}
              />
            ))
          )}
        </div>
        
        {/* Chart */}
        <div className={`glass-card rounded-2xl p-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Growth Trends</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">6-month user acquisition metrics</p>
          </div>
          
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-800/50 rounded-lg animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.datasets[0].data.map((value, i) => ({ 
                  name: chartData.labels[i], 
                  users: value,
                  active: chartData.datasets[1].data[i]
                }))}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(229, 231, 235, 0.5)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="active" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorActive)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}

function StatCard({ stat, isVisible, delay }: StatCardProps) {
  return (
    <div 
      className={`glass-card rounded-xl p-6 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {stat.name}
        </div>
        
        <div className="text-3xl font-bold mb-1">
          {stat.name.includes('Rate') ? `${stat.value}%` : formatNumber(stat.value)}
        </div>
        
        <div className={`inline-flex items-center text-sm font-medium ${
          stat.changeType === 'increase' 
            ? 'text-emerald-500' 
            : stat.changeType === 'decrease' 
              ? 'text-rose-500'
              : 'text-gray-500'
        }`}>
          <span>
            {stat.changeType === 'increase' ? '↑' : stat.changeType === 'decrease' ? '↓' : '•'}
            {' '}{Math.abs(stat.change)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
}
