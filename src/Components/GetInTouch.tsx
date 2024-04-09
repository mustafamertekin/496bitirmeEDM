import { TextInput, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

export function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto'}}>
      <form onSubmit={form.onSubmit(() => {})}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Bize Ulaşın
        </Title>

        <SimpleGrid mt="xl">
          <TextInput
            label="İsminiz"
            placeholder="İsminiz"
            name="İsminiz"
            variant="filled"
            {...form.getInputProps('İsminiz')}
          />
          <TextInput
            label="Email"
            placeholder="Emailiniz"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />
        </SimpleGrid>

        <TextInput
          label="Konu"
          placeholder="Konu"
          mt="md"
          name="Konu"
          variant="filled"
          {...form.getInputProps('Konu')}
        />
        <Textarea
          mt="md"
          label="Mesaj"
          placeholder="Mesaj"
          maxRows={10}
          minRows={5}
          autosize
          name="Mesaj"
          variant="filled"
          {...form.getInputProps('Mesaj')}
        />

        <Group mt="xl">
          <Button type="submit" size="md">
            Mesajı ilet
          </Button>
        </Group>
      </form>
    </div>
  );
}