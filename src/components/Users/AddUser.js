import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

/* ---------------------------------- Managed with REFs -----------------------------------  */

const AddUser = (props) => {
  const userNameRef = useRef();
  const userAgeRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(userNameRef.current, userAgeRef.current);
    const enteredUsername = userNameRef.current.value;
    const enteredAge = userAgeRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);

    /* --- below update is rarely used and hence not suggested offently as we are directly updating a node value in react --- */
    userNameRef.current.value = "";
    userAgeRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={userNameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={userAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;

/* ------------------------------------Managed wirg State update----------------------------- */
// const AddUser = (props) => {
//   const [enteredUsername, setEnteredUsername] = useState('');
//   const [enteredAge, setEnteredAge] = useState('');
//   const [error, setError] = useState();

//   const addUserHandler = (event) => {
//     event.preventDefault();
//     if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
//       setError({
//         title: 'Invalid input',
//         message: 'Please enter a valid name and age (non-empty values).',
//       });
//       return;
//     }
//     if (+enteredAge < 1) {
//       setError({
//         title: 'Invalid age',
//         message: 'Please enter a valid age (> 0).',
//       });
//       return;
//     }
//     props.onAddUser(enteredUsername, enteredAge);
//     setEnteredUsername('');
//     setEnteredAge('');
//   };

//   const usernameChangeHandler = (event) => {
//     setEnteredUsername(event.target.value);
//   };

//   const ageChangeHandler = (event) => {
//     setEnteredAge(event.target.value);
//   };

//   const errorHandler = () => {
//     setError(null);
//   };

//   return (
//     <div>
//       {error && (
//         <ErrorModal
//           title={error.title}
//           message={error.message}
//           onConfirm={errorHandler}
//         />
//       )}
//       <Card className={classes.input}>
//         <form onSubmit={addUserHandler}>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={enteredUsername}
//             onChange={usernameChangeHandler}
//           />
//           <label htmlFor="age">Age (Years)</label>
//           <input
//             id="age"
//             type="number"
//             value={enteredAge}
//             onChange={ageChangeHandler}
//           />
//           <Button type="submit">Add User</Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default AddUser;
