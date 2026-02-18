# Hostinger Horizons Deployment - MySQL Setup

This guide is specifically for **Hostinger automatic Git deployment (Horizons)**.

## Your Database Details

Based on your Hostinger setup:
- **Database Name**: `u637852097_coreeducation`
- **MySQL User**: `u637852097_coreed`
- **Host**: `srv2078.hstgr.io` (or `195.35.59.103`)
- **Port**: `3306`

## Step 1: Build Your Connection String

Format: `mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME`

**Your connection string will be:**
```
mysql://u637852097_coreed:YOUR_PASSWORD@srv2078.hstgr.io:3306/u637852097_coreeducation
```

**Important:** Replace `YOUR_PASSWORD` with your actual MySQL password.

**If your password contains special characters**, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`
- `/` → `%2F`

**Example:** If your password is `MyP@ss#123`, the connection string becomes:
```
mysql://u637852097_coreed:MyP%40ss%23123@srv2078.hstgr.io:3306/u637852097_coreeducation
```

## Step 2: Set Environment Variables in Hostinger Horizons

### Method 1: Through Deployment Settings (Most Common)

1. **Log into Hostinger Dashboard**
   - Go to https://hpanel.hostinger.com
   - Navigate to **Websites** → **corees.org**

2. **Access Deployments**
   - In the left sidebar, look for **"Deployments"** or **"Horizons"**
   - Click on it to see your deployment settings

3. **Find Environment Variables**
   - Look for a section called:
     - **"Environment Variables"**
     - **"Env Variables"**
     - **"Build Settings"** → **"Environment Variables"**
     - **"Settings"** → **"Environment Variables"**
   - Or look for a tab/section labeled **"Variables"** or **"Config"**

4. **Add DATABASE_URL**
   - Click **"+ Add Variable"** or **"Add Environment Variable"**
   - **Key/Name**: `DATABASE_URL`
   - **Value**: Paste your connection string from Step 1
   - Click **"Save"** or **"Add"**

5. **Redeploy**
   - After adding the environment variable, you may need to:
     - Click **"Redeploy"** or **"Deploy"** button
     - Or push a new commit to trigger automatic deployment

### Method 2: Through Website Settings

1. Go to **Websites** → **corees.org**
2. Look for **"Settings"** or **"Advanced"**
3. Find **"Environment Variables"** or **"Config Variables"**
4. Add `DATABASE_URL` with your connection string

### Method 3: Through File Manager (If Available)

Some Hostinger plans allow creating `.env` files:

1. Go to **Files** → **File Manager**
2. Navigate to your website root directory
3. Create or edit `.env.production` file
4. Add:
   ```
   DATABASE_URL="mysql://u637852097_coreed:YOUR_PASSWORD@srv2078.hstgr.io:3306/u637852097_coreeducation"
   ```
5. Save the file

**Note:** Make sure `.env.production` is in `.gitignore` (it should be already)

## Step 3: Run Database Migrations

After setting `DATABASE_URL`, you need to run Prisma migrations to create the database tables.

### Option A: Through Hostinger SSH/Terminal (If Available)

1. Access **SSH/Terminal** from Hostinger dashboard
2. Navigate to your app directory (usually `/home/u637852097/domains/corees.org/public_html` or similar)
3. Run:
   ```bash
   npm ci
   npx prisma migrate deploy
   ```
   Or for initial setup:
   ```bash
   npx prisma db push
   ```

### Option B: Through Build Script

If Hostinger Horizons runs build scripts automatically, you can add migration to your `package.json`:

Check your `package.json` for build scripts. You might need to modify the build process to include migrations.

### Option C: Manual Migration via phpMyAdmin

If SSH is not available, you can:
1. Go to **Databases** → **phpMyAdmin**
2. Select your database `u637852097_coreeducation`
3. Run the SQL from Prisma migrations manually (not recommended, but possible)

## Step 4: Verify Setup

1. **Check Deployment Logs**
   - In Hostinger dashboard → **Deployments** → View build logs
   - Look for any database connection errors

2. **Test Your Website**
   - Visit https://corees.org
   - Check if pages load without database errors
   - Try accessing admin routes (if not in `PUBLIC_SITE_ONLY` mode)

3. **Check Database Tables**
   - Go to **Databases** → **phpMyAdmin**
   - Select `u637852097_coreeducation`
   - You should see tables like:
     - `users`
     - `events`
     - `passkey_credentials`
     - `admin_invites`
     - etc.

## Troubleshooting

### Can't Find Environment Variables Section

**Try these locations:**
1. **Deployments** → Your deployment → **Settings** → **Environment Variables**
2. **Websites** → corees.org → **Settings** → **Environment Variables**
3. **Advanced** → **Environment Variables**
4. Look for a **"Config"** or **"Variables"** button/tab

**If still can't find:**
- Check Hostinger documentation: https://support.hostinger.com
- Contact Hostinger support and ask: "Where do I set environment variables for Git deployments?"

### Connection Errors

**Error: "Access denied"**
- Double-check username: `u637852097_coreed`
- Verify password is correct
- Check if password needs URL encoding

**Error: "Unknown database"**
- Verify database name: `u637852097_coreeducation`
- Check spelling (case-sensitive)

**Error: "Can't connect to MySQL server"**
- Verify host: `srv2078.hstgr.io`
- Check port: `3306`
- Ensure you're not trying to use Remote MySQL (not needed for same-host deployment)

### Migration Errors

**"Migration failed"**
- Ensure `DATABASE_URL` is set correctly
- Check build logs for specific error messages
- Verify Prisma Client is generated: `npx prisma generate`

## Quick Reference

**Your Connection String Template:**
```
mysql://u637852097_coreed:YOUR_PASSWORD@srv2078.hstgr.io:3306/u637852097_coreeducation
```

**Required Environment Variables:**
- `DATABASE_URL` (required)
- `AUTH_SECRET` (required - generate a 64+ character random string)
- `NEXTAUTH_URL` (should be `https://corees.org`)
- `AUTH_TRUST_HOST` (set to `"true"` for Hostinger)
- Other variables from `.env.example`

## Next Steps

1. ✅ Set `DATABASE_URL` in Hostinger environment variables
2. ✅ Run migrations (`npx prisma migrate deploy` or `npx prisma db push`)
3. ✅ Verify tables are created in phpMyAdmin
4. ✅ Test your website
5. ✅ Set other required environment variables (AUTH_SECRET, etc.)

## Need Help?

If you're stuck:
1. Check Hostinger support documentation
2. Look at deployment build logs for error messages
3. Verify all credentials are correct
4. Ensure database user has proper permissions (all permissions should be checked, as shown in your screenshot)
