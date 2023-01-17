import React , {useEffect} from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { addHabitStatus } from "../../redux/action";
import styles from "../../styles/home.module.css";
const socket = io.connect("http://localhost:5000");

const ActionButton = (props) => {
  const { habit } = props;
  const dispatch = useDispatch();

  useEffect(()=>{
    socket.on("receive_status", (data)=>{
      dispatch(addHabitStatus(data));
      // console.log(data) ; 
    });
    return ()=>{
      socket.off("receive_message") ; 
      socket.off("receive_status") ; 
    } 
},[dispatch]) ; 

  const handleNoStatus = () => {
    const obj = {
      id: habit.id,
      doneStatus: "",
    };
    socket.emit("send_no_status" , obj) ; 
  };

  const handleDoneStatus = () => {
    const obj = {
      id: habit.id,
      doneStatus: "done",
    };
    socket.emit("send_done" , obj) ; 
  };

  const handleNotDoneStatus = () => {
    const obj = {
      id: habit.id,
      doneStatus: "notdone",
    };
    socket.emit("send_not_done" , obj) ; 
  };

  return (
    <div className={styles.habitCardAction}>
      {habit.doneStatus === "" && (
        <span className={styles.habitCardCheckIcon}>
          <i className="fa-regular fa-square" onClick={handleDoneStatus}></i>
        </span>
      )}

      {habit.doneStatus === "done" && (
        <span className={styles.habitCardCheckIcon}>
          <i
            className="fa-solid fa-square-check"
            onClick={handleNotDoneStatus}
          ></i>
        </span>
      )}

      {habit.doneStatus === "notdone" && (
        <span className={styles.habitCardCrossIcon}>
          <i className="fa-solid fa-square-xmark" onClick={handleNoStatus}></i>
        </span>
      )}
    </div>
  );
};

export default ActionButton;
