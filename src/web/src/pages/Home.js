import { Text, VStack, Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ticket System - Home';
  }, []);

  // Landing page
  // Simple: just several buttons

  return (
    <VStack spacing={10}>
      <Text fontSize={'3xl'} textAlign={'center'}>
        Ticket Booking System
      </Text>

      <Button
        size={'lg'}
        p={10}
        onClick={() => {
          navigate('events');
        }}
      >
        View Events
      </Button>

      <HStack w={'100%'} justifyContent={'space-around'}>
        <VStack spacing={5} alignItems={'stretch'}>
          <Text textAlign={'center'}>Admins</Text>
          <Button
            onClick={() => {
              navigate('admin/register');
            }}
          >
            Register For an Account
          </Button>
          <Button
            onClick={() => {
              navigate('admin/event/create');
            }}
          >
            Create Events
          </Button>
        </VStack>
        <VStack spacing={5} alignItems={'stretch'}>
          <Text textAlign={'center'}>Users</Text>
          <Button
            onClick={() => {
              navigate('user/register');
            }}
          >
            Register For an Account
          </Button>
          <Button
            onClick={() => {
              navigate('events');
            }}
          >
            Book Event Tickets
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Home;
