import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReactComponent as BlackHeartIcon } from "../../images/blackHeartIcon.svg";
import { ReactComponent as DoneIcon } from "../../images/doneIcon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logoutIcon.svg";

export default function Profile() {
  const [user, setUser] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = getUser ? getUser.email : "";
    setUser(userEmail);
  }, [user?.email]);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <h1
        data-testid="profile-email"
        className="fs-3 fw-bold m-0 mb-5 p-0 indigo-dark-color p-2"
      >
        {user}
      </h1>

      <ul class="list-group list-group-flush justify-content-center">
        <li className="list-group-item">
          <Link
            type="button"
            data-testid="profile-done-btn"
            to="/done-recipes"
            className="btn d-flex align-items-center gap-4"
          >
            <div className="radius-button-yellow p-2">
              <DoneIcon className="w-100 h-100" fill="#fdc500" />
            </div>

            <span className="fs-5 text-black-50">Done Recipes</span>
          </Link>
        </li>
        <li className="list-group-item">
          <Link
            type="button"
            data-testid="profile-favorite-btn"
            to="/favorite-recipes"
            className="btn d-flex align-items-center gap-4"
          >
            <div className="radius-button-yellow p-2">
              <BlackHeartIcon
                className="w-100 h-100"
                fill="#fdc500"
                alt="Favorite Recipes"
              />
            </div>
            <span className="fs-5 text-black-50">Favorite Recipes</span>
          </Link>
        </li>
        <li className="list-group-item">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={handleLogout}
            className="btn d-flex align-items-center gap-4"
          >
            <div className="radius-button-yellow p-2">
              <LogoutIcon className="w-100 h-100" fill="#fdc500" />
            </div>
            <span className="fs-5 text-black-50">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
