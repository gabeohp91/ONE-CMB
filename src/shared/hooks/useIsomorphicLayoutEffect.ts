// src/shared/hooks/useIsomorphicLayoutEffect.ts
import { useLayoutEffect, useEffect } from 'react';

// Use useEffect on the server and useLayoutEffect on the client
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;