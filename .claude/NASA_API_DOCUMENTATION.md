# NASA API Documentation
## Complete Reference for nasa-api-res Project

**Official NASA API Portal**: https://api.nasa.gov/
**Last Updated**: January 2025
**Project**: NASA API React Application

---

## Table of Contents

1. [Authentication](#authentication)
2. [Rate Limits](#rate-limits)
3. [APOD - Astronomy Picture of the Day](#apod---astronomy-picture-of-the-day)
4. [EPIC - Earth Polychromatic Imaging Camera](#epic---earth-polychromatic-imaging-camera)
5. [Mars Rover Photos](#mars-rover-photos)
6. [Mars Weather (InSight) - DEPRECATED](#mars-weather-insight---deprecated)
7. [NASA Image and Video Library](#nasa-image-and-video-library)
8. [Error Handling](#error-handling)
9. [Best Practices](#best-practices)

---

## Authentication

### API Key

All NASA APIs require an API key for authentication.

**Get Your API Key**: https://api.nasa.gov/ (free signup)

**Rate Limits**:
- **DEMO_KEY**: 30 requests per hour, 50 requests per day
- **Personal API Key**: 1,000 requests per hour

**Usage in Project**:
```javascript
const API_KEY = process.env.REACT_APP_NASA_API_KEY
```

**Environment Setup**:
```bash
# .env file
REACT_APP_NASA_API_KEY=your_api_key_here
```

---

## Rate Limits

### Default Limits

| API Key Type | Hourly Limit | Daily Limit |
|-------------|--------------|-------------|
| DEMO_KEY | 30 | 50 |
| Personal Key | 1,000 | N/A |

### Response Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
```

### Handling Rate Limits

**429 Too Many Requests Response**:
```json
{
  "error": {
    "code": "OVER_RATE_LIMIT",
    "message": "You have exceeded your rate limit. Try again later or contact us at https://api.nasa.gov:443/contact/ for assistance"
  }
}
```

**Best Practice**:
- Implement retry logic with exponential backoff
- Cache responses when possible
- Use personal API key for production

---

## APOD - Astronomy Picture of the Day

### Overview

The APOD API returns the astronomy picture of the day along with metadata.

**Used in**: `src/pages/PictureOfTheDay.js`

### Endpoint

```
GET https://api.nasa.gov/planetary/apod
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | DEMO_KEY | NASA API key |
| `date` | YYYY-MM-DD | No | today | Date of the APOD image |
| `start_date` | YYYY-MM-DD | No | - | Start of date range |
| `end_date` | YYYY-MM-DD | No | today | End of date range |
| `count` | int | No | - | Random count of images (1-100) |
| `thumbs` | bool | No | false | Return thumbnail URL for videos |

### Example Request

```javascript
const API_KEY = process.env.REACT_APP_NASA_API_KEY
const date = '2024-01-15'
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`

const response = await fetch(url)
const data = await response.json()
```

### Example Response (Image)

```json
{
  "date": "2024-01-15",
  "explanation": "What's happening around the Sun? To help find out, NASA launched...",
  "hdurl": "https://apod.nasa.gov/apod/image/2401/SunMonster_Ergun_960.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "A Sun Monster Prominence",
  "url": "https://apod.nasa.gov/apod/image/2401/SunMonster_Ergun_960.jpg",
  "copyright": "Mehmet Ergün"
}
```

### Example Response (Video)

```json
{
  "date": "2024-01-10",
  "explanation": "This video shows...",
  "media_type": "video",
  "service_version": "v1",
  "title": "Amazing Space Video",
  "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "thumbnail_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
}
```

### Response Fields

- **date**: Date of the image (YYYY-MM-DD)
- **explanation**: Detailed description of the image
- **hdurl**: High-resolution image URL (if available)
- **media_type**: "image" or "video"
- **title**: Title of the image
- **url**: Standard resolution image URL or video embed URL
- **copyright**: Copyright holder (if applicable)
- **thumbnail_url**: Video thumbnail (if `thumbs=true`)

### Implementation in Project

```javascript
// src/pages/PictureOfTheDay.js
const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

useEffect(() => {
  const loadData = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
      )
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error)
    }
  }
  loadData()
}, [date])
```

### Date Navigation

- **Earliest available date**: 1995-06-16 (APOD launch date)
- **Latest date**: Today
- **Invalid dates**: Return 404 or closest available date

---

## EPIC - Earth Polychromatic Imaging Camera

### Overview

The EPIC API provides images of Earth from the DSCOVR spacecraft's EPIC camera.

**Used in**: `src/pages/Epic.js`

### Endpoint

```
GET https://api.nasa.gov/EPIC/api/natural
GET https://api.nasa.gov/EPIC/api/enhanced
GET https://api.nasa.gov/EPIC/api/natural/date/{date}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | DEMO_KEY | NASA API key |

### Collections

- **natural**: Natural color images
- **enhanced**: Enhanced color images

### Example Request

```javascript
const API_KEY = process.env.REACT_APP_NASA_API_KEY
const collection = 'natural'
const url = `https://api.nasa.gov/EPIC/api/${collection}?api_key=${API_KEY}`

const response = await fetch(url)
const data = await response.json()
```

### Example Response

```json
[
  {
    "identifier": "20240115003633",
    "caption": "This image was taken by NASA's EPIC camera onboard...",
    "image": "epic_1b_20240115003633",
    "version": "03",
    "centroid_coordinates": {
      "lat": 0.109375,
      "lon": -112.617188
    },
    "dscovr_j2000_position": {
      "x": -1325196.625,
      "y": -669893.5,
      "z": -153020.5
    },
    "lunar_j2000_position": {
      "x": -359304.96875,
      "y": -120326.9375,
      "z": -38699.21875
    },
    "sun_j2000_position": {
      "x": 147095408.0,
      "y": -20289072.0,
      "z": -8791312.0
    },
    "attitude_quaternions": {
      "q0": 0.015987,
      "q1": -0.025704,
      "q2": -0.998956,
      "q3": 0.034637
    },
    "date": "2024-01-15 00:31:45",
    "coords": {
      "centroid_coordinates": {
        "lat": 0.109375,
        "lon": -112.617188
      },
      "dscovr_j2000_position": {
        "x": -1325196.625,
        "y": -669893.5,
        "z": -153020.5
      },
      "lunar_j2000_position": {
        "x": -359304.96875,
        "y": -120326.9375,
        "z": -38699.21875
      },
      "sun_j2000_position": {
        "x": 147095408.0,
        "y": -20289072.0,
        "z": -8791312.0
      },
      "attitude_quaternions": {
        "q0": 0.015987,
        "q1": -0.025704,
        "q2": -0.998956,
        "q3": 0.034637
      }
    }
  }
]
```

### Image URL Construction

```javascript
// Formula to construct image URL
const date = item.date.slice(0, 10).split('-').join('/')
const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${item.image}.png?api_key=${API_KEY}`

// Example:
// https://api.nasa.gov/EPIC/archive/natural/2024/01/15/png/epic_1b_20240115003633.png?api_key=YOUR_KEY
```

### Implementation in Project

```javascript
// src/pages/Epic.js
const [filterCollection, setFilterCollection] = useState('natural')
const url = `https://api.nasa.gov/EPIC/api/${filterCollection}?api_key=${API_KEY}`

useEffect(() => {
  const loadData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
  }
  loadData()
}, [url])
```

---

## Mars Rover Photos

### Overview

The Mars Rover Photos API returns images taken by NASA's Mars rovers.

**Used in**: `src/pages/MarsRoverPhotos.js`

### Rovers Available

- **Curiosity**: Active (landed 2012-08-06)
- **Opportunity**: Inactive (2004-2018)
- **Spirit**: Inactive (2004-2010)
- **Perseverance**: Active (landed 2021-02-18)

### Endpoint

```
GET https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/photos
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | DEMO_KEY | NASA API key |
| `sol` | int | No* | - | Martian sol (day) |
| `earth_date` | YYYY-MM-DD | No* | - | Earth date |
| `camera` | string | No | all | Camera abbreviation |
| `page` | int | No | 1 | Page number (25 per page) |

*Either `sol` or `earth_date` must be provided

### Cameras (Curiosity)

| Abbreviation | Camera | Location |
|--------------|--------|----------|
| FHAZ | Front Hazard Avoidance Camera | Front |
| RHAZ | Rear Hazard Avoidance Camera | Rear |
| MAST | Mast Camera | Mast |
| CHEMCAM | Chemistry and Camera Complex | Mast |
| MAHLI | Mars Hand Lens Imager | Arm |
| MARDI | Mars Descent Imager | Bottom |
| NAVCAM | Navigation Camera | Mast |

### Example Request

```javascript
const API_KEY = process.env.REACT_APP_NASA_API_KEY
const rover = 'curiosity'
const sol = 1000
const page = 1
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${API_KEY}`

const response = await fetch(url)
const data = await response.json()
```

### Example Response

```json
{
  "photos": [
    {
      "id": 102693,
      "sol": 1000,
      "camera": {
        "id": 20,
        "name": "FHAZ",
        "rover_id": 5,
        "full_name": "Front Hazard Avoidance Camera"
      },
      "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
      "earth_date": "2015-05-30",
      "rover": {
        "id": 5,
        "name": "Curiosity",
        "landing_date": "2012-08-06",
        "launch_date": "2011-11-26",
        "status": "active"
      }
    }
  ]
}
```

### Implementation in Project

```javascript
// src/pages/MarsRoverPhotos.js
const [page, setPage] = useState(1)
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${API_KEY}`

useEffect(() => {
  const loadData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
  }
  loadData()
}, [page])
```

---

## Mars Weather (InSight) - DEPRECATED

### ⚠️ Status: DEPRECATED

**Last Updated**: February 2023
**Reason**: InSight lander mission ended

### Overview

The InSight Mars Weather Service API provided temperature and wind data from the InSight lander on Mars.

**Used in**: `src/pages/MarsWeather.js` (currently broken)

### Original Endpoint (No longer functional)

```
GET https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json
```

### ⚠️ Current Status

The InSight lander's mission ended on **December 18, 2022**, when it lost power due to dust accumulation on its solar panels. The API endpoint was deprecated in **February 2023**.

### Migration Options

#### Option 1: Remove Feature
Remove the Mars Weather page entirely as the data is no longer available.

#### Option 2: Use Historical Data
Display static historical data from InSight with a disclaimer:
```javascript
// Display last known data with disclaimer
<div className="deprecated-notice">
  ⚠️ The InSight mission ended in December 2022.
  Showing historical data from the last operational period.
</div>
```

#### Option 3: Alternative Mars Weather Sources
Currently, there is no direct replacement API from NASA. Potential alternatives:
- Mars Reconnaissance Orbiter data (limited availability)
- Mars 2020 Perseverance environmental data (if/when available)
- Third-party aggregators

### Recommendation

**Remove the feature** and redirect users to other working features. Update navigation to remove Mars Weather link.

```javascript
// Remove from Header.js navigation
// Remove MarsWeather.js route from RoutesComponent.js
```

---

## NASA Image and Video Library

### Overview

The NASA Image and Video Library API provides access to NASA's vast collection of images, videos, and audio files.

**Used in**: `src/pages/Multimedia.js`

### Endpoint

```
GET https://images-api.nasa.gov/search
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | Yes | - | Search query |
| `media_type` | string | No | all | "image", "video", "audio" |
| `page` | int | No | 1 | Page number |
| `year_start` | YYYY | No | - | Start year |
| `year_end` | YYYY | No | - | End year |

### Example Request

```javascript
const query = 'mars'
const mediaType = 'image'
const page = 1
const url = `https://images-api.nasa.gov/search?q=${query}&media_type=${mediaType}&page=${page}`

const response = await fetch(url)
const data = await response.json()
```

### Example Response

```json
{
  "collection": {
    "version": "1.0",
    "href": "https://images-api.nasa.gov/search?q=mars&media_type=image&page=1",
    "items": [
      {
        "href": "https://images-assets.nasa.gov/image/PIA24924/collection.json",
        "data": [
          {
            "center": "JPL",
            "title": "Mars Perseverance Sol 872",
            "nasa_id": "PIA24924",
            "date_created": "2022-09-07T18:34:19Z",
            "keywords": ["Mars", "Mars 2020"],
            "media_type": "image",
            "description_508": "Mastcam-Z's right camera took this image on Sept. 6, 2022 (Sol 872).",
            "description": "Mastcam-Z's right camera took this image on Sept. 6, 2022 (Sol 872).",
            "secondary_creator": "NASA/JPL-Caltech/ASU"
          }
        ],
        "links": [
          {
            "href": "https://images-assets.nasa.gov/image/PIA24924/PIA24924~thumb.jpg",
            "rel": "preview",
            "render": "image"
          }
        ]
      }
    ],
    "metadata": {
      "total_hits": 11234
    }
  }
}
```

### Response Structure

- **collection.items[]**: Array of search results
  - **data[0]**: Metadata
    - **nasa_id**: Unique identifier ✅ Use this for React keys
    - **title**: Title of the media
    - **description**: Description
    - **media_type**: "image", "video", or "audio"
    - **date_created**: Creation date
  - **links[0]**: Media links
    - **href**: Thumbnail or preview URL
  - **href**: Link to full collection JSON

### Implementation in Project

```javascript
// src/pages/Multimedia.js
const [title, setTitle] = useState('')
const [mediaType, setMediaType] = useState('image,video')
const [page, setPage] = useState(1)

let url = `https://images-api.nasa.gov/search?q=${title || 'nasa'}`
if (page) url += `&page=${page}`
if (mediaType) url += `&media_type=${mediaType}`

useEffect(() => {
  const loadData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const imagesArray = data?.collection.items.map(item => ({
      id: item.data[0].nasa_id || item.href, // ✅ Use nasa_id for unique keys
      urlImage: item.links[0].href,
      title: item.data[0].title,
      description: item.data[0].description,
      dataJson: item.href,
      mediaType: item.data[0].media_type
    }))
    setData(imagesArray)
  }
  loadData()
}, [url, page, mediaType])
```

### Getting Full-Size Images

```javascript
// Fetch full collection to get all sizes
const collectionResponse = await fetch(item.href)
const collectionData = await collectionResponse.json()

// collectionData contains URLs for different sizes:
// - ~thumb.jpg (thumbnail)
// - ~medium.jpg (medium)
// - ~large.jpg (large)
// - ~orig.jpg (original)
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid date format"
  }
}
```

#### 403 Forbidden
```json
{
  "error": {
    "code": "API_KEY_INVALID",
    "message": "An invalid api_key was supplied. Get one at https://api.nasa.gov"
  }
}
```

#### 404 Not Found
```json
{
  "msg": "Date must be between Jun 16, 1995 and [today]."
}
```

#### 429 Too Many Requests
```json
{
  "error": {
    "code": "OVER_RATE_LIMIT",
    "message": "You have exceeded your rate limit. Try again later."
  }
}
```

### Error Handling Best Practices

```javascript
const fetchNASAData = async (url) => {
  try {
    const response = await fetch(url)

    // Check HTTP status
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      if (response.status === 403) {
        throw new Error('Invalid API key. Please check your .env file.')
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Check for API-level errors
    if (data.error) {
      throw new Error(data.error.message || 'API Error')
    }

    return data
  } catch (error) {
    console.error('NASA API Error:', error)
    throw error
  }
}
```

### Retry Logic

```javascript
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchNASAData(url)
    } catch (error) {
      if (i === retries - 1) throw error

      // Exponential backoff for rate limits
      if (error.message.includes('rate limit')) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      } else {
        throw error // Don't retry non-rate-limit errors
      }
    }
  }
}
```

---

## Best Practices

### 1. API Key Management

✅ **DO**:
- Store API key in environment variables
- Use `.env` file for local development
- Add `.env` to `.gitignore`
- Use different keys for dev/staging/production

❌ **DON'T**:
- Hardcode API keys in source code
- Commit API keys to git
- Share API keys publicly

### 2. Rate Limit Management

✅ **DO**:
- Get a personal API key (1000 req/hour)
- Implement client-side caching
- Use React state to avoid duplicate requests
- Show loading states during requests

❌ **DON'T**:
- Use DEMO_KEY in production
- Make unnecessary API calls on every render
- Ignore rate limit headers

### 3. Error Handling

✅ **DO**:
- Display user-friendly error messages
- Log errors for debugging
- Implement retry logic for transient errors
- Show fallback UI for errors

❌ **DON'T**:
- Ignore errors silently
- Show technical error messages to users
- Retry indefinitely

### 4. Performance

✅ **DO**:
- Use lazy loading for images
- Implement pagination
- Cache responses when appropriate
- Use `useEffect` dependencies correctly

❌ **DON'T**:
- Load all images at once
- Fetch on every component render
- Ignore memory leaks

### 5. User Experience

✅ **DO**:
- Show loading states
- Implement error boundaries
- Provide date/pagination controls
- Display metadata (title, description, date)

❌ **DON'T**:
- Leave users waiting without feedback
- Crash the app on API errors
- Hide important metadata

---

## Testing API Endpoints

### Test with cURL

```bash
# APOD
curl "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

# EPIC
curl "https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY"

# Mars Rover Photos
curl "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY"

# NASA Image Library (no key required)
curl "https://images-api.nasa.gov/search?q=mars&media_type=image"
```

### Test in Browser

```javascript
// Open browser console and run:
fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(res => res.json())
  .then(console.log)
```

---

## Additional Resources

### Official Documentation
- **NASA API Portal**: https://api.nasa.gov/
- **API Documentation**: https://api.nasa.gov/docs/
- **APOD Archive**: https://apod.nasa.gov/apod/archivepix.html
- **Mars Photos**: https://github.com/chrisccerami/mars-photo-api

### Support
- **NASA API Support**: https://api.nasa.gov/contact/
- **Report Issues**: Via NASA API contact form
- **Developer Community**: NASA Open Source GitHub

### Related Projects
- **NASA Open Data Portal**: https://data.nasa.gov/
- **NASA Images**: https://images.nasa.gov/
- **Eyes on the Solar System**: https://eyes.nasa.gov/

---

## Changelog

### January 2025
- Updated all API endpoints for current project
- Added deprecation notice for Mars Weather/InSight API
- Updated rate limits and authentication details
- Added error handling best practices
- Added implementation examples from project code

### Known Issues
- Mars Weather API deprecated (InSight mission ended)
- Some EPIC images may have broken links (NASA server issues)
- Rate limits may change without notice

---

**Maintained by**: NASA API React Application Project
**Last Verified**: January 2025
**Next Review**: Quarterly or when APIs change
