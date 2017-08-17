# Running with a Backend

You can run the React development server (with hot reload, etc) along
with the development backend server, and the app's requests to the backend
will be proxied though the development server to the backend server.

Or, if the backend server is already deployed somewhere, like if you want to
work on the UX pointing to the staging backend, you can do that too.

First, set an environment variable called `BACKEND_PROXY` to the url of
the backend server.  If this will be the local server, then:

```bash
export BACKEND_PROXY=http://localhost:3001
```

If you are working with the local backend, then instead of "npm start",
execute:

```bash
npm run with-backend
```

That will start the backend server and the React dev server.

If the backend server is not the local one, then just run "npm start" as normal.
