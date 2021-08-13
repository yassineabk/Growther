export const SetSpotifyToken = (value, expiration = 3600*1000)=>{
    var item = {value, expiration: expiration + new Date().getTime()}
    localStorage.setItem("spotifyAccessToken", JSON.stringify(item))
}
export const GetSpotifyToken = ()=>{
    var token = JSON.parse(localStorage.getItem("spotifyAccessToken"))
    if(token && token !== null && typeof(token) === "object"){
        var time = new Date()
        console.log(parseInt(token.expiration) - time.getTime())
        if(parseInt(token.expiration) - time.getTime() > 0){
            return token.value
        }
        localStorage.removeItem("spotifyAccessToken")
    }
    return false
}
export const SetDiscordToken = (value, expiration = 3600*1000)=>{
    var item = {value, expiration: expiration + new Date().getTime()}
    localStorage.setItem("discordAccessToken", JSON.stringify(item))
}
export const GetDiscordToken = ()=>{
    var token = JSON.parse(localStorage.getItem("discordAccessToken"))
    if(token && token !== null && typeof(token) === "object"){
        var time = new Date()
        console.log(parseInt(token.expiration) - time.getTime())
        if(parseInt(token.expiration) - time.getTime() > 0){
            return token.value
        }
        localStorage.removeItem("discordAccessToken")
    }
    return false
}