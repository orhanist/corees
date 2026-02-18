# Hostinger VPS Deployment (Hardened)

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

## 3) App deployment
- Clone repo to `/var/www/corees`.
- Copy `.env.example` to `.env.production` and fill real secrets.
- Start first deploy:
  - `npm ci`
  - `npx prisma migrate deploy`
  - `npm run build`
  - `pm2 start ecosystem.config.js --env production`
  - `pm2 save`
  - `pm2 startup`

## 4) Security controls
- Require DB SSL (`sslmode=require`) in `DATABASE_URL`.
- Keep app secrets only on server env files (600 permissions).
- Enable automatic security updates:
  - `sudo apt install unattended-upgrades`
- Backups:
  - Managed Postgres daily snapshots + point-in-time restore.
  - Weekly encrypted offsite export.

## 5) Operations
- Deploy updates with `deploy.sh`.
- Health checks:
  - `pm2 status`
  - `pm2 logs corees-web`
  - `curl -I https://your-domain.com`
- Rotate secrets on schedule:
  - signing keys every 90 days
  - encryption keys every 12 months or incident-triggered
