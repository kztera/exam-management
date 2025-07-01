import React, { ReactNode, useState } from 'react';
import {
  AppShell,
  Center,
  Stack,
  Tooltip,
  UnstyledButton,
  Image,
} from '@mantine/core';
import { 
  IconHome2, 
  IconDashboard, 
  IconUsers,
  IconSettings,
  IconLogout 
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './NavbarMinimal.module.css';

interface LayoutProps {
  children: ReactNode;
}

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(() => {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/students') return 2;
    return 0;
  });

  const navItems = [
    { icon: IconHome2, label: 'Home', path: '/' },
    { icon: IconUsers, label: 'Students', path: '/students' },
  ];

  const handleNavClick = (index: number, path: string) => {
    setActive(index);
    navigate(path);
  };

  const mainLinks = navItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleNavClick(index, link.path)}
    />
  ));

  return (
    <AppShell
      navbar={{
        width: 80,
        breakpoint: 'sm',
      }}
      padding={0}
    >
      <AppShell.Navbar className={classes.navbar}>
        <Center>
          <Image src="/template-logo.png" alt="Logo" w={48} h={48} />
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {mainLinks}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconSettings} label="Settings" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ padding: 'var(--mantine-spacing-md)' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutComponent;
