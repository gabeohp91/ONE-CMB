tsx
// modules/employees/components/EmployeeProfileContainer.tsx
import { useEmployee } from '../../../contexts/EmployeeContext';
import EmployeeProfile from './EmployeeProfile';

const EmployeeProfileContainer = () => {
  const { employee, loading } = useEmployee();
  
  if (loading) return <div>Đang tải...</div>;
  
  return <EmployeeProfile employee={employee} />;
};

export default EmployeeProfileContainer;