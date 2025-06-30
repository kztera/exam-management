import React from "react";
import { Card, Text, Button, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

interface CallToActionProps {
  heroIcon?: React.ComponentType<{ size?: number | string }>;
  icon?: React.ComponentType<{ size?: number | string }>;
  title: string;
  subtitle: string;
  url?: string;
  buttonName?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  heroIcon: HeroIcon,
  icon: IconComponent = IconPlus,
  title,
  subtitle,
  url,
  buttonName
}) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    <Stack align="center" gap="md">
      {HeroIcon && (
        <HeroIcon size={50} />
      )}
      <Text size="xl" fw={500}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" ta="center">
        {subtitle}
      </Text>
      {url && buttonName && (
        <Button
          component={Link}
          to={url}
          leftSection={<IconComponent size="1rem" />}
          variant="filled"
        >
          {buttonName}
        </Button>
      )}
    </Stack>
  </Card>
);

export default CallToAction;
