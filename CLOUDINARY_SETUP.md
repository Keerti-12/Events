# 🎨 Cloudinary Integration Guide

Complete guide to integrate Cloudinary for persistent image and video storage in Lucky Event DJ.

## Why Cloudinary?

- ✅ **Persistent Storage**: Images/videos survive server restarts and deploys
- ✅ **CDN Delivery**: Fast global content delivery
- ✅ **Image Optimization**: Automatic format conversion, resizing, compression
- ✅ **Video Support**: Host and stream videos efficiently
- ✅ **Free Tier**: 25 GB storage, 25 GB bandwidth/month
- ✅ **Transformations**: On-the-fly image/video editing via URL parameters

---

## Step 1: Get Cloudinary Credentials

### 1.1 Access Your Dashboard
1. Go to [cloudinary.com](https://cloudinary.com)
2. Log in to your account
3. You'll land on the **Dashboard** page

### 1.2 Find Your Credentials
On the dashboard, you'll see:

```
Cloud name: your_cloud_name
API Key: 123456789012345
API Secret: abcdefghijklmnopqrstuvwxyz1234
```

**Or find the environment variable:**
```
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

Example:
```
CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz1234@your_cloud_name
```

### 1.3 Copy All Three Values
You need:
- ✅ **Cloud Name** (e.g., `your_cloud_name`)
- ✅ **API Key** (e.g., `123456789012345`)
- ✅ **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz1234`)

---

## Step 2: Configure Render Backend

### 2.1 Add Environment Variables on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service (e.g., `lucky-event-dj-api`)
3. Go to **Environment** tab
4. Click **Add Environment Variable**

Add these **THREE** environment variables:

| Key | Value | Example |
|-----|--------|---------|
| `CLOUDINARY_URL` | `cloudinary://API_KEY:API_SECRET@CLOUD_NAME` | `cloudinary://123456789012345:abcd...@mycloud` |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Your API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Your API secret | `abcdefg...xyz1234` |

**⚠️ Important:**
- Replace the example values with YOUR actual Cloudinary credentials
- Keep `API_SECRET` confidential
- Don't add quotes around values

### 2.2 Save and Deploy

1. Click **Save Changes**
2. Render will automatically redeploy your backend
3. Wait 2-3 minutes for deployment to complete

---

## Step 3: Verify Integration

### 3.1 Check Deployment Logs

In Render dashboard → Your service → **Logs** tab

**Look for:**
```
✅ "Deploy successful"
✅ "Starting service"
✅ No errors about "cloudinary" or "storage"
```

**If you see errors:**
- `ModuleNotFoundError: No module named 'cloudinary'` → Deployment failed, check build logs
- Check that environment variables are correctly set

### 3.2 Test Upload

1. Go to your Django admin: `https://your-backend.onrender.com/admin/`
2. Log in with superuser credentials
3. Go to **Services** → Click any service
4. Upload a new image
5. Click **Save**

### 3.3 Check Cloudinary Dashboard

1. Go to Cloudinary dashboard
2. Click **Media Library** in sidebar
3. You should see your newly uploaded image!
4. The image URL will look like:
   ```
   https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/services/image_xyz.jpg
   ```

### 3.4 Test Frontend

1. Open your frontend: `https://your-frontend.vercel.app/services`
2. Check if the uploaded image displays correctly
3. Open DevTools → Network → Check image URL:
   - Should start with `https://res.cloudinary.com/...`
   - Should return **200 OK** status

---

## Step 4: Migrate Existing Images

### Option A: Re-upload via Admin (Recommended)
Since Render deleted old images, you'll need to:

1. Go to Django admin
2. Edit each Service/Gallery item
3. Re-upload the image
4. Save
5. The image now uploads to Cloudinary and persists forever

### Option B: Bulk Upload (Advanced)
If you have many images saved locally:

1. Save images to a folder on your computer
2. Use Cloudinary's bulk upload tool:
   - Go to Cloudinary dashboard
   - Media Library → Upload
   - Drag and drop images
   - Note the public IDs

3. Update database records manually or via Django shell

---

## Step 5: Advanced Configuration (Optional)

### 5.1 Image Transformations

Cloudinary URLs support transformations. Example:

**Original:**
```
https://res.cloudinary.com/mycloud/image/upload/sample.jpg
```

**Resize to 800x600:**
```
https://res.cloudinary.com/mycloud/image/upload/w_800,h_600,c_fill/sample.jpg
```

**Convert to WebP:**
```
https://res.cloudinary.com/mycloud/image/upload/f_auto,q_auto/sample.jpg
```

You can add these transformations in your frontend URLs.

### 5.2 Video Upload

Your Gallery model already supports videos. To upload:

1. Django admin → Gallery → Add new item
2. Set **Media type** = Video
3. **Option 1**: Upload video file directly (stores in Cloudinary)
4. **Option 2**: Use YouTube/Vimeo URL in `video_url` field

### 5.3 Cloudinary Widget (Future Enhancement)

For better upload UX, you can integrate Cloudinary's upload widget:
- [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget)
- Allows drag-and-drop, multiple uploads, progress bars
- Can be added to Django admin or frontend

---

## Troubleshooting

### Images Still Not Showing?

**✅ Check 1: Environment Variables Set?**
- Render dashboard → Environment → Verify all 4 variables are present
- No typos in variable names

**✅ Check 2: Backend Redeployed?**
- After adding env vars, Render should auto-redeploy
- Check Logs for "Deploy successful"

**✅ Check 3: Images Actually in Cloudinary?**
- Cloudinary dashboard → Media Library
- If empty, images weren't uploaded yet
- Try uploading via admin again

**✅ Check 4: API Returns Cloudinary URLs?**
- Open: `https://your-backend.onrender.com/api/services/`
- Check `image` field in JSON response
- Should be: `https://res.cloudinary.com/...`
- If still `/media/...`: Cloudinary not configured correctly

### Videos Not Playing?

**For uploaded videos:**
- Make sure file size is under Cloudinary's free tier limit (10 MB)
- Supported formats: MP4, WebM, MOV

**For YouTube/Vimeo:**
- Use embed URLs, not watch URLs
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

---

## Cost & Limits

### Cloudinary Free Tier:
- ✅ 25 GB Storage
- ✅ 25 GB Bandwidth/month
- ✅ 25,000 transformations/month
- ✅ Unlimited API calls
- ✅ 1 user

**Typical usage for your project:**
- ~100 images (@ 500KB avg) = 50 MB storage
- ~10,000 page views/month = ~5 GB bandwidth
- **Well within free tier! 🎉**

### Upgrade needed when:
- More than 25 GB traffic/month
- Storing 1000+ high-res images
- Video hosting exceeds limits

---

## Next Steps

✅ **You're Done!** Cloudinary is now integrated.

**What happens now:**
1. ✅ All new uploads go to Cloudinary
2. ✅ Images persist across deploys
3. ✅ CDN delivers content fast globally
4. ✅ No more "images disappearing" issues

**Optional Enhancements:**
- Add image transformations in frontend for responsive images
- Implement lazy loading
- Use Cloudinary's upload widget for better UX
- Add video streaming for gallery

---

## Support

- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Django Integration**: https://cloudinary.com/documentation/django_integration
- **API Reference**: https://cloudinary.com/documentation/image_upload_api_reference

---

**That's it! Your images and videos are now safe in the cloud! ☁️🎉**
