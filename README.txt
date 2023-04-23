# Chat-Application
 MERN Stack & Socket.IO

Name: Harshkumar N. Chaudhari
Roll: UI20CS16
Branch: CSE-B1

---------------------------------------------------------------------------------------------------------------------------------------
To Run:-

---------------------------------------------------------------------------------------------------------------------------------------
For Backend You need To Install Express, Mogoose, DotENV, Helmet, Morgan & Nodemon Modules By Running Below -
       ->  yarn add express mogoose dotenv helmet morgan nodemon

       You can run the API by running below command:
       -> yarn start
    
    Then You need to connect Backend With MondoDB, For that you need to make ".env" file in main directory(API):
        you can get the Link from MondoDB Like:
        MONGO_URL = mongodb+srv://<username>:<password>@cluster0.q0qxc7f.mongodb.net/<DB_Name>?retryWrites=true&w=majority
        which you will Add in ".env" File

    Now, you able to store all your data in the database which you can moniter in the MondoDB
---------------------------------------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------------------------------
For Frontend you need to Install Nodemon Modules By Running Below -
    -> yarn add nodemon or npm install

    Now you can Run frontend by running the following command:
        -> yarn start

    I have Used MaterialUi for Icons in the frontend, You may can install it:
    -> npm install @mui/icons-material
       yarn add @mui/icons-material

    Then You need to connect Backend With Backend(API), For that you need to make ".env" file in main directory(frontend):
        REACT_APP_PUBLIC_FOLDER = http://localhost:8800/images/

    You need to Install Axios To fetch the data from the Backend:
        -> npm i react-axios

    
    You need to Install for bindings for using React Router in Web Applications:
        -> npm i react-router-dom

    You need To Install timeago.js, Basically it is a simple library (less than 1 kb) that is used to format datetime
        -> npm i timeago.js@4.0.0-beta.3
---------------------------------------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------------------------------
For Socket Server,

    You need to install nodemon and socket.io 
        -> yarn add nodemon socket.io

    Then you can start the server by running the following command:
        -> yarn start
---------------------------------------------------------------------------------------------------------------------------------------