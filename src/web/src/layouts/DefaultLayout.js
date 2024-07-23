import { Container, Button, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = ({ component }) => {
  const navigate = useNavigate();

  //Force every page into the same layout --> consistent front end

  return (
    <Container
      display="flex"
      flexDirection="column"
      minH="100vh"
      p={4}
      minW={'75%'}
      pt={10}
    >
      <HStack alignContent={'center'} justifyContent={'space-between'} pb={10}>
        <Button variant={'link'} onClick={() => navigate('/')}>
          Ticket Booking System
        </Button>

        {/* Simple Navbar */}
        <HStack spacing={6}>
          <Button variant={'link'} onClick={() => navigate('/events')}>
            Events
          </Button>
          <Button variant={'link'} onClick={() => navigate('/user/register')}>
            Register
          </Button>
        </HStack>
      </HStack>
      {component}
    </Container>
  );
};

export default DefaultLayout;
