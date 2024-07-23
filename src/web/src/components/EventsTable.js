import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Text,
  Box,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { formatDate } from '../utils';
import BookTicketsModal from './BookTicketsModal';

const EventsTable = ({ events = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'index',
    direction: 'asc',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const calculateAvailableTickets = event => {
    //Aggregate bookings in each event and get total number booked so far

    const totalTickets = Number(event.maxCapacity);
    const bookedTickets = event?.bookings?.reduce(
      (acc, booking) => acc + Number(booking.ticketCount),
      0
    );
    const availableTickets = totalTickets - bookedTickets;
    const percentageAvailable = (availableTickets / totalTickets) * 100;
    return { availableTickets, percentageAvailable };
  };

  const sortedEvents = React.useMemo(() => {
    //Custom sorting function by several fields

    const sortableEvents = [...events];
    sortableEvents?.sort((a, b) => {
      const aTickets = calculateAvailableTickets(a);
      const bTickets = calculateAvailableTickets(b);
      const aValue =
        sortConfig.key === 'availability'
          ? aTickets.availableTickets
          : sortConfig.key === 'index'
          ? a.id
          : sortConfig.key === 'date'
          ? new Date(a.date)
          : sortConfig.key === 'capacity'
          ? a.maxCapacity
          : 0;

      const bValue =
        sortConfig.key === 'availability'
          ? bTickets.availableTickets
          : sortConfig.key === 'index'
          ? b.id
          : sortConfig.key === 'date'
          ? new Date(b.date)
          : sortConfig.key === 'capacity'
          ? b.maxCapacity
          : 0;

      //sort
      return sortConfig.direction === 'asc'
        ? aValue > bValue
          ? 1
          : aValue < bValue
          ? -1
          : 0
        : aValue < bValue
        ? 1
        : aValue > bValue
        ? -1
        : 0;
    });
    return sortableEvents;
  }, [events, sortConfig]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ArrowUpIcon mb={1} />
      ) : (
        <ArrowDownIcon mb={1} />
      );
    }
    return null;
  };

  const getColorBasedOnAvailability = percentage => {
    if (percentage > 75) return 'green.400'; // More than 75% available
    if (percentage > 50) return 'yellow.400'; // 50% - 75% available
    if (percentage > 25) return 'orange.400'; // 25% - 50% available
    return 'red.400'; // Less than 25% available
  };

  const handleBookTickets = event => {
    //Get modal for specific event
    setSelectedEvent(event);
    onOpen();
  };

  return (
    <>
      <Table variant="simple" mt={6}>
        <Thead>
          <Tr>
            <Th onClick={() => requestSort('index')} cursor="pointer">
              # {getSortIcon('index')}
            </Th>
            <Th>Event Name</Th>
            <Th onClick={() => requestSort('date')} cursor="pointer">
              Date {getSortIcon('date')}
            </Th>
            <Th onClick={() => requestSort('capacity')} cursor="pointer">
              Max Capacity {getSortIcon('capacity')}
            </Th>
            <Th onClick={() => requestSort('availability')} cursor="pointer">
              Tickets Available {getSortIcon('availability')}
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEvents.map(event => {
            const { availableTickets, percentageAvailable } =
              calculateAvailableTickets(event);

            return (
              <Tr key={event.id}>
                <Td>{event.id}</Td>
                <Td>{event.name}</Td>
                <Td>{formatDate(event.date)}</Td>
                <Td>{event.maxCapacity}</Td>
                <Td>
                  <Box
                    p={2}
                    borderRadius="md"
                    bg={getColorBasedOnAvailability(percentageAvailable)}
                    color="white"
                    textAlign="center"
                  >
                    <Text>
                      {availableTickets} ({percentageAvailable.toFixed(0)}%)
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Button
                    colorScheme={availableTickets > 0 ? 'teal' : 'red'}
                    isDisabled={availableTickets < 1}
                    size={'sm'}
                    onClick={() =>
                      handleBookTickets({ ...event, availableTickets })
                    }
                  >
                    Book Tickets
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {selectedEvent && (
        <BookTicketsModal
          isOpen={isOpen}
          onClose={onClose}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default EventsTable;
