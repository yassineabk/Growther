export const NumbersConverter = (num = 0)=>{
    if(typeof(num) === "number" && num){
        var value = num.toString().split("")
        if(num >= 10**9){
            return {value: `${value[0]},${value[1]}`, key: "B", realValue: num}
        }
        if(num >= 10**6){
            return {value: `${value[0]},${value[1]}`, key: "M", realValue: num}
        }
        if(num >= 10**3){
            return {value: `${value[0]},${value[1]}`, key: "K", realValue: num}
        }
        return {value: `${num}`, key: "", realValue: num}
    }
    return {value: "0", realValue: 0}
}