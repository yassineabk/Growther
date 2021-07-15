import React from "react"
const test = [
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>
]
export const TodoList = ({data, brandname})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <div className="list-title">
                Welcome back @{brandname ? brandname : "Brandname"}
            </div>
            <span>
                You have:
            </span>
            <ul className="todolist is-flex is-flex-direction-column">
                {Array.isArray(data) ? data.map((element, index)=>{
                    <li>{element ? element : "Do something"}</li>
                }): test}
            </ul>
        </div>
    )
}