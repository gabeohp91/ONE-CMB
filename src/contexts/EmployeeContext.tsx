import { createContext, useContext, useState } from 'react';
import { employeeData } from '../data/employees';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(employeeData);
  
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);