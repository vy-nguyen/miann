import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { ErrorFallback } from '@/components/Notifications';
import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { SiteInfo } from '@/types';
import { lazyImport } from '@/utils/lazyImport';

const Loading = (siteInfo: SiteInfo) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <h2>{siteInfo.name}</h2>
      <Spinner size="xl" />
    </div>
  );
};

const selectSite = (siteInfo: SiteInfo) => {
  const { MiannRoutes } = lazyImport(() => import('@/sites/miann/AppRoutes'), 'MiannRoutes');

  switch (siteInfo.domain) {
    case 'tvntd': {
      const { MiannRoutes } = lazyImport(() => import('@/sites/miann/AppRoutes'), 'MiannRoutes');
      return <MiannRoutes siteInfo={siteInfo} />;
    }
    default:
      siteInfo.name = 'Miann';
      siteInfo.title = 'Welcome to Miann Home';
      siteInfo.domain = 'eakiturtle.art';
  }
  return <MiannRoutes siteInfo={siteInfo} />;
};

type AppMainProps = {
  siteInfo: SiteInfo;
};

export const AppMain = ({ siteInfo }: AppMainProps) => {
  return (
    <React.Suspense fallback={Loading(siteInfo)}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <BrowserRouter>{selectSite(siteInfo)}</BrowserRouter>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppMain;
