const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_SECRET = import.meta.env.VITE_APP_API_SECRET;

let cachedToken = null
let tokenExpiry = null

export const getAccessToken = async () => {
    const now = new Date();

    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        return cachedToken
    }

    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: API_KEY,
            client_secret: API_SECRET,
        }),
    })

     const data = await response.json()
    cachedToken = data.access_token
    tokenExpiry = new Date(now.getTime() + data.expires_in * 1000)

    return cachedToken
}