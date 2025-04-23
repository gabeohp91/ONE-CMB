# ONE CMB - Hệ thống Quản lý Nhân viên và Công việc

<div align="center">
  <img src="path/to/logo.png" alt="ONE CMB Logo" width="200" height="auto">
  <h3>Nền tảng quản lý nhân sự và công việc dành cho doanh nghiệp hiện đại</h3>
</div>

## 📖 Tổng quan

ONE CMB là hệ thống quản lý nhân viên và công việc toàn diện được phát triển trên nền tảng Next.js và React. Hệ thống cung cấp giao diện trực quan để theo dõi và quản lý thông tin nhân viên, danh sách công việc, tài nguyên, và các hoạt động trong doanh nghiệp. Được tích hợp trợ lý AI thông minh giúp nâng cao hiệu quả làm việc.

## ✨ Tính năng chính

- **Bảng điều khiển tổng quan**: Hiển thị thông tin nhân viên và các công việc quan trọng
- **Quản lý công việc**: Theo dõi, phân công và cập nhật tiến độ công việc
- **Quản lý tài nguyên**: Quản lý thiết bị, phần mềm và dữ liệu
- **Theo dõi hoạt động**: Quản lý các hoạt động đến và đi trong hệ thống
- **Trợ lý AI tích hợp**: Hỗ trợ trả lời câu hỏi và đề xuất hành động
- **Giao diện đáp ứng**: Tương thích với nhiều kích thước màn hình

## 🚀 Công nghệ sử dụng

- **Frontend Framework**: Next.js 15.2.3
- **UI Library**: React 18.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand, React Query
- **Authentication**: Firebase
- **UI Components**: Radix UI, Shadcn UI
- **Charting**: Recharts
- **Testing**: Jest
- **Linting**: ESLint
- **APIs**: REST API

## 🏗 Cấu trúc dự án

```
src/
├── app/               # Các thành phần chính của Next.js
│   ├── api/           # API routes
│   ├── globals.css    # Styles toàn cục
│   ├── layout.tsx     # Layout chính
│   └── page.tsx       # Trang chính
│
├── components/        # UI Components
│   ├── AIAssistant/   # Trợ lý AI
│   ├── AppSidebar/    # Sidebar
│   ├── Header/        # Header
│   └── ui/            # UI components
│
├── data/              # Mock data
│
├── features/          # Các tính năng của ứng dụng
│   ├── resources/     # Quản lý tài nguyên
│   └── tasks/         # Quản lý công việc
│
├── hooks/             # Custom React hooks
│
├── lib/               # Thư viện và tiện ích
│   ├── providers.tsx  # Context Providers
│   ├── react-query.ts # Cấu hình React Query
│   └── utils.ts       # Utility functions
│
├── modules/           # Các module chức năng
│   ├── ai-assistant/  # Module trợ lý AI
│   ├── activities/    # Module hoạt động
│   ├── employees/     # Module nhân viên
│   ├── shared/        # Shared modules
│   └── tasks/         # Module công việc
│
├── services/          # API services
│
└── shared/            # Thành phần dùng chung
    ├── components/    # Shared components
    ├── hooks/         # Shared hooks
    ├── services/      # Shared services
    ├── stores/        # Zustand stores
    ├── types/         # TypeScript types
    └── utils/         # Utility functions
```

## 📋 Yêu cầu hệ thống

- Node.js 18.x hoặc cao hơn
- npm hoặc yarn

## 🔧 Cài đặt và Cấu hình

1. **Clone dự án**

```bash
git clone https://github.com/your-org/one-cmb.git
cd one-cmb
```

2. **Cài đặt dependencies**

```bash
npm install
# hoặc
yarn install
```

3. **Chạy môi trường development**

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:9002`

Để chạy với Turbopack:

```bash
npm run dev:turbo
# hoặc
yarn dev:turbo
```

4. **Build cho production**

```bash
npm run build
# hoặc
yarn build
```

5. **Khởi chạy bản production**

```bash
npm run start
# hoặc
yarn start
```

## 🧪 Kiểm thử

Chạy unit tests:

```bash
npm run test
# hoặc
yarn test
```

Chạy tests trong chế độ watch:

```bash
npm run test:watch
# hoặc
yarn test:watch
```

## 📚 Mô tả chức năng chính

### 1. Bảng điều khiển tổng quan

Hiển thị thông tin chi tiết về nhân viên và các công việc quan trọng nhất. Cung cấp cái nhìn tổng quan về tình trạng công việc và dự án hiện tại.

### 2. Quản lý công việc

- Theo dõi danh sách công việc
- Phân loại theo trạng thái: Đang thực hiện, Hoàn thành, Quá hạn
- Hiển thị tiến độ công việc
- Phân công công việc cho nhân viên
- Cập nhật trạng thái công việc

### 3. Quản lý tài nguyên

- Quản lý thiết bị được cấp
- Quản lý phần mềm và giấy phép
- Quản lý dữ liệu và tài liệu
- Yêu cầu tài nguyên mới

### 4. Theo dõi hoạt động

- Quản lý hoạt động đến: cuộc họp, đào tạo, yêu cầu, thông báo
- Quản lý hoạt động đi: đơn xin nghỉ phép, đề xuất, báo cáo
- Theo dõi trạng thái của từng hoạt động

### 5. Trợ lý AI

- Trả lời câu hỏi của người dùng
- Đề xuất hành động dựa trên ngữ cảnh
- Cung cấp trợ giúp theo ngữ cảnh
- Tương tác thông qua giao diện chat

## 🔄 Quy trình làm việc

1. **Đăng nhập vào hệ thống**
2. **Xem bảng điều khiển tổng quan** để nắm bắt thông tin
3. **Quản lý công việc** của bản thân và/hoặc nhóm
4. **Theo dõi và phản hồi các hoạt động** đến và đi
5. **Quản lý tài nguyên** được cấp
6. **Sử dụng trợ lý AI** để hỗ trợ khi cần

## 🛠️ Công cụ phát triển

- ESLint: Kiểm tra và chuẩn hóa code
- Prettier: Format code
- TypeScript: Kiểm tra type
- Jest: Testing framework

## 🧩 Mô đun và Hooks chính

- `useAIAssistant`: Hook quản lý trạng thái và tương tác với trợ lý AI
- `useEmployee`: Hook quản lý thông tin nhân viên
- `useTaskData`: Hook quản lý dữ liệu công việc
- `useErrorHandler`: Hook xử lý lỗi
- `useDataFetch`: Hook tổng quát để fetch dữ liệu

## 👥 Vai trò người dùng

Hệ thống hỗ trợ các vai trò sau:

- **Nhân viên**: Xem và cập nhật công việc của họ
- **Quản lý**: Quản lý nhân viên và phân công công việc
- **Admin**: Quản lý toàn bộ hệ thống

## 🔒 Bảo mật

- Xác thực người dùng thông qua Firebase
- Phân quyền dựa trên vai trò
- Bảo vệ API routes
- Middleware bảo mật

## 🌐 Môi trường triển khai

Hệ thống có thể được triển khai trên các nền tảng sau:

- Vercel
- Netlify
- AWS
- Google Cloud Platform
- Azure

## 📈 Kế hoạch phát triển

- [ ] Thêm nhiều biểu đồ báo cáo
- [ ] Tích hợp hệ thống thông báo realtime
- [ ] Mobile app cho iOS và Android
- [ ] Tính năng quản lý dự án nâng cao
- [ ] Tích hợp với các dịch vụ bên thứ ba (Slack, Microsoft Teams, v.v.)
