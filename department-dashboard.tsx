import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, User, Users, Calendar, Clock, Briefcase, Check, X, ExternalLink, ChevronLeft, ChevronRight, Filter, Plus, ArrowRight, Mail, Phone, MapPin, FileText, Settings, HardDrive } from 'lucide-react';

const DepartmentManagerDashboard = () => {
  const [chatExpanded, setChatExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceTab, setResourceTab] = useState('equipment');
  const [activityTab, setActivityTab] = useState('incoming');
  
  // Mock data
  const taskStatusData = [
    { name: 'T1', hoanthanh: 8, dangthuchien: 10, quahan: 2, total: 20 },
    { name: 'T2', hoanthanh: 10, dangthuchien: 9, quahan: 3, total: 22 },
    { name: 'T3', hoanthanh: 12, dangthuchien: 8, quahan: 2, total: 22 },
  ];
  
  const teamMembers = [
    { 
      id: 1, 
      name: 'Nguyễn Văn A', 
      role: 'Kỹ sư thiết kế', 
      tasks: 4, 
      status: 'Đang làm việc', 
      statusColor: 'bg-green-500',
      efficiency: 95
    },
    { 
      id: 2, 
      name: 'Trần Thị B', 
      role: 'Chuyên viên BIM', 
      tasks: 3, 
      status: 'Đi công tác', 
      statusColor: 'bg-blue-500',
      efficiency: 88
    },
    { 
      id: 3, 
      name: 'Lê Văn C', 
      role: 'Kỹ sư phân tích', 
      tasks: 2, 
      status: 'Đang làm việc', 
      statusColor: 'bg-green-500',
      efficiency: 92
    },
    { 
      id: 4, 
      name: 'Phạm Thị D', 
      role: 'Kỹ sư cơ khí', 
      tasks: 5, 
      status: 'Nghỉ phép', 
      statusColor: 'bg-orange-500',
      efficiency: 90
    },
    { 
      id: 5, 
      name: 'Đỗ Văn E', 
      role: 'Chuyên viên dự toán', 
      tasks: 3, 
      status: 'Đang làm việc', 
      statusColor: 'bg-green-500',
      efficiency: 85
    }
  ];
  
  const equipmentData = [
    { id: 1, name: 'Máy trạm BIM', type: 'Máy tính', assigned: 'Trần Thị B', status: 'Hoạt động tốt', statusColor: 'bg-green-500' },
    { id: 2, name: 'Máy tính xách tay HP', type: 'Máy tính', assigned: 'Nguyễn Văn A', status: 'Cần bảo trì', statusColor: 'bg-yellow-500' },
    { id: 3, name: 'Máy đo laser', type: 'Thiết bị đo', assigned: 'Lê Văn C', status: 'Hoạt động tốt', statusColor: 'bg-green-500' },
    { id: 4, name: 'Máy in A1', type: 'Thiết bị văn phòng', assigned: 'Phòng ban', status: 'Hết mực', statusColor: 'bg-red-500' },
    { id: 5, name: 'Máy tính xách tay Dell', type: 'Máy tính', assigned: 'Phạm Thị D', status: 'Hoạt động tốt', statusColor: 'bg-green-500' }
  ];
  
  const alerts = [
    { id: 1, level: 'Cao', message: 'Dự án ABC sắp đến hạn (còn 3 ngày), cần 2 nhân sự xử lý gấp', time: '10:30' },
    { id: 2, level: 'Trung bình', message: 'Máy in A1 hết mực, đã yêu cầu thay thế', time: '09:15' },
    { id: 3, level: 'Thấp', message: 'Cập nhật phần mềm BIM vào ngày 18/03/2025', time: '08:45' }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl text-blue-700">CMB</span>
            <span className="text-base text-gray-600">| Dashboard Quản Lý Phòng Ban</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Lê Minh Hiếu | Trưởng phòng Thiết Kế</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              LMH
            </div>
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
              className={`px-4 py-3 ${activeTab === 'personnel' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('personnel')}
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
        </div>
      </div>
      
      {/* Alert Banner */}
      {alerts.length > 0 && (
        <div className="w-full px-4 py-2 bg-red-50 border-b border-red-200 mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-1.5 rounded-full">
              <AlertTriangle className="text-red-600" size={18} />
            </div>
            <h3 className="text-sm font-medium text-red-800">Cảnh báo ưu tiên</h3>
          </div>
          <div className="mt-1 space-y-1 max-w-7xl">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-center border-l-2 pl-2" 
                   style={{ borderColor: alert.level === 'Cao' ? '#ef4444' : alert.level === 'Trung bình' ? '#f59e0b' : '#3b82f6' }}>
                <span className="text-xs font-medium w-20" 
                      style={{ color: alert.level === 'Cao' ? '#ef4444' : alert.level === 'Trung bình' ? '#f59e0b' : '#3b82f6' }}>
                  {alert.level}
                </span>
                <p className="text-xs text-gray-700 flex-1">{alert.message}</p>
                <span className="text-xs text-gray-500 ml-2">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 px-4 pb-4 gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Task Stats */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium mb-4">Thống kê công việc phòng ban</h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Tổng số</p>
                        <h3 className="text-xl font-bold mt-1">22</h3>
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
                        <h3 className="text-xl font-bold mt-1">12</h3>
                      </div>
                      <div className="bg-yellow-100 p-1.5 rounded">
                        <Clock className="text-yellow-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-xs">Đã hoàn thành</p>
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
                        <p className="text-gray-500 text-xs">Quá hạn</p>
                        <h3 className="text-xl font-bold mt-1">3</h3>
                      </div>
                      <div className="bg-red-100 p-1.5 rounded">
                        <AlertTriangle className="text-red-600" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskStatusData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                      <YAxis tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{fontSize: '12px'}} />
                      <Legend wrapperStyle={{fontSize: 12}} />
                      <Bar dataKey="hoanthanh" name="Hoàn thành" stackId="a" fill="#10b981" />
                      <Bar dataKey="dangthuchien" name="Đang thực hiện" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="quahan" name="Quá hạn" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Team Status Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Tình trạng nhân sự</h2>
                  <button className="text-blue-600 text-sm flex items-center">
                    Xem chi tiết <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhân viên
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Công việc
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tình trạng
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hiệu suất
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teamMembers.slice(0, 3).map(member => (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-800 font-medium text-sm">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{member.tasks} công việc</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.status === 'Đang làm việc' ? 'bg-green-100 text-green-800' : 
                              member.status === 'Đi công tác' ? 'bg-blue-100 text-blue-800' : 
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2 w-24">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${member.efficiency}%` }}></div>
                              </div>
                              <span className="text-sm text-gray-500">{member.efficiency}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Equipment Status */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Tình trạng thiết bị</h2>
                  <button className="text-blue-600 text-sm flex items-center">
                    Xem chi tiết <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thiết bị
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phân công
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tình trạng
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {equipmentData.slice(0, 3).map(equipment => (
                        <tr key={equipment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <HardDrive className="text-gray-600" size={16} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                                <div className="text-sm text-gray-500">{equipment.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {equipment.assigned}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              equipment.status === 'Hoạt động tốt' ? 'bg-green-100 text-green-800' : 
                              equipment.status === 'Cần bảo trì' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {equipment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Task Management Tab */}
          {activeTab === 'tasks' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Quản lý công việc</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm công việc..."
                      className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm">
                    <Plus size={16} />
                    <span>Tạo mới</span>
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-500">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã công việc
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên công việc
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Người thực hiện
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời hạn
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiến độ
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CMB-TD-2025-001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Thiết kế cầu tàu Cảng ABC</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium">NVA</span>
                          </div>
                          <div className="ml-2 text-sm text-gray-900">Nguyễn Văn A</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        18/03/2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Đang thực hiện
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">65%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CMB-TD-2025-002
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Thiết kế kết cấu nhà máy XYZ</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium">TTB</span>
                          </div>
                          <div className="ml-2 text-sm text-gray-900">Trần Thị B</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        20/03/2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Hoàn thành
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">100%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CMB-TD-2025-003
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Phân tích kết cấu cảng DEF</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium">LVC</span>
                          </div>
                          <div className="ml-2 text-sm text-gray-900">Lê Văn C</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15/03/2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Quá hạn
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">80%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Hiển thị 1 - 3 của 22 công việc
                </div>
                <div className="flex gap-1">
                  <button className="p-1 border border-gray-300 rounded text-gray-600">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="px-2 py-1 border border-gray-300 rounded text-gray-600 bg-blue-50 text-blue-600">1</button>
                  <button className="px-2 py-1 border border-gray-300 rounded text-gray-600">2</button>
                  <button className="px-2 py-1 border border-gray-300 rounded text-gray-600">3</button>
                  <button className="p-1 border border-gray-300 rounded text-gray-600">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Personnel Management Tab */}
          {activeTab === 'personnel' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Quản lý nhân sự</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm nhân viên..."
                      className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-500">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs">Tổng nhân sự</p>
                      <h3 className="text-xl font-bold mt-1">8</h3>
                    </div>
                    <div className="bg-blue-100 p-1.5 rounded">
                      <Users className="text-blue-600" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs">Đang làm việc</p>
                      <h3 className="text-xl font-bold mt-1">5</h3>
                    </div>
                    <div className="bg-green-100 p-1.5 rounded">
                      <User className="text-green-600" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-xs">Vắng mặt</p>
                      <h3 className="text-xl font-bold mt-1">3</h3>
                    </div>
                    <div className="bg-yellow-100 p-1.5 rounded">
                      <Calendar className="text-yellow-600" size={16} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nhân viên
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thông tin liên hệ
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Công việc
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tình trạng
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hiệu suất
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamMembers.map(member => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-800 font-medium">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex flex-col gap-1">
                            <div className="flex items-center">
                              <Mail size={12} className="mr-1" />
                              <span>{member.name.toLowerCase().replace(/\s/g, '.')}@cmb.com.vn</span>
                            </div>
                            <div className="flex items-center">
                              <Phone size={12} className="mr-1" />
                              <span>0912 345 67{member.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Briefcase size={14} className="mr-1 text-gray-500" />
                            <span>{member.tasks} công việc</span>
                          </div>
                          <div className="text-xs text-blue-600 mt-1 cursor-pointer">
                            Xem chi tiết
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.status === 'Đang làm việc' ? 'bg-green-100 text-green-800' : 
                            member.status === 'Đi công tác' ? 'bg-blue-100 text-blue-800' : 
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2 w-24">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${member.efficiency}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-500">{member.efficiency}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Resource Management Tab */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Quản lý tài nguyên</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm tài nguyên..."
                      className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm">
                    <Plus size={16} />
                    <span>Thêm mới</span>
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-500">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              {/* Resource type tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                <button 
                  className={`px-4 py-2 ${resourceTab === 'data' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                  onClick={() => setResourceTab('data')}
                >
                  Dữ liệu
                </button>
                <button 
                  className={`px-4 py-2 ${resourceTab === 'software' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                  onClick={() => setResourceTab('software')}
                >
                  Phần mềm
                </button>
                <button 
                  className={`px-4 py-2 ${resourceTab === 'equipment' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                  onClick={() => setResourceTab('equipment')}
                >
                  Thiết bị
                </button>
                <button 
                  className={`px-4 py-2 ${resourceTab === 'supplies' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
                  onClick={() => setResourceTab('supplies')}
                >
                  Vật tư
                </button>
              </div>
              
              {/* Data Resources */}
              {resourceTab === 'data' && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tổng dữ liệu</p>
                          <h3 className="text-xl font-bold mt-1">56</h3>
                        </div>
                        <div className="bg-blue-100 p-1.5 rounded">
                          <FileText className="text-blue-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Dự án</p>
                          <h3 className="text-xl font-bold mt-1">32</h3>
                        </div>
                        <div className="bg-green-100 p-1.5 rounded">
                          <Briefcase className="text-green-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tài liệu</p>
                          <h3 className="text-xl font-bold mt-1">15</h3>
                        </div>
                        <div className="bg-yellow-100 p-1.5 rounded">
                          <FileText className="text-yellow-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tiêu chuẩn</p>
                          <h3 className="text-xl font-bold mt-1">9</h3>
                        </div>
                        <div className="bg-purple-100 p-1.5 rounded">
                          <FileText className="text-purple-600" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên tài liệu
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loại tài liệu
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thuộc dự án
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <FileText className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Báo cáo địa chất công trình</div>
                                <div className="text-sm text-gray-500">Cập nhật: 12/03/2025</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Báo cáo kỹ thuật
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Cảng ABC
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Đã duyệt
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <FileText className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Bản vẽ kết cấu cầu tàu</div>
                                <div className="text-sm text-gray-500">Cập nhật: 10/03/2025</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Bản vẽ kỹ thuật
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Cảng DEF
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Đang xem xét
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center">
                                <FileText className="text-purple-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">TCVN 8613:2010</div>
                                <div className="text-sm text-gray-500">Cập nhật: 01/01/2025</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Tiêu chuẩn
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            -
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Có sẵn
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              {/* Software Resources */}
              {resourceTab === 'software' && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tổng phần mềm</p>
                          <h3 className="text-xl font-bold mt-1">8</h3>
                        </div>
                        <div className="bg-blue-100 p-1.5 rounded">
                          <Settings className="text-blue-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Hợp lệ</p>
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
                          <p className="text-gray-500 text-xs">Sắp hết hạn</p>
                          <h3 className="text-xl font-bold mt-1">2</h3>
                        </div>
                        <div className="bg-yellow-100 p-1.5 rounded">
                          <AlertTriangle className="text-yellow-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Hết hạn</p>
                          <h3 className="text-xl font-bold mt-1">0</h3>
                        </div>
                        <div className="bg-red-100 p-1.5 rounded">
                          <X className="text-red-600" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phần mềm
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thông tin bản quyền
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số lượng license
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Settings className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">AutoCAD 2025</div>
                                <div className="text-sm text-gray-500">Autodesk</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              <div>Bản quyền 1 năm</div>
                              <div>Hết hạn: 15/01/2026</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              5/5 đang sử dụng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Hợp lệ
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Settings className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Revit 2025</div>
                                <div className="text-sm text-gray-500">Autodesk</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              <div>Bản quyền 1 năm</div>
                              <div>Hết hạn: 20/04/2025</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              3/3 đang sử dụng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Sắp hết hạn
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Settings className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">FlexTerm 2025</div>
                                <div className="text-sm text-gray-500">Bentley</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              <div>Bản quyền vĩnh viễn</div>
                              <div>Bảo trì: 10/12/2025</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              2/2 đang sử dụng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Hợp lệ
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              {/* Equipment Resources */}
              {resourceTab === 'equipment' && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tổng thiết bị</p>
                          <h3 className="text-xl font-bold mt-1">12</h3>
                        </div>
                        <div className="bg-blue-100 p-1.5 rounded">
                          <HardDrive className="text-blue-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Hoạt động tốt</p>
                          <h3 className="text-xl font-bold mt-1">8</h3>
                        </div>
                        <div className="bg-green-100 p-1.5 rounded">
                          <Check className="text-green-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Cần bảo trì</p>
                          <h3 className="text-xl font-bold mt-1">3</h3>
                        </div>
                        <div className="bg-yellow-100 p-1.5 rounded">
                          <AlertTriangle className="text-yellow-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Không sử dụng được</p>
                          <h3 className="text-xl font-bold mt-1">1</h3>
                        </div>
                        <div className="bg-red-100 p-1.5 rounded">
                          <X className="text-red-600" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thiết bị
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thông tin
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phân công
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tình trạng
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {equipmentData.map(equipment => (
                          <tr key={equipment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <HardDrive className="text-gray-600" size={18} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                                  <div className="text-sm text-gray-500">{equipment.type}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <FileText size={12} className="text-gray-400" />
                                  <span>MST-{equipment.id}00{equipment.id}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin size={12} className="text-gray-400" />
                                  <span>Phòng {equipment.id}0{equipment.id}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                  <span className="text-xs font-medium">
                                    {equipment.assigned !== 'Phòng ban' ? 
                                      equipment.assigned.split(' ').map(n => n[0]).join('') : 'PB'}
                                  </span>
                                </div>
                                {equipment.assigned}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                equipment.status === 'Hoạt động tốt' ? 'bg-green-100 text-green-800' : 
                                equipment.status === 'Cần bảo trì' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {equipment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                <ExternalLink size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              {/* Supplies Resources */}
              {resourceTab === 'supplies' && (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Tổng vật tư</p>
                          <h3 className="text-xl font-bold mt-1">42</h3>
                        </div>
                        <div className="bg-blue-100 p-1.5 rounded">
                          <Briefcase className="text-blue-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Còn sẵn</p>
                          <h3 className="text-xl font-bold mt-1">28</h3>
                        </div>
                        <div className="bg-green-100 p-1.5 rounded">
                          <Check className="text-green-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Sắp hết</p>
                          <h3 className="text-xl font-bold mt-1">9</h3>
                        </div>
                        <div className="bg-yellow-100 p-1.5 rounded">
                          <AlertTriangle className="text-yellow-600" size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-xs">Đã hết</p>
                          <h3 className="text-xl font-bold mt-1">5</h3>
                        </div>
                        <div className="bg-red-100 p-1.5 rounded">
                          <X className="text-red-600" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên vật tư
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã vật tư
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số lượng
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Briefcase className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Mực in HP LaserJet</div>
                                <div className="text-sm text-gray-500">Vật tư văn phòng</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            VT-001-2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12 hộp
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Còn sẵn
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Briefcase className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Giấy in A4</div>
                                <div className="text-sm text-gray-500">Vật tư văn phòng</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            VT-002-2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            3 thùng
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Sắp hết
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <Briefcase className="text-blue-600" size={18} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Bút bi xanh</div>
                                <div className="text-sm text-gray-500">Vật tư văn phòng</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            VT-003-2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            0 hộp
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Đã hết
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Activities Management Tab */}
          {activeTab === 'activities' && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Quản lý hoạt động</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm hoạt động..."
                      className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm">
                    <Plus size={16} />
                    <span>Tạo hoạt động</span>
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-md text-gray-500">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
              
              {/* Activity type tabs */}
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
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tiêu đề
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Người gửi
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thời gian
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ưu tiên
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Đơn xin nghỉ phép</div>
                                <div className="text-sm text-gray-500">Nghỉ phép ngày 20-22/03/2025</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-medium">NVA</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Nguyễn Văn A</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            14/03/2025 10:30
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                              Quan trọng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Chờ xử lý
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Đơn đề nghị thanh toán</div>
                                <div className="text-sm text-gray-500">Chi phí công tác dự án ABC</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-medium">LVC</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Lê Văn C</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            13/03/2025 09:15
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Bình thường
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Chờ xử lý
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Đề xuất tăng ca</div>
                                <div className="text-sm text-gray-500">Dự án DEF - Giai đoạn nghiệm thu</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs font-medium">TTB</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Trần Thị B</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12/03/2025 14:45
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Khẩn cấp
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Đã xử lý
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                          <h3 className="text-xl font-bold mt-1">3</h3>
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
                          <h3 className="text-xl font-bold mt-1">8</h3>
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
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tiêu đề
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Người nhận
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thời gian
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ưu tiên
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Đề xuất phương án kỹ thuật mới</div>
                                <div className="text-sm text-gray-500">Dự án DEF</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium">BGĐ</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Ban Giám đốc</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            15/03/2025 08:30
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                              Quan trọng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Đã gửi
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Yêu cầu kinh phí đào tạo</div>
                                <div className="text-sm text-gray-500">Đào tạo BIM nâng cao</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium">PTC</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Phòng Tài chính</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            10/03/2025 13:15
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Bình thường
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Hoàn thành
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Đề xuất tăng biên chế</div>
                                <div className="text-sm text-gray-500">Phòng Thiết kế</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium">PNS</span>
                              </div>
                              <div className="ml-2 text-sm text-gray-900">Phòng Nhân sự</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            08/03/2025 09:30
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                              Quan trọng
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Bị từ chối
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <ExternalLink size={16} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* AI Assistant */}
        <div className={`bg-white rounded-lg shadow-md border border-blue-100 flex flex-col transition-all duration-300 ${chatExpanded ? 'w-96' : 'w-12'}`}>
          {chatExpanded ? (
            <>
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
                    <p>Chào Lê Minh Hiếu! Tôi là Trợ lý AI. Tôi thấy bạn đang có 3 dự án quá hạn và 1 thiết bị cần bảo trì gấp. Bạn cần hỗ trợ gì không?</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-blue-50 p-2 rounded-lg shadow-sm max-w-[85%]">
                    <p>Giúp tôi phân tích phân tích tình hình dự án quá hạn</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold ml-2 flex-shrink-0">
                    LMH
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
                    AI
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm max-w-[85%]">
                    <p><strong>Phân tích dự án quá hạn:</strong></p>
                    <ul className="mt-1 list-disc pl-4 space-y-1">
                      <li><strong>Dự án CMB-TD-2025-003:</strong> Phân tích kết cấu cảng DEF
                        <ul className="list-disc ml-4 mt-1">
                          <li>Quá hạn 2 ngày, hoàn thành 80%</li>
                          <li>Nguyên nhân: Chờ dữ liệu từ chủ đầu tư</li>
                          <li>Giải pháp: Liên hệ trực tiếp với Ông Hoàng văn X</li>
                        </ul>
                      </li>
                      <li><strong>Dự án CMB-TD-2025-007:</strong> Thiết kế thi công cảng GHI
                        <ul className="list-disc ml-4 mt-1">
                          <li>Quá hạn 3 ngày, hoàn thành 60%</li>
                          <li>Nguyên nhân: Thiếu nhân lực BIM chuyên sâu</li>
                          <li>Giải pháp: Điều động Trần Thị B từ dự án XYZ</li>
                        </ul>
                      </li>
                      <li><strong>Dự án CMB-TD-2025-012:</strong> Khảo sát địa chất Dự án KLM
                        <ul className="list-disc ml-4 mt-1">
                          <li>Quá hạn 1 ngày, hoàn thành 90%</li>
                          <li>Nguyên nhân: Điều kiện thời tiết</li>
                          <li>Giải pháp: Có thể hoàn thành trong ngày mai</li>
                        </ul>
                      </li>
                    </ul>
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
            </>
          ) : (
            <button 
              onClick={() => setChatExpanded(true)}
              className="h-full flex items-center justify-center text-blue-600"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagerDashboard;
