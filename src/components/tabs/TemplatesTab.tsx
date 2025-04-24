import React, { useState } from 'react';
import { Settings, RefreshCw, Copy, Download, Pen, Save, X } from 'lucide-react';
import { templateGroups } from '@/data/aiTools/templates/templateGroups';

const TemplatesTab: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
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
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateContent = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let content = '';
      
      switch (selectedTemplate) {
        case '15': // Mẫu giấy đề nghị thanh toán
          content = `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-------------------

GIẤY ĐỀ NGHỊ THANH TOÁN

Kính gửi: Ban Giám đốc Công ty CMB

Tôi tên là: ${formData.requester || '[Họ và tên người đề nghị]'}
Ngày: ${formData.date || new Date().toLocaleDateString()}
Số tiền đề nghị: ${formData.amount ? formData.amount + ' VNĐ' : '[Số tiền]'}
Bằng chữ: ${formData.amount ? 'Một triệu đồng chẵn' : '_______________________________________________'}

Lý do thanh toán: ${formData.reason || '[Lý do thanh toán]'}

Đề nghị Ban Giám đốc xem xét và phê duyệt.

Xin trân trọng cảm ơn!

Người đề nghị
(Ký, ghi rõ họ tên)

${formData.requester || '_________________'}
          `;
          break;
          
        case '20': // Đơn xin nghỉ phép
          content = `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-------------------

ĐƠN XIN NGHỈ PHÉP

Kính gửi: Ban Giám đốc Công ty CMB

Tôi tên là: ${formData.requester || '[Họ và tên người xin nghỉ]'}

Tôi làm đơn này kính xin Ban Giám đốc cho tôi được nghỉ phép từ ngày ${formData.startDate || '[Ngày bắt đầu]'} đến hết ngày ${formData.endDate || '[Ngày kết thúc]'}.

Lý do: ${formData.reason || '[Lý do xin nghỉ]'}

Trong thời gian nghỉ phép, tôi sẽ bàn giao công việc và đảm bảo không ảnh hưởng đến hoạt động chung của công ty.

Tôi xin chân thành cảm ơn!

Ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}
Người làm đơn
(Ký, ghi rõ họ tên)

${formData.requester || '_________________'}
          `;
          break;
          
        case '21': // Mẫu đề nghị thuê đồ
          content = `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-------------------

PHIẾU ĐỀ NGHỊ THUÊ THIẾT BỊ

Kính gửi: Phòng Hành chính

Tôi tên là: ${formData.requester || '[Họ và tên người đề nghị]'}
Bộ phận: Phòng Thiết kế
Thiết bị cần thuê: ${formData.equipment || '[Tên thiết bị]'}
Thời gian thuê: ${formData.days || '___'} ngày
Ngày bắt đầu thuê: ${formData.startDate || '[Ngày bắt đầu]'}

Lý do thuê thiết bị: ${formData.description || '[Lý do thuê thiết bị]'}

Kính đề nghị Phòng Hành chính xem xét và phê duyệt.

Ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}

Xác nhận của Trưởng bộ phận             Người đề nghị
     (Ký, ghi rõ họ tên)               (Ký, ghi rõ họ tên)


_______________________             ${formData.requester || '_________________'}
          `;
          break;
          
        default:
          content = 'Vui lòng chọn một mẫu văn bản để tạo nội dung.';
      }
      
      setGeneratedContent(content);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
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
    setGeneratedContent('');
  };

  // Get the template object for the selected template
  const selectedTemplateObject = selectedTemplate 
    ? templateGroups.flatMap(g => g.templates).find(t => t.id === selectedTemplate)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Viết nội dung theo mẫu</h1>
        <button className="text-blue-600 hover:text-blue-800">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Template Selection & Form Column */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="font-semibold mb-4">Chọn loại văn bản</h2>
            
            {/* Group selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm mẫu</label>
              <div className="flex flex-wrap gap-2">
                {templateGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => {
                      setSelectedGroup(group.id);
                      setSelectedTemplate(''); // Reset the selected template
                    }}
                    className={`px-4 py-2 text-sm rounded-full font-medium ${
                      selectedGroup === group.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Template selection */}
            {selectedGroup && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại mẫu</label>
                <div className="grid grid-cols-1 gap-2">
                  {templateGroups
                    .find((group) => group.id === selectedGroup)
                    ?.templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`px-4 py-3 border text-left rounded-md hover:bg-gray-50 ${
                          selectedTemplate === template.id
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{template.name}</div>
                        {template.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {template.description}
                          </div>
                        )}
                      </button>
                    ))}
                </div>
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
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Làm mới
                    </button>
                    <button 
                      onClick={generateContent}
                      disabled={isLoading}
                      className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      {isLoading ? 'Đang tạo...' : (
                        <>
                          <RefreshCw size={16} className="mr-2" />
                          Tạo nội dung
                        </>
                      )}
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
            
            {generatedContent ? (
              <div className="border border-gray-200 rounded-md p-4 min-h-[400px] mb-4 font-mono whitespace-pre-line text-sm overflow-auto">
                {generatedContent}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-500 border border-gray-200 rounded-md">
                <p className="text-center">
                  {selectedTemplate 
                    ? 'Vui lòng nhập thông tin và nhấn "Tạo nội dung" để xem trước mẫu văn bản'
                    : 'Vui lòng chọn một nhóm và loại văn bản để bắt đầu'
                  }
                </p>
              </div>
            )}
            
            {generatedContent && (
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

export default TemplatesTab;