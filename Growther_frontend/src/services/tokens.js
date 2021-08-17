export const SetSpotifyToken = (value, expiration = 3600*1000)=>{
    try{
        var item = {value, expiration: expiration + new Date().getTime()}
        localStorage.setItem("spotifyAccessToken", JSON.stringify(item))
    }catch(err){
        localStorage.removeItem("spotifyAccessToken")
    }
    
}
export const GetSpotifyToken = ()=>{
    try{
        var token = JSON.parse(localStorage.getItem("spotifyAccessToken"))
        if(token && token !== null && typeof(token) === "object"){
            var time = new Date()
            if(parseInt(token.expiration) - time.getTime() > 0){
                return token.value
            }
            localStorage.removeItem("spotifyAccessToken")
        }
        return false
    }catch(err){
        return false
    }
    
}
export const SetDiscordToken = (value, expiration = 3600*1000)=>{
    try{
        var item = {value, expiration: expiration + new Date().getTime()}
        localStorage.setItem("discordAccessToken", JSON.stringify(item))
    }catch(err){
        return false
    }
}
export const GetDiscordToken = ()=>{
    try{
        var token = localStorage.getItem("discordAccessToken")
        token = JSON.parse(token)
        if(token && token !== null && typeof(token) === "object"){
            var time = new Date()
            if(parseInt(token.expiration) - time.getTime() > 0){
                return token.value
            }
            localStorage.removeItem("discordAccessToken")
        }
    }catch(err){
        return false
    }
}