# Anonymous chat

### Read and send messages

This app is not yet deployed, so if you want to see how it is:

```shell
$ git clone {repo name placeholder}
```

cd into the repo

```shell
$ cd Anon_chat
```

Then install the dependencies in the client and server

```shell
$ cd client
$ npm install
```

and

```shell
$ cd server
$ npm install
```

## Server

You should create a .env file on the server root directory.
The file should contain the following fields:

```ts
// The port the server will listen to
PORT;

// Your MongoDB connection url
MONGODB_CONNECTION;

// Secret string to be used by express session (can be anything)
SESSION_SECRET;

// Those are the secret codes to change user membership status
// basically, they are user privileges
GUEST_CODE;
MEMBER_CODE;
ADMIN_CODE;
```

The populatedb file is used to fill the db with dummy content, for testing purposes

To use it, run

```shell
$ tsc src/populatedb.ts
```

and then

```shell
$ node src/populatedb.js {your mongodb connection url}
```
