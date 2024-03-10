import React, { useState, useEffect } from "react";
import Navigation from "../../Navigation/Navigation";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import ConfirmBox from "../../ConfirmDelete/ConfirmDelete";
import Button from "../../Button/Button";
import { CursorAnimation } from "../../CursorAnimation/CursorAnimation";
import "./manageuser.css";
import Footer from "../../Footer/Footer";

const AdminManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUsername, setEditingUsername] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    CursorAnimation();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5108/api/User/GetAllUsers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.$values);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:5108/api/User/DeleteUser?username=${username}`,
        {
          method: "DELETE",
          headers: {
            accept: "text/plain", // Specify the media type as text/plain
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      console.log("User deleted successfully");
      fetchUsers(); // Fetch the updated list of users after deleting
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (username, updatedUserInfo) => {
    try {
      console.log(updatedUserInfo);
      const response = await fetch(
        `http://localhost:5108/api/User/UpdateUserProfile/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserInfo),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      console.log("User profile updated successfully");
      fetchUsers(); // Fetch the updated list of users after updating profile
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleEditUserInfo = (username, field, value) => {
    // If user info is not yet edited, set it to default user data
    if (!editedUserInfo[username]) {
      const user = users.find((user) => user.username === username);
      setEditedUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [username]: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          contactNumber: user.contactNumber,
        },
      }));
    }

    // Update the edited field with the new value
    setEditedUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [username]: {
        ...prevUserInfo[username],
        [field]: value,
      },
    }));
  };

  const saveEditedUserInfo = (username) => {
    updateUser(username, editedUserInfo[username]);
    setEditingUsername(null);
    setEditedUserInfo({});
  };

  const cancelEditUserInfo = (username) => {
    setEditingUsername(null);
    setEditedUserInfo({});
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 0:
        return "Customer";
      case 1:
        return "Admin";
      case 2:
        return "Hotel Owner";
      default:
        return "Unknown";
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredUser = users.filter((user) => {
      const firstName = user.firstName.toLowerCase().includes(query);
      const lastName = user.lastName.toLowerCase().includes(query);
      const email = user.email.toLowerCase().includes(query);
      const username = user.username.toLowerCase().includes(query);
      const role = getUserTypeLabel(user.userType).toLowerCase().includes(query);
      return firstName || lastName || email || username || role;
    });
    setQuery(query);
    if (query === "") {
      fetchUsers();
    } else {
      setUsers(filteredUser);
    }
  };

  return (
    <div>
      <div id="cursor-blur" />
      <Navigation />
      <AdminSidebar />
      <div className="manage-user">
        <div className="search-user">
          <h2>User Management</h2>
          <i className="ri-user-search-line"></i>
          <input
            type="text"
            placeholder="Search user..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>User Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>
                    {editingUsername === user.username ? (
                      <input
                        type="text"
                        value={
                          editedUserInfo[user.username]?.firstName ||
                          user.firstName
                        }
                        onChange={(e) =>
                          handleEditUserInfo(
                            user.username,
                            "firstName",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      user.firstName
                    )}
                  </td>
                  <td>
                    {editingUsername === user.username ? (
                      <input
                        type="text"
                        value={
                          editedUserInfo[user.username]?.lastName || user.lastName
                        }
                        onChange={(e) =>
                          handleEditUserInfo(
                            user.username,
                            "lastName",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      user.lastName
                    )}
                  </td>
                  <td>
                    {editingUsername === user.username ? (
                      <input
                        type="text"
                        value={editedUserInfo[user.username]?.email || user.email}
                        onChange={(e) =>
                          handleEditUserInfo(
                            user.username,
                            "email",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingUsername === user.username ? (
                      <input
                        type="number"
                        value={
                          editedUserInfo[user.username]?.contactNumber ||
                          user.contactNumber
                        }
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Limit input to maximum 10 characters
                          if (inputValue.length <= 10) {
                            handleEditUserInfo(
                              user.username,
                              "contactNumber",
                              inputValue
                            );
                          }
                        }}
                      />
                    ) : (
                      user.contactNumber
                    )}
                  </td>
                  <td>{getUserTypeLabel(user.userType)}</td>
                  <td>
                    {editingUsername === user.username ? (
                      <>
                        <ConfirmBox
                          confirmVar="save"
                          onConfirm={() => saveEditedUserInfo(user.username)}
                        >
                          Save
                        </ConfirmBox>
                        <Button onClick={() => cancelEditUserInfo(user.username)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <ConfirmBox
                          confirmVar="delete"
                          onConfirm={() => deleteUser(user.username)}
                        />
                        <Button
                          className="edit-button"
                          onClick={() => setEditingUsername(user.username)}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
  
};

export default AdminManageUser;
