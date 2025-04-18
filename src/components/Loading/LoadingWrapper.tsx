import { useState, useEffect, ReactNode } from 'react';
import { Loading } from './Loading';

interface PageWrapperProps {
  children: ReactNode;
}

const LoadingWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
