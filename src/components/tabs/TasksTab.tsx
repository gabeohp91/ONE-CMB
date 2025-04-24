import React from 'react';
import { Briefcase, Clock, Check, Circle, Search, Filter, Play, Pause, ExternalLink, MessageSquare } from 'lucide-react';
import { currentTasks as defaultTasks } from '@/data/currentTasks';

interface TasksTabProps {
  currentTasks?: any[];
  isLoading?: boolean;
  error?: any;
  setChatExpanded?: (value: boolean) => void;
}

const TasksTab: React.FC<TasksTabProps> = ({ 
  currentTasks = defaultTasks, 
  isLoading = false, 
  error = null,
  setChatExpanded 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Công việc</h1>
        {setChatExpanded && (
          <button 
            className="text-blue-600 text-sm flex items-center"
            onClick={() => setChatExpanded(true)}
          >
            <MessageSquare size={14} className="mr-1" />
            Analyze Tasks
          </button>
        )}
      </div>

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

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading tasks...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-800">
              Error loading tasks: {error.message}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksTab;