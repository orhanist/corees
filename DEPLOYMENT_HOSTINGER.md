# Hostinger VPS Deployment (Hardened)

## Frontend-only release (current sprint)

To publish the site for **public viewing only** (admin in a later sprint):

1. Set in your deployment environment (e.g. Hostinger env vars or `.env.production`):
   - `PUBLIC_SITE_ONLY=true`
2. Do **not** commit `.env`, `.env.local`, or `.env.production` (they are in `.gitignore`).
3. With `PUBLIC_SITE_ONLY=true`, all `/admin` and `/auth` routes redirect to the home page; `/api/admin` and `/api/auth` return 404. No admin or auth surface is exposed.

## 1) Server baseline
- Use Ubuntu 22.04+ VPS.
- Create non-root deploy user with sudo privileges.
- Enable firewall:
  - `sudo ufw allow OpenSSH`
  - `sudo ufw allow 'Nginx Full'`
  - `sudo ufw enable`
- Install fail2ban and enable ssh jail.

## 2) Runtime and reverse proxy
- Install Node.js 20 LTS and npm.
- Install PM2 globally: `npm i -g pm2`.
- Install Nginx and apply `infra/nginx/corees.conf`.
- Obtain TLS cert:
  - `sudo certbot --nginx -d your-domain.com -d www.your-domain.com`

## 3) MySQL Database Setup (Hostinger)

### 3.1 Create MySQL Database and User
1. Log into Hostinger dashboard → **Websites** → **corees.org** → **Databases** → **Management**
2. Click **"+ Create a New MySQL Database And Database User"**
3. Fill in:
   - **Database Name**: Choose a name (e.g., `corees`). Hostinger will prefix it with `u637852097_` (e.g., `u637852097_corees`)
   - **Username**: Choose a username (can be same as database name). Will be prefixed similarly
   - **Password**: Set a strong password (save it securely)
4. Click **"Create"**
5. Note down:
   - Full database name: `u637852097_corees` (example)
   - Full username: `u637852097_corees` (example)
   - Password: (the one you set)
   - **Host**: `srv2078.hstgr.io` (or IP: `195.35.59.103`)
   - **Port**: `3306` (default MySQL port)

### 3.2 Remote MySQL Access (if app runs on different server)
If your Next.js app is deployed on a VPS/server different from Hostinger:
1. Go to **Databases** → **Remote MySQL**
2. Click **"+ Create remote database connection"**
3. Add the **IP address** of your VPS/server where the app runs
4. Select the database you created
5. This allows your app server to connect to Hostinger's MySQL

### 3.3 Connection String Format
Format: `mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

Example:
```
mysql://u637852097_corees:YourPassword@srv2078.hstgr.io:3306/u637852097_corees
```

## 4) App deployment
- Clone repo to `/var/www/corees`.
- Copy `.env.example` to `.env.production` and fill real secrets.
- **Set `DATABASE_URL`** in `.env.production` with your MySQL connection string from step 3.3
- Set file permissions: `chmod 600 .env.production`
- Start first deploy:
  - `npm ci`
  - `npx prisma migrate deploy` (or `npx prisma db push` for initial setup)
  - `npm run build`
  - `pm2 start ecosystem.config.js --env production`
  - `pm2 save`
  - `pm2 startup`

## 5) Security controls
- Keep app secrets only on server env files (600 permissions).
- Use strong MySQL passwords.
- If using Remote MySQL, only allow your app server's IP address.
- Enable automatic security updates:
  - `sudo apt install unattended-upgrades`
- Backups:
  - Use Hostinger's database backup features (if available)
  - Or set up regular MySQL dumps: `mysqldump -u USERNAME -p DATABASE_NAME > backup.sql`
  - Weekly encrypted offsite export recommended.

## 5) Operations
- Deploy updates with `deploy.sh`.
- Health checks:
  - `pm2 status`
  - `pm2 logs corees-web`
  - `curl -I https://your-domain.com`
- Rotate secrets on schedule:
  - signing keys every 90 days
  - encryption keys every 12 months or incident-triggered
