import io from "socket.io-client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/home.module.css";
import { addHabit } from "../../redux/action";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import HabitCard from "./HabitCard";
const socket = io.connect("http://localhost:5000");

const Home = () => {
  const [inputData, setInputData] = useState("");
  const habits = useSelector((state) => state.habitsReducer);
  const auth = useSelector((state)=>state.authReducer) ; 
  // console.log(habits);
  const dispatch = useDispatch();
  
useEffect(()=>{
    socket.on("receive_message" , (data)=>{
      dispatch(addHabit(data)) ; 
      console.log(data) ; 
    });

    return ()=>{
      socket.off("receive_message") ; 
    } 
},[dispatch]) ; 
    
  const handleAddHabit = () => {
        socket.emit("send_message" , inputData) ; 
  };

  if(auth.loggedIn !== true){
    return <Navigate to="/login" />
  }

  return (
    <div className={styles.container}>
      <div className={styles.todaysDate}>{}</div>
      <div className={styles.addHabit}>
        <input
          type="text"
          placeholder="Add Habit..."
          value={inputData}
          onChange={(event) => setInputData(event.target.value)}
        />
        <i className="fa-solid fa-plus" onClick={handleAddHabit}></i>
      </div>
      <div className={styles.listHabit}>
        {habits.list.map((habit) => (
          <HabitCard habit={habit} key={habit.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
