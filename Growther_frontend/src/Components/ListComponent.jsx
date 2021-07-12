import React,{Component} from 'react';
import UserService from '../Services/UserService';

class ListComponent extends Component {
    
    Entity= "Users";

    constructor(props) {
        super(props);
        this.state = { 
            users:[]
         }
    }
    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({users:response.data})
        });
    }
    render() { 
        return ( 
            <div>
                <h2 className="text-center">{this.Entity} List</h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key ={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default ListComponent;