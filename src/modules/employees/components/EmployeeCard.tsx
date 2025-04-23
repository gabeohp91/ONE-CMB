tsx
import React from 'react';

interface Employee {
  id: string;
  name: string;
  // Add other employee properties as needed
}

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="employee-card">
      <img src="/placeholder-image.png" alt={employee.name} /> {/* Replace with actual image */}
      <h3>{employee.name}</h3>
    </div>
  );
};

export default EmployeeCard;