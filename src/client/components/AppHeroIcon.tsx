import React from "react";
import { Image } from "@mantine/core";

const AppHeroIcon: React.FC = () => (
  <div>
    <Image
      src="/template-logo.png"
      height={150}
      alt="Template logo"
      style={{
        marginBottom: -10,
      }}
    />
  </div>
);

export default AppHeroIcon;
