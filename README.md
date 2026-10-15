# DevHub

DevHub is a full-stack web app for exploring programming languages and discover useful learning resources in one place. Browse featured languages, view the full catalogue, search by name, and open a details page for each language.

**Live demo:** https://devhub-ehti.onrender.com
_(Hosted on Render's free tier, so the first load can take up to 50 seconds while the server wakes up.)_

## Features

- Home page with featured languages
- "View All" page listing every language
- Case-insensitive search by language name
- Details page for each language
- Custom error page with proper 404 handling
- Responsive layout built with Bootstrap

## Tech Stack

| Layer             | Technology                               |
| ----------------- | ---------------------------------------- |
| Runtime           | Node.js                                  |
| Server            | Express.js                               |
| Templating Engine | EJS                                      |
| Database          | MongoDB Atlas with Mongoose              |
| Templating        | EJS (with a shared `boilerplate` layout) |
| Styling           | Bootstrap, custom CSS                    |
| Version Control   | Git and GitHub                           |
| Hosting           | Render                                   |

## Project Structure

devhub/
├── app.js # Express app, routes, DB connection
├── models/
│ └── language.js # Mongoose schema
├── init/
│ ├── data.js # Seed data
│ └── index.js # Script that loads seed data into the DB
├── utils/
│ └── ExpressError.js # Custom error class
├── views/
│ ├── layouts/
│ │ └── boilerplate.ejs
│ ├── includes/
│ │ └── head.ejs
| | └── footer.ejs
│ ├── languages/
│ │ ├── index.ejs # Home page
│ │ ├── ViewAll.ejs # All languages
│ │ ├── search.ejs # Search results
│ │ └── detail.ejs # Single language
│ └── error.ejs
| └── lang.ejs
├── public/ # Static files (CSS, JS, images)
├── package.json
└── .env # Local secrets (not committed)

## Routes

| Method | Route                        | Description                       |
| ------ | ---------------------------- | --------------------------------- |
| GET    | `/languages`                 | Home page with featured languages |
| GET    | `/languages/viewall`         | List all languages                |
| GET    | `/languages/search?q=<name>` | Search languages by name          |
| GET    | `/languages/:id`             | Show details of one language      |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account and cluster (or a local MongoDB install)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Unnati-Mandwe/devhub.git
cd devhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

### 4. Seed the database

```bash
node init/index.js
```

This loads the sample languages from `init/data.js` into your database. Run it once per database (local and Atlas are separate databases).

### 5. Start the server

```bash
node app.js
```

Open http://localhost:8080 in your browser.

## Deployment (Render)

1. Push the project to GitHub.
2. On Render, create a **Web Service** and connect the repository.
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
4. Under **Environment**, add `MONGO_URL` (and any other variables from your `.env`).
5. In MongoDB Atlas, open **Network Access** and allow `0.0.0.0/0` so Render can connect.
6. Make sure the app listens on Render's port:

Every push to `main` triggers an automatic redeploy.

## Security

- Never commit `.env`. Make sure `.gitignore` contains:

  node_modules
  .env

- If a password was ever pushed to GitHub, change it in Atlas immediately.

## Future Improvements

- Add more languages and categories
- Add filters (by type, year, popularity)
- User accounts and bookmarks
- Pagination on the View All page

## Author

Built as a mini major project by **Unnati Mandwe**.

## License

This project is for educational purposes.

## If you find DevHub useful, consider giving the repository a star!
