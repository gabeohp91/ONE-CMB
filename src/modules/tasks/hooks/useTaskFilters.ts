ts
import { useState } from 'react';

const useTaskFilters = () => {
  const [filters, setFilters] = useState({});

  return { filters, setFilters };
};

export default useTaskFilters;