import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BarChart3, TrendingUp, MapPin, Calendar, Leaf, Activity } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

const Analytics: React.FC = () => {
  const plants = useSelector((state: RootState) => state.plants.plants);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  // Calculate analytics
  const totalPlants = plants.length;
  const plantsThisWeek = plants.filter(plant => 
    isAfter(new Date(plant.uploadedAt), subDays(new Date(), 7))
  ).length;
  
  const avgLatitude = plants.length > 0 
    ? plants.reduce((sum, plant) => sum + plant.latitude, 0) / plants.length 
    : 0;
  const avgLongitude = plants.length > 0 
    ? plants.reduce((sum, plant) => sum + plant.longitude, 0) / plants.length 
    : 0;

  // Group plants by date
  const plantsByDate = plants.reduce((acc, plant) => {
    const date = format(new Date(plant.uploadedAt), 'MMM dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentDates = Array.from({ length: 7 }, (_, i) => 
    format(subDays(new Date(), i), 'MMM dd')
  ).reverse();

  const chartData = recentDates.map(date => ({
    date,
    count: plantsByDate[date] || 0
  }));

  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <div className={`card p-6 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Leaf}
          title="Total Plants"
          value={totalPlants}
          subtitle="In your collection"
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={TrendingUp}
          title="This Week"
          value={plantsThisWeek}
          subtitle="New additions"
          color="from-blue-500 to-cyan-600"
        />
        <StatCard
          icon={MapPin}
          title="Farm Center"
          value={`${avgLatitude.toFixed(2)}, ${avgLongitude.toFixed(2)}`}
          subtitle="Average coordinates"
          color="from-purple-500 to-pink-600"
        />
        <StatCard
          icon={Activity}
          title="Growth Rate"
          value={`${((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100).toFixed(0)}%`}
          subtitle="Weekly increase"
          color="from-orange-500 to-red-600"
        />
      </div>

      {/* Visual Chart */}
      <div className={`card p-6 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">Plant Analytics Chart</h3>
        </div>
        
        <div className="h-64 w-full">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Chart background */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line 
                key={i} 
                x1="40" 
                y1={40 + i * 30} 
                x2="360" 
                y2={40 + i * 30} 
                stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                strokeWidth="1"
              />
            ))}
            
            {/* Chart bars */}
            {chartData.map((data, index) => {
              const barHeight = (data.count / Math.max(maxCount, 1)) * 120;
              const x = 60 + index * 40;
              return (
                <g key={data.date}>
                  <rect
                    x={x}
                    y={160 - barHeight}
                    width="30"
                    height={barHeight}
                    fill="url(#chartGradient)"
                    rx="4"
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  />
                  <text
                    x={x + 15}
                    y={180}
                    textAnchor="middle"
                    className={`text-xs ${isDarkMode ? 'fill-gray-300' : 'fill-gray-600'}`}
                  >
                    {data.date}
                  </text>
                  <text
                    x={x + 15}
                    y={160 - barHeight - 5}
                    textAnchor="middle"
                    className={`text-xs font-bold ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}
                  >
                    {data.count}
                  </text>
                </g>
              );
            })}
            
            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map(i => (
              <text 
                key={i}
                x="30" 
                y={165 - i * 30} 
                textAnchor="end" 
                className={`text-xs ${isDarkMode ? 'fill-gray-400' : 'fill-gray-500'}`}
              >
                {Math.round((maxCount / 4) * i)}
              </text>
            ))}
            
            {/* Chart title */}
            <text 
              x="200" 
              y="20" 
              textAnchor="middle" 
              className={`text-sm font-semibold ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}
            >
              Daily Plant Uploads
            </text>
          </svg>
        </div>
      </div>

      {/* Additional Analytics Chart */}
      <div className={`card p-6 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Plant Growth Analytics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalPlants}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Plants</div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{plantsThisWeek}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">This Week</div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all duration-1000" 
                style={{ width: `${totalPlants > 0 ? (plantsThisWeek / totalPlants) * 100 : 0}%` }} 
              />
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Growth Rate</div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 bg-purple-500 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100), 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`card p-6 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        
        <div className="space-y-4">
          {plants.slice(0, 5).map((plant, index) => (
            <div key={plant.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img 
                src={plant.imageUrl} 
                alt={plant.imageName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{plant.imageName}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                index === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                index === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
              }`}>
                {index === 0 ? 'Latest' : `${index + 1} ago`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;