import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BarChart3, TrendingUp, MapPin, Calendar, Leaf, Activity, Target, Zap, Award, Eye } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

const Analytics: React.FC = () => {
  const plants = useSelector((state: RootState) => state.plants.plants);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'insights'>('overview');

  // Calculate analytics
  const totalPlants = plants.length;
  const plantsThisWeek = plants.filter(plant => 
    isAfter(new Date(plant.uploadedAt), subDays(new Date(), 7))
  ).length;
  const plantsThisMonth = plants.filter(plant => 
    isAfter(new Date(plant.uploadedAt), subDays(new Date(), 30))
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

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: any) => (
    <div className={`group feature-card card p-6 hover:scale-105 transition-all duration-500 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</p>
            {trend && (
              <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                trend > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                trend < 0 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {trend > 0 ? '+' : ''}{trend}%
              </div>
            )}
          </div>
          <p className="text-3xl font-black mb-1 modern-gradient">{value}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
          : isDarkMode
            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-fade-up relative">
      {/* Attractive Transparent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-indigo-400/6 to-purple-500/8 rounded-3xl backdrop-blur-sm"></div>
      
      {/* Beautiful Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-16 left-16 w-32 h-32 rounded-full opacity-5 animate-gentle-bounce ${isDarkMode ? 'bg-gradient-to-r from-green-400 to-blue-400' : 'bg-gradient-to-r from-green-300 to-blue-300'}`}></div>
        <div className={`absolute top-32 right-32 w-24 h-24 rounded-full opacity-5 animate-gentle-bounce delay-100 ${isDarkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-300 to-pink-300'}`}></div>
        <div className={`absolute bottom-32 left-32 w-20 h-20 rounded-full opacity-5 animate-gentle-bounce delay-200 ${isDarkMode ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gradient-to-r from-orange-300 to-red-300'}`}></div>
        <div className={`absolute bottom-16 right-16 w-28 h-28 rounded-full opacity-5 animate-gentle-bounce delay-300 ${isDarkMode ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-emerald-300 to-teal-300'}`}></div>
      </div>
      
      <div className="relative z-10">
      {/* Header with Tabs */}
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold modern-gradient mb-2">📈 Farm Analytics Dashboard</h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive insights into your farming progress and patterns
          </p>
        </div>
        
        <div className="flex justify-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit mx-auto">
          <TabButton id="overview" label="📊 Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
          <TabButton id="trends" label="📈 Trends" isActive={activeTab === 'trends'} onClick={setActiveTab} />
          <TabButton id="insights" label="💡 Insights" isActive={activeTab === 'insights'} onClick={setActiveTab} />
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Leaf}
              title="Total Plants"
              value={totalPlants}
              subtitle="In your digital garden"
              color="from-green-500 to-emerald-600"
              trend={plantsThisWeek > 0 ? Math.round((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100) : 0}
            />
            <StatCard
              icon={TrendingUp}
              title="This Week"
              value={plantsThisWeek}
              subtitle="New plant additions"
              color="from-blue-500 to-cyan-600"
              trend={plantsThisWeek > 0 ? 15 : 0}
            />
            <StatCard
              icon={Target}
              title="This Month"
              value={plantsThisMonth}
              subtitle="Monthly progress"
              color="from-purple-500 to-pink-600"
              trend={plantsThisMonth > plantsThisWeek ? 8 : 0}
            />
            <StatCard
              icon={Award}
              title="Success Rate"
              value="98%"
              subtitle="Upload success rate"
              color="from-orange-500 to-red-600"
              trend={2}
            />
          </div>

          {/* Interactive Chart */}
          <div className={`feature-card card p-8 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold modern-gradient">Plant Upload Trends</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily activity over the past week</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className="text-sm font-semibold">Peak: {Math.max(...chartData.map(d => d.count))} plants</span>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <svg viewBox="0 0 500 300" className="w-full h-full">
                {/* Enhanced gradient */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <line 
                    key={i} 
                    x1="60" 
                    y1={50 + i * 35} 
                    x2="450" 
                    y2={50 + i * 35} 
                    stroke={isDarkMode ? '#374151' : '#e5e7eb'} 
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  />
                ))}
                
                {/* Chart bars with glow effect */}
                {chartData.map((data, index) => {
                  const barHeight = (data.count / Math.max(maxCount, 1)) * 150;
                  const x = 80 + index * 50;
                  return (
                    <g key={data.date}>
                      <rect
                        x={x}
                        y={220 - barHeight}
                        width="35"
                        height={barHeight}
                        fill="url(#chartGradient)"
                        rx="8"
                        filter="url(#glow)"
                        className="animate-fade-up hover:opacity-80 transition-opacity duration-300"
                        style={{ animationDelay: `${index * 150}ms` }}
                      />
                      <text
                        x={x + 17.5}
                        y={245}
                        textAnchor="middle"
                        className={`text-sm font-semibold ${isDarkMode ? 'fill-gray-300' : 'fill-gray-600'}`}
                      >
                        {data.date}
                      </text>
                      <text
                        x={x + 17.5}
                        y={220 - barHeight - 10}
                        textAnchor="middle"
                        className={`text-sm font-bold ${isDarkMode ? 'fill-white' : 'fill-gray-800'}`}
                      >
                        {data.count}
                      </text>
                    </g>
                  );
                })}
                
                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <text 
                    key={i}
                    x="45" 
                    y={225 - i * 35} 
                    textAnchor="end" 
                    className={`text-sm ${isDarkMode ? 'fill-gray-400' : 'fill-gray-500'}`}
                  >
                    {Math.round((maxCount / 5) * i)}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </>
      )}

      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Metrics */}
          <div className={`feature-card card p-8 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold">Growth Metrics</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-green-800 dark:text-green-200">Total Collection</span>
                  <span className="text-2xl font-bold text-green-600">{totalPlants}</span>
                </div>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                  <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-fade-up" style={{ width: '100%' }} />
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Weekly Growth</span>
                  <span className="text-2xl font-bold text-blue-600">{plantsThisWeek}</span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-fade-up delay-100" 
                    style={{ width: `${totalPlants > 0 ? (plantsThisWeek / totalPlants) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-purple-800 dark:text-purple-200">Growth Rate</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-fade-up delay-200" 
                    style={{ width: `${Math.min(((plantsThisWeek / Math.max(totalPlants - plantsThisWeek, 1)) * 100), 100)}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location Analytics */}
          <div className={`feature-card card p-8 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Location Analytics</h3>
            </div>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                <div className="text-3xl font-bold modern-gradient mb-2">
                  {avgLatitude.toFixed(4)}, {avgLongitude.toFixed(4)}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Farm Center Coordinates</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">{plants.length}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mapped Locations</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>GPS Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-8">
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`feature-card card p-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h3 className="font-bold text-lg">Peak Activity</h3>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your most productive day had <span className="font-bold text-green-600">{Math.max(...chartData.map(d => d.count))}</span> plant uploads!
              </p>
            </div>
            
            <div className={`feature-card card p-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold text-lg">Consistency</h3>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You've been actively mapping your farm with <span className="font-bold text-blue-600">{plantsThisWeek}</span> uploads this week.
              </p>
            </div>
            
            <div className={`feature-card card p-6 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-purple-500" />
                <h3 className="font-bold text-lg">Achievement</h3>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Congratulations! You've built a digital garden with <span className="font-bold text-purple-600">{totalPlants}</span> plants.
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`feature-card card p-8 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Recent Activity Timeline</h3>
            </div>
            
            <div className="space-y-4">
              {plants.slice(0, 5).map((plant, index) => (
                <div key={plant.id} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="relative">
                    <img 
                      src={plant.imageUrl} 
                      alt={plant.imageName}
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{plant.imageName}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        📍 {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        📅 {format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    index === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    index === 1 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    index === 2 ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                  }`}>
                    {index === 0 ? '✨ Latest' : `${index + 1} ago`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Analytics;