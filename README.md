# Event Ticket Booking System

This project is a basic event ticket booking system built using MySQL, Express, and React. The system allows users to register, view available events, and book tickets for those events. Admin users can create events with specific details such as name, date, and maximum capacity. This project does NOT implement authorization, so all user association is done by email
address.

## Features

- **User Registration**: Users can register their name and email with the system.
- **Event Creation (Admin)**: Admin users can create events with a name, date, and maximum capacity.
- **View Events**: Users can view a list of all available events.
- **Book Tickets**: Users can book tickets for an event.

## Technical Requirements

- **Backend**: Built using Express.js and MySQL.
- **Frontend**: Built using React.
- **Database**: MySQL for storing user and event data.

## Assumptions/Simplifications

- No authorization/authentication is implemented for this project.

## Getting Started

### Prerequisites

- Docker

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/event-ticket-booking-system.git
   cd event-ticket-booking-system
   ```

2. **Set up environment variables**:
   Create a `.env` file in the `src/api` directory with the following content:
   ```
   DB_HOST=db
   DB_USER=root
   DB_PASSWORD=root
   DB_DATABASE=ticket_project
   DB_DIALECT=mysql
   ```

### Running the Application

1. **Build and start the containers**:

   ```sh
   docker-compose up --build
   ```

2. **Access the application**:

   - Backend API: http://localhost:4000
   - Frontend: http://localhost

3. **Removing Containers & Volumes**:
   ```sh
   docker-compose down -v
   ```

## API Endpoints

- **User Registration**: `POST /api/v1/users/register`
- **Create Event (Admin)**: `POST /api/v1/admin/events`
- **View Events**: `GET /api/v1/events`
- **Book Tickets**: `POST /api/v1/events/:eventId`

## Project Structure

```bash
TicketProject
├── README.md
├── docker-compose.yml
└── src
    ├── api
    │   ├── Dockerfile
    │   ├── config
    │   │   └── config.js
    │   ├── migrations
    │   │   ├── 20240722151713-create-user.js
    │   │   ├── 20240722151800-create-event.js
    │   │   └── 20240722151805-create-booking.js
    │   ├── models
    │   │   ├── booking.js
    │   │   ├── event.js
    │   │   ├── index.js
    │   │   └── user.js
    │   ├── package.json
    │   ├── routers
    │   │   ├── admin
    │   │   │   ├── events.js
    │   │   │   └── index.js
    │   │   └── user
    │   │       ├── events.js
    │   │       ├── index.js
    │   │       └── user.js
    │   ├── server.js
    │   ├── utils
    │   │   └── format_results.js
    │   ├── wait-for-it.sh
    │   └── yarn.lock
    └── web
        ├── Dockerfile
        ├── README.md
        ├── build
        │   ├── 404.html
        │   ├── favicon.ico
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── nginx.conf
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── api
        │   │   ├── booking.js
        │   │   ├── event.js
        │   │   └── user.js
        │   ├── components
        │   │   ├── BookTicketsModal.js
        │   │   ├── EventCreationForm.js
        │   │   ├── EventsTable.js
        │   │   └── RegistrationForm.js
        │   ├── hooks
        │   │   └── useReduxQuery.js
        │   ├── index.js
        │   ├── layouts
        │   │   └── DefaultLayout.js
        │   ├── pages
        │   │   ├── CreateEvents.js
        │   │   ├── Home.js
        │   │   ├── Register.js
        │   │   └── ViewEvents.js
        │   ├── redux
        │   │   ├── events.js
        │   │   ├── store.js
        │   │   └── user.js
        │   ├── routes
        │   │   └── index.js
        │   ├── theme.js
        │   └── utils
        │       ├── constants.js
        │       └── index.js
        └── yarn.lock
```
