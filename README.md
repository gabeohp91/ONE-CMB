# Tài liệu dự án ONE CMB

## Tổng quan dự án

Dự án này triển khai một ứng dụng web sử dụng Next.js, TypeScript và Tailwind CSS. Hiện tại, dự án đang trong quá trình chuyển đổi kiến trúc từ cấu trúc truyền thống sang kiến trúc dựa trên tính năng (feature-based architecture) kết hợp với thiết kế component nguyên tử (atomic component design).

Mục tiêu của việc tái cấu trúc này:
- Cải thiện tính module hóa và khả năng tái sử dụng mã
- Tăng khả năng bảo trì và mở rộng
- Cải thiện hiệu suất và trải nghiệm người dùng
- Áp dụng nguyên tắc thiết kế phù hợp và nhất quán

## Cấu trúc dự án

Dự án đã được tổ chức lại theo cấu trúc hướng tính năng, tổ chức mã theo tính năng nghiệp vụ thay vì lớp kỹ thuật:

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

## Kiến trúc Component Nguyên Tử (Atomic Design)

Dự án này đang áp dụng phương pháp thiết kế nguyên tử trong kiến trúc dựa trên tính năng. Phương pháp này tổ chức các component UI theo thứ bậc dựa trên mức độ phức tạp và đảm bảo sự phân tách rõ ràng về mối quan tâm.

### 1. Nguyên tử (Atoms)

Nguyên tử là các building block cơ bản nhất của UI, không thể chia nhỏ hơn nữa.

Ví dụ:
- `StatusBadge`
- `PriorityBadge`
- `ProgressBar`
- `Button`

Vị trí: `/src/shared/components/atoms/`

### 2. Phân tử (Molecules)

Phân tử là các nhóm nguyên tử kết hợp với nhau, tương đối đơn giản và hoạt động như một đơn vị.

Ví dụ:
- `TaskStatusDisplay` (kết hợp StatusBadge, PriorityBadge và ProgressBar)

Vị trí: `/src/shared/components/molecules/`

### 3. Sinh vật (Organisms)

Sinh vật là các component UI phức tạp gồm nhiều phân tử và/hoặc nguyên tử. Các component này tạo thành các phần riêng biệt của giao diện.

Ví dụ:
- `TaskCard`
- `TaskList`
- `TaskForm`
- `TaskStats`

Vị trí: `/src/features/tasks/components/`

### 4. Template

Template chủ yếu bao gồm các nhóm sinh vật kết hợp với nhau để tạo thành các trang. Chúng tập trung vào cấu trúc trang hơn là nội dung.

Ví dụ:
- `TaskDemo` - Một template thể hiện cách kết hợp các component của nhiệm vụ

### 5. Trang (Pages)

Trang là các trường hợp cụ thể của template hiển thị giao diện với nội dung thực tế.

Ví dụ:
- `/src/app/tasks-example.tsx`

## Ranh giới Component

Dự án thiết lập ranh giới component rõ ràng:

### 1. Component trình bày (Presentational)

Tập trung vào việc render UI, nhận dữ liệu qua props và không kết nối trực tiếp với nguồn dữ liệu.

Ví dụ:
- `StatusBadge`
- `PriorityBadge`
- `ProgressBar`
- `TaskCard`
- `TaskStats`

### 2. Component container

Kết nối với nguồn dữ liệu và truyền dữ liệu tới các component trình bày.

Ví dụ:
- `TaskList` (kết nối với hook useTaskData)
- `TaskDemo` (điều phối các component của nhiệm vụ)

### 3. Hook

Tách biệt việc lấy dữ liệu và logic nghiệp vụ khỏi các component UI.

Ví dụ:
- `useTaskData`: Lấy và quản lý dữ liệu nhiệm vụ
- `useTaskActions`: Chứa các hành động đặc thù cho nhiệm vụ
- `useTaskFilters`: Quản lý logic lọc nhiệm vụ

## Quản lý dữ liệu

Dự án đang trong quá trình chuyển đổi chiến lược quản lý dữ liệu, tập trung vào tính nhất quán, hiệu suất và trải nghiệm phát triển.

### Trạng thái hiện tại của việc triển khai

Đã hoàn thành:
1. **Hợp nhất định nghĩa kiểu**:
   - Đã hợp nhất các model nhiệm vụ trong `/shared/types/models/task.ts`
   - Đã thêm tiện ích chuẩn hóa cho dữ liệu nhiệm vụ cũ
   - Đã hợp nhất model user/employee trong `/shared/types/models/user.ts`
   - Đã thêm khả năng tương thích ngược cho các giá trị trạng thái khác nhau

2. **Chuẩn hóa API Client**:
   - Nâng cấp `/shared/services/apiClient.ts` làm triển khai tiêu chuẩn
   - Thêm phương thức có kiểu dữ liệu với xử lý lỗi thích hợp
   - Cập nhật service nhiệm vụ để sử dụng API client hợp nhất

3. **Hook lấy dữ liệu**:
   - Tạo hook chuyển tiếp `useDataFetch` trong `/shared/hooks/use-data-fetch.ts`
   - Cập nhật hook dữ liệu nhiệm vụ để sử dụng kiểu hợp nhất
   - Thêm triển khai React Query cho việc di chuyển trong tương lai

### Kiến trúc quản lý dữ liệu

Kiến trúc quản lý dữ liệu bao gồm nhiều lớp:

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

### Các thành phần chính

1. **Model dữ liệu thống nhất**
   - Tất cả model dữ liệu được định nghĩa trong `src/shared/types/models`
   
2. **Zustand Stores**
   - Zustand được sử dụng để quản lý state toàn cục, đặc biệt là:
     - State UI ứng dụng
     - Xác thực người dùng
     - State phía client cần lưu giữ

3. **React Query**
   - React Query được sử dụng để quản lý state phía server, xử lý:
     - Lấy dữ liệu
     - Caching
     - Lấy lại dữ liệu
     - Mutations
     - Loại bỏ yêu cầu trùng lặp

4. **Dịch vụ API**
   - Dịch vụ API trừu tượng hóa chi tiết giao tiếp với backend

5. **API Client**
   - Client tập trung dựa trên axios cho tất cả yêu cầu API xử lý:
     - Xác thực
     - Xử lý lỗi
     - Bộ chặn yêu cầu/phản hồi
     - Cấu hình URL cơ sở

### Các nguyên tắc cốt lõi

1. **Tách biệt mối quan tâm** - Phân biệt rõ ràng giữa state phía server, state phía client và state UI
2. **Nguồn sự thật duy nhất** - Model dữ liệu tập trung và quản lý state
3. **An toàn kiểu** - Kiểu TypeScript toàn diện để xử lý dữ liệu nhất quán
4. **Hiệu suất** - Chiến lược lấy dữ liệu và caching hiệu quả
5. **Trải nghiệm phát triển** - API và hook trực quan để truy cập dữ liệu

### Thực hành tốt nhất

1. **Sử dụng React Query cho hầu hết việc lấy dữ liệu**
   - Ưu tiên React Query cho dữ liệu server thay đổi thường xuyên
   - Xử lý hiệu quả trạng thái loading, lỗi, caching và dữ liệu cũ

2. **Sử dụng Zustand cho state phía client**
   - Sử dụng Zustand cho state UI, xác thực và dữ liệu chỉ dành cho client
   - Lưu giữ state giữa các phiên với middleware `persist`

3. **Kết hợp cách tiếp cận khi cần thiết**
   - Một số tính năng có thể yêu cầu cả hai cách tiếp cận
   - Ví dụ: Lọc nhiệm vụ với state bộ lọc trong Zustand, nhưng dữ liệu được lọc đến từ React Query

4. **Chiến lược khóa truy vấn nhất quán**
   - Sử dụng đối tượng `queryKeys` để quản lý cache nhất quán
   - Khóa nên bao gồm tham số bộ lọc liên quan

5. **Kiểu dữ liệu mọi thứ**
   - Tất cả model dữ liệu, phản hồi API và state nên được gán kiểu
   - Sử dụng giao diện và kiểu TypeScript nhất quán

## Kỹ thuật tối ưu hóa hiệu suất

Tài liệu này mô tả các kỹ thuật tối ưu hóa hiệu suất được triển khai trong dự án để cải thiện tốc độ tải, hiệu suất render và trải nghiệm người dùng.

### Kết quả đánh giá hiệu suất gần đây

Dựa trên đánh giá và phân tích mã gần đây, chúng tôi đã xác định một số vấn đề liên quan đến hiệu suất và cơ hội tối ưu hóa:

#### Vấn đề hiện tại

1. **Triển khai component dư thừa**:
   - Nhiều phiên bản của các component (AIAssistant, TaskCard, v.v.) làm tăng kích thước bundle
   - Tối ưu hóa không nhất quán trong các triển khai trùng lặp

2. **Quản lý dữ liệu không hiệu quả**:
   - Nhiều triển khai API client dẫn đến caching không nhất quán
   - Cả Context API và Zustand stores được sử dụng, gây trùng lặp state

3. **Thiếu ảo hóa**:
   - Nhiều component danh sách render tất cả các mục cùng một lúc mà không ảo hóa
   - Bảng dữ liệu lớn không triển khai phân trang hoặc ảo hóa

### Các kỹ thuật tối ưu hóa

#### 1. Phân chia mã (Code Splitting)

Phân chia mã cho phép chia các gói JavaScript thành các phần nhỏ hơn có thể được tải theo yêu cầu, giảm thời gian tải ban đầu của ứng dụng.

**Triển khai:**

```typescript
import dynamic from 'next/dynamic';

const AIAssistant = dynamic(() => import('./components/AIAssistant'), {
  loading: () => <div className="p-4">Đang tải trợ lý AI...</div>,
  ssr: false, // Tắt render phía server nếu cần
});

export default AIAssistant;
```

**Lợi ích:**
- **Giảm kích thước bundle ban đầu**: Chỉ mã cần thiết được tải ban đầu
- **Khởi động nhanh hơn**: Ứng dụng trở nên tương tác nhanh hơn
- **Cải thiện hiệu suất**: Tài nguyên chỉ được tải khi cần thiết
- **Trải nghiệm di động tốt hơn**: Giảm sử dụng dữ liệu và tải nhanh hơn trên thiết bị di động

**Khi nào sử dụng:**
- Cho các component lớn không cần thiết ngay lập tức
- Cho các tính năng chỉ được sử dụng bởi một số người dùng
- Cho chức năng nâng cao được truy cập thông qua tương tác người dùng
- Cho các phần khác nhau của ứng dụng (như bảng điều khiển, trang cài đặt)

#### 2. Tối ưu hóa Render React

Tối ưu hóa render React ngăn chặn re-render không cần thiết, cải thiện hiệu suất của các component, đặc biệt là trong các ứng dụng có nhiều dữ liệu.

**Triển khai:**

Chúng tôi sử dụng một số hook và kỹ thuật React để tối ưu hóa render:

**React.memo**:
```typescript
const TaskList = ({ tasks, filter }) => {
  // Triển khai component
};

// Ngăn re-render nếu props không thay đổi
export default React.memo(TaskList);
```

**useMemo**:
```typescript
const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    return true;
  });
}, [tasks, filter]);
```

**useCallback**:
```typescript
const handleSelectTask = useCallback((task) => {
  if (onSelectTask) {
    onSelectTask(task);
  }
}, [onSelectTask]);
```

**Lợi ích:**
- **Giảm chu kỳ render**: Component chỉ re-render khi cần thiết
- **Cải thiện hiệu suất**: Ngăn chặn tính toán tốn kém trên mỗi lần render
- **Phản hồi tốt hơn**: UI vẫn mượt mà ngay cả với các cập nhật thường xuyên
- **Tham chiếu hàm nhất quán**: Ngăn chặn re-render không cần thiết của component con

**Khi nào sử dụng:**
- **React.memo**: Cho các component hàm thuần túy thường xuyên render nhưng với cùng props
- **useMemo**: Cho các tính toán tốn kém phụ thuộc vào props/state cụ thể
- **useCallback**: Cho các trình xử lý sự kiện được truyền cho các component con đã tối ưu hóa

#### 3. Ảo hóa cho danh sách dài

Ảo hóa chỉ render các mục hiện đang hiển thị trong viewport, cải thiện đáng kể hiệu suất cho danh sách dài.

**Triển khai:**

Chúng tôi sử dụng `react-window` để ảo hóa danh sách dài:

```typescript
import { FixedSizeList } from 'react-window';

const ResourceList = ({ resources }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ResourceItem resource={resources[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={resources.length}
      itemSize={80}
    >
      {Row}
    </FixedSizeList>
  );
};
```

**Lợi ích:**
- **Sử dụng bộ nhớ không đổi**: Chỉ các mục hiển thị được giữ trong DOM
- **Cuộn mượt mà**: Ngay cả với hàng nghìn mục
- **Cải thiện thời gian tải ban đầu**: Ít node DOM cần tạo khi tải
- **Giảm căng thẳng cho trình duyệt**: Ngăn chặn trình duyệt bị trễ với tập dữ liệu lớn

**Khi nào sử dụng:**
- Danh sách có hơn 50-100 mục
- Khi render các mục phức tạp hoặc phân cấp component
- Trong giao diện quản trị có nhiều dữ liệu
- Khi người dùng cần cuộn qua tập dữ liệu lớn

#### 4. Lazy Loading cho hình ảnh

Lazy loading trì hoãn việc tải hình ảnh cho đến khi chúng sắp đi vào viewport, cải thiện thời gian tải trang và giảm sử dụng dữ liệu không cần thiết.

**Triển khai:**

Chúng tôi đã tạo component LazyImage tùy chỉnh sử dụng Next.js Image với trạng thái loading:

```typescript
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {/* Placeholder loading */}
        </div>
      )}
      <NextImage
        src={src}
        alt={alt}
        onLoadingComplete={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};
```

**Lợi ích:**
- **Tải trang ban đầu nhanh hơn**: Chỉ những hình ảnh hiển thị được tải ngay lập tức
- **Giảm sử dụng dữ liệu**: Hình ảnh chỉ được tải khi cần thiết
- **Trải nghiệm người dùng tốt hơn**: Tải tiến bộ với placeholder
- **Cải thiện Core Web Vitals**: Giúp với chỉ số Largest Contentful Paint (LCP)

**Khi nào sử dụng:**
- Cho các trang có nhiều hình ảnh hoặc gallery
- Cho các trang dài có nhiều hình ảnh dưới fold
- Cho danh sách sản phẩm hoặc lưới hình ảnh
- Bất cứ nơi nào hình ảnh không hiển thị ngay lập tức

#### 5. Tối ưu hóa bổ sung

##### Tối ưu hóa quản lý state
- **Cập nhật store có chọn lọc**: Chỉ cập nhật những gì thay đổi, không phải toàn bộ state
- **Cấu trúc store chuẩn hóa**: Tránh các đối tượng state lồng nhau sâu
- **Middleware cho side effect**: Giữ các component sạch bằng cách xử lý side effect trong middleware của store

##### Tối ưu hóa mạng
- **Gộp nhóm yêu cầu**: Kết hợp nhiều yêu cầu API thành một khi có thể
- **Chiến lược caching**: Cache các phản hồi với TTL (Time To Live) thích hợp
- **Loại bỏ trùng lặp yêu cầu**: Ngăn chặn các cuộc gọi API trùng lặp cho cùng một dữ liệu

##### Tối ưu hóa build
- **Tree Shaking**: Loại bỏ mã không sử dụng thông qua export/import thích hợp
- **Phân tích bundle**: Kiểm tra kích thước bundle thường xuyên với công cụ như `@next/bundle-analyzer`
- **Cấu hình phân chia mã**: Cấu hình các điểm chia qua module federation của Next.js

## Kế hoạch làm sạch toàn diện

Dự án hiện đang trong quá trình làm sạch mã và cải thiện cấu trúc. Dưới đây là các giai đoạn triển khai:

### Giai đoạn 1: Làm sạch an toàn

Các file có thể xóa an toàn mà không ảnh hưởng đến chức năng:

```
# Component AI Tool không sử dụng
/src/modules/ai-tools/ContentWriter.tsx
/src/modules/ai-tools/Translator.tsx
/src/modules/ai-tools/index.ts

# File Context không sử dụng
/src/contexts/ActivityContext.tsx
/src/contexts/TaskContext.tsx
/src/contexts/UIContext.tsx

# File ví dụ (hoặc chuyển đến thư mục /docs)
/src/app/data-management-example.tsx
/src/app/page.example.tsx
/src/app/performance-example.tsx
/src/app/tasks-example.tsx
```

### Giai đoạn 2: Hợp nhất định nghĩa kiểu

1. **Hợp nhất kiểu Task**
   - Giữ `/src/shared/types/models/task.ts` là định nghĩa chính thống
   - Xóa các định nghĩa trùng lặp

2. **Chuẩn hóa kiểu Employee/User**
   - Hợp nhất `/src/data/employees/types.ts` và `/src/shared/types/models/user.ts`
   - Chuẩn hóa đặt tên `User` trong toàn bộ mã

### Giai đoạn 3: Hợp nhất dữ liệu mô phỏng

1. **Hợp nhất dữ liệu mô phỏng**
   - Di chuyển dữ liệu mô phỏng cần thiết đến thư mục service
   - Xóa các file dữ liệu dư thừa

### Giai đoạn 4: Di chuyển quản lý state

1. **Tạo Zustand Stores**
   - Triển khai store cho mỗi thực thể dữ liệu chính
   - Thêm hook React Query cho giao tiếp API

2. **Cập nhật Component**
   - Cập nhật các component để sử dụng quản lý state mới
   - Loại bỏ phụ thuộc vào context

### Giai đoạn 5: Quá trình xác minh

Sau mỗi giai đoạn:

1. **Chạy test**
   - Đảm bảo tất cả các test đang chạy tiếp tục chạy
   - Thêm test cho chức năng mới

2. **Xác minh trực quan**
   - Chạy ứng dụng và xác minh tất cả các tính năng UI
   - Kiểm tra từng tab và tương tác

3. **Kiểm tra hiệu suất**
   - Xác minh kích thước bundle không tăng
   - Kiểm tra vấn đề hiệu suất render

## Hướng dẫn phát triển

### Quy ước import

```typescript
// Tốt
import { TaskList, useTaskData } from '@/features/tasks';
import { Button } from '@/shared/components/ui/button';

// Tránh
import TaskList from '@/features/tasks/components/TaskList';
import useTaskData from '@/features/tasks/hooks/useTaskData';
import Button from '@/shared/components/ui/button';
```

### Đường dẫn alias

Đường dẫn alias mới đã được cấu hình trong `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/features/*": ["./src/features/*"],
    "@/shared/*": ["./src/shared/*"],
    "@/styles/*": ["./src/styles/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/app/*": ["./src/app/*"]
  }
}
```

### Cấu trúc Component

- Nhóm file component và style của nó với nhau
- Mỗi component nên có một trách nhiệm rõ ràng, duy nhất
- Sử dụng export có tên để đảm bảo tính nhất quán

### Hook

- Hook tùy chỉnh nên có tiền tố `use`
- Đặt hook đặc thù cho tính năng trong thư mục `hooks` của tính năng đó
- Đặt hook dùng chung trong `shared/hooks`

### Kiểu dữ liệu

- Định nghĩa giao diện và kiểu gần nơi chúng được sử dụng
- Kiểu đặc thù cho tính năng nên ở trong thư mục `types` của tính năng đó
- Kiểu dùng chung nên ở trong `shared/types`

### Dịch vụ

- Tạo các lớp dịch vụ cho hoạt động API và dữ liệu
- Dịch vụ đặc thù cho tính năng đặt trong thư mục `services` của tính năng đó
- Dịch vụ dùng chung đặt trong `shared/services`

## Các tính năng chính

Ứng dụng chính được cấu trúc từ các thành phần sau:

- **Cấu trúc gốc**: `RootLayout` > `AppProviders` > `EmployeeDashboard`
- **Điều hướng**: `AppSidebar`, `Header`
- **Nội dung chính**: Render có điều kiện dựa trên tab của bảng điều khiển, nhiệm vụ, tài nguyên, hoạt động
- **Trợ lý AI**: Component `AIAssistant` với chức năng chat

## Lợi ích của cách tiếp cận này

1. **Tính module hóa**: Component có thể tái sử dụng và khép kín
2. **Khả năng bảo trì**: Phân tách rõ ràng về mối quan tâm
3. **Tính nhất quán**: Cấu trúc và mẫu chuẩn hóa
4. **Khả năng mở rộng**: Dễ dàng thêm tính năng mới mà không ảnh hưởng đến các tính năng khác
5. **Khả năng kiểm thử**: Component có ranh giới rõ ràng dễ kiểm thử hơn
6. **Trải nghiệm phát triển**: Dễ dàng hiểu và điều hướng codebase

## Hướng dẫn dài hạn

1. **Tổ chức Component**
   - Tuân theo tổ chức dựa trên tính năng
   - Giữ nguyên tắc thiết kế nguyên tử cho component UI

2. **Quản lý dữ liệu**
   - Sử dụng React Query cho state phía server
   - Sử dụng Zustand cho state phía client
   - Giữ các kiểu trong `/shared/types/models/`

3. **Chất lượng mã**
   - Thực thi đặt tên nhất quán (camelCase cho hàm, PascalCase cho component)
   - Thêm tài liệu component
   - Duy trì bảo phủ test