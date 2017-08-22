# React Starter App

* react
* redux, router, thunk
* classnames, bootstrap3
* api web server
* docker-logger, env-friendly-config
* node-simple-script (app.script.parseargs/exit)


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
General details about the capabilities of this starting point are [here](./doc/CreateReactApp.md).

Added to it are React Router and Redux Thunk.  From [this](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f) tutorial.

Various other useful packages and capabilities have been added.  See [more](./doc/More.md).

## Getting Started

This app requires node 6+.  If you do not already have it, install "nvm" to manage node versions and:

```bash
nvm install v6.11.2
```

or

```bash
nvm use v6.11.2
```

Then "npm install".

## Running

Running without the backend web server:

```bash
npm start
```

Running with the backend web server:

```bash
npm run with-backend
```

You can run the web server manually (useful if you need to edit it and restart
it):

```bash
node server.js
```

And then run the react stuff with "npm start".

Edit `package.json` to change where the development server proxies requests
to.  If you need to run the api server inside of docker, or if it is running
in the cloud, change "proxy" in `package.json`.

## Deploy to Production

```bash
docker-compose build
docker-compose up -d
```

The production-mode server is running on port 80 inside the container.


