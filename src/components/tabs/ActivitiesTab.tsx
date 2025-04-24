import React from 'react';
import { notificationData } from '@/data/notificationData';
import { employeeInfo } from '@/data/employeeInfo';
import {
  Briefcase, Clock, Check, X, Users, FileText, BarChart2, Share2,
  Calendar, HardDrive, Paperclip, Plus
} from 'lucide-react';

interface ActivitiesTabProps {
  activityTab: string;
  setActivityTab: (tab: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ activityTab, setActivityTab }) => {
  // Accessing the data from employeeInfo
  const incomingActivities = employeeInfo.incoming;
  const outgoingActivities = employeeInfo.outgoing;

  return (
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
              {incomingActivities.map((activity, index) => {
                // Determine the icon based on activity type
                let Icon;
                let iconBgColor;
                let iconTextColor;

                switch (activity.type) {
                  case 'meeting':
                    Icon = Users;
                    iconBgColor = 'bg-blue-100';
                    iconTextColor = 'text-blue-600';
                    break;
                  case 'training':
                    Icon = FileText;
                    iconBgColor = 'bg-green-100';
                    iconTextColor = 'text-green-600';
                    break;
                  case 'project':
                    Icon = BarChart2;
                    iconBgColor = 'bg-yellow-100';
                    iconTextColor = 'text-yellow-600';
                    break;
                  case 'user':
                    Icon = Share2;
                    iconBgColor = 'bg-blue-100';
                    iconTextColor = 'text-blue-600';
                    break;
                  case 'task':
                    Icon = Briefcase;
                    iconBgColor = 'bg-purple-100';
                    iconTextColor = 'text-purple-600';
                    break;
                  default:
                    Icon = FileText;
                    iconBgColor = 'bg-gray-100';
                    iconTextColor = 'text-gray-600';
                }

                // Get status color
                let statusBgColor;
                let statusTextColor;

                switch (activity.status) {
                  case 'Sắp diễn ra':
                    statusBgColor = 'bg-blue-100';
                    statusTextColor = 'text-blue-800';
                    break;
                  case 'Đang xử lý':
                    statusBgColor = 'bg-yellow-100';
                    statusTextColor = 'text-yellow-800';
                    break;
                  case 'Đã xem':
                    statusBgColor = 'bg-green-100';
                    statusTextColor = 'text-green-800';
                    break;
                  case 'Đang thực hiện':
                    statusBgColor = 'bg-blue-100';
                    statusTextColor = 'text-blue-800';
                    break;
                  default:
                    statusBgColor = 'bg-gray-100';
                    statusTextColor = 'text-gray-800';
                }

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center mr-3`}>
                          <Icon size={18} className={iconTextColor} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{activity.title}</div>
                          <div className="text-xs text-gray-500">{activity.details}</div>
                        </div>
                      </div>
                      <div>
                        <span className={`px-2 py-1 ${statusBgColor} ${statusTextColor} text-xs rounded-full`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    {activity.content && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activity.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
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
              {outgoingActivities.map((activity, index) => {
                // Determine the icon based on activity type
                let Icon;
                let iconBgColor;
                let iconTextColor;

                switch (activity.type) {
                  case 'leave':
                    Icon = Calendar;
                    iconBgColor = 'bg-green-100';
                    iconTextColor = 'text-green-600';
                    break;
                  case 'request':
                    Icon = activity.title.includes('thiết bị') ? HardDrive : Paperclip;
                    iconBgColor = activity.title.includes('thiết bị') ? 'bg-blue-100' : 'bg-purple-100';
                    iconTextColor = activity.title.includes('thiết bị') ? 'text-blue-600' : 'text-purple-600';
                    break;
                  case 'report':
                    Icon = FileText;
                    iconBgColor = 'bg-yellow-100';
                    iconTextColor = 'text-yellow-600';
                    break;
                  case 'overtime':
                    Icon = Clock;
                    iconBgColor = 'bg-red-100';
                    iconTextColor = 'text-red-600';
                    break;
                  default:
                    Icon = FileText;
                    iconBgColor = 'bg-gray-100';
                    iconTextColor = 'text-gray-600';
                }

                // Get status color
                let statusBgColor;
                let statusTextColor;

                switch (activity.status) {
                  case 'Đã duyệt':
                    statusBgColor = 'bg-green-100';
                    statusTextColor = 'text-green-800';
                    break;
                  case 'Đang xử lý':
                    statusBgColor = 'bg-yellow-100';
                    statusTextColor = 'text-yellow-800';
                    break;
                  case 'Từ chối':
                    statusBgColor = 'bg-red-100';
                    statusTextColor = 'text-red-800';
                    break;
                  default:
                    statusBgColor = 'bg-gray-100';
                    statusTextColor = 'text-gray-800';
                }

                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center mr-3`}>
                          <Icon size={18} className={iconTextColor} />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{activity.title}</div>
                          <div className="text-xs text-gray-500">{activity.details}</div>
                        </div>
                      </div>
                      <div>
                        <span className={`px-2 py-1 ${statusBgColor} ${statusTextColor} text-xs rounded-full`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    {activity.content && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activity.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivitiesTab;