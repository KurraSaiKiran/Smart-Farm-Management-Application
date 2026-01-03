# API Documentation - Smart Farm Management Application

## 📋 Overview

This document explains the APIs used in the Smart Farm Management Application. The app uses 3 main APIs to handle plant image uploads and location data.

## 🔄 How the App Works

**Simple 3-Step Process:**
1. **Upload Image** → Cloudinary stores the image
2. **Extract Location** → API gets GPS coordinates from image
3. **Save Plant Data** → API saves plant info to database

---

## 🌐 API Endpoints

### 1. 📤 Image Upload API (Cloudinary)

**What it does:** Uploads plant images to cloud storage

**Endpoint:**
```
POST https://api.cloudinary.com/v1_1/dcq7to98l/image/upload
```

**How to use:**
```javascript
// Upload a plant image
const formData = new FormData();
formData.append('file', imageFile);
formData.append('upload_preset', 'unsigned_upload');

fetch('https://api.cloudinary.com/v1_1/dcq7to98l/image/upload', {
  method: 'POST',
  body: formData
})
```

**What you get back:**
```json
{
  "secure_url": "https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg",
  "original_filename": "my_plant_photo",
  "width": 1920,
  "height": 1080
}
```

---

### 2. 📍 Location Extraction API

**What it does:** Gets GPS coordinates from uploaded plant images

**Endpoint:**
```
POST https://api.alumnx.com/api/hackathons/extract-latitude-longitude
```

**What to send:**
```json
{
  "emailId": "farmer@gmail.com",
  "imageName": "plant_photo.jpg",
  "imageUrl": "https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg"
}
```

**What you get back:**
```json
{
  "success": true,
  "data": {
    "imageName": "plant_photo.jpg",
    "latitude": 15.96963,
    "longitude": 79.27812
  }
}
```

**Example Usage:**
```javascript
const response = await fetch('https://api.alumnx.com/api/hackathons/extract-latitude-longitude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    emailId: 'farmer@gmail.com',
    imageName: 'plant_photo.jpg',
    imageUrl: 'https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg'
  })
});

const result = await response.json();
console.log('GPS Location:', result.data.latitude, result.data.longitude);
```

---

### 3. 💾 Save Plant Data API

**What it does:** Saves plant information to the database

**Endpoint:**
```
POST https://api.alumnx.com/api/hackathons/save-plant-location-data
```

**What to send:**
```json
{
  "emailId": "farmer@gmail.com",
  "imageName": "plant_photo.jpg",
  "imageUrl": "https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg",
  "latitude": 15.96963,
  "longitude": 79.27812
}
```

**What you get back:**
```json
{
  "success": true,
  "message": "Plant data saved successfully",
  "data": {
    "id": "unique_plant_id_123",
    "emailId": "farmer@gmail.com",
    "imageName": "plant_photo.jpg",
    "imageUrl": "https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg",
    "latitude": 15.96963,
    "longitude": 79.27812,
    "uploadedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Example Usage:**
```javascript
const response = await fetch('https://api.alumnx.com/api/hackathons/save-plant-location-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    emailId: 'farmer@gmail.com',
    imageName: 'plant_photo.jpg',
    imageUrl: 'https://res.cloudinary.com/dcq7to98l/image/upload/v123/plant.jpg',
    latitude: 15.96963,
    longitude: 79.27812
  })
});

const result = await response.json();
console.log('Plant saved with ID:', result.data.id);
```

---

## 🔗 Complete Workflow Example

**Here's how all 3 APIs work together:**

```javascript
// Step 1: Upload image to Cloudinary
async function uploadPlantImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'unsigned_upload');
  
  const uploadResponse = await fetch(
    'https://api.cloudinary.com/v1_1/dcq7to98l/image/upload',
    { method: 'POST', body: formData }
  );
  
  const uploadResult = await uploadResponse.json();
  console.log('✅ Image uploaded:', uploadResult.secure_url);
  
  // Step 2: Extract GPS location
  const locationResponse = await fetch(
    'https://api.alumnx.com/api/hackathons/extract-latitude-longitude',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailId: 'farmer@gmail.com',
        imageName: uploadResult.original_filename,
        imageUrl: uploadResult.secure_url
      })
    }
  );
  
  const locationResult = await locationResponse.json();
  console.log('✅ Location extracted:', locationResult.data.latitude, locationResult.data.longitude);
  
  // Step 3: Save plant data
  const saveResponse = await fetch(
    'https://api.alumnx.com/api/hackathons/save-plant-location-data',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailId: 'farmer@gmail.com',
        imageName: locationResult.data.imageName,
        imageUrl: uploadResult.secure_url,
        latitude: locationResult.data.latitude,
        longitude: locationResult.data.longitude
      })
    }
  );
  
  const saveResult = await saveResponse.json();
  console.log('✅ Plant saved with ID:', saveResult.data.id);
  
  return saveResult;
}

// Usage
const fileInput = document.getElementById('plant-image');
const imageFile = fileInput.files[0];
uploadPlantImage(imageFile);
```

---

## ⚠️ Error Handling

**What happens when things go wrong:**

### Common Errors:

**1. Image Upload Fails:**
```json
{
  "error": {
    "message": "Invalid file format"
  }
}
```

**2. Location Extraction Fails:**
```json
{
  "success": false,
  "error": "No GPS data found in image"
}
```

**3. Save Plant Data Fails:**
```json
{
  "success": false,
  "error": "Invalid coordinates"
}
```

### How to Handle Errors:
```javascript
try {
  const result = await uploadPlantImage(imageFile);
  console.log('Success!', result);
} catch (error) {
  console.error('Something went wrong:', error.message);
  // Show user-friendly error message
  alert('Failed to upload plant. Please try again.');
}
```

---

## 🔧 Configuration

**Environment Variables Needed:**
```bash
# In your .env file
VITE_CLOUDINARY_CLOUD_NAME=dcq7to98l
VITE_CLOUDINARY_UPLOAD_PRESET=unsigned_upload
```

**Important Notes:**
- ✅ **Email ID**: Use `farmer@gmail.com` as your unique identifier
- ✅ **File Types**: Only JPG and PNG images are supported
- ✅ **File Size**: Maximum 10MB per image
- ✅ **Rate Limits**: 100 requests per hour per email

---

## 🧪 Testing the APIs

**Test with curl commands:**

```bash
# Test location extraction
curl -X POST https://api.alumnx.com/api/hackathons/extract-latitude-longitude \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "farmer@gmail.com",
    "imageName": "test.jpg",
    "imageUrl": "https://example.com/test.jpg"
  }'

# Test save plant data
curl -X POST https://api.alumnx.com/api/hackathons/save-plant-location-data \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "farmer@gmail.com",
    "imageName": "test.jpg",
    "imageUrl": "https://example.com/test.jpg",
    "latitude": 15.96963,
    "longitude": 79.27812
  }'
```

---

## 📱 How It Works in the App

**User Journey:**
1. 👤 **User** drags and drops a plant image
2. 📤 **App** uploads image to Cloudinary
3. 📍 **App** extracts GPS coordinates from image
4. 💾 **App** saves plant data to database
5. 🗺️ **App** shows plant location on map
6. 📊 **App** updates analytics dashboard

**Data Flow:**
```
User Image → Cloudinary → GPS Extraction → Database → Map Display
```

This simple process turns a plant photo into a mapped location with just one drag and drop! 🌱✨

---

## 🆘 Need Help?

If you have questions about the APIs:
1. Check the error messages in browser console
2. Verify your environment variables are set correctly
3. Make sure image files have GPS data (EXIF)
4. Contact support: api-support@geotag-plants.com

---

*This documentation covers all APIs used in the Smart Farm Management Application. Each API is simple to use and well-documented with examples.*