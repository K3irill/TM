'use client';

// import Snowfall from 'react-snowfall'
import FallingSakura from '@/shared/ui/FallingSakura/FallingSakura';
import { QueryProvider } from './QueryProvider';
import StoreProvider from './StoreProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {/* <Snowfall snowflakeCount={200} /> */}
          <FallingSakura />
        </div>
        {children}
      </QueryProvider>
    </StoreProvider>
  );
}
