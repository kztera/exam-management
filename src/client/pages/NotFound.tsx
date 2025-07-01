import React from "react";
import { Container, Card, Text, Button, Stack, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AppHeroIcon from "@/components/AppHeroIcon";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="sm" py="xl">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack align="center" gap="lg" style={{ minHeight: "50vh", justifyContent: "center" }}>
          <AppHeroIcon />
          <IconMoodSad size={100} color="var(--mantine-color-gray-5)" />
          <Title order={1} ta="center">
            404
          </Title>
          <Text size="lg" ta="center" c="dimmed">
            The page you're looking for cannot be found.
          </Text>
          <Button 
            size="lg" 
            onClick={() => navigate('/')}
            variant="filled"
          >
            Go Home
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default NotFound;
