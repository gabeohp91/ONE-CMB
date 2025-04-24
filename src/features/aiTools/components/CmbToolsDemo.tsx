import React, { useState } from 'react';
import { Search, Upload, Download, Settings, ChevronDown, ChevronRight, ChevronLeft, X, Check, Copy, Save, Paperclip, RefreshCw, Pen, FileText } from 'lucide-react';

// Main App Component
const CmbToolsDemo = () => {
  const [activeView, setActiveView] = useState('sidebar'); // sidebar, translate, templates
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch(activeView) {
      case 'translate':
        return <TranslationTool />;
      case 'templates':
        return <TemplateWritingTool />;
      default:
        return <SidebarView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Custom AI Tools Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <img src="/api/placeholder/40/40" alt="CMB Logo" className="rounded-full" />
            </div>
            {!sidebarCollapsed && <span className="ml-2 font-bold text-blue-600">CMB</span>}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <div className="p-4">
          {!sidebarCollapsed && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <nav className="space-y-1">
            <div className="px-3 py-2 rounded-md flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer" onClick={() => setActiveView('sidebar')}>
              <div className="w-6 h-6 flex items-center justify-center">
                <Settings size={18} />
              </div>
              {!sidebarCollapsed && <span className="ml-3 font-medium">Công cụ AI</span>}
              {!sidebarCollapsed && <ChevronDown size={16} className="ml-auto" />}
            </div>

            {!sidebarCollapsed && (
              <div className="ml-8 space-y-1">
                <div 
                  className={`px-3 py-2 text-sm rounded-md ${activeView === 'translate' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer flex items-center`}
                  onClick={() => setActiveView('translate')}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Dịch thuật bằng AI
                </div>
                <div 
                  className={`px-3 py-2 text-sm rounded-md ${activeView === 'templates' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer flex items-center`}
                  onClick={() => setActiveView('templates')}
                >
                  <FileText size={16} className="mr-2" />
                  Viết nội dung theo mẫu
                </div>
                <div 
                  className="px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
                >
                  <Pen size={16} className="mr-2" />
                  Chat cùng Chuyên gia AI
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

// Sidebar View Component
const SidebarView = ({ setActiveView }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Công cụ AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveView('translate')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <RefreshCw size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Dịch thuật bằng AI</h3>
          <p className="text-gray-600">Dịch tài liệu nhanh chóng và chính xác với công nghệ AI tiên tiến.</p>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveView('templates')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Viết nội dung theo mẫu</h3>
          <p className="text-gray-600">Tạo văn bản theo mẫu có sẵn với sự trợ giúp của AI.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Pen size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chat cùng Chuyên gia AI</h3>
          <p className="text-gray-600">Trò chuyện và nhận tư vấn từ AI có kiến thức chuyên sâu.</p>
        </div>
      </div>
    </div>
  );
};

// Translation Tool Component
const TranslationTool = () => {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('vi');
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dịch thuật bằng AI</h1>
        <button className="text-blue-600 hover:text-blue-800">
          <Settings size={20} />
        </button>
      </div>
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tải tài liệu lên</label>
            <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              <Upload size={16} className="mr-2" />
              Tải lên
            </button>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ gốc</label>
            <select 
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="auto">Tự động phát hiện</option>
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
              <option value="fr">Tiếng Pháp</option>
              <option value="de">Tiếng Đức</option>
              <option value="ja">Tiếng Nhật</option>
              <option value="ko">Tiếng Hàn</option>
              <option value="zh">Tiếng Trung</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ dịch</label>
            <select 
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
              <option value="fr">Tiếng Pháp</option>
              <option value="de">Tiếng Đức</option>
              <option value="ja">Tiếng Nhật</option>
              <option value="ko">Tiếng Hàn</option>
              <option value="zh">Tiếng Trung</option>
            </select>
          </div>
          
          <div>
            <button className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mt-6">
              <RefreshCw size={16} className="mr-2" />
              Dịch ngay
            </button>
          </div>
        </div>
      </div>
      
      {/* Document Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Document */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Tài liệu gốc</h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Copy size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 h-[500px] overflow-auto">
            <h3 className="font-bold mb-2">Sample Text (English)</h3>
            <p className="mb-4">
              The ONE CMB system is a comprehensive employee and work management system developed on the Next.js and React platform. The system provides an intuitive interface for tracking and managing employee information, task lists, resources, and activities within the enterprise. Integrated with intelligent AI assistants to improve work efficiency.
            </p>
            <p className="mb-4">
              Key features include a dashboard overview, task management, resource management, activity tracking, and AI assistant integration. The system is compatible with multiple screen sizes and offers a responsive interface.
            </p>
            <p>
              The system is built with technologies including Next.js 15.2.3, React 18.3.1, TypeScript, Tailwind CSS, and various other libraries to ensure optimal performance and user experience.
            </p>
          </div>
        </div>
        
        {/* Translated Document */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Bản dịch</h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Copy size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Pen size={16} />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 h-[500px] overflow-auto">
            <h3 className="font-bold mb-2">Văn bản mẫu (Tiếng Việt)</h3>
            <p className="mb-4">
              Hệ thống ONE CMB là hệ thống quản lý nhân viên và công việc toàn diện được phát triển trên nền tảng Next.js và React. Hệ thống cung cấp giao diện trực quan để theo dõi và quản lý thông tin nhân viên, danh sách công việc, tài nguyên và các hoạt động trong doanh nghiệp. Được tích hợp trợ lý AI thông minh giúp nâng cao hiệu quả làm việc.
            </p>
            <p className="mb-4">
              Các tính năng chính bao gồm bảng điều khiển tổng quan, quản lý công việc, quản lý tài nguyên, theo dõi hoạt động và tích hợp trợ lý AI. Hệ thống tương thích với nhiều kích thước màn hình và cung cấp giao diện đáp ứng.
            </p>
            <p>
              Hệ thống được xây dựng với các công nghệ bao gồm Next.js 15.2.3, React 18.3.1, TypeScript, Tailwind CSS và nhiều thư viện khác để đảm bảo hiệu suất tối ưu và trải nghiệm người dùng.
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="flex items-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">
          <X size={16} className="mr-2" />
          Hủy
        </button>
        <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          <Save size={16} className="mr-2" />
          Lưu bản dịch
        </button>
      </div>
    </div>
  );
};

// Template Writing Tool Component
const TemplateWritingTool = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    requester: '',
    date: '',
    amount: '',
    reason: '',
    days: '',
    startDate: '',
    endDate: '',
    equipment: '',
  });
  
  // Organize templates into groups
  const templateGroups = [
    {
      id: 'administrative',
      name: 'Văn bản hành chính',
      templates: [
        { id: '1', name: 'Mẫu công văn, tờ trình, quyết định' },
        { id: '2', name: 'Mẫu giấy mời họp' },
        { id: '4', name: 'Mẫu giấy giới thiệu' },
        { id: '17', name: 'Mẫu giấy đi đường' },
      ]
    },
    {
      id: 'finance',
      name: 'Tài chính kế toán',
      templates: [
        { id: '15', name: 'Mẫu giấy đề nghị thanh toán' },
        { id: '16', name: 'Mẫu giấy đề nghị tạm ứng' },
      ]
    },
    {
      id: 'hr',
      name: 'Nhân sự',
      templates: [
        { id: '20', name: 'Đơn xin nghỉ phép' },
        { id: '21', name: 'Mẫu đề nghị thuê đồ' },
        { id: '12', name: 'Mẫu phiếu giao nhận hồ sơ' },
      ]
    }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Viết nội dung theo mẫu</h1>
        <button className="text-blue-600 hover:text-blue-800">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Selection & Form Column */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="font-semibold mb-4">Chọn loại văn bản</h2>
            
            {/* Group selection dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm văn bản</label>
              <select 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setSelectedTemplate('');
                }}
              >
                <option value="">-- Chọn nhóm văn bản --</option>
                {templateGroups.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>

            {/* Template selection dropdown */}
            {selectedGroup && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại văn bản</label>
                <select 
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">-- Chọn loại văn bản --</option>
                  {templateGroups.find(g => g.id === selectedGroup)?.templates.map((template) => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            {selectedTemplate && (
              <div>
                <h2 className="font-semibold mb-4">Nhập thông tin</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả yêu cầu</label>
                    <textarea
                      name="description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Nhập mô tả chi tiết về nội dung cần tạo..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Người yêu cầu</label>
                      <input
                        type="text"
                        name="requester"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Tên người yêu cầu"
                        value={formData.requester}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày yêu cầu</label>
                      <input
                        type="date"
                        name="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  {/* Form fields for financial templates */}
                  {(selectedTemplate === '15' || selectedTemplate === '16') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
                        <input
                          type="text"
                          name="amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nhập số tiền"
                          value={formData.amount}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lý do</label>
                        <input
                          type="text"
                          name="reason"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Lý do thanh toán/tạm ứng"
                          value={formData.reason}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Form fields for leave request */}
                  {selectedTemplate === '20' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                          <input
                            type="date"
                            name="startDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.startDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                          <input
                            type="date"
                            name="endDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.endDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lý do nghỉ phép</label>
                        <input
                          type="text"
                          name="reason"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Nhập lý do nghỉ phép"
                          value={formData.reason}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Form fields for equipment rental */}
                  {selectedTemplate === '21' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thiết bị cần thuê</label>
                        <input
                          type="text"
                          name="equipment"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Tên và mô tả thiết bị cần thuê"
                          value={formData.equipment}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian thuê (ngày)</label>
                          <input
                            type="number"
                            name="days"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Số ngày thuê thiết bị"
                            value={formData.days}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu thuê</label>
                          <input
                            type="date"
                            name="startDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.startDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                      <RefreshCw size={16} className="mr-2" />
                      Tạo nội dung
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Document Preview Column */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Xem trước nội dung</h2>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Copy size={16} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Download size={16} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Pen size={16} />
                </button>
              </div>
            </div>
            
            {selectedTemplate ? (
              <div className="border border-gray-200 rounded-md p-4 min-h-[400px] mb-4">
                {selectedTemplate === '15' ? (
                  <div className="prose max-w-none">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                      <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
                      <div className="text-right">
                        <p>Hà Nội, ngày {formData.date ? new Date(formData.date).getDate() : new Date().getDate()} tháng {formData.date ? new Date(formData.date).getMonth() + 1 : new Date().getMonth() + 1} năm {formData.date ? new Date(formData.date).getFullYear() : new Date().getFullYear()}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-center mb-4">GIẤY ĐỀ NGHỊ THANH TOÁN</h2>
                    
                    <p><strong>Kính gửi:</strong> Phòng Tài chính Kế toán</p>
                    
                    <p className="mb-2"><strong>Người đề nghị:</strong> {formData.requester || '[Tên người đề nghị]'}</p>
                    <p className="mb-2"><strong>Bộ phận:</strong> Phòng Thiết kế</p>
                    <p className="mb-2"><strong>Số tiền:</strong> {formData.amount || '[Số tiền]'} VNĐ</p>
                    <p className="mb-2"><strong>Bằng chữ:</strong> {formData.amount ? 'Một triệu đồng chẵn' : '[Số tiền bằng chữ]'}</p>
                    <p className="mb-4"><strong>Lý do thanh toán:</strong> {formData.reason || '[Lý do thanh toán]'}</p>
                    
                    <p className="mb-2">Tôi cam đoan những thông tin trên là đúng sự thật và chịu trách nhiệm về đề nghị của mình.</p>
                    
                    <div className="grid grid-cols-2 mt-6">
                      <div className="text-center">
                        <p className="font-bold">Xác nhận của Trưởng bộ phận</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Người đề nghị</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                        <p className="mt-20">{formData.requester}</p>
                      </div>
                    </div>
                  </div>
                ) : selectedTemplate === '20' ? (
                  <div className="prose max-w-none">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                      <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
                      <div className="text-right">
                        <p>Hà Nội, ngày {formData.date ? new Date(formData.date).getDate() : new Date().getDate()} tháng {formData.date ? new Date(formData.date).getMonth() + 1 : new Date().getMonth() + 1} năm {formData.date ? new Date(formData.date).getFullYear() : new Date().getFullYear()}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-center mb-4">ĐƠN XIN NGHỈ PHÉP</h2>
                    
                    <p><strong>Kính gửi:</strong> Ban Giám đốc Công ty CMB</p>
                    
                    <p className="mb-4">Tôi tên là: {formData.requester || '[Họ và tên người xin nghỉ phép]'}</p>
                    <p className="mb-2">Hiện đang công tác tại: Phòng Thiết kế</p>
                    <p className="mb-2">Vị trí: Kỹ sư Thiết kế BIM</p>
                    
                    <p className="mb-2">Nay tôi làm đơn này kính xin Ban Giám đốc cho tôi được nghỉ phép từ ngày {formData.startDate || '[Ngày bắt đầu]'} đến hết ngày {formData.endDate || '[Ngày kết thúc]'}.</p>
                    <p className="mb-4"><strong>Lý do:</strong> {formData.reason || '[Lý do xin nghỉ phép]'}</p>
                    
                    <p className="mb-2">Trong thời gian nghỉ phép, tôi sẽ bàn giao công việc cho đồng nghiệp và đảm bảo không ảnh hưởng đến tiến độ công việc chung.</p>
                    <p className="mb-4">Kính mong Ban Giám đốc xem xét và chấp thuận.</p>
                    <p className="mb-2">Tôi xin chân thành cảm ơn!</p>
                    
                    <div className="grid grid-cols-2 mt-6">
                      <div className="text-center">
                        <p className="font-bold">Ý kiến của Trưởng bộ phận</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Người làm đơn</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                        <p className="mt-20">{formData.requester}</p>
                      </div>
                    </div>
                  </div>
                ) : selectedTemplate === '21' ? (
                  <div className="prose max-w-none">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                      <p className="font-bold">Độc lập - Tự do - Hạnh phúc</p>
                      <div className="text-right">
                        <p>Hà Nội, ngày {formData.date ? new Date(formData.date).getDate() : new Date().getDate()} tháng {formData.date ? new Date(formData.date).getMonth() + 1 : new Date().getMonth() + 1} năm {formData.date ? new Date(formData.date).getFullYear() : new Date().getFullYear()}</p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-center mb-4">PHIẾU ĐỀ NGHỊ THUÊ THIẾT BỊ</h2>
                    
                    <p><strong>Kính gửi:</strong> Phòng Hành chính</p>
                    
                    <p className="mb-2"><strong>Người đề nghị:</strong> {formData.requester || '[Tên người đề nghị]'}</p>
                    <p className="mb-2"><strong>Bộ phận:</strong> Phòng Thiết kế</p>
                    <p className="mb-2"><strong>Thiết bị cần thuê:</strong> {formData.equipment || '[Tên thiết bị]'}</p>
                    <p className="mb-2"><strong>Thời gian thuê:</strong> {formData.days || '___'} ngày</p>
                    <p className="mb-2"><strong>Ngày bắt đầu thuê:</strong> {formData.startDate || '[Ngày bắt đầu]'}</p>
                    <p className="mb-4"><strong>Lý do thuê thiết bị:</strong> {formData.description || '[Lý do thuê thiết bị]'}</p>
                    
                    <p className="mb-4">Kính đề nghị Phòng Hành chính xem xét và phê duyệt.</p>
                    
                    <div className="grid grid-cols-2 mt-6">
                      <div className="text-center">
                        <p className="font-bold">Xác nhận của Trưởng bộ phận</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">Người đề nghị</p>
                        <p>(Ký và ghi rõ họ tên)</p>
                        <p className="mt-20">{formData.requester}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p className="text-center">
                      Vui lòng nhập thông tin và nhấn "Tạo nội dung" để xem trước mẫu văn bản
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-center">
                  Vui lòng chọn một nhóm và loại văn bản để bắt đầu
                </p>
              </div>
            )}
            
            {selectedTemplate && (
              <div className="flex justify-end space-x-4">
                <button className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">
                  <X size={16} className="mr-2" />
                  Hủy
                </button>
                <button className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Lưu tài liệu
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmbToolsDemo;