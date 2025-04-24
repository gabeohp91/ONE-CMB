import { Template } from './templateGroups';

export interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'date' | 'number';
  placeholder?: string;
  required?: boolean;
}

export interface TemplateType {
  templateId: string;
  fields: TemplateField[];
}

export const templateTypes: TemplateType[] = [
  {
    templateId: '15', // Mẫu giấy đề nghị thanh toán
    fields: [
      { id: 'requester', name: 'Người đề nghị', type: 'text', required: true },
      { id: 'date', name: 'Ngày đề nghị', type: 'date', required: true },
      { id: 'amount', name: 'Số tiền', type: 'number', required: true },
      { id: 'reason', name: 'Lý do thanh toán', type: 'textarea', required: true }
    ]
  },
  {
    templateId: '16', // Mẫu giấy đề nghị tạm ứng
    fields: [
      { id: 'requester', name: 'Người đề nghị', type: 'text', required: true },
      { id: 'date', name: 'Ngày đề nghị', type: 'date', required: true },
      { id: 'amount', name: 'Số tiền', type: 'number', required: true },
      { id: 'reason', name: 'Lý do tạm ứng', type: 'textarea', required: true }
    ]
  },
  {
    templateId: '20', // Đơn xin nghỉ phép
    fields: [
      { id: 'requester', name: 'Người xin nghỉ', type: 'text', required: true },
      { id: 'days', name: 'Số ngày nghỉ', type: 'number', required: true },
      { id: 'startDate', name: 'Ngày bắt đầu', type: 'date', required: true },
      { id: 'endDate', name: 'Ngày kết thúc', type: 'date', required: true },
      { id: 'reason', name: 'Lý do', type: 'textarea', required: true }
    ]
  },
  {
    templateId: '21', // Mẫu đề nghị thuê đồ
    fields: [
      { id: 'requester', name: 'Người đề nghị', type: 'text', required: true },
      { id: 'date', name: 'Ngày đề nghị', type: 'date', required: true },
      { id: 'equipment', name: 'Thiết bị/Đồ dùng', type: 'textarea', required: true },
      { id: 'reason', name: 'Mục đích sử dụng', type: 'textarea', required: true }
    ]
  }
];