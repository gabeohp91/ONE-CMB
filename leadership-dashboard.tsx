import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, BarChart2, Calendar, Users, Briefcase, Target, Clock, Activity, Check, X, ChevronDown, Settings, FileText, List, Map, User, Bell, MessageSquare, Search, Menu, ChevronRight, ExternalLink, Flag, Shield, Archive } from 'lucide-react';

const LeadershipDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [branchFilter, setBranchFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState('month');
  const [showAIChat, setShowAIChat] = useState(true);
  
  // Mock data for different charts
  const financialData = [
    { month: 'T1/25', doanhThu: 42, loiNhuan: 15, chiPhi: 27, keHoach: 45 },
    { month: 'T2/25', doanhThu: 44, loiNhuan: 16, chiPhi: 28, keHoach: 45 },
    { month: 'T3/25', doanhThu: 45, loiNhuan: 16.5, chiPhi: 28.5, keHoach: 45 },
    { month: 'T4/25', doanhThu: 41, loiNhuan: 14.5, chiPhi: 26.5, keHoach: 45 },
    { month: 'T5/25', doanhThu: 43, loiNhuan: 15.5, chiPhi: 27.5, keHoach: 45 }
  ];
  
  const branchPerformance = [
    { name: 'Hà Nội', doanhThu: 150, loiNhuan: 55, hieuSuat: 92, nhanSu: 65 },
    { name: 'HCM', doanhThu: 120, loiNhuan: 45, hieuSuat: 88, nhanSu: 48 },
    { name: 'Hải Phòng', doanhThu: 80, loiNhuan: 30, hieuSuat: 85, nhanSu: 32 }
  ];
  
  const projectStatus = [
    { name: 'Đúng tiến độ', value: 68 },
    { name: 'Chậm tiến độ', value: 22 },
    { name: 'Quá hạn', value: 10 }
  ];
  
  const resourceAllocation = [
    { name: 'Thiết kế', value: 35 },
    { name: 'Khảo sát', value: 25 },
    { name: 'BIM & AI', value: 15 },
    { name: 'Tài chính', value: 10 },
    { name: 'Khác', value: 15 }
  ];
  
  const projectData = [
    { id: 1, name: 'Dự án Cảng biển Hải Phòng', branch: 'Hải Phòng', progress: 65, status: 'Đang thực hiện', risk: 'Cao', dueDate: '20/04/2025', value: 18.5 },
    { id: 2, name: 'Dự án Khu công nghiệp Long Thành', branch: 'HCM', progress: 92, status: 'Sắp hoàn thành', risk: 'Thấp', dueDate: '15/03/2025', value: 24.3 },
    { id: 3, name: 'Dự án Logistics Bắc Ninh', branch: 'Hà Nội', progress: 45, status: 'Đang thực hiện', risk: 'Trung bình', dueDate: '10/05/2025', value: 12.8 },
    { id: 4, name: 'Dự án Cảng Cát Lái mở rộng', branch: 'HCM', progress: 15, status: 'Mới bắt đầu', risk: 'Thấp', dueDate: '30/07/2025', value: 15.2 },
    { id: 5, name: 'Dự án Cầu cảng Nghi Sơn', branch: 'Hà Nội', progress: 78, status: 'Đang thực hiện', risk: 'Trung bình', dueDate: '25/03/2025', value: 9.7 }
  ];
  
  const marketTrends = [
    { name: 'T1', cangBien: 15, cauCang: 12, thuySan: 8, logistics: 10 },
    { name: 'T2', cangBien: 18, cauCang: 13, thuySan: 7, logistics: 11 },
    { name: 'T3', cangBien: 20, cauCang: 15, thuySan: 9, logistics: 13 },
    { name: 'T4', cangBien: 15, cauCang: 12, thuySan: 10, logistics: 12 },
    { name: 'T5', cangBien: 17, cauCang: 14, thuySan: 8, logistics: 14 }
  ];
  
  const riskAlerts = [
    { id: 1, level: 'Cao', desc: 'Dự án Cảng Hải Phòng chậm tiến độ 15%, ảnh hưởng tới dòng tiền Q2', date: '15/03/2025' },
    { id: 2, level: 'Cao', desc: 'Dự báo thị trường Q2 giảm 8%, cần điều chỉnh kế hoạch', date: '15/03/2025' },
    { id: 3, level: 'Cao', desc: 'Thiếu 3 kỹ sư BIM chuyên môn cao, ảnh hưởng 2 dự án lớn', date: '14/03/2025' },
    { id: 4, level: 'Trung bình', desc: 'Chi phí vật liệu vượt dự toán 8%, ảnh hưởng 3 dự án lớn', date: '14/03/2025' },
    { id: 5, level: 'Trung bình', desc: 'Dòng tiền dự kiến Q2/2025 giảm 5% so với kế hoạch', date: '13/03/2025' }
  ];
  
  const humanResourceData = [
    { branch: 'Hà Nội', department: 'Thiết kế', total: 28, active: 25, capacity: 85, turnover: 5 },
    { branch: 'Hà Nội', department: 'Tài chính', total: 12, active: 12, capacity: 90, turnover: 2 },
    { branch: 'Hà Nội', department: 'BIM & AI', total: 8, active: 7, capacity: 95, turnover: 10 },
    { branch: 'HCM', department: 'Thiết kế', total: 22, active: 20, capacity: 82, turnover: 7 },
    { branch: 'HCM', department: 'Tài chính', total: 10, active: 9, capacity: 88, turnover: 4 },
    { branch: 'Hải Phòng', department: 'Thiết kế', total: 15, active: 14, capacity: 75, turnover: 9 },
    { branch: 'Hải Phòng', department: 'Tài chính', total: 8, active: 8, capacity: 85, turnover: 3 }
  ];
  
  const resourceData = [
    { branch: 'Hà Nội', category: 'Thiết bị', total: 65, operational: 58, maintenance: 5, nonOperational: 2 },
    { branch: 'Hà Nội', category: 'Phần mềm', total: 15, operational: 15, maintenance: 0, nonOperational: 0 },
    { branch: 'HCM', category: 'Thiết bị', total: 48, operational: 42, maintenance: 4, nonOperational: 2 },
    { branch: 'HCM', category: 'Phần mềm', total: 12, operational: 11, maintenance: 1, nonOperational: 0 },
    { branch: 'Hải Phòng', category: 'Thiết bị', total: 35, operational: 30, maintenance: 3, nonOperational: 2 },
    { branch: 'Hải Phòng', category: 'Phần mềm', total: 8, operational: 8, maintenance: 0, nonOperational: 0 }
  ];
  
  const activityData = [
    { id: 1, title: 'Họp ban lãnh đạo', type: 'Nội bộ', status: 'Sắp diễn ra', date: '16/03/2025 09:00', priority: 'Cao' },
    { id: 2, title: 'Xét duyệt dự án Cảng Cái Mép', type: 'Dự án', status: 'Chờ phê duyệt', date: '17/03/2025', priority: 'Cao' },
    { id: 3, title: 'Gặp đối tác Nhật Bản', type: 'Đối ngoại', status: 'Đã lên lịch', date: '18/03/2025 14:00', priority: 'Cao' },
    { id: 4, title: 'Duyệt báo cáo tài chính Q1', type: 'Tài chính', status: 'Chờ phê duyệt', date: '20/03/2025', priority: 'Trung bình' },
    { id: 5, title: 'Họp triển khai dự án mới', type: 'Dự án', status: 'Đã lên lịch', date: '22/03/2025 10:00', priority: 'Trung bình' }
  ];
  
  const financialMetrics = [
    { metric: 'Tổng doanh thu', value: '215 tỷ', change: '+8.5%', trend: 'up' },
    { metric: 'Lợi nhuận', value: '78 tỷ', change: '+5.2%', trend: 'up' },
    { metric: 'Chi phí', value: '137 tỷ', change: '+10.3%', trend: 'up' },
    { metric: 'Tỷ suất lợi nhuận', value: '36.2%', change: '-1.8%', trend: 'down' }
  ];
  
  const taskExecutiveData = [
    { id: 1, title: 'Phê duyệt kế hoạch phát triển Q2/2025', dueDate: '18/03/2025', status: 'Đang chờ', assignedBy: 'HĐQT', priority: 'Cao' },
    { id: 2, title: 'Xét duyệt ngân sách dự án Cảng Hải Phòng', dueDate: '19/03/2025', status: 'Đang chờ', assignedBy: 'Tài chính', priority: 'Cao' },
    { id: 3, title: 'Ký hợp đồng với đối tác Nhật Bản', dueDate: '20/03/2025', status: 'Sắp tới', assignedBy: 'Đối ngoại', priority: 'Cao' },
    { id: 4, title: 'Duyệt kế hoạch nhân sự Q2/2025', dueDate: '21/03/2025', status: 'Sắp tới', assignedBy: 'Nhân sự', priority: 'Trung bình' },
    { id: 5, title: 'Rà soát báo cáo hiệu suất chi nhánh', dueDate: '22/03/2025', status: 'Sắp tới', assignedBy: 'Ban Điều hành', priority: 'Trung bình' }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const STATUS_COLORS = {
    'Đúng tiến độ': '#10b981',
    'Chậm tiến độ': '#f59e0b',
    'Quá hạn': '#ef4444'
  };
  
  // Common tabs rendering function
  const renderTabs = () => {
    return (
      <div className="flex border-b border-gray-200 mb-4">
        <button 
          className={`px-4 py-3 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Tổng quan
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'financial' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('financial')}
        >
          Quản lý tài chính
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Quản lý công việc
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'hr' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('hr')}
        >
          Quản lý nhân sự
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'resources' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('resources')}
        >
          Quản lý tài nguyên
        </button>
        <button 
          className={`px-4 py-3 ${activeTab === 'activities' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('activities')}
        >
          Quản lý hoạt động
        </button>
      </div>
    );
  };
  
  // Header filters rendering function
  const renderFilters = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">Tất cả chi nhánh</option>
              <option value="hanoi">Trụ sở Hà Nội</option>
              <option value="hcm">Chi nhánh HCM</option>
              <option value="haiphong">Chi nhánh Hải Phòng</option>
            </select>
          </div>
          <div className="relative">
            <select 
              className="bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-white border border-gray-300 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-60"
            />
            <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
          </div>
        </div>
      </div>
    );
  };
  
  // Overview tab content
  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        {/* Executive Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Tóm tắt điều hành</h2>
          <div className="flex space-x-6">
            <div className="flex-1">
              <h3 className="text-base font-medium mb-2">Tình hình tài chính</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} tỷ`, undefined]} />
                    <Legend />
                    <Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="loiNhuan" name="Lợi nhuận" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="keHoach" name="Kế hoạch" stroke="#9ca3af" strokeWidth={1} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-blue-50 p-2 rounded text-xs mt-2">
                <span className="font-semibold">INSIGHT:</span> Doanh thu tháng 3 đạt 45 tỷ, tăng 2.3% so với tháng 2, vượt mục tiêu kế hoạch. Tuy nhiên biên lợi nhuận giảm 0.5% do chi phí đầu vào tăng cao.
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium mb-2">Tình hình dự án</h3>
              <div className="flex mb-6 space-x-4">
                <div className="flex-1 flex items-center">
                  <div className="w-20 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {projectStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={Object.values(STATUS_COLORS)[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="ml-2">
                    <div className="text-xl font-bold">72</div>
                    <div className="text-sm text-gray-500">Tổng dự án</div>
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp size={14} className="mr-1" />
                      +8% so với Q4/2024
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2 text-sm">
                    {projectStatus.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: Object.values(STATUS_COLORS)[index] }}></div>
                          <span>{status.name}</span>
                        </div>
                        <div className="font-medium">{status.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3 className="text-base font-medium mb-2">Phân bổ tài nguyên</h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resourceAllocation} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={60} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Phân bổ']} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Branch Performance */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Hiệu suất chi nhánh</h2>
          <div className="grid grid-cols-3 gap-6">
            {branchPerformance.map((branch, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{branch.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${branch.hieuSuat >= 90 ? 'bg-green-100 text-green-800' : branch.hieuSuat >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {branch.hieuSuat}% hiệu suất
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Doanh thu</div>
                    <div className="text-lg font-bold">{branch.doanhThu} tỷ</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Lợi nhuận</div>
                    <div className="text-lg font-bold">{branch.loiNhuan} tỷ</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Nhân sự</div>
                    <div className="flex items-center">
                      <Users size={16} className="text-blue-500 mr-1" />
                      <span>{branch.nhanSu}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dự án</div>
                    <div className="flex items-center">
                      <Briefcase size={16} className="text-blue-500 mr-1" />
                      <span>{15 + index * 5}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Render the main component
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl text-blue-700">CMB</span>
            <span className="text-base text-gray-600">| Dashboard Lãnh Đạo</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm flex items-center">
              <Bell size={16} className="mr-2" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>
            <button 
              className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-sm flex items-center"
              onClick={() => setShowAIChat(!showAIChat)}
            >
              <MessageSquare size={16} className="mr-2" />
              Trợ lý AI
            </button>
            <span className="text-gray-700">Nguyễn Văn A | Tổng Giám đốc</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              NVA
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert Banner - Full width */}
      <div className="w-full px-6 py-2 bg-red-50 border-b border-red-200">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-1.5 rounded-full">
            <AlertTriangle className="text-red-600" size={18} />
          </div>
          <h3 className="text-sm font-medium text-red-800">Cảnh báo ưu tiên</h3>
        </div>
        <div className="mt-1 space-y-1 max-w-7xl">
          {riskAlerts.slice(0, 3).map(alert => (
            <div key={alert.id} className="flex items-center border-l-2 pl-2" 
                 style={{ borderColor: alert.level === 'Cao' ? '#ef4444' : '#f59e0b' }}>
              <span className="text-xs font-medium w-20" 
                    style={{ color: alert.level === 'Cao' ? '#ef4444' : '#f59e0b' }}>
                {alert.level}
              </span>
              <p className="text-xs text-gray-700 flex-1">{alert.desc}</p>
              <span className="text-xs text-gray-500 ml-2">{alert.date}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex p-6">
        {/* Main Dashboard Content */}
        <div className="flex-1 pr-4">
          {renderTabs()}
          {renderFilters()}
          
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              {/* Financial Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                {financialMetrics.map((metric, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">{metric.metric}</p>
                        <h3 className="text-xl font-bold mt-1">{metric.value}</h3>
                      </div>
                      <div className={`${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'} p-1.5 rounded`}>
                        {metric.trend === 'up' ? 
                          <TrendingUp className="text-green-600" size={16} /> : 
                          <TrendingDown className="text-red-600" size={16} />
                        }
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      {metric.trend === 'up' ? 
                        <TrendingUp className="text-green-500 mr-1" size={12} /> : 
                        <TrendingDown className="text-red-500 mr-1" size={12} />
                      }
                      <span className={metric.trend === 'up' ? 'text-green-500 text-xs' : 'text-red-500 text-xs'}>
                        {metric.change} so với cùng kỳ 2024
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Financial Performance */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Kết quả tài chính theo thời gian</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Theo tháng</button>
                    <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Theo quý</button>
                    <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Theo năm</button>
                  </div>
                </div>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} tỷ`, undefined]} />
                      <Legend />
                      <Area type="monotone" dataKey="doanhThu" name="Doanh thu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="loiNhuan" name="Lợi nhuận" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                      <Area type="monotone" dataKey="chiPhi" name="Chi phí" stroke="#f97316" fill="#f97316" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-blue-50 p-2 rounded text-xs mt-2">
                  <span className="font-semibold">INSIGHT:</span> Chi phí đang tăng nhanh hơn doanh thu, đặc biệt từ tháng 3/2025. Điều này chủ yếu do tăng giá vật liệu (+12%) và chi phí nhân sự (+8%). Cần xem xét chiến lược tiết kiệm chi phí trong Q2/2025.
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Executive Tasks Overview */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-medium mb-4">Nhiệm vụ lãnh đạo cần xử lý</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng nhiệm vụ</p>
                        <h3 className="text-xl font-bold mt-1">18</h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded">
                        <Briefcase className="text-blue-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Đang chờ</p>
                        <h3 className="text-xl font-bold mt-1">7</h3>
                      </div>
                      <div className="bg-yellow-100 p-1.5 rounded">
                        <Clock className="text-yellow-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Ưu tiên cao</p>
                        <h3 className="text-xl font-bold mt-1">5</h3>
                      </div>
                      <div className="bg-red-100 p-1.5 rounded">
                        <AlertTriangle className="text-red-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Hoàn thành</p>
                        <h3 className="text-xl font-bold mt-1">6</h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded">
                        <Check className="text-green-600" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhiệm vụ</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời hạn</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đơn vị yêu cầu</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ưu tiên</th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                      {taskExecutiveData.map((task, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium">{task.title}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">{task.dueDate}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              task.status === 'Đang chờ' ? 'bg-yellow-100 text-yellow-800' : 
                              task.status === 'Sắp tới' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">{task.assignedBy}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              task.priority === 'Cao' ? 'bg-red-100 text-red-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <ExternalLink size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'hr' && (
            <div className="space-y-6">
              {/* HR Overview */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-medium mb-4">Tổng quan nhân sự</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng nhân sự</p>
                        <h3 className="text-xl font-bold mt-1">145</h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded">
                        <Users className="text-blue-600" size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="text-green-500 mr-1" size={12} />
                      <span className="text-green-500 text-xs">+5 so với Q4/2024</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tỷ lệ giữ chân</p>
                        <h3 className="text-xl font-bold mt-1">93%</h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded">
                        <Users className="text-green-600" size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="text-green-500 mr-1" size={12} />
                      <span className="text-green-500 text-xs">+2% so với Q4/2024</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Công suất</p>
                        <h3 className="text-xl font-bold mt-1">85%</h3>
                      </div>
                      <div className="bg-yellow-100 p-1.5 rounded">
                        <Activity className="text-yellow-600" size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingDown className="text-red-500 mr-1" size={12} />
                      <span className="text-red-500 text-xs">-3% so với Q4/2024</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Vị trí cần tuyển</p>
                        <h3 className="text-xl font-bold mt-1">12</h3>
                      </div>
                      <div className="bg-red-100 p-1.5 rounded">
                        <User className="text-red-600" size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="text-red-500 mr-1" size={12} />
                      <span className="text-red-500 text-xs">+4 so với Q4/2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                  <div className="font-medium text-yellow-800 mb-1">Cảnh báo nhân sự</div>
                  <div className="text-gray-700">
                    <p>Thiếu hụt nghiêm trọng nhân sự BIM & AI có thể ảnh hưởng tới tiến độ của 2 dự án lớn trong Q2/2025. Cần có chiến lược tuyển dụng đặc biệt cho lĩnh vực này.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="space-y-6">
              {/* Resource Management Overview */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-medium mb-4">Tổng quan tài nguyên</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng thiết bị</p>
                        <h3 className="text-xl font-bold mt-1">148</h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded">
                        <Settings className="text-blue-600" size={16} />
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="text-xs text-gray-600">
                        <span className="text-green-600 font-medium">130</span> hoạt động tốt
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="text-red-600 font-medium">18</span> cần sửa chữa
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Phần mềm</p>
                        <h3 className="text-xl font-bold mt-1">35</h3>
                      </div>
                      <div className="bg-purple-100 p-1.5 rounded">
                        <Settings className="text-purple-600" size={16} />
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="text-xs text-gray-600">
                        <span className="text-green-600 font-medium">32</span> đang kích hoạt
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="text-yellow-600 font-medium">3</span> sắp hết hạn
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Chi phí vận hành</p>
                        <h3 className="text-xl font-bold mt-1">2.5 tỷ</h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded">
                        <DollarSign className="text-green-600" size={16} />
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <TrendingDown className="text-green-500 mr-1" size={12} />
                      <span className="text-green-500 text-xs">-5% so với Q4/2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <div className="font-medium text-blue-800 mb-1">Khuyến nghị tối ưu tài nguyên</div>
                  <div className="text-gray-700">
                    <p>Cần bổ sung thêm 5 license phần mềm BIM, nâng cấp 12 máy trạm đã sử dụng quá 3 năm và thanh lý 8 thiết bị cũ. Việc tối ưu này sẽ giúp tăng hiệu suất thiết kế lên khoảng 15% và tiết kiệm 8% chi phí năng lượng.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'activities' && (
            <div className="space-y-6">
              {/* Activities Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Quản lý hoạt động</h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Hoạt động đến</button>
                    <button className="px-3 py-1 text-sm text-gray-600 rounded-md">Hoạt động đi</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng hoạt động</p>
                        <h3 className="text-xl font-bold mt-1">15</h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded">
                        <Briefcase className="text-blue-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Chờ xử lý</p>
                        <h3 className="text-xl font-bold mt-1">8</h3>
                      </div>
                      <div className="bg-yellow-100 p-1.5 rounded">
                        <Clock className="text-yellow-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Đã xử lý</p>
                        <h3 className="text-xl font-bold mt-1">6</h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded">
                        <Check className="text-green-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Từ chối</p>
                        <h3 className="text-xl font-bold mt-1">1</h3>
                      </div>
                      <div className="bg-red-100 p-1.5 rounded">
                        <X className="text-red-600" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Incoming Activities */}
                <div className="space-y-3">
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-blue-100 p-2 rounded mr-3">
                      <FileText size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Đề xuất điều chỉnh ngân sách dự án Cảng Hải Phòng</div>
                      <div className="text-xs text-gray-500">Từ: Phòng Tài chính | 14/03/2025</div>
                    </div>
                    <div className="flex">
                      <button className="p-1 text-green-600 hover:text-green-800 mr-1">
                        <Check size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-purple-100 p-2 rounded mr-3">
                      <Users size={18} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Phê duyệt tuyển dụng 3 kỹ sư BIM</div>
                      <div className="text-xs text-gray-500">Từ: Phòng Nhân sự | 14/03/2025</div>
                    </div>
                    <div className="flex">
                      <button className="p-1 text-green-600 hover:text-green-800 mr-1">
                        <Check size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-yellow-100 p-2 rounded mr-3">
                      <Briefcase size={18} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Phê duyệt đề xuất hợp tác với đối tác Nhật Bản</div>
                      <div className="text-xs text-gray-500">Từ: Ban Đối ngoại | 15/03/2025</div>
                    </div>
                    <div className="flex">
                      <button className="p-1 text-green-600 hover:text-green-800 mr-1">
                        <Check size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-green-100 p-2 rounded mr-3">
                      <Target size={18} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Phê duyệt chỉ tiêu KPI Q2/2025</div>
                      <div className="text-xs text-gray-500">Từ: Phòng Kế hoạch | 15/03/2025</div>
                    </div>
                    <div className="flex">
                      <button className="p-1 text-green-600 hover:text-green-800 mr-1">
                        <Check size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Outgoing Activities (Hidden by default) */}
                <div className="hidden space-y-3 mt-4">
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-blue-100 p-2 rounded mr-3">
                      <FileText size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Đề xuất phương án kỹ thuật mới</div>
                      <div className="text-xs text-gray-500">Đến: Ban Giám đốc | 15/03/2025</div>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">Đã gửi</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-green-100 p-2 rounded mr-3">
                      <FileText size={18} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Yêu cầu kinh phí đào tạo</div>
                      <div className="text-xs text-gray-500">Đến: Phòng Tài chính | 10/03/2025</div>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Hoàn thành</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 border border-gray-200 rounded">
                    <div className="bg-yellow-100 p-2 rounded mr-3">
                      <Users size={18} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Đề xuất tăng biên chế</div>
                      <div className="text-xs text-gray-500">Đến: Phòng Nhân sự | 08/03/2025</div>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">Bị từ chối</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* AI Assistant Panel - Right side */}
        {showAIChat && (
          <div className="w-96 bg-white rounded-lg shadow-md p-3 border border-blue-100 h-[calc(100vh-160px)] flex flex-col">
            <div className="flex justify-between items-center mb-3 pb-2 border-b">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-blue-700">Trợ lý AI</span>
              </div>
              <button className="text-gray-400 hover:text-gray-500" onClick={() => setShowAIChat(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto mb-3 bg-gray-50 rounded-lg p-2 text-sm">
              <div className="flex mb-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2 text-xs">
                  AI
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p className="text-xs">Chào Nguyễn Văn A! Tôi là Trợ lý AI. Có 3 cảnh báo quan trọng cần xử lý và lịch họp Ban Giám đốc vào ngày mai. Bạn cần hỗ trợ gì không?</p>
                </div>
              </div>
              
              <div className="flex mb-3 justify-end">
                <div className="bg-blue-50 p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p className="text-xs">Lập kế hoạch cho cuộc họp Ban Giám đốc ngày mai</p>
                </div>
                <div className="bg-gray-300 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ml-2 text-xs">
                  NVA
                </div>
              </div>
              
              <div className="flex mb-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2 text-xs">
                  AI
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p className="text-xs"><strong>Kế hoạch họp Ban Giám đốc (16/03/2025, 9:00-11:00, Phòng họp A):</strong></p>
                  <ol className="mt-1 list-decimal pl-4 space-y-1 text-xs">
                    <li><strong>Báo cáo tình hình tài chính Q1</strong> (20 phút)
                      <ul className="list-disc ml-4 mt-1 text-xs">
                        <li>Trình bày: Trưởng phòng Tài chính</li>
                        <li>Tài liệu: Đã chuẩn bị sẵn trong thư mục "Họp BGĐ 16/03"</li>
                      </ul>
                    </li>
                    <li><strong>Tiến độ dự án trọng điểm</strong> (25 phút)
                      <ul className="list-disc ml-4 mt-1 text-xs">
                        <li>Trình bày: Giám đốc dự án Cảng Hải Phòng</li>
                        <li>Vấn đề cần quyết định: Phương án điều chỉnh tiến độ</li>
                      </ul>
                    </li>
                    <li><strong>Chiến lược nhân sự Q2/2025</strong> (20 phút)
                      <ul className="list-disc ml-4 mt-1 text-xs">
                        <li>Trình bày: Trưởng phòng Nhân sự</li>
                        <li>Vấn đề cần quyết định: Kế hoạch tuyển dụng kỹ sư BIM</li>
                      </ul>
                    </li>
                  </ol>
                  <p className="mt-1 text-xs font-medium">Lưu ý: Cần dành 15 phút thảo luận về đề xuất hợp tác với đối tác Nhật Bản. Tài liệu đã được gửi trước cho các thành viên.</p>
                </div>
              </div>
            </div>
            
            <div className="flex border-t pt-2">
              <input 
                type="text" 
                placeholder="Nhập nội dung..."
                className="flex-grow px-2 py-1 border rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-2 py-1 rounded-r-lg hover:bg-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadershipDashboard;