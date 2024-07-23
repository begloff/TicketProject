import React from 'react';
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
import { useDispatch } from 'react-redux';
import { registerEvent } from '../api/event';

const EventCreationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = async data => {
    try {
      await dispatch(registerEvent(data));
      toast({
        title: 'Event created',
        description: 'Your event has been created successfully.',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
      reset();
    } catch (e) {
      toast({
        title: 'Error creating event',
        description: e.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  //If auth is implemented, make only available to admin users (not public facing)
  return (
    <Box maxW="md" mx="auto" mt={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={!!errors.email} mt={4}>
          <FormLabel htmlFor="email">Account Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter account email"
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
        <FormControl isRequired isInvalid={!!errors.name} mt={4}>
          <FormLabel htmlFor="name">Event Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter event name"
            {...register('name', { required: 'Event name is required' })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.date} mt={4}>
          <FormLabel htmlFor="date">Event Date</FormLabel>
          <Input
            id="date"
            type="date"
            {...register('date', { required: 'Event date is required' })}
          />
          <FormErrorMessage>
            {errors.date && errors.date.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.capacity} mt={4}>
          <FormLabel htmlFor="capacity">Maximum Capacity</FormLabel>
          <Input
            id="maxCapacity"
            type="number"
            placeholder="Enter maximum capacity"
            {...register('maxCapacity', {
              required: 'Maximum capacity is required',
            })}
          />
          <FormErrorMessage>
            {errors.capacity && errors.capacity.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={6}
          colorScheme="teal"
          type="submit"
          isDisabled={isSubmitting}
          rightIcon={isSubmitting ? <Spinner size="sm" /> : null}
        >
          {isSubmitting ? 'Submitting...' : 'Create Event'}
        </Button>
      </form>
    </Box>
  );
};

export default EventCreationForm;
