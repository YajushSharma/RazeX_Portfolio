# Video Integration Guide

This guide explains how to add your actual videos to the portfolio website.

---

## 🎥 Option 1: YouTube Videos (Recommended)

**Best for:** Videos already on YouTube, easy management, no hosting costs

### Step 1: Get YouTube Video ID

1. Go to your YouTube video
2. Copy the video ID from the URL
   - Example URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`

### Step 2: Update HTML

In `index.html`, find your video card and update the `data-video` attribute:

```html
<!-- BEFORE -->
<div class="video-card" data-video="short-1">

<!-- AFTER -->
<div class="video-card" data-video="https://www.youtube.com/embed/dQw4w9WgXcQ">
```

### Step 3: Update Thumbnail (Optional but Recommended)

Replace the thumbnail image source with YouTube's thumbnail:

```html
<img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Short video 1">
```

YouTube thumbnail quality options:
- `maxresdefault.jpg` - Highest quality (1920x1080)
- `hqdefault.jpg` - High quality (480x360)
- `mqdefault.jpg` - Medium quality (320x180)
- `sddefault.jpg` - Standard (640x480)

### Complete Example:

```html
<div class="video-card" data-video="https://www.youtube.com/embed/dQw4w9WgXcQ">
    <div class="video-thumbnail">
        <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Product Launch Teaser">
        <div class="video-overlay">
            <div class="play-button">
                <!-- SVG play button -->
            </div>
        </div>
        <div class="video-duration">0:45</div>
    </div>
    <div class="video-info">
        <h3 class="video-title">Product Launch Teaser</h3>
        <p class="video-stats">2.5M views • Trending</p>
    </div>
</div>
```

---

## 🎬 Option 2: Vimeo Videos

**Best for:** Professional quality, privacy controls, clean player

### Step 1: Get Vimeo Video ID

1. Go to your Vimeo video
2. Copy the video ID from the URL
   - Example URL: `https://vimeo.com/123456789`
   - Video ID: `123456789`

### Step 2: Update HTML

```html
<!-- Update data-video attribute -->
<div class="video-card" data-video="https://player.vimeo.com/video/123456789">
```

### Step 3: Get Thumbnail from Vimeo API (Optional)

You can get the thumbnail URL by visiting:
```
https://vimeo.com/api/v2/video/123456789.json
```

Or use a placeholder and manually replace it with a screenshot.

---

## 💾 Option 3: Local Video Files (Self-Hosted)

**Best for:** Full control, no third-party dependencies

### Step 1: Add Video Files

1. Create a `videos` folder in your project:
   ```
   /c:/Python/New folder/
   ├── videos/
   │   ├── short-1.mp4
   │   ├── short-2.mp4
   │   └── long-1.mp4
   ├── index.html
   ├── style.css
   └── script.js
   ```

2. Place your video files in the `videos` folder

### Step 2: Update HTML

```html
<div class="video-card" data-video="videos/short-1.mp4">
```

### Step 3: Create Custom Thumbnails

You can create thumbnails using:
- Video editing software (export first frame)
- FFmpeg command: `ffmpeg -i videos/short-1.mp4 -ss 00:00:01 -vframes 1 thumbnails/short-1.jpg`
- Online tools

Then update the image source:

```html
<img src="thumbnails/short-1.jpg" alt="Short video 1">
```

### Recommended Video Format:

- **Format:** MP4 (H.264 codec)
- **Resolution:** 
  - Shorts: 1080x1920 (9:16)
  - Long-form: 1920x1080 (16:9)
- **Bitrate:** 8-12 Mbps for high quality
- **File size:** Compress to <50MB per minute for web

---

## 🚀 Quick Start Example

Here's a complete example replacing the first short video with a YouTube video:

### Before:
```html
<div class="video-card" data-video="short-1">
    <div class="video-thumbnail">
        <img src="C:/Users/user/.gemini/antigravity/brain/.../short_video_1.png" alt="Short video 1">
        ...
    </div>
    ...
</div>
```

### After:
```html
<div class="video-card" data-video="https://www.youtube.com/embed/YOUR_VIDEO_ID">
    <div class="video-thumbnail">
        <img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg" alt="Short video 1">
        ...
    </div>
    ...
</div>
```

---

## 📝 Step-by-Step for All 6 Shorts

1. **Open `index.html`**
2. **Find the shorts section** (around line 112)
3. **For each video card**, replace:
   - `data-video="short-X"` → `data-video="YOUR_YOUTUBE_EMBED_URL"`
   - `<img src="...">` → `<img src="YOUR_THUMBNAIL_URL">`

Example for all 6 shorts:

```html
<!-- Short 1 -->
<div class="video-card" data-video="https://www.youtube.com/embed/VIDEO_ID_1">
    <div class="video-thumbnail">
        <img src="https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg" alt="Short video 1">
        <!-- rest of the card -->
    </div>
</div>

<!-- Short 2 -->
<div class="video-card" data-video="https://www.youtube.com/embed/VIDEO_ID_2">
    <div class="video-thumbnail">
        <img src="https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg" alt="Short video 2">
        <!-- rest of the card -->
    </div>
</div>

<!-- Repeat for shorts 3-6 -->
```

---

## 🎯 For Long-Form Videos

Same process, find the long-form section (around line 227):

```html
<div class="video-card video-card-large" data-video="https://www.youtube.com/embed/LONG_VIDEO_ID">
    <div class="video-thumbnail">
        <img src="https://img.youtube.com/vi/LONG_VIDEO_ID/maxresdefault.jpg" alt="Long form video 1">
        <!-- rest of the card -->
    </div>
</div>
```

---

## ⚙️ Advanced: Autoplay & Other Options

### YouTube Options

Add parameters to the embed URL:

```html
<!-- Autoplay -->
data-video="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"

<!-- Autoplay + no controls + mute -->
data-video="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&controls=0&mute=1"

<!-- Loop video -->
data-video="https://www.youtube.com/embed/VIDEO_ID?loop=1&playlist=VIDEO_ID"

<!-- Start at specific time (30 seconds) -->
data-video="https://www.youtube.com/embed/VIDEO_ID?start=30"
```

### Vimeo Options

```html
<!-- Autoplay -->
data-video="https://player.vimeo.com/video/VIDEO_ID?autoplay=1"

<!-- Remove Vimeo branding -->
data-video="https://player.vimeo.com/video/VIDEO_ID?title=0&byline=0&portrait=0"
```

---

## 🔧 Troubleshooting

### Video not playing?

1. **Check the URL format:**
   - YouTube: `https://www.youtube.com/embed/VIDEO_ID` (NOT watch?v=)
   - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

2. **Check browser console** (F12) for errors

3. **Ensure video is public:**
   - YouTube: Video must not be private
   - Vimeo: Check privacy settings

### Thumbnail not showing?

1. **Use absolute URLs** for external images
2. **Check file paths** for local images
3. **Verify image exists** at the URL

### Video modal not opening?

1. **Check JavaScript console** for errors
2. **Ensure `data-video` attribute** exists on the card
3. **Verify script.js is loaded**

---

## 📊 Best Practices

1. **Use YouTube/Vimeo for easier management** - No hosting costs, better performance
2. **Optimize thumbnails** - Compress images to <200KB
3. **Test on mobile** - Ensure videos play on all devices
4. **Add loading states** - Show spinner while video loads
5. **Consider lazy loading** - Load videos only when modal opens (already implemented!)

---

## 🎨 Example: Replace All Placeholders

Here's a script to quickly replace all video placeholders:

```html
<!-- In index.html, replace all 6 shorts: -->

<!-- Your actual YouTube video IDs -->
Short 1: data-video="https://www.youtube.com/embed/ABC123XYZ"
Short 2: data-video="https://www.youtube.com/embed/DEF456UVW"
Short 3: data-video="https://www.youtube.com/embed/GHI789RST"
Short 4: data-video="https://www.youtube.com/embed/JKL012OPQ"
Short 5: data-video="https://www.youtube.com/embed/MNO345LMN"
Short 6: data-video="https://www.youtube.com/embed/PQR678IJK"

<!-- And 3 long-form videos: -->
Long 1: data-video="https://www.youtube.com/embed/STU901VWX"
Long 2: data-video="https://www.youtube.com/embed/YZA234BCD"
Long 3: data-video="https://www.youtube.com/embed/EFG567HIJ"
```

---

## ✅ Summary

**Easiest Method:** Use YouTube embeds
1. Upload videos to YouTube
2. Copy video IDs
3. Update `data-video` attributes in HTML
4. Done! 🎉

The JavaScript has already been updated to handle video embeds automatically!
