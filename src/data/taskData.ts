import { Employee } from "./employeeData";



export type Task = {
    id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Completed";
    dueDate?: string;
    assignedTo?: string;
    priority: "Low" | "Medium" | "High";
    type?: string
  }

  export type TaskHistory = {
    id: number;
    name: string;
    completedDate: string;
    status: string;
    statusColor: string;
    project: string;
    feedback: string;
  };
  export type CurrentTask = {
    id: number;
    name: string;
    dueDate: string;
    status: string;
    statusColor: string;
    priority: string;
    progress: number;
    project: string;
  };
  export const currentTasks: CurrentTask[] = [
    { id: 1, name: 'Công việc 1', dueDate: '20/03/2025', status: 'Đang thực hiện', statusColor: 'bg-blue-500', priority: 'Cao', progress: 65, project: 'Dự án A', },
    { id: 2, name: 'Công việc 2', dueDate: '18/03/2025', status: 'Đang thực hiện', statusColor: 'bg-blue-500', priority: 'Trung bình', progress: 30, project: 'Dự án B', },
    { id: 3, name: 'Công việc 3', dueDate: '25/03/2025', status: 'Chưa bắt đầu', statusColor: 'bg-gray-500', priority: 'Thấp', progress: 0, project: 'Dự án C', },
  ];
  export const taskHistory: TaskHistory[] = [
    { id: 101, name: 'Công việc đã hoàn thành 1', completedDate: '10/03/2025', status: 'Hoàn thành', statusColor: 'bg-green-500', project: 'Dự án D', feedback: 'Tốt, đáp ứng yêu cầu', },
    { id: 102, name: 'Công việc đã hoàn thành 2', completedDate: '05/03/2025', status: 'Hoàn thành', statusColor: 'bg-green-500', project: 'Dự án E', feedback: 'Tốt, phát hiện và sửa nhiều lỗi quan trọng', },
  ];
  
export const taskData: Task[] = [
    {
      id: "1",
      title: "Thiết kế giao diện trang chủ",
      description: "Thiết kế giao diện trang chủ cho ứng dụng web mới",
      status: "To Do",
      dueDate: "2023-12-15",
      assignedTo: "1",
      priority: "High",
      type: "Thiết kế",
    },
    {
      id: "2",
      title: "Phát triển chức năng đăng nhập",
      description: "Phát triển chức năng đăng nhập cho ứng dụng web",
      status: "In Progress",
      dueDate: "2023-12-20",
      assignedTo: "2",
      priority: "High",
      type: "Lập trình",
    },
    {
      id: "3",
      title: "Viết báo cáo dự án",
      description: "Viết báo cáo tiến độ dự án cho tuần này",
      status: "To Do",
      dueDate: "2023-12-10",
      assignedTo: "3",
      priority: "Medium",
      type: "Báo cáo",
    },
    {
      id: "4",
      title: "Kiểm thử chức năng thanh toán",
      description: "Kiểm thử chức năng thanh toán trên ứng dụng web",
      status: "Completed",
      dueDate: "2023-12-05",
      assignedTo: "4",
      priority: "High",
      type: "Kiểm thử",
    },
    {
      id: "5",
      title: "Lên kế hoạch họp",
      description: "Lên kế hoạch họp nhóm vào thứ sáu",
      status: "To Do",
      dueDate: "2023-12-12",
      assignedTo: "1",
      priority: "Low",
      type: "Lập kế hoạch",
    },
    {
      id: "6",
      title: "Tối ưu hóa hiệu năng",
      description: "Tối ưu hóa hiệu năng cho ứng dụng di động",
      status: "In Progress",
      dueDate: "2023-12-25",
      assignedTo: "2",
      priority: "Medium",
      type: "Lập trình",
    },
    {
      id: "7",
      title: "Thiết kế logo",
      description: "Thiết kế logo cho sản phẩm mới",
      status: "To Do",
      dueDate: "2023-12-18",
      assignedTo: "3",
      priority: "Medium",
      type: "Thiết kế",
    },
    {
      id: "8",
      title: "Viết tài liệu hướng dẫn",
      description: "Viết tài liệu hướng dẫn sử dụng cho người dùng",
      status: "To Do",
      dueDate: "2023-12-22",
      assignedTo: "4",
      priority: "Low",
      type: "Viết tài liệu",
    },
    {
      id: "9",
      title: "Triển khai API",
      description: "Triển khai API cho ứng dụng mobile",
      status: "In Progress",
      dueDate: "2023-12-28",
      assignedTo: "1",
      priority: "High",
      type: "Lập trình",
    },
    {
      id: "10",
      title: "Kiểm tra lỗi",
      description: "Kiểm tra và báo cáo các lỗi hệ thống",
      status: "To Do",
      dueDate: "2023-12-14",
      assignedTo: "2",
      priority: "Medium",
      type: "Kiểm thử",
    },
    
];