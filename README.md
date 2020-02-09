# Register App
Browser based register application that interacts with a PostgreSQL database. Implemented in NodeJS with typescript, express, and the sequelize ORM.

If a `PORT` environment variable has not been defined then the application currently defaults to port 15100 (see ./src/app.ts).

To start via the terminal navigate to the source code directory and run the following commands (after install "rebuild" will be run automatically)...
```bash
npm install
npm run (re)build
npm run start
```

## Landing page (list available products)
http://register-app-titans.herokuapp.com/
