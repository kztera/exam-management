import React from "react";
import { Container, Title, Grid, Card, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconDashboard, IconUsers, IconCalendar } from "@tabler/icons-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Dashboard",
      description: "View system overview and statistics",
      icon: IconDashboard,
      path: "/dashboard",
      color: "blue"
    },
    {
      title: "Manage Students", 
      description: "Add, edit, and organize student information",
      icon: IconUsers,
      path: "/students",
      color: "green"
    },
    {
      title: "Schedule Exams",
      description: "Create and manage examination schedules",
      icon: IconCalendar,
      path: "/exams",
      color: "orange"
    }
  ];

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Welcome to Exam Management System
      </Title>
      
      <Text size="lg" ta="center" c="dimmed" mb="xl">
        Manage exams, students, and monitoring efficiently
      </Text>

      <Grid>
        {quickActions.map((action, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 4 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ height: "100%" }}
            >
              <Group mb="md">
                <action.icon size={24} color={`var(--mantine-color-${action.color}-6)`} />
                <Text fw={500} size="lg">
                  {action.title}
                </Text>
              </Group>
              
              <Text size="sm" c="dimmed" mb="md">
                {action.description}
              </Text>
              
              <Button
                variant="light"
                color={action.color}
                fullWidth
                onClick={() => navigate(action.path)}
              >
                Go to {action.title}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
