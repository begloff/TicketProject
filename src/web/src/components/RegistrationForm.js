import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { registerUser } from '../api/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ admin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  //Store isn't necessary for user at this point, would be if authed
  const onSubmit = async data => {
    try {
      setIsDisabled(true);
      await dispatch(registerUser({ ...data, isAdmin: admin }));
      toast({
        title: 'Account created',
        description:
          'Use the same email address when registering for events. We are redirecting you to the home page.',
        status: 'success',
        duration: 5000,
        onCloseComplete: () => {
          navigate('/');
        },
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Account Already Exists',
        description:
          'This email is already registered. Please register for events using this email address or register with a different email address. We are redirecting you to the home page.',
        status: 'warning',
        duration: 5000,
        onCloseComplete: () => {
          navigate('/');
        },
      });
    }
  };
  return (
    <Box maxW="md" mx="auto" mt={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          isInvalid={!!errors.name}
          isDisabled={isDisabled}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={!!errors.email}
          mt={4}
          isDisabled={isDisabled}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={6}
          colorScheme="teal"
          type="submit"
          isDisabled={isSubmitting || isDisabled}
          rightIcon={isSubmitting ? <Spinner size="sm" /> : null}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
