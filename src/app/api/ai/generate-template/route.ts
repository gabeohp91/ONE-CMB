import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { templateId, formData } = await request.json();
    
    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }
    
    // Here you would integrate with your actual template generation service
    // For now, we'll return a mock response
    
    // Mock implementation
    let generatedContent = '';
    
    switch (templateId) {
      case '15': // Mẫu giấy đề nghị thanh toán
        generatedContent = `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-------------------

GIẤY ĐỀ NGHỊ THANH TOÁN

Kính gửi: Ban Giám đốc Công ty CMB

Tôi tên là: ${formData.requester || '[Họ và tên người đề nghị]'}
Ngày: ${formData.date || '[Ngày đề nghị]'}
Số tiền đề nghị: ${formData.amount ? formData.amount.toLocaleString() + ' VNĐ' : '[Số tiền]'}
Bằng chữ: _______________________________________________

Lý do thanh toán: ${formData.reason || '[Lý do thanh toán]'}

Đề nghị Ban Giám đốc xem xét và phê duyệt.

Xin trân trọng cảm ơn!

Người đề nghị
(Ký, ghi rõ họ tên)

${formData.requester || '_________________'}
        `;
        break;
        
      case '20': // Đơn xin nghỉ phép
        generatedContent = `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
-------------------

ĐƠN XIN NGHỈ PHÉP

Kính gửi: Ban Giám đốc Công ty CMB

Tôi tên là: ${formData.requester || '[Họ và tên người xin nghỉ]'}

Tôi làm đơn này kính xin Ban Giám đốc cho tôi được nghỉ phép ${formData.days || '[Số ngày]'} ngày, từ ngày ${formData.startDate || '[Ngày bắt đầu]'} đến hết ngày ${formData.endDate || '[Ngày kết thúc]'}.

Lý do: ${formData.reason || '[Lý do xin nghỉ]'}

Trong thời gian nghỉ phép, tôi sẽ bàn giao công việc và đảm bảo không ảnh hưởng đến hoạt động chung của công ty.

Tôi xin chân thành cảm ơn!

Ngày ... tháng ... năm 20...
Người làm đơn
(Ký, ghi rõ họ tên)

${formData.requester || '_________________'}
        `;
        break;
        
      default:
        generatedContent = 'Nội dung mẫu chưa được cấu hình cho template này.';
    }
    
    return NextResponse.json({ generatedContent });
  } catch (error) {
    console.error('Template generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate template content' },
      { status: 500 }
    );
  }
}