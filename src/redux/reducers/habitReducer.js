import { ADD_HABIT, DELETE_HABIT, ADD_HABIT_STATUS, ADD_WEEKLY_DONE_STATUS  , ERROR } from "../action";
import { initialState, weekdays } from "./initialState";

// we will use w
const initialHabitsState = {
  list : initialState.list , 
  error : "" 
};

export function habitsReducer(state = initialHabitsState, action) {
  switch (action.type) {
    case ERROR: {
      return {
          ...state,
          error: action.error
      };
  }


    case ADD_HABIT:
      const { id, name } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            name: name,
            weekdays : weekdays , 
            doneStatus: "",
          },
        ],
      };

    case DELETE_HABIT:
      const newList = state.list.filter((elem) => elem.id !== action.id);

      return {
        ...state,
        list: newList,
      };

    case ADD_HABIT_STATUS:
      var updatedList = state.list.map((elem) =>
        elem.id === action.id
          ? { ...elem, doneStatus : action.doneStatus }
          : elem
      );

    return {
        ...state,
        list: updatedList,
      };

    case ADD_WEEKLY_DONE_STATUS:
    var updatedWeekdays = [] ;  
     state.list.map((elem) =>{
         if(elem.id === action.id){
              updatedWeekdays = elem.weekdays.map((item , index)=>(
                index === action.index
                ? { ...item, doneStatus : action.doneStatus }
                : item 
              ))
          }
      }
      );

      var updatedList2 = state.list.map((elem) =>
        elem.id === action.id
          ? { ...elem, weekdays: updatedWeekdays }
          : elem
      );

    //   console.log(updatedList2) ; 

      return {
        ...state,
        list : updatedList2 
      };

    default:
      return state;
  }
}
