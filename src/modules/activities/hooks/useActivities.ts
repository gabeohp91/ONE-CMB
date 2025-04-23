ts
// src/modules/activities/hooks/useActivities.ts
import { useState, useEffect } from 'react';

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual data fetching logic later
    setTimeout(() => {
      setActivities([]);
      setLoading(false);
    }, 500);
  }, []);

  return { activities, loading };
};

export default useActivities;