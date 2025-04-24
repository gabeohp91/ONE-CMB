// Define types
export interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface TemplateGroup {
  id: string;
  name: string;
  templates: Template[];
}

// Export template groups data
export const templateGroups: TemplateGroup[] = [
  {
    id: 'administrative',
    name: 'Văn bản hành chính',
    templates: [
      { id: '1', name: 'Mẫu công văn, tờ trình, quyết định', category: 'administrative' },
      { id: '2', name: 'Mẫu giấy mời họp', category: 'administrative' },
      { id: '4', name: 'Mẫu giấy giới thiệu', category: 'administrative' },
      { id: '17', name: 'Mẫu giấy đi đường', category: 'administrative' },
    ]
  },
  {
    id: 'finance',
    name: 'Tài chính kế toán',
    templates: [
      { id: '15', name: 'Mẫu giấy đề nghị thanh toán', category: 'finance' },
      { id: '16', name: 'Mẫu giấy đề nghị tạm ứng', category: 'finance' },
    ]
  },
  {
    id: 'hr',
    name: 'Nhân sự',
    templates: [
      { id: '20', name: 'Đơn xin nghỉ phép', category: 'hr' },
      { id: '21', name: 'Mẫu đề nghị thuê đồ', category: 'hr' },
      { id: '12', name: 'Mẫu phiếu giao nhận hồ sơ', category: 'hr' },
    ]
  }
];