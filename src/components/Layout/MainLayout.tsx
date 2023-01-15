import * as React from 'react';

import {
  LogoProps,
  NavigationItem,
  MenuNavItem,
  MenuLayout,
  MobileSidebar,
  Sidebar,
} from '@/components/Layout/NavBar';

type MainLayoutProps = {
  children: React.ReactNode;
  logoProps: LogoProps;
  navItems: NavigationItem[];
  menuItems: MenuNavItem[];
  menuLabel: string;
  menuIcon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const MainLayout = ({
  logoProps,
  navItems,
  menuItems,
  menuLabel,
  menuIcon,
  children,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarProps={{ items: navItems, logo: logoProps }}
      />
      <Sidebar logo={logoProps} items={navItems} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <MenuLayout
          items={menuItems}
          label={menuLabel}
          icon={menuIcon}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
      </div>
    </div>
  );
};
