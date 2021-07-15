import React from "react"
import { List } from "../list/liste-component.component"
const test = [
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>,
    <li>{"Do something"}</li>
]
export const TaskList = ({data, brandname})=>{
    return(
        <div className="is-flex is-flex-direction-column list-container">
            <div className="list-title">
                Welcome back @{brandname ? brandname : "Brandname"}
            </div>
            <span>
                You have:
            </span>
            <List data={data} test={test} />
        </div>
    )
}