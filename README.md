
# Ticket Booking App

This is a backend API server application for a movie ticket booking application. I have used passport and jwt based authentication techniques. It has some APIs for analytics also.


## Run Locally

Clone the project

```bash
  git clone https://github.com/akankit077/ticket_booking_app.git
```

Go to the project directory

```bash
  cd ticket_booking_app
```

Install docker

* Follow [these](https://docs.docker.com/engine/install/) instructions to install docker on your machine accordingly.

Start the docker container

```bash
  ./run.sh
  OR
  docker compose up
```


## API Reference

#### Login API

```http
  POST /auth/login
```
This API will return the details of the user and an access_token that will be used in other API calls as an authorization token.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Use ankit@example.com for testing |
| `password` | `string` | **Required**. Use password "Abcd1234# for ankit@example.com" |

#### Other APIs are mentioned in PostMan. You can access it [here](https://www.postman.com/wrencho-app/workspace/ticket-booking-app/collection/19996633-1ae2eeaf-dcc0-4ded-9c64-9b55084e8e36?action=share&creator=19996633).
