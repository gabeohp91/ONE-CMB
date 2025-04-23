import { createContext, useContext, useState } from 'react';

const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  
  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
