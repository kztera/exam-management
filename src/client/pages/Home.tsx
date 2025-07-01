import React from "react";
import { Container, Title, Grid, Card, Text, Group, Progress } from "@mantine/core";
import { IconUsers, IconCalendar, IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

const Home: React.FC = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: IconUsers,
      color: "blue",
      change: "+12%"
    },
    {
      title: "Active Exams",
      value: "8",
      icon: IconCalendar,
      color: "green",
      change: "+2%"
    },
    {
      title: "Violations Detected",
      value: "23",
      icon: IconAlertTriangle,
      color: "red",
      change: "-5%"
    },
    {
      title: "Completed Exams",
      value: "156",
      icon: IconCircleCheck,
      color: "teal",
      change: "+18%"
    }
  ];

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Dashboard
      </Title>

      <Grid mb="xl">
        {stats.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  {stat.title}
                </Text>
                <stat.icon size={20} color={`var(--mantine-color-${stat.color}-6)`} />
              </Group>
              
              <Text fw={700} size="xl" mb="xs">
                {stat.value}
              </Text>
              
              <Text size="xs" c={stat.color}>
                {stat.change} from last month
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              Recent Activity
            </Title>
            <Text c="dimmed">
              No recent activities to display.
            </Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">
              System Status
            </Title>
            
            <Group justify="space-between" mb="xs">
              <Text size="sm">Server Performance</Text>
              <Text size="sm" c="green">98%</Text>
            </Group>
            <Progress value={98} color="green" mb="md" />
            
            <Group justify="space-between" mb="xs">
              <Text size="sm">Database Health</Text>
              <Text size="sm" c="blue">95%</Text>
            </Group>
            <Progress value={95} color="blue" mb="md" />
            
            <Group justify="space-between" mb="xs">
              <Text size="sm">AI Monitoring</Text>
              <Text size="sm" c="orange">87%</Text>
            </Group>
            <Progress value={87} color="orange" />
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
