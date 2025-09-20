import './AllUsers.css'
import { MdSearch } from 'react-icons/md';
function AllUsers(){
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
                        DOB
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
                <tr className="tr-allusers">
                    <td className="td-allusers">1</td>
                    <td className="td-allusers">Joshi</td>
                    <td className="td-allusers">Sankar</td>
                    <td className="td-allusers">15/11/1999</td>
                    <td className="td-allusers">joshisankar5051@gmail.com</td>
                    <td className="td-allusers"><button className="button-edit-allusers">Edit</button></td>
                    <td className="td-allusers"><button className="button-delete-allusers">Delete</button></td>
                </tr>
            </table>
        </form>
    </div>
    );
}
export default AllUsers;