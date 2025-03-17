import React, { useState } from 'react';
import { ChevronLeft, Star, Calendar, Users, FolderOpen, User, FileText, Link, Edit, Trash, Plus, ExternalLink, AlertTriangle, CheckCircle, Clock, GitBranch, Share2, Maximize, ZoomIn, ZoomOut, Filter, ArrowRight } from 'lucide-react';

const TaskManagementInterface = () => {
  const [activeTab, setActiveTab] = useState('subtasks');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [flowView, setFlowView] = useState('hierarchical');
  
  // Rendering function for flowchart (simplified representation)
  const renderFlowChart = () => {
    return (
      <div className="relative border border-gray-200 rounded-lg p-4 h-96 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full" style={{ transform: `scale(${zoomLevel/100})`, transformOrigin: 'center' }}>
          {/* This would be replaced with actual chart rendering library */}
          {/* Simulated visualization for demo purposes */}
          <div className="flex items-center justify-center h-full">
            <svg width="700" height="350" viewBox="0 0 700 350">
              {/* Main node */}
              <g>
                <rect x="300" y="150" width="150" height="50" rx="5" fill="#3B82F6" opacity="0.8" />
                <text x="375" y="180" textAnchor="middle" fill="white" fontSize="12">Thiết kế công trình Thủy điện</text>
              </g>
              
              {/* Parent node */}
              <g>
                <rect x="300" y="50" width="150" height="40" rx="5" fill="#3B82F6" opacity="0.8" />
                <text x="375" y="75" textAnchor="middle" fill="white" fontSize="12">Quy hoạch tổng thể dự án</text>
                <path d="M375,50 L375,150" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="375,140 370,130 380,130" fill="#6B7280" />
              </g>
              
              {/* Child nodes */}
              <g>
                <rect x="100" y="250" width="120" height="40" rx="5" fill="#10B981" opacity="0.8" />
                <text x="160" y="275" textAnchor="middle" fill="white" fontSize="12">Thiết kế đập tràn</text>
                <path d="M300,175 L160,250" stroke="#6B7280" strokeWidth="2" />
                <polygon points="170,245 160,250 170,255" fill="#6B7280" />
              </g>
              
              <g>
                <rect x="300" y="250" width="120" height="40" rx="5" fill="#3B82F6" opacity="0.8" />
                <text x="360" y="275" textAnchor="middle" fill="white" fontSize="12">Thiết kế nhà máy</text>
                <path d="M375,200 L360,250" stroke="#6B7280" strokeWidth="2" />
                <polygon points="365,240 360,250 370,245" fill="#6B7280" />
              </g>
              
              <g>
                <rect x="500" y="250" width="150" height="40" rx="5" fill="#8B5CF6" opacity="0.8" />
                <text x="575" y="275" textAnchor="middle" fill="white" fontSize="12">Báo cáo khảo sát địa hình</text>
                <path d="M450,175 L550,250" stroke="#6B7280" strokeWidth="2" strokeDasharray="3,3" />
                <polygon points="540,245 550,250 540,255" fill="#6B7280" />
              </g>
              
              {/* Connected resources */}
              <g>
                <rect x="550" y="50" width="100" height="40" rx="5" fill="#F59E0B" opacity="0.8" />
                <text x="600" y="75" textAnchor="middle" fill="white" fontSize="12">Công ty XYZ</text>
                <path d="M450,150 L550,90" stroke="#6B7280" strokeWidth="2" strokeDasharray="3,3" />
              </g>
              
              <g>
                <rect x="550" y="120" width="100" height="40" rx="5" fill="#2563EB" opacity="0.8" />
                <text x="600" y="145" textAnchor="middle" fill="white" fontSize="12">Dự án ABC</text>
                <path d="M450,160 L550,140" stroke="#6B7280" strokeWidth="2" strokeDasharray="3,3" />
              </g>
              
              <g>
                <rect x="550" y="190" width="100" height="40" rx="5" fill="#EF4444" opacity="0.8" />
                <text x="600" y="215" textAnchor="middle" fill="white" fontSize="11">Tiêu chuẩn thiết kế</text>
                <path d="M450,175 L550,210" stroke="#6B7280" strokeWidth="2" strokeDasharray="3,3" />
              </g>
            </svg>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2 bg-white p-2 rounded-lg shadow">
          <button 
            className="p-1.5 rounded hover:bg-gray-100" 
            onClick={() => setZoomLevel(zoomLevel + 10)}
            title="Phóng to"
          >
            <ZoomIn size={18} className="text-gray-600" />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-gray-100" 
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            title="Thu nhỏ"
          >
            <ZoomOut size={18} className="text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button 
            className="p-1.5 rounded hover:bg-gray-100" 
            onClick={() => setFlowView(flowView === 'hierarchical' ? 'mindmap' : 'hierarchical')}
            title="Chuyển đổi chế độ xem"
          >
            <Share2 size={18} className="text-gray-600" />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-gray-100" 
            title="Chế độ toàn màn hình"
          >
            <Maximize size={18} className="text-gray-600" />
          </button>
        </div>
        
        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow text-sm">
          <div className="font-medium mb-1">Chú thích:</div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Đang thực hiện</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Hoàn thành</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
            <span>Chưa bắt đầu</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span>Tài liệu</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span>Khách hàng</span>
          </div>
        </div>
        
        {/* Filter options */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="flex items-center px-2 py-1 bg-white rounded-lg shadow text-sm">
            <Filter size={14} className="text-gray-600 mr-1" />
            <span>Lọc hiển thị</span>
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center">
        <button className="text-gray-600 mr-3 flex items-center">
          <ChevronLeft size={20} />
          <span className="ml-1">Quay lại</span>
        </button>
        <h1 className="text-xl font-semibold flex-grow">Thiết kế công trình Thủy điện</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <span>Hỏi Chat Bot</span>
        </button>
        <div className="ml-4 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
          NT
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col p-6 gap-6">
        {/* Task Metadata Card with Activity History */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold">Thông tin công việc</h2>
                <div className="ml-3 flex items-center text-orange-500">
                  <Star size={20} fill="orange" />
                  <span className="ml-1">Trung bình</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  Đang thực hiện
                </span>
                <button className="text-gray-500">
                  <Edit size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Mã công việc</label>
                  <p className="font-medium">CMB-HD-2025-028</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Thời gian</label>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-500 mr-2" />
                    <p className="font-medium">28/02/2025 — 28/02/2025 (15h/ngày)</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Chủ nhiệm (Người tạo)</label>
                  <div className="flex items-center">
                    <User size={18} className="text-gray-500 mr-2" />
                    <p className="font-medium">Nguyễn Văn A</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Phòng ban</label>
                  <div className="flex items-center">
                    <FolderOpen size={18} className="text-gray-500 mr-2" />
                    <p className="font-medium">Phòng Thiết kế</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Người thực hiện</label>
                  <div className="flex items-center">
                    <Users size={18} className="text-gray-500 mr-2" />
                    <p className="font-medium">Trần Văn B</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Mô tả</label>
                  <p className="font-medium text-gray-700">Thiết kế hệ thống thủy điện theo yêu cầu của dự án ABC...</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lịch sử hoạt động (trong cùng block với thông tin công việc) */}
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Lịch sử hoạt động</h3>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="font-medium">Nguyễn Văn A đã tạo công việc</p>
                    <span className="text-sm text-gray-500">15/02/2025 08:30</span>
                  </div>
                  <p className="text-gray-600 mt-1">Công việc được khởi tạo</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <User size={20} className="text-green-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="font-medium">Trần Văn B đã nhận công việc</p>
                    <span className="text-sm text-gray-500">16/02/2025 09:15</span>
                  </div>
                  <p className="text-gray-600 mt-1">Trạng thái chuyển sang "Đang thực hiện"</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Link size={20} className="text-purple-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="font-medium">Hệ thống thêm liên kết tài liệu</p>
                    <span className="text-sm text-gray-500">18/02/2025 14:45</span>
                  </div>
                  <p className="text-gray-600 mt-1">Thêm liên kết đến "Báo cáo khảo sát địa hình"</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <AlertTriangle size={20} className="text-yellow-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="font-medium">AI Cảnh báo rủi ro tiềm ẩn</p>
                    <span className="text-sm text-gray-500">20/02/2025 10:30</span>
                  </div>
                  <p className="text-gray-600 mt-1">Cảnh báo về khả năng chậm tiến độ do thiếu dữ liệu địa chất</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="font-medium">Hoàn thành 50% công việc</p>
                    <span className="text-sm text-gray-500">25/02/2025 16:20</span>
                  </div>
                  <p className="text-gray-600 mt-1">Trần Văn B cập nhật tiến độ công việc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-3 ${activeTab === 'subtasks' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('subtasks')}
          >
            Nhiệm vụ / Công việc con
          </button>
          <button 
            className={`px-4 py-3 ${activeTab === 'work-data' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('work-data')}
          >
            Dữ liệu công việc
          </button>
          <button 
            className={`px-4 py-3 ${activeTab === 'reference' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reference')}
          >
            Tài liệu tham khảo
          </button>
          <button 
            className={`px-4 py-3 ${activeTab === 'visualization' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('visualization')}
          >
            <div className="flex items-center">
              <GitBranch size={16} className="mr-1" />
              <span>Sơ đồ mối liên hệ</span>
            </div>
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'subtasks' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Nhiệm vụ / Công việc con</h3>
              <button className="text-blue-600 flex items-center">
                <Plus size={18} className="mr-1" />
                <span>Thêm nhiệm vụ mới</span>
              </button>
            </div>
            
            {/* Bảng nhiệm vụ / công việc con */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên nhiệm vụ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người thực hiện
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời hạn
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Thiết kế đập tràn</div>
                      <div className="text-sm text-gray-500">Công việc cấp thấp hơn</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Hoàn thành
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        Lê Văn C
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      20/02/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Thiết kế nhà máy</div>
                      <div className="text-sm text-gray-500">Công việc cấp thấp hơn</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Đang thực hiện
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        Phạm Thị D
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      01/03/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Thiết kế hệ thống cơ khí</div>
                      <div className="text-sm text-gray-500">Thuộc "Thiết kế nhà máy"</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Đang thực hiện
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        Đỗ Văn E
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      25/02/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Thiết kế hệ thống điện</div>
                      <div className="text-sm text-gray-500">Thuộc "Thiết kế nhà máy"</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Chưa bắt đầu
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        Nguyễn Thị F
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10/03/2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
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
          </div>
        )}
        
        {activeTab === 'work-data' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Dữ liệu công việc</h3>
            <p className="text-sm text-gray-500 mb-4">Các tài liệu liên quan trực tiếp đến công việc</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Hợp đồng Thủy điện ABC</p>
                    <p className="text-sm text-gray-500">Hợp đồng</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 10/02/2025</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Báo cáo khảo sát địa hình</p>
                    <p className="text-sm text-gray-500">Báo cáo kỹ thuật</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 18/02/2025</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <FileText size={20} className="text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">TCVN 8414:2010 - Tiêu chuẩn thiết kế thủy điện</p>
                    <p className="text-sm text-gray-500">Tiêu chuẩn</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 01/01/2025</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText size={20} className="text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Quyết định phê duyệt dự án</p>
                    <p className="text-sm text-gray-500">Văn bản pháp lý</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 05/02/2025</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <button className="flex items-center text-blue-600 mt-4">
                <Plus size={18} className="mr-1" />
                <span>Thêm dữ liệu công việc</span>
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'reference' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Tài liệu tham khảo</h3>
            <p className="text-sm text-gray-500 mb-4">Các tài liệu tham khảo không liên quan trực tiếp</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <FileText size={20} className="text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Dự án Thủy điện Sông Tranh - Form mẫu</p>
                    <p className="text-sm text-gray-500">Dự án tương tự</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 01/05/2024</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <FileText size={20} className="text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Hướng dẫn thiết kế thủy điện - Bộ Công Thương</p>
                    <p className="text-sm text-gray-500">Tài liệu hướng dẫn</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 15/06/2024</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <FileText size={20} className="text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Template bản vẽ thiết kế thủy điện</p>
                    <p className="text-sm text-gray-500">Mẫu thiết kế</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="text-xs text-gray-500 mr-3">Cập nhật: 22/11/2024</span>
                  <button className="text-blue-600">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              
              <button className="flex items-center text-blue-600 mt-4">
                <Plus size={18} className="mr-1" />
                <span>Thêm tài liệu tham khảo</span>
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'visualization' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Sơ đồ mối liên hệ</h3>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-lg ${flowView === 'hierarchical' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setFlowView('hierarchical')}
                >
                  Phân cấp
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-lg ${flowView === 'mindmap' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setFlowView('mindmap')}
                >
                  Mindmap
                </button>
              </div>
            </div>
            
            {renderFlowChart()}
            
            <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm text-blue-700 flex items-start">
              <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Trợ lý AI gợi ý:</strong> Với cấu trúc dự án hiện tại, nên phân chia thêm công việc "Thiết kế hệ thống thoát nước" để đảm bảo đầy đủ các hạng mục theo quy chuẩn thiết kế.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementInterface;
