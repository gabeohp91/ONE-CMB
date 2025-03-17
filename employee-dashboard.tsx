import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, User, Calendar, Clock, Briefcase, Check, X, ExternalLink, ChevronLeft, ChevronRight, Filter, Plus, ArrowRight, Mail, Phone, MapPin, FileText, Settings, HardDrive, Bell, MessageSquare, BarChart2, Target, Download, Upload, Archive, Paperclip, Users, Search, Share2, Circle, Play, Pause, FileCheck, Crown, Award, Edit } from 'lucide-react';

const EmployeeDashboard = () => {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceTab, setResourceTab] = useState('equipment');
  const [activityTab, setActivityTab] = useState('incoming');
  
  // Mock data for the employee
  const employeeInfo = {
    name: "Nguyễn Thị Minh",
    position: "Kỹ sư Thiết kế BIM",
    department: "Phòng Thiết kế",
    avatar: "NTM",
    email: "nguyenthiminh@cmb.com.vn",
    phone: "0912345678",
    manager: "Lê Minh Hiếu",
    joinDate: "01/06/2023"
  };
  
  // Performance metrics data
  const performanceData = [
    { name: 'T1', taskCompleted: 12, onTime: 11, total: 13 },
    { name: 'T2', taskCompleted: 15, onTime: 14, total: 16 },
    { name: 'T3', taskCompleted: 14, onTime: 13, total: 15 }
  ];
  
  // Current tasks
  const currentTasks = [
    { 
      id: 1, 
      name: "Thiết kế hệ thống thoát nước cảng XYZ", 
      dueDate: "20/03/2025", 
      status: "Đang thực hiện", 
      statusColor: "bg-blue-500",
      priority: "Cao",
      progress: 65,
      project: "Dự án Cảng XYZ"
    },
    { 
      id: 2, 
      name: "Phối hợp kiểm tra mô hình BIM nhà máy ABC", 
      dueDate: "18/03/2025", 
      status: "Đang thực hiện", 
      statusColor: "bg-blue-500",
      priority: "Trung bình",
      progress: 30,
      project: "Dự án Nhà máy ABC"
    },
    { 
      id: 3, 
      name: "Hoàn thiện báo cáo khảo sát địa chất", 
      dueDate: "25/03/2025", 
      status: "Chưa bắt đầu", 
      statusColor: "bg-gray-500",
      priority: "Thấp",
      progress: 0,
      project: "Dự án Cảng DEF"
    }
  ];
  
  // Task history
  const taskHistory = [
    { 
      id: 101, 
      name: "Thiết kế kết cấu bến cảng DEF", 
      completedDate: "10/03/2025", 
      status: "Hoàn thành", 
      statusColor: "bg-green-500",
      project: "Dự án Cảng DEF",
      feedback: "Tốt, đáp ứng yêu cầu"
    },
    { 
      id: 102, 
      name: "Rà soát bản vẽ kỹ thuật dự án KLM", 
      completedDate: "05/03/2025", 
      status: "Hoàn thành", 
      statusColor: "bg-green-500",
      project: "Dự án KLM",
      feedback: "Tốt, phát hiện và sửa nhiều lỗi quan trọng"
    }
  ];
  
  // Equipment data
  const equipmentData = [
    { id: 1, name: 'Máy tính xách tay Dell XPS', type: 'Máy tính', status: 'Đang sử dụng', statusColor: 'bg-green-500', assignedDate: '01/06/2023' },
    { id: 2, name: 'Máy đo laser Bosch GLM 50 C', type: 'Thiết bị đo', status: 'Đang sử dụng', statusColor: 'bg-green-500', assignedDate: '15/12/2024' }
  ];
  
  // Software data
  const softwareData = [
    { id: 1, name: 'AutoCAD 2025', vendor: 'Autodesk', status: 'Đang hoạt động', statusColor: 'bg-green-500', expiryDate: '31/12/2025' },
    { id: 2, name: 'Revit 2025', vendor: 'Autodesk', status: 'Đang hoạt động', statusColor: 'bg-green-500', expiryDate: '31/12/2025' },
    { id: 3, name: 'FlexTerm 2025', vendor: 'Bentley', status: 'Đang hoạt động', statusColor: 'bg-green-500', expiryDate: '31/12/2025' }
  ];
  
  // Schedule data
  const scheduleData = [
    { id: 1, title: 'Họp dự án Cảng XYZ', date: '16/03/2025 09:00', location: 'Phòng họp A', organizer: 'Lê Minh Hiếu', type: 'Cuộc họp' },
    { id: 2, title: 'Đào tạo sử dụng phần mềm BIM mới', date: '18/03/2025 14:00-17:00', location: 'Phòng đào tạo', organizer: 'Phòng IT', type: 'Đào tạo' },
    { id: 3, title: 'Kiểm tra hiện trường dự án Cảng DEF', date: '21/03/2025 (cả ngày)', location: 'Cảng DEF', organizer: 'Phòng Dự án', type: 'Công tác' }
  ];
  
  // Notification data
  const notificationData = [
    { id: 1, title: 'Duyệt đơn xin nghỉ phép', date: '14/03/2025', status: 'Đã duyệt', statusColor: 'bg-green-500' },
    { id: 2, title: 'Yêu cầu cấp phát văn phòng phẩm', date: '10/03/2025', status: 'Đã duyệt', statusColor: 'bg-green-500' },
    { id: 3, title: 'Đề xuất tăng ca dự án XYZ', date: '08/03/2025', status: 'Đang xử lý', statusColor: 'bg-yellow-500' }
  ];
  
  // Activity statistics
  const activityStats = {
    workingDays: 20,
    attendanceDays: 18,
    onTimePercentage: 95,
    absentDays: 2,
    overTimeDays: 3,
    totalHours: 168
  };
  
  // Skill ratings
  const skillsData = [
    { name: 'AutoCAD', level: 90 },
    { name: 'Revit', level: 85 },
    { name: 'FlexTerm', level: 75 },
    { name: 'Thiết kế BIM', level: 80 },
    { name: 'Tiếng Anh', level: 70 },
  ];
  
  // Badges and achievements
  const achievementsData = [
    { id: 1, name: 'Nhân viên xuất sắc tháng 2/2025', icon: <Award size={24} className="text-yellow-500" /> },
    { id: 2, name: 'Hoàn thành 10 dự án đúng hạn', icon: <FileCheck size={24} className="text-green-500" /> },
    { id: 3, name: 'Chuyên gia BIM', icon: <Crown size={24} className="text-blue-500" /> },
  ];
  
  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const STATUS_COLORS = {
    'Hoàn thành': '#10b981',
    'Đang thực hiện': '#3b82f6',
    'Quá hạn': '#ef4444',
    'Chưa bắt đầu': '#9ca3af'
  };
  
  // Task completion data for pie chart
  const taskStatusData = [
    { name: 'Hoàn thành', value: 14 },
    { name: 'Đang thực hiện', value: 2 },
    { name: 'Chưa bắt đầu', value: 1 }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl text-blue-700">CMB</span>
            <span className="text-base text-gray-600">| Dashboard Nhân Viên</span>
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
              onClick={() => setChatExpanded(!chatExpanded)}
            >
              <MessageSquare size={16} className="mr-2" />
              Trợ lý AI
            </button>
            <span className="text-gray-700">{employeeInfo.name}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {employeeInfo.avatar}
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert Banner - Notifications */}
      <div className="w-full px-4 py-2 bg-blue-50 border-b border-blue-200 mb-2">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-1.5 rounded-full">
            <Bell className="text-blue-600" size={16} />
          </div>
          <h3 className="text-sm font-medium text-blue-800">Thông báo mới</h3>
        </div>
        <div className="mt-1 space-y-1 max-w-7xl">
          <div className="flex items-center border-l-2 border-blue-400 pl-2">
            <span className="text-xs font-medium w-48 text-blue-700">Họp dự án Cảng XYZ</span>
            <p className="text-xs text-gray-700 flex-1">Ngày mai, 09:00 - 10:30, Phòng họp A</p>
            <span className="text-xs text-gray-500 ml-2">15/03/2025</span>
          </div>
          <div className="flex items-center border-l-2 border-green-400 pl-2">
            <span className="text-xs font-medium w-48 text-green-700">Đơn xin nghỉ phép</span>
            <p className="text-xs text-gray-700 flex-1">Đã được phê duyệt</p>
            <span className="text-xs text-gray-500 ml-2">14/03/2025</span>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm mb-4">
        <div className="max-w-full mx-auto px-4">
          <div className="flex">
            <button 
              className={`px-4 py-3 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Tổng quan
            </button>
            <button 
              className={`px-4 py-3 ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('tasks')}
            >
              Quản lý công việc
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
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 px-4 pb-4 gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Employee Profile Card */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-2xl font-bold">
                      {employeeInfo.avatar}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{employeeInfo.name}</h2>
                    <p className="text-blue-600">{employeeInfo.position}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase size={14} className="mr-2" />
                        <span>{employeeInfo.department}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User size={14} className="mr-2" />
                        <span>Quản lý: {employeeInfo.manager}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2" />
                        <span>{employeeInfo.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2" />
                        <span>{employeeInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-600">
                      <Calendar size={14} className="inline-block mr-1" />
                      <span>Ngày vào: {employeeInfo.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Task Status and Performance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-3">Trạng thái công việc</h3>
                  <div className="flex mb-3">
                    <div className="w-32 h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={Object.values(STATUS_COLORS)[index]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value} nhiệm vụ`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-xl font-bold">{taskStatusData.reduce((acc, curr) => acc + curr.value, 0)} nhiệm vụ</div>
                      <div className="text-sm text-gray-500 mb-2">trong quý này</div>
                      <div className="space-y-2">
                        {taskStatusData.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: Object.values(STATUS_COLORS)[index] }}></div>
                              <span className="text-sm">{entry.name}</span>
                            </div>
                            <div className="text-sm font-medium">{entry.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Công việc sắp đến hạn</h4>
                    <div className="space-y-2">
                      {currentTasks.slice(0, 2).map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${task.statusColor} mr-2`}></div>
                            <span className="text-sm">{task.name}</span>
                          </div>
                          <div className="text-xs font-medium text-gray-500">{task.dueDate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-3">Hiệu suất làm việc</h3>
                  <div className="h-40 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="taskCompleted" name="Hoàn thành" fill="#3b82f6" />
                        <Bar dataKey="onTime" name="Đúng hạn" fill="#10b981" />
                        <Bar dataKey="total" name="Tổng số" fill="#9ca3af" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">Hoàn thành</div>
                      <div className="text-lg font-bold text-blue-600">93%</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">Đúng hạn</div>
                      <div className="text-lg font-bold text-green-600">85%</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <div className="text-xs text-gray-500">Hiệu suất</div>
                      <div className="text-lg font-bold text-yellow-600">90%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills and Achievements */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-3">Kỹ năng</h3>
                  <div className="space-y-3">
                    {skillsData.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-3">Thành tích</h3>
                  <div className="space-y-3">
                    {achievementsData.map(achievement => (
                      <div key={achievement.id} className="flex items-center p-2 bg-gray-50 rounded-md">
                        <div className="mr-3">{achievement.icon}</div>
                        <div className="text-sm">{achievement.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {/* Task Statistics - Tổng quan */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium mb-4">Tổng quan công việc</h3>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng số</p>
                        <h3 className="text-xl font-bold mt-1">17</h3>
                      </div>
                      <div className="bg-blue-100 p-1.5 rounded">
                        <Briefcase className="text-blue-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Đang thực hiện</p>
                        <h3 className="text-xl font-bold mt-1">2</h3>
                      </div>
                      <div className="bg-yellow-100 p-1.5 rounded">
                        <Clock className="text-yellow-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Hoàn thành</p>
                        <h3 className="text-xl font-bold mt-1">14</h3>
                      </div>
                      <div className="bg-green-100 p-1.5 rounded">
                        <Check className="text-green-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Chưa bắt đầu</p>
                        <h3 className="text-xl font-bold mt-1">1</h3>
                      </div>
                      <div className="bg-gray-100 p-1.5 rounded">
                        <Circle className="text-gray-600" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-40 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="taskCompleted" name="Hoàn thành" fill="#3b82f6" />
                      <Bar dataKey="onTime" name="Đúng hạn" fill="#10b981" />
                      <Bar dataKey="total" name="Tổng số" fill="#9ca3af" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">Hoàn thành</div>
                    <div className="text-lg font-bold text-blue-600">93%</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">Đúng hạn</div>
                    <div className="text-lg font-bold text-green-600">85%</div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">Hiệu suất</div>
                    <div className="text-lg font-bold text-yellow-600">90%</div>
                  </div>
                </div>
              </div>
              
              {/* Danh sách công việc */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Danh sách công việc</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm kiếm công việc..."
                        className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
                    </div>
                    <button className="p-1.5 border border-gray-300 rounded-md text-gray-500">
                      <Filter size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên công việc
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dự án
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời hạn
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ưu tiên
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tiến độ
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentTasks.map(task => (
                        <tr key={task.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{task.name}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {task.project}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {task.dueDate}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              task.priority === 'Cao' ? 'bg-red-100 text-red-800' : 
                              task.priority === 'Trung bình' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              task.status === 'Đang thực hiện' ? 'bg-blue-100 text-blue-800' : 
                              task.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`h-2 rounded-full ${
                                task.status === 'Đang thực hiện' ? 'bg-blue-600' : 
                                task.status === 'Hoàn thành' ? 'bg-green-600' : 
                                'bg-gray-400'
                              }`} style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{task.progress}%</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <Play size={16} />
                              </button>
                              <button className="p-1 text-blue-600 hover:text-blue-800">
                                <Pause size={16} />
                              </button>
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
              
              {/* Bản nháp */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Bản nháp</h3>
                  <button className="text-blue-600 text-sm flex items-center">
                    <Plus size={14} className="mr-1" />
                    Tạo bản nháp mới
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <FileText size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Báo cáo tiến độ dự án Cảng XYZ</div>
                          <div className="text-xs text-gray-500">Cập nhật: 14/03/2025 09:15</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600">
                          <Edit size={16} />
                        </button>
                        <button className="text-blue-600">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <FileText size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Đề xuất giải pháp kỹ thuật mới</div>
                          <div className="text-xs text-gray-500">Cập nhật: 10/03/2025 15:30</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600">
                          <Edit size={16} />
                        </button>
                        <button className="text-blue-600">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {/* Resource Type Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    className={`px-4 py-2 ${resourceTab === 'equipment' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setResourceTab('equipment')}
                  >
                    Thiết bị
                  </button>
                  <button 
                    className={`px-4 py-2 ${resourceTab === 'software' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setResourceTab('software')}
                  >
                    Phần mềm
                  </button>
                  <button 
                    className={`px-4 py-2 ${resourceTab === 'data' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setResourceTab('data')}
                  >
                    Dữ liệu
                  </button>
                </div>
                
                {/* Equipment Resources */}
                {resourceTab === 'equipment' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Thiết bị được cấp</h3>
                      <button className="text-blue-600 text-sm flex items-center">
                        <Plus size={14} className="mr-1" />
                        Gửi yêu cầu thiết bị
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thiết bị
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Loại
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ngày cấp
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trạng thái
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {equipmentData.map(equipment => (
                            <tr key={equipment.id}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <HardDrive className="text-gray-600" size={16} />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {equipment.type}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {equipment.assignedDate}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {equipment.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 text-yellow-600 hover:text-yellow-800" title="Báo cáo sự cố">
                                    <AlertTriangle size={16} />
                                  </button>
                                  <button className="p-1 text-blue-600 hover:text-blue-800" title="Xem chi tiết">
                                    <ExternalLink size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                
                {/* Software Resources */}
                {resourceTab === 'software' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Phần mềm được cấp</h3>
                      <button className="text-blue-600 text-sm flex items-center">
                        <Plus size={14} className="mr-1" />
                        Gửi yêu cầu phần mềm
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Phần mềm
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nhà cung cấp
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Hạn sử dụng
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trạng thái
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {softwareData.map(software => (
                            <tr key={software.id}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Settings className="text-blue-600" size={16} />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{software.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {software.vendor}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {software.expiryDate}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {software.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 text-yellow-600 hover:text-yellow-800" title="Báo cáo sự cố">
                                    <AlertTriangle size={16} />
                                  </button>
                                  <button className="p-1 text-blue-600 hover:text-blue-800" title="Xem chi tiết">
                                    <ExternalLink size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                
                {/* Files Resources */}
                {/* Data Storage */}
                {resourceTab === 'data' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Kho dữ liệu</h3>
                      <div className="flex gap-2">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
                        </div>
                        <button className="text-blue-600 text-sm flex items-center">
                          <Upload size={14} className="mr-1" />
                          Tải lên
                        </button>
                        <button className="text-blue-600 text-sm flex items-center">
                          <Plus size={14} className="mr-1" />
                          Thư mục mới
                        </button>
                      </div>
                    </div>
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded-md">
                      <a href="#" className="hover:text-blue-600">Trang chủ</a>
                      <ChevronRight size={14} className="mx-1" />
                      <a href="#" className="hover:text-blue-600">Dự án</a>
                      <ChevronRight size={14} className="mx-1" />
                      <span className="text-blue-600 font-medium">Cảng XYZ</span>
                    </div>
                    
                    {/* Folders Grid */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Thư mục</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <Briefcase size={18} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Tài liệu dự án</div>
                              <div className="text-xs text-gray-500">5 mục</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                              <FileText size={18} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Bản vẽ</div>
                              <div className="text-xs text-gray-500">12 mục</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                              <Users size={18} className="text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Thông tin khách hàng</div>
                              <div className="text-xs text-gray-500">3 mục</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
                              <MapPin size={18} className="text-yellow-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Khảo sát hiện trường</div>
                              <div className="text-xs text-gray-500">7 mục</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Files List */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Tài liệu</h4>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tài liệu</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sửa đổi</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kích thước</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người sửa đổi</th>
                              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FileText size={16} className="text-blue-600" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">Báo cáo tiến độ Q1-2025.docx</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">10/03/2025</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">1.5 MB</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nguyễn Thị Minh</td>
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <Download size={16} />
                                  </button>
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <ExternalLink size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                    <FileText size={16} className="text-green-600" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">Hệ thống thoát nước v2.0.dwg</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">12/03/2025</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">8.7 MB</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Nguyễn Thị Minh</td>
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <Download size={16} />
                                  </button>
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <ExternalLink size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <FileText size={16} className="text-purple-600" />
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">Mô hình BIM - Phần thủy lực.rvt</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">11/03/2025</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">32.4 MB</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Lê Văn B</td>
                              <td className="px-4 py-3 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <Download size={16} />
                                  </button>
                                  <button className="p-1 text-blue-600 hover:text-blue-800">
                                    <ExternalLink size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Recently Used Files */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Đã sử dụng gần đây</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <FileText size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">TCVN 8614:2011</div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Tiêu chuẩn</span>
                            <span>10/02/2025</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                              <FileText size={16} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Hướng dẫn thiết kế BIM</div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Tài liệu nội bộ</span>
                            <span>15/01/2025</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                              <FileText size={16} className="text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Mẫu bản vẽ thiết kế</div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Template</span>
                            <span>05/03/2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              {/* Activity Type Tabs */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    className={`px-4 py-2 ${activityTab === 'incoming' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActivityTab('incoming')}
                  >
                    Hoạt động đến
                  </button>
                  <button 
                    className={`px-4 py-2 ${activityTab === 'outgoing' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActivityTab('outgoing')}
                  >
                    Hoạt động đi
                  </button>
                </div>
                
                {/* Incoming Activities */}
                {activityTab === 'incoming' && (
                  <>
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
                    
                    <div className="space-y-3">
                      {/* Lịch họp */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <Users size={18} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Họp dự án Cảng XYZ</div>
                              <div className="text-xs text-gray-500">16/03/2025 09:00 - 10:30, Phòng họp A</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sắp diễn ra</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Đào tạo */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                              <FileText size={18} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Đào tạo sử dụng phần mềm BIM mới</div>
                              <div className="text-xs text-gray-500">18/03/2025 14:00-17:00, Phòng đào tạo</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sắp diễn ra</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Nội dung: Cập nhật tính năng mới của phần mềm BIM và ứng dụng vào dự án hiện tại</p>
                        </div>
                      </div>
                      
                      {/* Thông báo dự án */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
                              <BarChart2 size={18} className="text-yellow-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Dự án Cảng XYZ yêu cầu cập nhật tiến độ</div>
                              <div className="text-xs text-gray-500">15/03/2025, 08:30</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Đang xử lý</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Yêu cầu: Cập nhật tiến độ thiết kế hệ thống thoát nước trước ngày 20/03/2025</p>
                        </div>
                      </div>
                      
                      {/* Tài liệu chia sẻ */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <Share2 size={18} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Lê Minh Hiếu đã chia sẻ tài liệu</div>
                              <div className="text-xs text-gray-500">14/03/2025, 15:45</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đã xem</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Tài liệu: "Quy chuẩn thiết kế mới" - Áp dụng cho dự án hiện tại</p>
                        </div>
                      </div>
                      
                      {/* Công việc bàn giao */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                              <Briefcase size={18} className="text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Thiết kế hệ thống thoát nước cảng XYZ</div>
                              <div className="text-xs text-gray-500">13/03/2025, 10:30</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Đang thực hiện</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Người giao: Lê Minh Hiếu | Thời hạn: 20/03/2025</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Outgoing Activities */}
                {activityTab === 'outgoing' && (
                  <>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-500 text-xs">Tổng hoạt động</p>
                            <h3 className="text-xl font-bold mt-1">12</h3>
                          </div>
                          <div className="bg-blue-100 p-1.5 rounded">
                            <Briefcase className="text-blue-600" size={16} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-500 text-xs">Đã gửi</p>
                            <h3 className="text-xl font-bold mt-1">4</h3>
                          </div>
                          <div className="bg-purple-100 p-1.5 rounded">
                            <Clock className="text-purple-600" size={16} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-500 text-xs">Hoàn thành</p>
                            <h3 className="text-xl font-bold mt-1">7</h3>
                          </div>
                          <div className="bg-green-100 p-1.5 rounded">
                            <Check className="text-green-600" size={16} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-500 text-xs">Bị từ chối</p>
                            <h3 className="text-xl font-bold mt-1">1</h3>
                          </div>
                          <div className="bg-red-100 p-1.5 rounded">
                            <X className="text-red-600" size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Hoạt động đã gửi</h3>
                      <button className="text-blue-600 text-sm flex items-center">
                        <Plus size={14} className="mr-1" />
                        Tạo hoạt động mới
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Đơn xin nghỉ phép */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                              <Calendar size={18} className="text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Đơn xin nghỉ phép</div>
                              <div className="text-xs text-gray-500">Đến: Phòng Nhân sự | 14/03/2025</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đã duyệt</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Thời gian nghỉ: 25/03/2025 - 26/03/2025 (2 ngày)</p>
                        </div>
                      </div>
                      
                      {/* Đề xuất mua thiết bị */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <HardDrive size={18} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Đề xuất mua thiết bị</div>
                              <div className="text-xs text-gray-500">Đến: Phòng Hành chính | 10/03/2025</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Đang xử lý</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Nội dung: Đề xuất mua màn hình phụ để làm việc hiệu quả hơn với phần mềm thiết kế</p>
                        </div>
                      </div>
                      
                      {/* Báo cáo tiến độ */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
                              <FileText size={18} className="text-yellow-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Báo cáo tiến độ dự án Cảng XYZ</div>
                              <div className="text-xs text-gray-500">Đến: Lê Minh Hiếu | 05/03/2025</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đã duyệt</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Tiến độ dự án: Hoàn thành 65%, đúng kế hoạch</p>
                        </div>
                      </div>
                      
                      {/* Cấp phát văn phòng phẩm */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                              <Paperclip size={18} className="text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Yêu cầu cấp phát văn phòng phẩm</div>
                              <div className="text-xs text-gray-500">Đến: Phòng Vật tư | 01/03/2025</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Đã duyệt</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Yêu cầu: 2 hộp bút bi, 1 cuốn sổ ghi chép, 5 xấp giấy A4</p>
                        </div>
                      </div>
                      
                      {/* Đề nghị tăng ca */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                              <Clock size={18} className="text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">Đề nghị tăng ca</div>
                              <div className="text-xs text-gray-500">Đến: Phòng Nhân sự | 28/02/2025</div>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Từ chối</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Lý do từ chối: Không đạt điều kiện tăng ca theo quy định công ty</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* AI Assistant */}
        {chatExpanded && (
          <div className="bg-white rounded-lg shadow-md border border-blue-100 flex flex-col w-80">
            <div className="flex justify-between items-center p-3 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <span className="font-medium text-blue-700">Trợ lý AI</span>
              </div>
              <button 
                onClick={() => setChatExpanded(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-3 space-y-4 bg-gray-50 text-sm">
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                  AI
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p>Chào Nguyễn Thị Minh! Tôi là Trợ lý AI. Bạn có 2 công việc sắp đến hạn và cuộc họp dự án vào ngày mai. Bạn cần hỗ trợ gì không?</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-blue-50 p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p>Cho tôi biết thêm về cuộc họp ngày mai</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold ml-2 flex-shrink-0">
                  {employeeInfo.avatar}
                </div>
              </div>
              
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                  AI
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%]">
                  <p><strong>Thông tin cuộc họp dự án Cảng XYZ:</strong></p>
                  <ul className="mt-1 list-disc pl-4 space-y-1">
                    <li>Thời gian: 16/03/2025, 09:00 - 10:30</li>
                    <li>Địa điểm: Phòng họp A</li>
                    <li>Người chủ trì: Lê Minh Hiếu (Trưởng phòng)</li>
                    <li>Nội dung: Đánh giá tiến độ thiết kế và phân công công việc</li>
                    <li>Cần chuẩn bị: Báo cáo tiến độ phần thiết kế hệ thống thoát nước</li>
                  </ul>
                  <p className="mt-1 text-xs text-blue-600">Tôi đã thêm sự kiện này vào lịch của bạn và sẽ nhắc bạn 30 phút trước khi bắt đầu.</p>
                </div>
              </div>
            </div>
            
            <div className="border-t p-3 flex">
              <input 
                type="text" 
                placeholder="Nhập câu hỏi..." 
                className="flex-grow border rounded-l-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-r-lg">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
