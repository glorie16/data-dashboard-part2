import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
//checking if api stuff loaded properly
console.log('APP_API_KEY loaded:', !!process.env.APP_API_KEY)
console.log('APP_API_SECRET loaded:', !!process.env.APP_API_SECRET)

const app = express()
app.use(cors())
app.use(express.json())

// Cache for access token and expiry timestamp
let cachedToken = null
let tokenExpiry = null


// Function to get access token with caching and expiry logic
async function getAccessToken() {
  const now = Date.now()

  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken
  }

  try {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.APP_API_KEY,
        client_secret: process.env.APP_API_SECRET,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('🔴 Failed to fetch access token:', response.status, errorText)
      throw new Error('Failed to fetch access token')
    }

    const data = await response.json()
    cachedToken = data.access_token
    tokenExpiry = now + (data.expires_in - 60) * 1000

    return cachedToken
  } catch (err) {
    console.error('🔴 Error in getAccessToken():', err)
    throw err
  }
}

app.get('/api/pets', async (req, res) => {
  try {
    const token = await getAccessToken()

    const response = await fetch('https://api.petfinder.com/v2/animals?limit=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      // If token expired or unauthorized, reset cached token and try again once
      if (response.status === 401) {
        cachedToken = null
        tokenExpiry = null

        const newToken = await getAccessToken()
        const retryResponse = await fetch('https://api.petfinder.com/v2/animals?limit=10', {
          headers: { Authorization: `Bearer ${newToken}` },
        })

        if (!retryResponse.ok) {
          throw new Error(`Petfinder API error: ${retryResponse.status}`)
        }

        const retryData = await retryResponse.json()
        return res.json(retryData.animals || [])
      }
      throw new Error(`Petfinder API error: ${response.status}`)
    }

      const data = await response.json()
      
    res.json(data.animals || [])
  } catch (error) {
    console.error('Error fetching pets:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => {
  console.log('✅ Server running at http://localhost:3001')
})