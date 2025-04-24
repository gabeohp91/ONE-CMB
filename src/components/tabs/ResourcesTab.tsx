import React from 'react';
import { equipmentData, softwareData } from '@/data/resourceData';
import { 
  AlertTriangle, ExternalLink, HardDrive, Settings, Search,
  Upload, Plus, ChevronRight, Briefcase, FileText, Users, MapPin,
  Download
} from 'lucide-react';

interface ResourcesTabProps {
  resourceTab: string;
  setResourceTab: (tab: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ resourceTab, setResourceTab }) => {
  return (
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
  );
};

export default ResourcesTab;