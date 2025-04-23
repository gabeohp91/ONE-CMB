ts
// src/modules/ai-assistant/hooks/useAI.ts
import { useState, useEffect } from 'react';

const useAI = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data or initializing AI
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return { loading };
};

export default useAI;