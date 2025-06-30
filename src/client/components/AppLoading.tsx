import React from "react";
import { Image, Loader, Stack } from "@mantine/core";

const AppLoading: React.FC = () => (
  <Stack align="center" gap="md">
    <Image
      src="/template-logo.png"
      h={150}
      alt="Template logo"
    />
    <Loader size="lg" />
  </Stack>
);

export default AppLoading;
