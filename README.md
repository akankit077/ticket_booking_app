
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

### Login API

```http
  POST /auth/login
```
This API will return the details of the user and an access_token that will be used in other API calls as an authorization token.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Use ankit@example.com for testing |
| `password` | `string` | **Required**. Use password **Abcd1234#** for ankit@example.com |

### Analytics API

We can use two methods of getting the analytics. One is by **DB Aggregation** and other is by **JS algorithms**. To switch between the methods, we have to pass a parameter named **method** whose value can be **db-aggregation** or **js-algorithm**.

#### Profit between two dates

```http
  POST /analytics/profit
```
This API will return the details of the money that was earned by movie between 2 dates with division by months. 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `method` | `string` | **Optional**. Use **db-aggregation** for DB Aggregation method and remove this parameter for using JS Algorithm |
| `movie` | `string` | **Required**. The name of the movie for which we want to find the profit earned |
| `startDate` | `string` | **Required**. The date from which we want to calculate the profit. It should be in TZ format. Like **2023-04-01T10:30:00Z** |
| `endDate` | `string` | **Required**. The date upto which we want to calculate the profit. It should be in TZ format. Like **2023-04-01T10:30:00Z** |


#### Visitors between two dates

```http
  POST /analytics/visitors
```
This API will return the number of visitors that visits the movie hall to watch the movie between 2 dates with division by months. 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `method` | `string` | **Optional**. Use **db-aggregation** for DB Aggregation method and remove this parameter for using JS Algorithm |
| `startDate` | `string` | **Required**. The date from which we want to calculate the profit. It should be in TZ format. Like **2023-04-01T10:30:00Z** |
| `endDate` | `string` | **Required**. The date upto which we want to calculate the profit. It should be in TZ format. Like **2023-04-01T10:30:00Z** |

#### Other APIs are mentioned in PostMan. You can access it [here](https://www.postman.com/wrencho-app/workspace/ticket-booking-app/collection/19996633-1ae2eeaf-dcc0-4ded-9c64-9b55084e8e36?action=share&creator=19996633).
