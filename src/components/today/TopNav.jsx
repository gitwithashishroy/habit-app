import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/topnav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/action/authAction";

const TopNav = () => {
  const d = new Date();
  const d1 = d.toDateString();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.topnav}>
      <div className={styles.navLeft}>
        <div className={styles.navLeftElem}>
          <Link className={styles.decorationLogo} to="/">
            {" "}
            Habit Tracker React{" "}
          </Link>
        </div>

        {auth.loggedIn === true && (
          <>
            {" "}
            <div className={styles.navLeftElem}>
              <Link className={styles.decoration} to="/home">
                {" "}
                Home{" "}
              </Link>
            </div>
            <div className={styles.navLeftElem}>
              <Link className={styles.decoration} to="/weekly">
                {" "}
                Weekly{" "}
              </Link>
            </div>{" "}
          </>
        )}
      </div>

      {auth.loggedIn === true ? (
        <>
          <div className={styles.navRightElem}>{`${d1}`}</div>
          {" "}
          <div className={styles.navRightElem}>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.navRightElem}>
            <Link to="/login">Log in</Link>
          </div>

          <div className={styles.navRightElem}>
            <Link to="/register">Register</Link>
          </div>

          <div className={styles.navRightElem}>{`${d1}`}</div>
        </>
      )}
     
    </div>
  );
};

export default TopNav;
