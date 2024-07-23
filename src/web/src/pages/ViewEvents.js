import { Box, Text } from '@chakra-ui/react';
import { fetchEvents } from '../api/event';
import { useReduxQuery } from '../hooks/useReduxQuery';
import EventsTable from '../components/EventsTable';

const ViewEvents = () => {
  //State allows user to not have to refresh to reflect changes they make (bookings & new events)
  const { events } = useReduxQuery('Events', fetchEvents);

  return (
    <Box>
      <Text fontSize={'3xl'} textAlign={'center'}>
        View Events
      </Text>
      <EventsTable events={events} />
    </Box>
  );
};

export default ViewEvents;
