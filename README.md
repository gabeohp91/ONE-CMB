# Tài liệu dự án ONE CMB

## Tổng quan dự án

ONE CMB là một ứng dụng web quản lý dành cho công ty xây dựng và thiết kế, được phát triển bằng Next.js, TypeScript và Tailwind CSS. Nền tảng này cung cấp các công cụ quản lý công việc, dự án, nhân sự và tài nguyên với giao diện thân thiện và trải nghiệm người dùng tối ưu.

Dự án đang trong quá trình chuyển đổi kiến trúc từ cấu trúc truyền thống sang kiến trúc dựa trên tính năng kết hợp với thiết kế component nguyên tử, nhằm đạt được các mục tiêu:
- Cải thiện tính module hóa và khả năng tái sử dụng mã
- Tăng cường khả năng bảo trì và mở rộng
- Nâng cao hiệu suất và trải nghiệm người dùng
- Áp dụng nhất quán các nguyên tắc thiết kế hiện đại

## Các tính năng chính

ONE CMB là một hệ thống toàn diện với các chức năng:

1. **Bảng điều khiển (Dashboard)** - Hiển thị tổng quan các chỉ số và thông tin quan trọng
2. **Quản lý công việc (Tasks)** - Theo dõi tiến độ, phân công và quản lý công việc
3. **Quản lý tài nguyên (Resources)** - Quản lý thiết bị, phần mềm và tài liệu
4. **Quản lý hoạt động (Activities)** - Theo dõi lịch họp, đào tạo và thông báo
5. **Trợ lý AI tích hợp** - Hỗ trợ người dùng với giao diện chat thông minh

Giao diện được thiết kế với khả năng:
- Hiển thị thông tin cá nhân của nhân viên
- Theo dõi và cập nhật công việc
- Quản lý tài nguyên và tài liệu
- Xem lịch biểu và hoạt động sắp tới

## Kiến trúc dự án

### Cấu trúc thư mục

Dự án được tổ chức theo kiến trúc dựa trên tính năng, giúp code được phân nhóm theo chức năng thay vì theo lớp kỹ thuật:

```
src/
├── features/           # Module dựa trên tính năng
│   ├── auth/           # Xác thực người dùng
│   ├── dashboard/      # Tổng quan bảng điều khiển
│   ├── tasks/          # Quản lý nhiệm vụ
│   ├── resources/      # Quản lý tài nguyên
│   ├── activities/     # Quản lý hoạt động
│   └── ai-assistant/   # Trợ lý AI chat
├── shared/             # Tài nguyên dùng chung
│   ├── components/     # Component UI có thể tái sử dụng
│   ├── hooks/          # React hooks tùy chỉnh
│   ├── utils/          # Các hàm tiện ích
│   ├── services/       # Dịch vụ API
│   └── types/          # Các định nghĩa kiểu TypeScript
├── styles/             # Style toàn cục
├── lib/                # Cấu hình thư viện bên thứ ba
└── app/                # Cấu trúc router của Next.js
```

### Cấu trúc module tính năng

Mỗi module tính năng tuân theo cấu trúc nội bộ nhất quán:

```
features/feature-name/
├── components/         # Component đặc thù cho tính năng
├── hooks/              # Hook tùy chỉnh cho tính năng
├── services/           # Dịch vụ đặc thù cho tính năng
├── types/              # Kiểu dữ liệu đặc thù cho tính năng
└── index.ts            # API công khai của tính năng
```

## Thiết kế Component Nguyên Tử (Atomic Design)

ONE CMB áp dụng phương pháp thiết kế nguyên tử, sắp xếp các component UI theo thứ bậc phức tạp tăng dần:

### 1. Nguyên tử (Atoms)

Các thành phần UI cơ bản nhất, không thể chia nhỏ hơn.

Ví dụ:
- `Button`
- `StatusBadge`
- `PriorityBadge`
- `ProgressBar`

Vị trí: `/src/shared/components/atoms/`

### 2. Phân tử (Molecules)

Sự kết hợp của nhiều nguyên tử để tạo thành các đơn vị chức năng đơn giản.

Ví dụ:
- `TaskStatusDisplay` (kết hợp StatusBadge, PriorityBadge và ProgressBar)

Vị trí: `/src/shared/components/molecules/`

### 3. Sinh vật (Organisms)

Các component phức tạp được tạo từ nhiều phân tử và/hoặc nguyên tử.

Ví dụ:
- `TaskCard`
- `TaskList`
- `ResourceItem`
- `AIAssistant`

Vị trí: `/src/features/*/components/`

### 4. Template

Kết hợp nhiều sinh vật để tạo thành cấu trúc trang, tập trung vào bố cục.

Ví dụ:
- `EmployeeDashboard`

### 5. Trang (Pages)

Các trường hợp cụ thể của template với dữ liệu thực tế.

Ví dụ:
- `/src/app/page.tsx`

## Quản lý dữ liệu và State

ONE CMB đang áp dụng chiến lược quản lý dữ liệu hiện đại với sự kết hợp của:

### Các công nghệ chính

1. **React Query** - Dùng cho quản lý state phía server:
   - Lấy dữ liệu
   - Caching thông minh
   - Lấy lại dữ liệu tự động
   - Quản lý mutations

2. **Zustand** - Dùng cho state phía client:
   - State UI toàn cục
   - Quản lý xác thực
   - Lưu trữ state giữa các phiên

3. **API Client** - Sử dụng Axios với các tính năng:
   - Xử lý lỗi nhất quán
   - Xác thực request tự động
   - Bộ chặn request/response

4. **TypeScript** - Đảm bảo an toàn kiểu dữ liệu:
   - Model dữ liệu định nghĩa rõ ràng
   - Kiểu dữ liệu mạnh mẽ trong toàn bộ ứng dụng

### Kiến trúc dữ liệu

```
┌─────────────────────────────────────────────┐
│               Components                     │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│               React Hooks                    │
└───────────────────┬─────────────────────────┘
                    │
┌─────────┬─────────▼───────────┬─────────────┐
│ Zustand │    React Query      │   Services   │
└─────────┴─────────┬───────────┴───────┬─────┘
                    │                   │
┌───────────────────▼───────────┬───────▼─────┐
│        Type Definitions       │    API Client│
└───────────────────────────────┴─────────────┘
```

### Ví dụ sử dụng React Query

```typescript
// Trong features/tasks/hooks/useTasks.ts
export function useTasks(filters?: Record<string, any>) {
  return useQuery(
    [queryKeys.tasks, filters],
    () => taskService.getTasks(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 phút
    }
  );
}
```

### Ví dụ Zustand Store

```typescript
// Trong shared/stores/uiStore.ts
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      // ... các state và action khác
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        preferences: state.preferences,
      }),
    }
  )
);
```

## Tối ưu hóa hiệu suất

ONE CMB được tối ưu hiệu suất thông qua nhiều kỹ thuật:

### 1. Code Splitting

Sử dụng Next.js dynamic imports để chia nhỏ ứng dụng:

```typescript
const AIAssistant = dynamic(() => import('./components/AIAssistant'), {
  loading: () => <div className="p-4">Đang tải trợ lý AI...</div>,
  ssr: false,
});
```

### 2. Ảo hóa danh sách (Virtualization)

Sử dụng react-window để chỉ render các phần tử trong viewport:

```typescript
import { FixedSizeList } from 'react-window';

const ResourceList = ({ resources }) => (
  <FixedSizeList
    height={500}
    width="100%"
    itemCount={resources.length}
    itemSize={80}
  >
    {({ index, style }) => (
      <div style={style}>
        <ResourceItem resource={resources[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

### 3. Tối ưu hóa Render

Áp dụng React.memo, useMemo và useCallback để tránh re-render không cần thiết:

```typescript
// Sử dụng React.memo để ghi nhớ component
export default React.memo(TaskList);

// Sử dụng useMemo cho tính toán phức tạp
const filteredTasks = useMemo(() => {
  return tasks.filter(/* logic lọc */);
}, [tasks, filter]);

// Sử dụng useCallback cho hàm xử lý sự kiện
const handleSelectTask = useCallback((task) => {
  onSelectTask(task);
}, [onSelectTask]);
```

### 4. Lazy Loading hình ảnh

Sử dụng LazyImage component để chỉ tải hình ảnh khi cần thiết:

```typescript
<LazyImage
  src="/path/to/image.jpg"
  alt="Mô tả hình ảnh"
  width={300}
  height={200}
/>
```

## Kế hoạch phát triển

Dự án đang tiến hành theo 5 giai đoạn:

### 1. Làm sạch mã dư thừa

Loại bỏ các component và file không sử dụng. Ví dụ:
- Các component AI Tool dư thừa
- Context không còn sử dụng
- File ví dụ và prototype

### 2. Hợp nhất và chuẩn hóa kiểu dữ liệu

- Tạo định nghĩa kiểu dữ liệu duy nhất cho Task, User, Resource
- Chuẩn hóa các enum và interface
- Thêm các utility cho tương thích ngược

### 3. Chuyển đổi quản lý state

- Chuyển dần từ Context API sang Zustand + React Query
- Triển khai store cho mỗi tính năng chính
- Cập nhật component để sử dụng hooks mới

### 4. Nâng cao hiệu suất

- Tối ưu kích thước bundle
- Thêm ảo hóa cho danh sách dài
- Cải thiện lazy loading và code splitting

### 5. Mở rộng tính năng

- Cải thiện trợ lý AI
- Tích hợp sâu hơn với hệ thống backend
- Thêm biểu đồ và báo cáo trực quan

## Hướng dẫn phát triển

### Quy ước import

```typescript
// Tốt - sử dụng exports từ index.ts
import { TaskList, useTaskData } from '@/features/tasks';
import { Button } from '@/shared/components/atoms';

// Tránh - import trực tiếp từ file
import TaskList from '@/features/tasks/components/TaskList';
```

### Quy ước đặt tên

- **Component**: PascalCase (TaskList, StatusBadge)
- **Hook**: camelCase bắt đầu bằng use (useTaskData)
- **Util**: camelCase (formatDate, normalizeTask)
- **Type**: PascalCase (Task, User, Resource)
- **File**: kebab-case (task-list.tsx, use-data-fetch.ts)

### Cấu trúc Component

- Mỗi component nên có một trách nhiệm duy nhất
- Component nên được phân loại theo cấu trúc Atomic Design
- Container và presentational components nên được tách biệt

### Testing

- Mỗi component quan trọng cần có unit test
- Các utility cần được test kỹ lưỡng
- E2E test nên bao quát các luồng chính của người dùng

## Công nghệ sử dụng

- **Framework**: Next.js 15.x
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand, React Query
- **UI Components**: Shadcn UI, Radix UI
- **Biểu đồ**: Recharts
- **Virtualization**: react-window
- **API Client**: Axios
- **Testing**: Jest, React Testing Library

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18.x trở lên
- npm/yarn/pnpm

### Cài đặt
```bash
# Clone dự án
git clone <repository-url>

# Cài đặt dependencies
npm install

# Tạo các biến môi trường
cp .env.example .env.local
```

### Chạy môi trường phát triển
```bash
# Khởi động với webpack
npm run dev

# Khởi động với turbopack (nhanh hơn)
npm run dev:turbo

# Chạy test
npm run test
```

### Build và triển khai
```bash
# Build cho production
npm run build

# Chạy ứng dụng đã build
npm run start
```

## Kết luận

ONE CMB là một dự án hiện đại áp dụng các thực hành tốt nhất trong phát triển frontend. Với kiến trúc dựa trên tính năng, thiết kế component nguyên tử và chiến lược quản lý state hiệu quả, dự án hướng đến việc tạo ra một ứng dụng dễ bảo trì, dễ mở rộng và hiệu suất cao cho quản lý doanh nghiệp.
