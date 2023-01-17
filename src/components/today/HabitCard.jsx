import React , {useEffect} from "react";
import io from 'socket.io-client' ; 
import { useDispatch, useSelector } from "react-redux";
import { deleteHabit } from "../../redux/action";
import styles from "../../styles/home.module.css";
import ActionButton from "./ActionButton";
const socket = io.connect("http://localhost:5000");

const HabitCard = (props) => {
  const { habit } = props;
  console.log(habit);
  var target = 5 ; 
  var progress = 0  ; 

  const dispatch = useDispatch();
  useEffect(()=>{
    socket.on("receive_delete" , (data)=>{
      dispatch(deleteHabit(data));
      console.log(data) ; 
    });

    return ()=>{
      socket.off("receive_delete") ; 
    } 
  },[dispatch]) ; 


  for(let i= 0 ; i < 6 ; i++){
    if(habit.weekdays[i].doneStatus === "done"){
      progress++ ; 
    }
  }


  const handleDeleteHabit = () => {
    socket.emit("delete" , habit.id) ; 
  };

  return (
    <div className={styles.habitCardContainer}>
      <div className={styles.habitCard}>
        <div className={styles.habitCardTitle}>
          <div className={styles.habitActionName}>
            <span>
              <ActionButton habit={habit} />
            </span>
            <span className={styles.cardName}>
               { `:   ${habit.name}` }
            </span>
          </div>
          <div>
          <i className="fa-solid fa-trash" onClick={handleDeleteHabit}></i>
          </div>

        </div>

        <div className={styles.weeklyProgress}>
          <span>Target : {target} days / week</span>
          <span>Progress :{progress}  / {target} </span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
