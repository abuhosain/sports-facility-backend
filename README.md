
# Backend with mongoose 
# sport faculty booking project

This project is created by mongoose and i am using zod for validation


## Code run

To deploy this project run

```bash
  npm run start:dev
```

## Code error fix

To find and fix this project code error i am using eslint and prettier

```bash
  npm run lint
  npm run lint:fix
```
## API Reference

#### Sign Up

```http
  POST /api/auth/signup
```

#### Sign In

```http
  POST /api/auth/signin
```
#### Create a Facility (Admin Only)

```http
  POST /api/facility
```
#### Update a Facility (Admin Only)

```http
 PUT /api/facility/:id
```

#### Delete a Facility - Soft Delete (Admin Only)

```http
DELETE /api/facility/:id
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |
 

 
#### get all Facility  

```http
GEt /api/facility/


```
#### check all availity  

```http
GET /api/check-availability?date=2024-06-15
```
```

####  Create a Booking (User Only)

```http
POST /api/bookings
```

####  View All Bookings (Admin Only)

```http
GET /api/bookings

```
####  View Bookings by User (User Only)

```http
GET /api/bookings/user
```