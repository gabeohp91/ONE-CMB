'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { employeeData } from '../data/employees';
import { Employee } from '../data/employees/types';

interface EmployeeContextType {
  employee: Employee;
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [employee, setEmployee] = useState<Employee>(employeeData);
  
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  
  return context;
};