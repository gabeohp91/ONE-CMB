'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TranslatePage() {
  const router = useRouter();
  
  // Redirect to main dashboard with ai-tools tab
  useEffect(() => {
    // Use the parent window's navigation logic if available (for iframe scenarios)
    router.push('/?tab=ai-tools&tool=translate');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}