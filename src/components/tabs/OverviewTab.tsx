import React from 'react';
import { employeeInfo } from '@/data/employeeInfo';
import { currentTasks } from '@/data/currentTasks';
import { Briefcase, User, Mail, Phone, Calendar } from 'lucide-react';

interface OverviewTabProps {
  taskStats?: {
    total?: number;
    completed?: number;
    inProgress?: number;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({ taskStats }) => {
  return (
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

      {/* Task Statistics */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Tasks</h3>
            <p className="text-2xl font-semibold">{taskStats?.total || 0}</p>
            <div className="text-sm mt-2">
              <span className="text-green-600">{taskStats?.completed || 0} completed</span>
              <span className="text-yellow-600 ml-2">{taskStats?.inProgress || 0} in progress</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Performance</h3>
            <p className="text-2xl font-semibold">92%</p>
            <div className="text-sm mt-2 text-green-600">+5% from last month</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming</h3>
            <p className="text-2xl font-semibold">3</p>
            <div className="text-sm mt-2">2 tasks, 1 meeting</div>
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
  );
};

export default OverviewTab;