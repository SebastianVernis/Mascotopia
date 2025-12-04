# Deployment Guide - Mascotopia

**Project:** Mascotopia - Pet Products E-commerce  
**Stack:** PHP + Vanilla JavaScript  
**Recommended Hosting:** InfinityFree (Free PHP Hosting)  
**Date:** 2025-11-30

---

## 🎯 Recommended Hosting: InfinityFree

**Why InfinityFree:**
- ✅ 100% Free forever
- ✅ 5GB Disk Space
- ✅ Unlimited Bandwidth
- ✅ PHP 8.1+ Support
- ✅ cPanel included
- ✅ MySQL databases (400 databases)
- ✅ Free subdomain or custom domain
- ✅ No ads on your site
- ✅ Zero rewrite needed - upload and go

**Website:** https://infinityfree.net/

---

## 📋 Deployment Steps

### Step 1: Create InfinityFree Account

1. Go to https://infinityfree.net/
2. Click "Sign Up Now"
3. Create your account (email + password)
4. Verify email
5. Login to Client Area

### Step 2: Create Hosting Account

1. Click "Create Account"
2. Choose subdomain or use custom domain:
   - **Free subdomain:** `mascotopia.great-site.net` (or similar)
   - **Custom domain:** `mascotopia.com` (if you own it)
3. Enter username and password
4. Click "Create Account"
5. Wait 2-5 minutes for activation

### Step 3: Upload Files via FTP

**Option A: Using FileZilla (Recommended)**

1. Download FileZilla: https://filezilla-project.org/
2. Get FTP credentials from InfinityFree cPanel
3. Connect to FTP:
   - **Host:** `ftpupload.net` (or provided by InfinityFree)
   - **Username:** Your hosting username
   - **Password:** Your hosting password
   - **Port:** 21
4. Navigate to `/htdocs/` folder on remote server
5. Upload all files from `/public/`, `/src/`, `/assets/` folders
6. Maintain directory structure:
   ```
   htdocs/
   ├── public/
   ├── src/
   └── assets/
   ```

**Option B: Using cPanel File Manager**

1. Login to cPanel (link provided by InfinityFree)
2. Open "File Manager"
3. Navigate to `/htdocs/` folder
4. Click "Upload"
5. Upload all project files
6. Maintain directory structure

### Step 4: Configure Public Directory

**Important:** The `public/` folder should be the web root.

1. In cPanel, go to "Domains" or "Addon Domains"
2. Edit your domain settings
3. Set "Document Root" to `/htdocs/public/`
4. Or create `.htaccess` file in `/htdocs/` with:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_URI} !^/public/
   RewriteRule ^(.*)$ /public/$1 [L]
   ```

### Step 5: Verify API Routes

1. Test API endpoint: `https://yourdomain.com/src/php/api.php/products`
2. Should return JSON with products
3. If 404 error, ensure `/src/` folder is accessible
4. Check `.htaccess` in `/public/` folder:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^(.*)$ index.php/$1 [L]
   </IfModule>
   ```

### Step 6: Update API URLs (if needed)

If your API endpoints need absolute URLs:

1. Open `/src/js/products.js`
2. Update API base URL to your domain
3. Example: `const API_URL = 'https://yourdomain.com/src/php/api.php';`

### Step 7: Test Website

1. Open your website: `https://yourdomain.com`
2. Test navigation: Home → Products → Cart
3. Test adding products to cart
4. Test cart modifications (add/remove/update quantities)
5. Test checkout process
6. Verify LocalStorage persistence (close and reopen browser)

---

## 🔄 Alternative Free Hosting Options

### Option 2: 000webhost

**Pros:**
- Free forever
- cPanel included
- PHP 8.x support
- 300MB storage
- 3GB bandwidth

**Cons:**
- Smaller storage/bandwidth than InfinityFree
- More restrictive

**Website:** https://www.000webhost.com/

**Deployment:** Same as InfinityFree (FTP upload + cPanel)

---

### Option 3: AwardSpace

**Pros:**
- 1GB disk space
- PHP 8.x support
- 5GB bandwidth
- No ads

**Cons:**
- Smaller than InfinityFree

**Website:** https://www.awardspace.com/

---

## 🚀 Custom Domain Setup (Optional)

If you own a domain (e.g., `mascotopia.com`):

### Using InfinityFree

1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS Management
3. Update nameservers to InfinityFree's:
   - `ns1.byet.org`
   - `ns2.byet.org`
   - `ns3.byet.org`
   - `ns4.byet.org`
   - `ns5.byet.org`
4. Or add A record:
   - **Type:** A
   - **Host:** @
   - **Value:** InfinityFree server IP (provided in cPanel)
5. Add CNAME for www:
   - **Type:** CNAME
   - **Host:** www
   - **Value:** Your subdomain
6. Wait 24-48 hours for DNS propagation

---

## 🔧 Post-Deployment Configuration

### Enable HTTPS (SSL)

InfinityFree provides free SSL certificates:

1. Login to cPanel
2. Go to "SSL Certificates"
3. Select your domain
4. Click "Install Certificate"
5. Wait 5-10 minutes for activation

### Update Links to HTTPS

After SSL activation:

1. Update any hardcoded HTTP links to HTTPS
2. Add redirect in `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## 🐛 Troubleshooting

### Issue: API Returns 404

**Solution:**
- Verify `/src/php/api.php` exists on server
- Check file permissions (644 for files, 755 for folders)
- Ensure PHP is enabled for `/src/` directory
- Test direct access: `https://yourdomain.com/src/php/api.php`

### Issue: Cart Not Saving

**Solution:**
- Check browser console for JavaScript errors
- Verify LocalStorage is enabled in browser
- Test in incognito mode
- Clear browser cache

### Issue: Styles Not Loading

**Solution:**
- Check CSS file paths in HTML
- Verify `/src/css/style.css` uploaded correctly
- Check browser console for 404 errors
- Clear browser cache

### Issue: Images Not Showing

**Solution:**
- Verify `/assets/images/` folder uploaded
- Check image file names (case-sensitive)
- Verify image paths in HTML/CSS
- Test direct image URL

---

## 📊 Monitoring & Analytics

### Add Google Analytics (Optional)

1. Create Google Analytics account
2. Get tracking code
3. Add to `/public/index.php` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

---

## 💾 Backup Strategy

### Manual Backups

1. Login to cPanel
2. Go to "Backup Wizard"
3. Download full backup (weekly recommended)
4. Store backup locally

### FTP Backups

1. Connect via FileZilla
2. Download entire `/htdocs/` folder
3. Save locally with date stamp
4. Keep last 3-5 backups

---

## 🔐 Security Best Practices

### 1. Protect Sensitive Files

Add to `.htaccess` in root:
```apache
<FilesMatch "(\.env|composer\.json|composer\.lock)">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### 2. Disable Directory Listing

Add to `.htaccess`:
```apache
Options -Indexes
```

### 3. Add Security Headers

Add to `.htaccess`:
```apache
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

---

## 📈 Performance Optimization

### Enable Gzip Compression

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Browser Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 📝 Maintenance Checklist

**Weekly:**
- [ ] Test all website functionality
- [ ] Check error logs in cPanel
- [ ] Verify cart functionality
- [ ] Test API endpoints

**Monthly:**
- [ ] Full website backup
- [ ] Review security logs
- [ ] Check for PHP updates
- [ ] Test on multiple browsers/devices

**Quarterly:**
- [ ] Review and update content
- [ ] Optimize images
- [ ] Review analytics
- [ ] Plan feature improvements

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** - Click every button, test every feature
2. **Share with friends** - Get feedback on usability
3. **Monitor traffic** - Set up Google Analytics
4. **Plan improvements** - Use feedback to enhance features
5. **Document issues** - Keep track of bugs/requests

---

## 📞 Support Resources

**InfinityFree Support:**
- Forum: https://forum.infinityfree.net/
- Knowledge Base: https://infinityfree.net/support/
- Ticket System: Available in Client Area

**Project Issues:**
- Check GitHub repository for known issues
- Review `/todo.md` for planned features

---

## 💰 Cost Analysis

**Free Hosting (InfinityFree):**
- ✅ Hosting: $0/month
- ✅ SSL: $0/month
- ✅ Domain (optional): $10-15/year
- **Total: $0-15/year**

**Paid Upgrade Options (if needed):**
- iFastNet Premium: $4.99/month (same company as InfinityFree)
- Better support, more resources, no limitations

---

## 🚀 Future Migration Path

If the project grows and needs more resources:

### To Paid PHP Hosting
- Hostinger: $1.99/month
- Namecheap: $1.98/month
- SiteGround: $2.99/month

### To Modern Stack (Future)
- Rewrite to Node.js → Deploy to Vercel
- Rewrite to Next.js → Deploy to Vercel
- Keep frontend, migrate backend to Vercel Serverless

---

**Deployment Status:** Ready to deploy  
**Estimated Deployment Time:** 30-45 minutes  
**Technical Difficulty:** Easy  
**Last Updated:** 2025-11-30
