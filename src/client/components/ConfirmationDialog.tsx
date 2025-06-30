import React from "react";
import { Modal, Button, Text, Group } from "@mantine/core";

interface ConfirmationDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  opened,
  onClose,
  onConfirm,
  title,
  message
}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Group justify="flex-end" gap="sm">
        <Button variant="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmationDialog;
