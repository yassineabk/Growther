import React from "react"
export const List = ({data, test})=>{
    return(
        <ul className="todolist is-flex is-flex-direction-column">
            {Array.isArray(data) ? data.map((element, index)=>{
                <li>{element ? element : "Do something"}</li>
            }): test}
        </ul>
    )
}