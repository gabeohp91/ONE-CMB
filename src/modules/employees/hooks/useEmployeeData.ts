// src/modules/employees/hooks/useEmployeeData.ts
import { useState, useEffect } from 'react';

const useEmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with actual data fetching logic later
    setTimeout(() => {
      setEmployeeData([]); // Replace with fetched data
      setLoading(false);
    }, 500);
  }, []);

  return { employeeData, loading };
};

export default useEmployeeData;