# Play Chat
Back-end application for the technical challenge of the Full Stack Jr. In this application, it is possible to manage the back-end of a small chat through HTTP(s) requests following the REST convention.


# Demo
[https://github.com/andressafirmino/TechnicalChallenge-PlayChat-Back]()

# Deploy
[https://play-chat-api.onrender.com]()

# How does it work?
This project is a REST API for exchanging messages. It has two entities: `users` and `messages`. The characteristics of these entities are in the `schema.prisma` file.

For the `users` entity, three routes were created:

- POST `/sign-up`: Register a user.
- POST `/sign-in`: Login user. If the user is not registered, a 401 error is returned.
- DELETE `/user/:id`: Log out a user given their id. If the user is not logged in a 401 error is returned.

For the `messages` entity, three routes were created:

- POST `/messages`: Send a message.
- GET `/messages`: Get all messages.
- GET `/:senderId/:receiverId`: Get all messages between two users.


# Motivation
This project is a REST API using the Node and NestJS ecosystem along with TypeScript and Prisma technologies. This was my first contact with NestJS and to be able to implement this framework I needed to learn the basics of Object Orientation. With this experience I was able to learn and practice important concepts of this technology, always aiming for clean code and scalability.

# Technologies used
For this project, the following were used:

- Node;
- NestJS;
- TypeScript;
- Prisma;
- Postgres;
- Redis;
- JWT.

# How to run in development
To run this project under development, you need to follow the steps below:

- Clone the repository;
- Download the necessary dependencies with the command: `npm install`;
- Then create the `.env` file based on `.env.example`;
- This `.env` file is composed of the following properties:
```
- DATABASE_URL="postgres://postgres:password@local..."
- JWT_SECRET="secret key"
- REDIS_URL="redis://local..."
```
- The `DATABASE_URL` property is used to connect to the database.
- The `JWT_SECRET` property is used to allow the authentication server to delegate authentication authority to the client.
- The `REDIS_URL` property is used to connect to the redis database.

- You will need to run Prisma to create the necessary database and tables. To do this, run the command: `npx prisma migrate dev`;
- To run the project under development, run the command `npm run dev`;


# Continuity plan
- Maintain user data logged into the redis database;
- Implement websocket for realtime;
- Implement adding users to friends list;
- Implement room creation;
- Implement message response;
- Implement message editing.
