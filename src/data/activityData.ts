// src/data/activityData.ts

export const activityData = {
  schedule: [
    {
      id: 1,
      title: 'Họp dự án Cảng XYZ',
      date: '16/03/2025 09:00',
      location: 'Phòng họp A',
      organizer: 'Lê Minh Hiếu',
      type: 'Cuộc họp',
    },
    {
      id: 2,
      title: 'Đào tạo sử dụng phần mềm BIM mới',
      date: '18/03/2025 14:00-17:00',
      location: 'Phòng đào tạo',
      organizer: 'Phòng IT',
      type: 'Đào tạo',
    },
    {
      id: 3,
      title: 'Kiểm tra hiện trường dự án Cảng DEF',
      date: '21/03/2025 (cả ngày)',
      location: 'Cảng DEF',
      organizer: 'Phòng Dự án',
      type: 'Công tác',
    },
  ],
  notifications: [
    {
      id: 1,
      title: 'Duyệt đơn xin nghỉ phép',
      date: '14/03/2025',
      status: 'Đã duyệt',
      statusColor: 'bg-green-500',
    },
    {
      id: 2,
      title: 'Yêu cầu cấp phát văn phòng phẩm',
      date: '10/03/2025',
      status: 'Đã duyệt',
      statusColor: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Đề xuất tăng ca dự án XYZ',
      date: '08/03/2025',
      status: 'Đang xử lý',
      statusColor: 'bg-yellow-500',
    },
  ],
};