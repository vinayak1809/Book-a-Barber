# SnipSnap

> SnipSnap is a user-friendly application that empowers users to effortlessly schedule salon appointments, complete with integrated payment options. It also offers a seamless platform for salon owners to register, allowing them to showcase their skills and enhance their business growth.


[![Video Thumbnail]("")](https://github.com/vinayak1809/Book-a-Barber/assets/63184281/1565d4c0-10cc-4927-9cc7-5acb2bc7e5f8)

# Features

### User Features
  - **User Registration:** Users can create a new account with secure password encryption using bcrypt.

  - **Browse Salons:** Users can explore a directory of salons and view the services they offer.

  - **View Salon Details:** Users can access detailed information about each salon, including location, services, ratings, and reviews.

 - **Book Appointments:** Users can schedule appointments with their preferred salons and make payments using Razor Pay.


### Barber Features

 - **Barber Registration:** Barbers can register their own salons on the platform.

 - **Salon Management:** Barbers can create and manage their salon profiles, providing information about their services, working hours, and contact details.

 - **Service Scheduling:** Barbers can set up their availability for appointments, including specifying working hours and days off.

 - **Appointment Management:** Barbers can view and manage their scheduled appointments for the day, helping them stay organized and prepared.

## Setup

### Client-side (Frontend)

 ```bash
 $ cd Client
 $ npm install
 $ npm start
 ```

### Server-side (Backend)

 ```bash
 $ cd Server
 $ npm install
 $ npm start
 ```

## Design
### Database: 

  * User Table: Stores all User Credentials
  * Barber Table: Keeps track of registered barbers
  * Services Table: Manages available services provided by Barber
  * Appointment Table: Tracks user appointments
  * Schedules Table: Stores Salons available appoinments
  * Review Table: Stores user reviews and ratings

## Tech Stack

  * Frontend: React, Redux Toolkit, react-persist
  * Backend: Express.js, MongoDB, bcrypt
  * Other: Cloudinary Storage, RazorPay

## Tools

  * Visual Studio Code
  * Postman
  * Git


