import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";

export const EditProfile = () => {
  const { userinfo } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userinfo.username) {
      fetch(`http://localhost:5000/user/${userinfo.username}`, {
        headers: {
          Authorization: Cookies.get("token") || "",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            navigate("/login");
          } else {
            return response.json();
          }
        })
        .then((user) => {
          if (user.email) {
            setEmail(user.email);
          }
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [userinfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setOldPasswordError("");
    setNewPasswordError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (newPassword) {
      const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (newPassword.length < 6 || !passwordPattern.test(newPassword)) {
        setNewPasswordError(
          "Password must be at least 6 characters long, include a number and a special character"
        );
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token") || "",
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
        navigate(`/user/${userinfo.username}`);
      } else {
        if (data.error === "Old password is incorrect") {
          setOldPasswordError("Old password is incorrect");
        } else {
          alert("Error updating profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Old Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {oldPasswordError && (
            <p className="text-red-500">{oldPasswordError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPasswordError && (
            <p className="text-red-500">{newPasswordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#333] text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};
