import { Box, Text } from '@chakra-ui/react';
import EventCreationForm from '../components/EventCreationForm';
import { useEffect } from 'react';

const CreateEvents = () => {
  useEffect(() => {
    document.title = 'Ticket System - Home';
  }, []);

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
