# Mosaique Casa

A web-based reservation and order management system for restaurants and hospitality venues. Staff can manage reservations, assign guests to tables, take food and drink orders, and process checkouts — all from a single dashboard.

## Features

- **Reservations** — Create reservations with guest name and party size; convert them into active guests with table assignments.
- **Guest Management** — View all active guests and their assigned units (tables/seating areas).
- **Order System** — Select food and drinks with quantity controls, view a real-time receipt, and checkout when done.
- **Admin Panel** — Full CRUD management of units, menu items (food & drinks), and user accounts.
- **Statistics Dashboard** — Real-time overview of available vs. reserved units.
- **Authentication** — Token-based login with session cookies (24 h expiry). Protected routes redirect unauthenticated users to the login page.

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | Ember.js 4.3 (Octane)                           |
| Data             | Ember Data 4.3 — REST adapter (MongoDB `_id`)   |
| Auth             | ember-simple-auth 4.2 (Bearer token)            |
| Styling          | Bootstrap 5 · SCSS                              |
| Animations       | ember-animated                                  |
| Date picker      | ember-pikaday (Moment.js)                       |
| Linting          | ESLint · ember-template-lint · Prettier         |
| Testing          | QUnit · ember-qunit                             |
| CI               | GitHub Actions (lint + test)                    |

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (12.x, 14.x, or ≥ 16)
- [Ember CLI](https://cli.emberjs.com/release/)
- The companion back-end server — [mosaique-casa-server](https://github.com/<IronnKnight>/mosaique-casa-server)

## Installation

```bash
git clone https://github.com/<IronnKnight>/mosaique-casa.git
cd mosaique-casa
npm install
```

## Running

Start the Ember dev server:

```bash
ember serve
```

Then visit [http://localhost:4200](http://localhost:4200).

> **Note:** The app expects the API server to be running at `http://localhost:3000`. See the back-end repo for setup instructions.

## Available Scripts

| Command                          | Description                        |
| -------------------------------- | ---------------------------------- |
| `ember serve`                    | Start the dev server               |
| `ember test`                     | Run the test suite                 |
| `ember test --server`            | Run tests in watch mode            |
| `npm run lint`                   | Lint JS and Handlebars templates   |
| `npm run lint:fix`               | Auto-fix lint issues               |
| `ember build --environment production` | Production build              |

## Project Structure

```
app/
├── adapters/          # REST adapter (API host, auth headers)
├── authenticators/    # Token-based authenticator
├── components/        # Glimmer components
│   ├── admin/         #   Admin panel (navigation, item list, item form)
│   └── guest-menu/    #   Order modal (article, receipt, reservation)
├── controllers/       # Route controllers with business logic
├── helpers/           # Template helpers (totals, availability, etc.)
├── models/            # Ember Data models
├── routes/            # Route definitions & auth guards
├── serializers/       # REST serializer (MongoDB _id mapping)
├── session-stores/    # Cookie-based session store
├── styles/            # SCSS modules
└── templates/         # Handlebars templates
```

## Data Models

| Model         | Fields                                             |
| ------------- | -------------------------------------------------- |
| Reservation   | `name`, `people`                                   |
| Guest         | `name`, `units`                                    |
| Unit          | `name`                                             |
| Food          | `name`, `price`, `quantity`                        |
| Drink         | `name`, `price`, `quantity`                        |
| Order         | `guestId`, `foods [{foodId, quantity}]`, `drinks [{drinkId, quantity}]` |
| User          | `username`, `password`                             |

## License

MIT
