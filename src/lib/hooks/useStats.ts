
import { useQuery } from '@tanstack/react-query';
import { generateRandomData } from '../utils';

// Types for our stats
export interface Stat {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

// Mock API call to simulate data fetching
const fetchStats = async (): Promise<Stat[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock data
  return [
    {
      id: '1',
      name: 'Total Users',
      value: 28945,
      change: 12.5,
      changeType: 'increase',
    },
    {
      id: '2',
      name: 'Active Sessions',
      value: 6782,
      change: 8.2,
      changeType: 'increase',
    },
    {
      id: '3',
      name: 'Conversion Rate',
      value: 3.7,
      change: 2.1,
      changeType: 'increase',
    },
    {
      id: '4',
      name: 'Avg. Session Time',
      value: 169,
      change: -3.4,
      changeType: 'decrease',
    },
  ];
};

// Hook to fetch and manage stats data
export function useStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 60 * 1000, // 1 minute
  });

  // Chart data for visualization
  const generateChartData = () => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'User Growth',
          data: generateRandomData(6, 5000, 30000),
        },
        {
          label: 'Active Users',
          data: generateRandomData(6, 2000, 15000),
        }
      ]
    };
  };

  return { 
    stats: data || [], 
    isLoading, 
    error, 
    chartData: generateChartData() 
  };
}
