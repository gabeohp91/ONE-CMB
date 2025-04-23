'use client';

import React, {useState, useCallback} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  User,
  Calendar,
  Clock,
  Briefcase,
  Check,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  FileText,
  Settings,
  HardDrive,
  Bell,
  MessageSquare,
  BarChart2,
  Target,
  Download,
  Upload,
  Archive,
  Paperclip,
  Users,
  Search,
  Share2,
  Circle,
  Play,
  Pause,
  FileCheck,
  Crown,
  Award,
  Edit,
} from 'lucide-react';
import {SidebarProvider} from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import {Sheet, SheetContent, SheetTrigger as UISheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';

const EmployeeDashboard = () => {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [resourceTab, setResourceTab] = useState('equipment');
  const [activityTab, setActivityTab] = useState('incoming');

  // Mock data for the employee
  const employeeInfo = {
    name: 'Nguyễn Thị Minh',
    position: 'Kỹ sư Thiết kế BIM',
    department: 'Phòng Thiết kế',
    avatar: 'NTM',
    email: 'nguyenthiminh@cmb.com.vn',
    phone: '0912345678',
    manager: 'Lê Minh Hiếu',
    joinDate: '01/06/2023',
  };

  // Performance metrics data
  const performanceData = [
    {name: 'T1', taskCompleted: 12, onTime: 11, total: 13},
    {name: 'T2', taskCompleted: 15, onTime: 14, total: 16},
    {name: 'T3', taskCompleted: 14, onTime: 13, total: 15},
  ];

  // Current tasks
  const currentTasks = [
    {
      id: 1,
      name: 'Công việc 1',
      dueDate: '20/03/2025',
      status: 'Đang thực hiện',
      statusColor: 'bg-blue-500',
      priority: 'Cao',
      progress: 65,
      project: 'Dự án A',
    },
    {
      id: 2,
      name: 'Công việc 2',
      dueDate: '18/03/2025',
      status: 'Đang thực hiện',
      statusColor: 'bg-blue-500',
      priority: 'Trung bình',
      progress: 30,
      project: 'Dự án B',
    },
    {
      id: 3,
      name: 'Công việc 3',
      dueDate: '25/03/2025',
      status: 'Chưa bắt đầu',
      statusColor: 'bg-gray-500',
      priority: 'Thấp',
      progress: 0,
      project: 'Dự án C',
    },
  ];

  // Task history
  const taskHistory = [
    {
      id: 101,
      name: 'Công việc đã hoàn thành 1',
      completedDate: '10/03/2025',
      status: 'Hoàn thành',
      statusColor: 'bg-green-500',
      project: 'Dự án D',
      feedback: 'Tốt, đáp ứng yêu cầu',
    },
    {
      id: 102,
      name: 'Công việc đã hoàn thành 2',
      completedDate: '05/03/2025',
      status: 'Hoàn thành',
      statusColor: 'bg-green-500',
      project: 'Dự án E',
      feedback: 'Tốt, phát hiện và sửa nhiều lỗi quan trọng',
    },
  ];

  // Equipment data
  const equipmentData = [
    {
      id: 1,
      name: 'Thiết bị 1',
      type: 'Loại thiết bị 1',
      status: 'Đang sử dụng',
      statusColor: 'bg-green-500',
      assignedDate: '01/06/2023',
    },
    {
      id: 2,
      name: 'Thiết bị 2',
      type: 'Loại thiết bị 2',
      status: 'Đang sử dụng',
      statusColor: 'bg-green-500',
      assignedDate: '15/12/2024',
    },
  ];

  // Software data
  const softwareData = [
    {
      id: 1,
      name: 'Phần mềm 1',
      vendor: 'Nhà cung cấp 1',
      status: 'Đang hoạt động',
      statusColor: 'bg-green-500',
      expiryDate: '31/12/2025',
    },
    {
      id: 2,
      name: 'Phần mềm 2',
      vendor: 'Nhà cung cấp 2',
      status: 'Đang hoạt động',
      statusColor: 'bg-green-500',
      expiryDate: '31/12/2025',
    },
    {
      id: 3,
      name: 'Phần mềm 3',
      vendor: 'Nhà cung cấp 3',
      status: 'Đang hoạt động',
      statusColor: 'bg-green-500',
      expiryDate: '31/12/2025',
    },
  ];

  // Schedule data
  const scheduleData = [
    {
      id: 1,
      title: 'Cuộc họp 1',
      date: '16/03/2025 09:00',
      location: 'Phòng họp A',
      organizer: 'Người tổ chức 1',
      type: 'Cuộc họp',
    },
    {
      id: 2,
      title: 'Đào tạo 1',
      date: '18/03/2025 14:00-17:00',
      location: 'Phòng đào tạo',
      organizer: 'Người tổ chức 2',
      type: 'Đào tạo',
    },
    {
      id: 3,
      title: 'Công tác 1',
      date: '21/03/2025 (cả ngày)',
      location: 'Địa điểm 1',
      organizer: 'Người tổ chức 3',
      type: 'Công tác',
    },
  ];

  // Notification data
  const notificationData = [
    {
      id: 1,
      title: 'Thông báo 1',
      date: '14/03/2025',
      status: 'Đã duyệt',
      statusColor: 'bg-green-500',
    },
    {
      id: 2,
      title: 'Thông báo 2',
      date: '10/03/2025',
      status: 'Đã duyệt',
      statusColor: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Thông báo 3',
      date: '08/03/2025',
      status: 'Đang xử lý',
      statusColor: 'bg-yellow-500',
    },
  ];

  const setActiveTabCallback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const setChatExpandedCallback = useCallback((value: boolean) => {
    setChatExpanded(value);
  }, []);

  return (
    <SidebarProvider>
      <div className="bg-gray-50 min-h-screen flex">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTabCallback} />

        <div className={`flex-1 p-4 overflow-y-auto ${chatExpanded ? 'mr-96 md:mr-0' : ''}`}>
          <Header
            employeeInfo={employeeInfo}
            setChatExpanded={setChatExpandedCallback}
            chatExpanded={chatExpanded}
          />

          <div className="mt-4">
            {/* Tab content */}
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

                {/* Top 5 Important Tasks */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-medium mb-3">5 Công Việc Quan Trọng Nhất</h3>
                  <div className="space-y-2">
                    {currentTasks.slice(0, 5).map(task => (
                      <div key={task.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${task.statusColor} mr-2`} />
                          <span className="text-sm">{task.name}</span>
                        </div>
                        <div className="text-xs font-medium text-gray-500">{task.dueDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                          <h3 className="text-xl font-bold mt-1">5</h3>
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
                          <h3 className="text-xl font-bold mt-1">1</h3>
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
                          <h3 className="text-xl font-bold mt-1">1</h3>
                        </div>
                        <div className="bg-red-100 p-1.5 rounded">
                          <Circle className="text-red-600" size={16} />
                        </div>
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
                                  }`} style={{width: `${task.progress}%`}} />
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
                      className={`px-4 py-2 ${
                        resourceTab === 'equipment' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'
                      }`}
                      onClick={() => setResourceTab('equipment')}
                    >
                      Thiết bị
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        resourceTab === 'software' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'
                      }`}
                      onClick={() => setResourceTab('software')}
                    >
                      Phần mềm
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        resourceTab === 'data' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'
                      }`}
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
                      className={`px-4 py-2 ${
                        activityTab === 'incoming' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'
                      }`}
                      onClick={() => setActivityTab('incoming')}
                    >
                      Hoạt động đến
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        activityTab === 'outgoing' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'
                      }`}
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
        </div>

        {/* AI Assistant Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out border-l border-gray-200 ${
            chatExpanded ? 'w-96 fixed right-0 top-16 bottom-0 z-20' : 'w-0 overflow-hidden'
          }`}
          style={{height: 'calc(100vh - 64px)'}}
        >
          {chatExpanded && (
            <AIAssistant
              employeeInfo={employeeInfo}
              onClose={() => setChatExpanded(false)}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};
// This function is the default export for the Next.js page component
export default function Page() {
  return <EmployeeDashboard />;
}
