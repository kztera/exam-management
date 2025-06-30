import React, { ReactNode } from 'react';
import {
  AppShell,
  Text,
  Burger,
  NavLink,
  Image,
  Group,
} from '@mantine/core';
import { IconHome, IconDashboard, IconUsers } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

interface LayoutProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: IconHome, path: '/' },
    { label: 'Dashboard', icon: IconDashboard, path: '/dashboard' },
    { label: 'Students', icon: IconUsers, path: '/students' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Group>
            <Image src="/template-logo.png" alt="Logo" w={40} h={40} />
            <Text size="lg" fw={500}>
              Exam Management System
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            label={item.label}
            leftSection={<item.icon size="1rem" />}
            active={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              if (opened) toggle();
            }}
            style={{ marginBottom: 8 }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutComponent;
