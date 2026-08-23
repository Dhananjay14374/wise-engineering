# Wise Engineering Consultants — Contact Form Backend

Express + Nodemailer + SMTP backend that powers the "Send a Message" form
on the Contact Us page. It validates and sanitizes submissions, verifies
Google reCAPTCHA v3, emails the enquiry to the company inbox, sends an
automatic acknowledgement to the visitor, and logs every enquiry.

```
server/
  config/         env, CORS, and Nodemailer transporter setup
  controllers/    request handlers
  routes/         /api/contact route
  middlewares/    rate limiting, validation/sanitization, error handling
  services/       reCAPTCHA verification, email sending
  utils/          HTML email templates, logger, UA parsing, sanitizers
  logs/           enquiries.log (auto-created, gitignored)
  app.js          Express app (middleware + routes)
  server.js       entrypoint — starts the HTTP server
  .env.example    copy to .env and fill in real values
```

---

## 1. Installation

Requires Node.js 18+ (Node 20/22 recommended).

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and fill in your real SMTP credentials (see section 2 below),
then start the server (section 3).

---

## 2. Configuring SMTP

The backend never hardcodes credentials — everything comes from `server/.env`.

```ini
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173        # or your live domain in production

SMTP_HOST=smtpout.secureserver.net        # GoDaddy Email
SMTP_PORT=465                             # 465 = SSL, 587 = STARTTLS
SMTP_USER=info@wiseengineeringconsultantspvt.ltd
SMTP_PASS=your-mailbox-password

FROM_EMAIL=info@wiseengineeringconsultantspvt.ltd
TO_EMAIL=info@wiseengineeringconsultantspvt.ltd

RECAPTCHA_SECRET_KEY=                     # from google.com/recaptcha/admin
RECAPTCHA_MIN_SCORE=0.5
```

### Where to get SMTP settings

**GoDaddy-hosted email (Microsoft 365 via GoDaddy, or classic GoDaddy Email):**
- Host: `smtpout.secureserver.net`
- Port: `465` (SSL) or `587` (TLS/STARTTLS)
- User: the full mailbox address, e.g. `info@wiseengineeringconsultantspvt.ltd`
- Pass: that mailbox's password (log in at `email.godaddy.com` to confirm/reset it)

If GoDaddy migrated your mailbox to Microsoft 365, use instead:
- Host: `smtp.office365.com`, Port: `587`, same user/pass.

**Test without real credentials:** use a free [Ethereal](https://ethereal.email)
inbox — go to ethereal.email, click "Create Ethereal Account", and drop the
generated host/port/user/pass straight into `.env`. Every "sent" email is
captured on their web inbox instead of a real mailbox — useful for verifying
the whole flow before your GoDaddy mailbox is ready.

### Google reCAPTCHA v3

1. Go to https://www.google.com/recaptcha/admin/create
2. Choose **reCAPTCHA v3**, add your domain(s) — include `localhost` for dev.
3. Copy the **Site key** into the frontend's `.env` as `VITE_RECAPTCHA_SITE_KEY`.
4. Copy the **Secret key** into `server/.env` as `RECAPTCHA_SECRET_KEY`.

Leaving both blank disables reCAPTCHA entirely (useful for local development)
— the server logs a warning and simply skips verification.

---

## 3. Starting the backend

```bash
cd server
npm run dev     # auto-restarts on file changes (node --watch)
# or
npm start       # plain production start
```

On startup the server verifies the SMTP connection and prints the result:

```
[server] Listening on port 5000 (development)
[server] Allowed frontend origin: http://localhost:5173
[smtp] Connected to smtpout.secureserver.net:465 as info@wiseengineeringconsultantspvt.ltd
```

Health check: `GET http://localhost:5000/api/health` → `{ "success": true, ... }`

---

## 4. How the React frontend connects

The Contact form (`src/components/ContactForm.jsx`) posts JSON to:

```
POST {VITE_API_URL}/api/contact
Content-Type: application/json

{
  "name": "...",
  "phone": "...",
  "email": "...",
  "service": "Structural Audit",
  "message": "...",
  "recaptchaToken": "..."
}
```

Set `VITE_API_URL` in the **frontend's** `.env` (project root, not `server/`):

```ini
VITE_API_URL=http://localhost:5000          # local dev
# VITE_API_URL=https://api.yourdomain.com   # production
```

The frontend and backend are two separate Node processes — run both at once
during development:

```bash
# terminal 1
cd server && npm run dev

# terminal 2 (project root)
npm run dev
```

---

## 5. Testing guide

**Health check**
```bash
curl http://localhost:5000/api/health
```

**Valid submission**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"+91 98765 43210","email":"test@example.com","service":"Structural Audit","message":"This is a test enquiry."}'
```
Expect `{"success":true,...}` and two emails: one to `TO_EMAIL`, one auto-reply
to the `email` you submitted (check the Ethereal inbox if using test SMTP).

**Validation errors** — omit a required field or send a malformed email/phone;
expect `400` with a `errors` array naming each invalid field.

**Rate limiting** — submit 6 times within 15 minutes from the same IP; the
6th request returns `429` with the rate-limit message.

**Header injection / XSS** — try a name like `John\r\nBcc: attacker@evil.com`
or `<script>alert(1)</script>`; the stored/emailed value should come back
stripped of the injected header line and any HTML/script tags.

**End-to-end from the browser** — run both servers (section 4), open
`http://localhost:5173/contact`, submit the form, and confirm: the button
shows "Sending...", a success toast appears, the form clears, and the two
emails arrive.

---

## 6. Deploying to GoDaddy

GoDaddy shared hosting (cPanel) does **not** run long-lived Node processes
the way a VPS does. There are two supported paths:

### Option A — GoDaddy VPS / Dedicated (recommended for a Node backend)

1. SSH into the server and install Node.js 20 LTS (via `nvm` or GoDaddy's
   Node.js selector if on cPanel-with-Node-support plans).
2. Upload the `server/` folder (e.g. `git clone` or `scp`), then:
   ```bash
   cd server
   npm install --omit=dev
   cp .env.example .env   # fill in real production values
   ```
3. Set `NODE_ENV=production` and `FRONTEND_URL=https://www.wiseengineeringconsultantspvt.ltd`
   in `.env`.
4. Keep it running with a process manager, e.g. PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name wise-contact-api
   pm2 save
   pm2 startup
   ```
5. Put Nginx (or GoDaddy's built-in Apache) in front as a reverse proxy from
   `https://api.wiseengineeringconsultantspvt.ltd` → `http://127.0.0.1:5000`,
   with a free Let's Encrypt / GoDaddy SSL certificate on the API subdomain.
6. In the frontend build, set `VITE_API_URL=https://api.wiseengineeringconsultantspvt.ltd`
   and rebuild (`npm run build`) before deploying the `dist/` folder.

### Option B — cPanel "Setup Node.js App" (if your GoDaddy plan includes it)

1. In cPanel → **Setup Node.js App** → create an application:
   - Application root: the uploaded `server/` folder
   - Application URL: e.g. `api.wiseengineeringconsultantspvt.ltd`
   - Application startup file: `server.js`
   - Node version: 18+
2. Use the app's "Run NPM Install" button (installs from `package.json`).
3. Add all `.env` variables under the app's **Environment Variables** section
   (cPanel injects these into `process.env` for you — a separate `.env` file
   is optional there, but harmless to keep for local parity).
4. Start/Restart the app from the cPanel UI.
5. Point the frontend's `VITE_API_URL` at the app's public URL and rebuild.

### The React site itself

The static `dist/` build (`npm run build` at the project root) deploys the
same way it already does today — upload `dist/` to `public_html` (or keep
using Vercel/Netlify) via GoDaddy File Manager/FTP. Only the backend needs a
Node-capable host; the frontend stays a static site.

---

## Security features included

- **Helmet** — secure HTTP headers
- **CORS** — locked to `FRONTEND_URL` (plus localhost in dev)
- **express-rate-limit** — 5 requests / 15 min per IP on `/api/contact`
- **compression** — gzip responses
- **morgan** — request logging
- **express-validator** — required-field, email, and phone validation
- **xss + CRLF stripping** — blocks HTML/script injection and email header injection
- **reCAPTCHA v3** — server-side score verification, configurable threshold
- **Centralized error handler** — no stack traces leaked to clients
