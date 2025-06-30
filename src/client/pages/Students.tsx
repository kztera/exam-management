import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Table,
  Button,
  Group,
  TextInput,
  Modal,
  Stack,
  Text,
  ActionIcon,
  Badge,
  Loader,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconEdit, IconTrash, IconSearch } from '@tabler/icons-react';
import { 
  studentService, 
  Student, 
  CreateStudentData, 
  UpdateStudentData 
} from '../services/studentService';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CreateStudentData | UpdateStudentData>({
    initialValues: {
      studentCode: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validate: {
      studentCode: (value: string) => value ? null : 'Student code is required',
      firstName: (value: string) => value ? null : 'First name is required',
      lastName: (value: string) => value ? null : 'Last name is required',
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch students',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle create/update student
  const handleSubmit = async (values: CreateStudentData | UpdateStudentData) => {
    try {
      if (isEditing && selectedStudent) {
        await studentService.update(selectedStudent.id, values);
        notifications.show({
          title: 'Success',
          message: 'Student updated successfully',
          color: 'green',
        });
      } else {
        await studentService.create(values as CreateStudentData);
        notifications.show({
          title: 'Success',
          message: 'Student created successfully',
          color: 'green',
        });
      }
      
      await fetchStudents();
      closeModal();
      form.reset();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: `Failed to ${isEditing ? 'update' : 'create'} student`,
        color: 'red',
      });
    }
  };

  // Handle delete student
  const handleDelete = async (student: Student) => {
    if (window.confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      try {
        await studentService.delete(student.id);
        notifications.show({
          title: 'Success',
          message: 'Student deleted successfully',
          color: 'green',
        });
        await fetchStudents();
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete student',
          color: 'red',
        });
      }
    }
  };

  // Open modal for editing
  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    form.setValues({
      studentCode: student.studentCode,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone || '',
    });
    openModal();
  };

  // Open modal for creating
  const openCreateModal = () => {
    setSelectedStudent(null);
    setIsEditing(false);
    form.reset();
    openModal();
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading students...</Text>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={1}>Students Management</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={openCreateModal}>
            Add Student
          </Button>
        </Group>

        <Group>
          <TextInput
            placeholder="Search students..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            style={{ flexGrow: 1 }}
          />
        </Group>

        {filteredStudents.length === 0 ? (
          <Alert title="No students found" color="blue">
            {students.length === 0 ? 'No students have been added yet.' : 'No students match your search criteria.'}
          </Alert>
        ) : (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student Code</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredStudents.map((student) => (
                <Table.Tr key={student.id}>
                  <Table.Td>
                    <Text fw={500}>{student.studentCode}</Text>
                  </Table.Td>
                  <Table.Td>
                    {student.firstName} {student.lastName}
                  </Table.Td>
                  <Table.Td>{student.email}</Table.Td>
                  <Table.Td>{student.phone || '-'}</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      Active
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon 
                        variant="subtle" 
                        color="blue"
                        onClick={() => openEditModal(student)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="subtle" 
                        color="red"
                        onClick={() => handleDelete(student)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>

      {/* Create/Edit Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={isEditing ? 'Edit Student' : 'Add New Student'}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Student Code"
              placeholder="Enter student code"
              required
              {...form.getInputProps('studentCode')}
            />
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              required
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              required
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label="Email"
              placeholder="Enter email address"
              type="email"
              required
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Phone"
              placeholder="Enter phone number"
              {...form.getInputProps('phone')}
            />
            
            <Group justify="flex-end" gap="sm">
              <Button variant="subtle" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update' : 'Create'} Student
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default StudentsPage;
