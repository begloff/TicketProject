import { Box, Text } from '@chakra-ui/react';
import EventCreationForm from '../components/EventCreationForm';

const CreateEvents = () => {
  return (
    <Box>
      <Text fontSize={'3xl'} textAlign={'center'}>
        Event Creation
      </Text>
      <EventCreationForm />
    </Box>
  );
};

export default CreateEvents;
