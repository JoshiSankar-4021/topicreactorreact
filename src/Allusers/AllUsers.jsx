import './AllUsers.css';
import { MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';

function AllUsers() {
const [allUsers, setAllUsers] = useState([]);
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

function fetchUsers() {
fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=getallusers`)
    .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
    })
    .then((data) => {
    if (data?.users) {
        setAllUsers(data.users);
        setUsers(data.users);
        console.log("Fetched users:", data.users);
    }
    })
    .catch((err) => console.error("Error fetching users:", err));
}

useEffect(() => {
fetchUsers();
}, []);

function DeleteUser(userid, e) {
e.preventDefault();
console.log("Deleting user:", userid);

fetch(`${process.env.REACT_APP_BACKEND_URL}/api/User?action=delete_user&userid=${userid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
})
    .then((res) => {
    if (!res.ok) {
        throw new Error("Failed to delete user");
    }
    return res.json();
    })
    .then((data) => {
    console.log(data.message);
    alert(data.message);

    fetchUsers();
    })
    .catch((err) => {
    console.error("Error deleting user:", err);
    alert("Error deleting user");
    });
}

function handleSearch(e) {
const value = e.target.value;
setSearchTerm(value);

if (!value) {
    setUsers(allUsers);
} else {
    const filtered = allUsers.filter((u) =>
    `${u.firstname} ${u.lastname} ${u.email}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setUsers(filtered);
}
}

return (
<div>
    <h1 className="h1-allusers">ALL USERS</h1>

    <div className="search-container">
    <div className="search-wrap">
        <MdSearch className="input-icon" />
        <input
        type="text"
        className="search-allusers"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        />
    </div>
    </div>

    <table className="table-allusers">
    <thead>
        <tr className="tr-allusers">
        <th className="th-allusers">Id</th>
        <th className="th-allusers">First Name</th>
        <th className="th-allusers">Last Name</th>
        <th className="th-allusers">Email</th>
        <th className="th-allusers">Delete</th>
        </tr>
    </thead>
    <tbody>
        {users.length > 0 ? (
        users.map((user) => (
            <tr key={user.userid} className="tr-allusers">
            <td className="td-allusers">{user.userid}</td>
            <td className="td-allusers">{user.firstname}</td>
            <td className="td-allusers">{user.lastname}</td>
            <td className="td-allusers">{user.email}</td>
            <td className="td-allusers">
                <button
                type="button"
                onClick={(e) => DeleteUser(user.userid, e)}
                className="button-delete-allusers"
                >
                Delete
                </button>
            </td>
            </tr>
        ))
        ) : (
        <tr>
            <td className="td-allusers" colSpan="6">
            No users found
            </td>
        </tr>
        )}
    </tbody>
    </table>
</div>
);
}

export default AllUsers;
