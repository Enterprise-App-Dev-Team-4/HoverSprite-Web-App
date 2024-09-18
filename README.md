# HoverSprite Organic Sprayer Management System

### [EEET2580] Enterprise Application Development - RMIT Vietnam

## Project Overview

This project is developed by Team 4 for the [EEET2580] Enterprise Application Development course at RMIT Vietnam. The HoverSprite Organic Sprayer Management System is a comprehensive web application designed to streamline and digitize the operations of HoverSprite, a Vietnamese agricultural solutions company. HoverSprite specializes in organic fertilizer and pesticide spraying services using a fleet of drones.

## Team Members

| Member Name     | sID        | Role                | Works                                                                                               | Contribution |
|-----------------|------------|---------------------|-----------------------------------------------------------------------------------------------------|--------------|
| Hua Nam Huy     | s3881103   | Frontend Developer   | Designed UI for the web, developed UI for Service page, Booking page, Landing page, Receptionist View Order page, Alert Modal. |              |
| Dinh Gia Bao    | s3877923   | Frontend Developer   |                                                                                                     |              |
| Nguyen Duc Anh  | s3878010   | Frontend Developer   |                                                                                                     |              |
| Dinh Ngoc Minh  | s3925113   | Fullstack Developer, Team Leader  | Designed system architecture, data model, handled all backend services, OAuth2, JWT, Websocket service, Cloud Server config, wrote API for system interaction, Order management logic, Service management logic, Account management logic, handle realtime notification, developed UI for Navbar,  Booking page, fixed UI for other pages|              |
| Tran Ngoc Minh  | s3911737   | Frontend Developer   |                                                                                                     |              |


## Project Features

This is a web application built to streamline and manage the business operations of HoverSprite, a fictional agricultural solutions company specializing in organic fertilizer and pesticide spraying services using drones. It has the following features:

### Customer Registration and Sign-in

- Secure registration for farmers, receptionists, and sprayers.
- Password hashing for secure password storage.
- Profile creation and management.

### Spray Order Booking and Management

- User-friendly interface for booking spraying services.
- Selection of crop type, farmland area, desired date, and time.
- Display of available spraying sessions and total cost calculation.
- Order management section for viewing and tracking the status of orders.

### Service Delivery

- Real-time tracking of order status (e.g., pending, confirmed, assigned, in progress, completed).
- Email notifications to farmers and sprayers about order updates and assignments.
- Confirmation of order completion with payment management.

### Customer Feedback and Service Quality Rating

- Mechanism for farmers to submit feedback and rate the service.
- Storage of feedback for internal analysis and service improvement.

### Multi-Device Accessibility

- Responsive design ensuring accessibility and usability on both desktop and mobile devices.

### Security and Authentication

- Secure login mechanisms and data privacy measures.
- Implementation of OAuth for third-party authentication.

## Technologies Used

### Frontend

- **HTML**: For structuring the web pages.
- **CSS**: For styling and layout.
- **JavaScript**: For interactivity and dynamic content.
- **Express.js**: For routing between the webpage

### Backend

- **Spring Boot**: Main framework for developing the backend services.
- **Java**: Primary programming language for the backend.
- **PostgreSQL**: Database management system for storing application data.
- **Websocket**: To fetch realtime data to the subcribers.

