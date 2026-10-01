# FurTherapy

Website, online booking and admin dashboard for FurTherapy, a canine massage and bodywork practice in Mission Bay, Auckland.

Built with SvelteKit (Svelte 5, TypeScript), `adapter-node`, SQLite (`better-sqlite3`) and Nodemailer.

## Features

- Public pages: home, about, services, education, contact
- Online booking: customers request a slot, the owner approves or declines it, and the customer is emailed
- Contact form with email notification to the owner
- Admin dashboard (`/admin`): approve/decline/delete bookings, read contact messages, set weekly hours and block dates

## Local development

```sh
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

The SQLite database is created automatically at `data/furtherapy.db` on first use, with Mon–Fri 9:00–17:00 as the default weekly hours. Change them in the admin dashboard.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT` | Outgoing mail server (e.g. `smtp.gmail.com`, `587`) |
| `SMTP_USER`, `SMTP_PASS` | Mail account. For Gmail use an app password |
| `ADMIN_EMAIL` | Where new booking and contact notifications are sent |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Admin dashboard login. Use a long, unique password |

Never commit `.env`. These values are read at build time (`$env/static/private`), so build on the server that has the final `.env`, and do not copy a `build/` folder between machines.

## Production

```sh
npm ci
npm run build
PORT=3000 ORIGIN=https://furtherapy.co.nz node build/index.js
```

Server environment:

- `ORIGIN`: the public URL of the site (required by adapter-node for form/API requests)
- `PORT`: port to listen on
- `ADDRESS_HEADER=X-Forwarded-For` and `XFF_DEPTH=1`: when running behind a reverse proxy, so the rate limiter sees real visitor IPs. Without these, all visitors share one rate-limit bucket
- Serve over HTTPS: the admin session cookie is `Secure`

Persistence and backups:

- `data/` holds the database and must live on persistent storage
- Back up `data/furtherapy.db` regularly (the database runs in WAL mode, so use `sqlite3 data/furtherapy.db ".backup backup.db"` rather than copying the file while the site is running)

## After deploying

- Send a test booking and a test contact message and confirm the emails arrive
- Log in at `/admin` and set the real weekly hours
- Submit `https://furtherapy.co.nz/sitemap.xml` in Google Search Console

## Security notes

- Admin sessions are random tokens stored hashed in the database, valid for 8 hours
- Login, booking and contact endpoints are rate limited (in memory, per IP)
- Booking requests are validated server-side against opening hours, blocked dates and real slot times
- `/admin` and `/api` are excluded from search engines via `robots.txt`, meta tags and `X-Robots-Tag`

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run check`: type check
- `npm run lint` / `npm run format`: ESLint and Prettier
