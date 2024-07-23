import { Box, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
