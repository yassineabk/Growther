// Window Location
export const location = window.location.href

export const BACKEND_API = "http://localhost:5000"
export const FRONTEND_API = "http://localhost:3000"

// Spotify
export const SPOTIFY_REDIRECT_URL = location.includes("localhost:3000") ? "http:%2F%2Flocalhost:3000%2Fspotify%2Fredirect&show_dialog=true" : "https:%2F%2Fstaging-frontendapp.herokuapp.com%2Fspotify%2Fredirect&show_dialog=true"
export const SPOTIFY_CLIENT_ID = "0faee53012344abb85a8d0df74af1e09"
export const SPOTIFY_CLIENT_SECRET = "3500e5bda23b41d188fb6c020bb509d9"
export const SPOTIFY_ACCESS_TOKEN = "BQDALflmxeTyyUzxQemCtbuf6siGXQ_0mDr0XvGiFlc0shcaa08GJjYCDGf6SqYSFRfF75vxL52yOlS2zoKMIl-13fTRB9K4w8gFnRhjdUz7er5ZkgZixrULKNVIoTQRyhyDVZkBciePmjPE6M3Ia8Ygx7aPtfZVMnRK-hhgp8s6LzhZvjdIBO4"
export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/en/authorize?response_type=token&client_id=0faee53012344abb85a8d0df74af1e09&scope=ugc-image-upload%20user-follow-read%20user-follow-modify%20user-read-recently-played%20user-top-read%20user-read-playback-position%20user-library-read%20user-library-modify%20user-read-playback-state%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20playlist-read-private%20streaming%20app-remote-control%20user-read-email%20user-read-private%20ugc-image-upload%20user-follow-read%20user-follow-modify%20user-read-recently-played%20user-top-read%20user-read-playback-position%20user-library-read%20user-library-modify%20user-read-playback-state%20user-read-currently-playing%20user-modify-playback-state%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20playlist-read-private%20streaming%20app-remote-control%20user-read-email%20user-read-private&redirect_uri=${SPOTIFY_REDIRECT_URL}`

// Discord
export const DISCORD_REDIRECT_URL = location.includes("localhost:3000") ? "http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fredirect" : "https%3A%2F%2Fstaging-frontendapp.herokuapp.com%2Fdiscord%2Fredirect"
export const DISCORD_BOT_REDIRECT_URL = location.includes("localhost:3000") ? "http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fbot%2Fredirect" : "https%3A%2F%2Fstaging-frontendapp.herokuapp.com%2Fdiscord%2Fbot%2Fredirect"
export const DISCORD_APP_ID = "875491544927445003"
export const DISCORD_CLIENT_ID = "BrvbrzAKMrVrzmIXLbL5-AYoF5qoV-JJ"
export const DISCORD_BOT_TOKEN = "ODc1NDkxNTQ0OTI3NDQ1MDAz.YRWTCg.OrGJfv12Ead7aQoOcgP0teKa29g"
export const DISCORD_PUBLIC_KEY = "b102f41278ec772031ece5f2120277d58d4e4e4a4c255fbc19e9d22dadc8669c"
export const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=875491544927445003&redirect_uri=${DISCORD_REDIRECT_URL}&response_type=code&scope=identify%20email%20connections%20guilds%20guilds.join%20gdm.join`
export const DISCROD_BOT_URL = `https://discord.com/api/oauth2/authorize?client_id=875491544927445003&permissions=1&redirect_uri=${DISCORD_BOT_REDIRECT_URL}&response_type=code&scope=bot%20identify`
// Twitch
export const TWITCH_CLIENT_ID = "n0vpscnhqjvbpjmqlspwusxknaulk2"
export const TWITCH_CLIENT_SECRET = "aszmhfr2ecnyxxw0yb1xdf3o62s5t0"

// Facebook
export const FACEBOOK_URL= `${BACKEND_API}/oauth2/authorize/facebook?redirect_uri=${FRONTEND_API}/facebook/redirect`