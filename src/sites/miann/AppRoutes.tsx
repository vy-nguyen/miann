import { UserIcon, FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout/MainLayout';
import { LogoProps, NavigationItem, MenuNavItem } from '@/components/Layout/NavBar';
import { SiteInfo } from '@/types';

import { AppProfile } from './auth/AppProfile';
import { AppUsers } from './auth/AppUsers';
import { CodeJava } from './auth/CodeJava';
import { CodePython } from './auth/CodePython';
import { About } from './public/About';
import { Art } from './public/Art';
import { Games } from './public/Games';
import { Home } from './public/Home';
import { Landing } from './public/Landing';
import { Login } from './public/Login';
import { Register } from './public/Register';

type RouteProps = {
  siteInfo: SiteInfo;
};

const publicRoutes = [
  { path: '/about', element: <About /> },
  { path: '/art/*', element: <Art /> },
  { path: '/games/*', element: <Games /> },
  { path: '/home/*', element: <Home /> },
  { path: '/login/*', element: <Login /> },
  { path: '/register/*', element: <Register /> },
];

const navItems = [
  { name: 'Home', to: '/home', icon: HomeIcon },
  { name: 'Art', to: '/art', icon: FolderIcon },
  { name: 'Games', to: '/games', icon: FolderIcon },
  { name: 'Login', to: '/login', icon: HomeIcon },
  { name: 'Register', to: '/register', icon: HomeIcon },
  { name: 'App Users', to: '/app/users', icon: UsersIcon },
  { name: 'App Profile', to: '/app/profile', icon: UserIcon },
  { name: 'Code Java', to: '/code/java', icon: FolderIcon },
  { name: 'Code Python', to: '/code/python', icon: FolderIcon },
] as NavigationItem[];

const menuItems = [
  { name: 'Profile', to: '/app/profile' },
  { name: 'Users', to: '/app/users' },
  { name: 'Java', to: '/code/java' },
  { name: 'Python', to: '/code/python' },
] as MenuNavItem[];

const authRoutes = [
  {
    path: '/app',
    element: <AppUsers />,
    children: [
      { path: '/users', element: <AppUsers /> },
      { path: '/profile', element: <AppProfile /> },
    ],
  },
  {
    path: '/code',
    element: <CodeJava />,
    children: [
      { path: '/java', element: <CodeJava /> },
      { path: '/python', element: <CodePython /> },
    ],
  },
];

const logoProps = {
  icon: logo,
  text: 'Miann App',
} as LogoProps;

export const MiannRoutes = ({ siteInfo }: RouteProps) => {
  const commonRoutes = [{ path: '/', element: <Landing siteInfo={siteInfo} /> }];

  return (
    <MainLayout
      logoProps={logoProps}
      navItems={navItems}
      menuItems={menuItems}
      menuLabel="Miann"
      menuIcon={HomeIcon}
    >
      <React.Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </React.Suspense>
      {useRoutes([...publicRoutes, ...authRoutes, ...commonRoutes])}
    </MainLayout>
  );
};
