import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Profile() {
  const [user, setUser] = useState("");
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : "";
    setUser(userEmail);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <h1 data-testid="profile-email">Email:{user} </h1>
      <Link type="button" data-testid="profile-done-btn" to="/done-recipes">
        Done Recipes
      </Link>
      <Link
        type="button"
        data-testid="profile-favorite-btn"
        to="/favorite-recipes"
      >
        Favorite Recipes
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
