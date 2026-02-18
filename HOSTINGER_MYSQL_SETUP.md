# Hostinger MySQL Database Setup Guide

This guide walks you through setting up MySQL database on Hostinger for corees.org.

## Prerequisites
- Hostinger account with access to corees.org
- Admin access to Hostinger dashboard

## Step 1: Create MySQL Database and User

1. **Log into Hostinger Dashboard**
   - Go to https://hpanel.hostinger.com
   - Navigate to **Websites** → **corees.org**

2. **Access Database Management**
   - In the left sidebar, click **"Databases"**
   - Click **"Management"** (should be selected by default)

3. **Create New Database**
   - You'll see a form: **"Create a New MySQL Database And Database User"**
   - **Database Name**: Enter your desired name (e.g., `corees`)
     - Hostinger will automatically prefix it with `u637852097_`
     - Full name will be: `u637852097_corees`
   - **Username**: Enter a username (can be same as database name)
     - Will also be prefixed: `u637852097_corees`
   - **Password**: 
     - Click the password field and generate a strong password
     - **IMPORTANT**: Copy and save this password securely (you'll need it for `DATABASE_URL`)
   - Click the green **"Create"** button

4. **Save Your Credentials**
   After creation, note down:
   - **Full Database Name**: `u637852097_corees` (example - yours will be different)
   - **Full Username**: `u637852097_corees` (example)
   - **Password**: (the one you set)
   - **Host**: `srv2078.hstgr.io` (or IP: `195.35.59.103`)
   - **Port**: `3306`

## Step 2: Configure Remote MySQL Access (If Needed)

**Only needed if your Next.js app runs on a different server/VPS than Hostinger.**

1. In Hostinger dashboard, go to **Databases** → **Remote MySQL**
2. Click **"+ Create remote database connection"**
3. Enter the **IP address** of your VPS/server where the app runs
   - You can find your server IP by running: `curl ifconfig.me` on your server
4. Select the database you created (`u637852097_corees`)
5. Click **"Create"**

This allows your app server to connect to Hostinger's MySQL database.

## Step 3: Build Your Connection String

Format: `mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

**Example:**
```
mysql://u637852097_corees:YourStrongPassword123@srv2078.hstgr.io:3306/u637852097_corees
```

**Important Notes:**
- Replace `YourStrongPassword123` with your actual password
- If your password contains special characters, URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`
  - `&` → `%26`
  - `+` → `%2B`
  - `=` → `%3D`
  - `?` → `%3F`
  - `/` → `%2F`

## Step 4: Set Environment Variable

### Option A: Hostinger Environment Variables (Recommended)
If Hostinger provides environment variable management for your hosting plan:
1. Go to **Websites** → **corees.org** → **Advanced** → **Environment Variables** (or similar)
2. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your connection string from Step 3
3. Save

### Option B: .env.production File on Server
If your app runs on a VPS/server:

1. SSH into your server
2. Navigate to your app directory: `cd /var/www/corees`
3. Edit `.env.production`:
   ```bash
   nano .env.production
   ```
4. Add or update:
   ```
   DATABASE_URL="mysql://u637852097_corees:YourPassword@srv2078.hstgr.io:3306/u637852097_corees"
   ```
5. Save and set permissions:
   ```bash
   chmod 600 .env.production
   ```

## Step 5: Run Database Migrations

On your server, run Prisma migrations to create the database schema:

```bash
cd /var/www/corees
npm ci
npx prisma migrate deploy
```

Or if using `db:push` for initial setup:
```bash
npx prisma db push
```

This will create all the tables (users, events, passkey_credentials, etc.) in your MySQL database.

## Step 6: Verify Connection

### Test from Server
```bash
# Test MySQL connection
mysql -h srv2078.hstgr.io -u u637852097_corees -p u637852097_corees
# Enter your password when prompted
# Then run: SHOW TABLES;
# Should show: users, events, passkey_credentials, etc.
```

### Test from Application
1. Restart your application (if using PM2: `pm2 restart corees-web`)
2. Check logs: `pm2 logs corees-web`
3. Look for any database connection errors
4. Visit your website and test functionality

## Troubleshooting

### Connection Refused
- **Check Remote MySQL**: If app is on different server, ensure IP is added in Remote MySQL
- **Check Firewall**: Ensure port 3306 is not blocked
- **Verify Credentials**: Double-check username, password, host, and database name

### Authentication Failed
- **Check Password**: Ensure password is correct and URL-encoded if needed
- **Check Username**: Use full username with prefix (`u637852097_...`)

### Table Not Found
- **Run Migrations**: Ensure `npx prisma migrate deploy` completed successfully
- **Check Database Name**: Verify you're connecting to the correct database

### SSL/TLS Errors
- Hostinger MySQL may not require SSL for local connections
- If SSL is required, add `?ssl=true` to connection string (though usually not needed)

## Security Best Practices

1. **Strong Passwords**: Use a password generator for database passwords
2. **Restrict Access**: Only allow your app server IP in Remote MySQL
3. **Environment Variables**: Never commit `.env.production` to git
4. **File Permissions**: Keep `.env.production` at 600 permissions
5. **Regular Backups**: Use Hostinger's backup features or set up automated MySQL dumps

## Next Steps

After database is configured:
1. Run migrations (Step 5)
2. Seed database (optional): `npx prisma db seed`
3. Restart application
4. Test admin login and passkey registration
5. Verify events can be created/displayed

## Support

If you encounter issues:
- Check Hostinger documentation: https://support.hostinger.com
- Review application logs: `pm2 logs corees-web`
- Check Prisma logs: Add `log: ['query', 'error']` to PrismaClient in `lib/prisma.ts` temporarily
