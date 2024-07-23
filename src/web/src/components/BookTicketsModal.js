import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { registerBooking } from '../api/booking';
import { useDispatch } from 'react-redux';

const BookTicketsModal = ({ isOpen, onClose, event }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      await dispatch(registerBooking({ ...data, id: event?.id }));

      toast({
        title: 'Tickets Booked',
        description: `You have booked ${data?.ticketCount} tickets for ${event.name}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      reset();
      onClose();
    } catch (e) {
      toast({
        title: 'Error creating event',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  };

  useEffect(() => {
    //reset form once modal closes

    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  //Use react-hook-form to normalize form inputs and simplify error handling
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Tickets for {event.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={!!errors.email} mb={4}>
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

            <FormControl my={4} isRequired isInvalid={!!errors.ticketCount}>
              <FormLabel>Number of Tickets</FormLabel>
              <Input
                type="number"
                placeholder="Enter number of tickets"
                {...register('ticketCount', {
                  required: 'Number of tickets is required',
                  min: { value: 1, message: 'Must be at least 1' },
                  max: {
                    value: event.availableTickets,
                    message: `There ${
                      event?.availableTickets > 1 ? 'are' : 'is'
                    } only ${event?.availableTickets} ticket${
                      event?.availableTickets > 1 ? 's' : ''
                    } remaining for this event`,
                  },
                })}
              />
              <FormErrorMessage>
                {errors.ticketCount && errors.ticketCount.message}
              </FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Book Now
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookTicketsModal;
