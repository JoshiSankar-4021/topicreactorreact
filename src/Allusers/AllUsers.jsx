import './AllUsers.css'
import { MdSearch } from 'react-icons/md';
import { useEffect,useState } from 'react';
function AllUsers(){
    const [users,setUsers]=useState([]);
  
    useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=getallusers`)
    .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
    })
    .then((data) => {
        if (data?.users) {
            setUsers(data.users);
            console.log(data.users);
            console.log(users);
        }
    })
    .catch((err) => console.error("Error fetching users:", err));
}, []);

    return(
    <div>
        <h1 className="h1-allusers">ALL USERS</h1>
        <form>
        <div className="search-container">
            <div className="search-wrap">
            <MdSearch className="input-icon"/>
            <input type="text" className="search-allusers" placeholder="Search users..." />
            </div>
            </div>
            <table className="table-allusers">
                <tr className="tr-allusers">
                    <th className="th-allusers">
                        Id
                    </th>
                    <th className="th-allusers">
                        First Name
                    </th>
                    <th className="th-allusers">
                        Last Name
                    </th>
                    <th className="th-allusers">
                        Email
                    </th>
                    <th className="th-allusers">
                        Update
                    </th>
                    <th className="th-allusers">
                        Delete
                    </th>
                </tr>
                {
                    users.map(
                        (user)=>(
                    <tr className="tr-allusers">
                    <td className="td-allusers">{user.userid}</td>
                    <td className="td-allusers">{user.firstname}</td>
                    <td className="td-allusers">{user.lastname}</td>
                    <td className="td-allusers">{user.email}</td>
                    <td className="td-allusers"><button className="button-edit-allusers">Edit</button></td>
                    <td className="td-allusers"><button className="button-delete-allusers">Delete</button></td>
                </tr>
                        )
                    )
                }
            </table>
        </form>
    </div>
    );
}
export default AllUsers;