# Instagran Clone Aplication

This Instagram Clone application allows users to create and manage posts, explore an engaging feed with infinite scrolling, and connect with other users through search and follow features, all while ensuring secure and seamless authentication.

---

## Table of Contents
1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies](#technologies)
6. [Contributing](#contributing)

---

## Features

### Functional Requirements
- **Follow/Unfollow**: Users can follow or unfollow other users to personalize their feed and stay connected.
- **Infinite Scrolling**: User feeds support infinite scrolling.
- **Post Management**: Users can:
  - Add posts.
  - Delete posts.
- **Authentication**:
  - Sign up, login, and logout functionalities.
- **Account Deletion**: Users can delete their accounts, with all associated data securely removed.

### Non-Functional Requirements
- **Security**: Secure user authentication and data protection.
- **Maintenance**: Easily maintainable and updatable app structure(Atomic Structure).
- **Scalability**: Scalable architecture to handle increasing numbers of users and posts.

---

## Requirements

### Functional
- Support for infinite scrolling.
- RESTful APIs for post management, user engagement, and authentication.

### Non-Functional
- Secure user authentication mechanisms using JWT.
- Database design supporting scalability (e.g., NoSQL).
- Codebase structured for easy bug fixing and feature updates.

---

## Installation

### Prerequisites
- Node.js v20 or above
- MongoDB database
- Git (for cloning the repository)
- React Native Latest Version

### Steps to Setup the Project Environment
Follow [this](https://reactnative.dev/docs/getting-started-without-a-framework) link to Setup the Project Environment.


### Steps to Start the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/NilayPatel27/instagramClone

2. Navigate to the project directory:
   ```bash
   cd instagramClone

3. Install dependencies:
   ```bash
   npm install

4. Run the Backend server:
   ```bash
   cd server && node app.js

5. Run the Frontend server:
   ```bash
   npx react-native run-android(for Android)
   
## Technologies

The project utilizes the following stack:

### Frontend
- **Framework**: React Native
- **Language**: TypeScript
- **Libraries**:
  - Axios for API communication
  - React Navigation for routing

### Backend
- **Framework**: Node.js with Express.js
- **Authentication**: JWT for secure user sessions
- **Database**: MongoDB (NoSQL database)



## Usage
### Authentication
- **Sign Up**: Create an account to access the app.
- **Login**: Log in with your credentials.
- **Logout**: Securely log out of the app.

### Post Management
- **Create**: Add a new post with a single or multiple images.
- **Delete**: Remove unwanted posts.

### Feed Navigation
- Scroll through posts with infinite scrolling.

### User Engagement
- Search other users, Follow/Unfollow them, and see their Feeds.

### Account Management
- **Update Details**: Modify user account details.
- **Delete Account**: Permanently remove your account and associated data.


## Contributing
We welcome contributors to improve the app. Follow the steps below to contribute:

### How to Contribute
### Steps
1. Fork the Repository: Create a personal copy of the repository.

2. Clone Your Fork:
   ```bash
   git clone https://github.com/NilayPatel27/instagramClone

3. Make Changes: Add your improvements or fixes.
