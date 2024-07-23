import { Box, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import { useEffect } from 'react';

const Register = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.title = 'Ticket System - Register';
  }, []);

  const admin = currentPath.includes('admin');
  //Pass admin status to registration form to pass to backend

  return (
    <Box>
      <Text fontSize={'3xl'} textAlign={'center'}>
        {admin ? 'Admin ' : 'User '}Account Registration
      </Text>
      <RegistrationForm admin={admin} />
    </Box>
  );
};

export default Register;
