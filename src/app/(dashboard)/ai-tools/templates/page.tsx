'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const router = useRouter();
  
  // Redirect to main dashboard with ai-tools tab
  useEffect(() => {
    router.push('/?tab=ai-tools&tool=templates');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}