import { useState } from 'react';
import { useBetween } from 'use-between';

const useProgressState = () => {
  const [progress, setProgress] = useState(0);

  return { progress, setProgress };
};

const useSharedProgressState = () => useBetween(useProgressState);

export { useSharedProgressState };
