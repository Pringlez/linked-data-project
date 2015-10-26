# Linked-Data-Project - John Walsh

Project Details
---------------
0. The project's front-end will be built in Ionic / Cordova
0. The back-end will eventually be built in NodeJS
0. I plan to link the NodeJS back-end with a CounchDB document database, and maybe sync that database with a client-side PouchDB database

During development I'll use the sqlite3 module to build a basic database to load the datasets into memory to serve the front-end application.


Installation
------------

You need to install dependencies in order to run this project, run the following command in the root directory to
install the front-end. The 'server' directory contains the back-end files built in NodeJS, run the same command below
to install required files.

```
npm install
```

Usage
-----

Naviagate to the root project directory, run the application by running the following command. You could also add the option
'--lab' to the command below to test on both on iOS and Android.

```
ionic serve
```

Server
------

Run the NodeJS back-end by running the following command in the 'server' directory. Make sure to run the 'npm install' to install the dependencies.

```
node server.js
```

The server will select your local ip address to listen on, the port is 8000.