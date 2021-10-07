import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [registered, setRegistered] = useState("");
  const [role, setRole] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [totalContributions, setTotalContributions] = useState("");
  const [status, setStatus] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [displayImage, setDisplayImage] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { FirstName: firstName, MiddleName: middleName, LastName: lastName, FullAddress: fullAddress, Registered: registered, Role: role, Birthdate: birthdate, TotalContributions: totalContributions, Status: status, EmailAddress: emailAddress, DisplayImage: displayImage });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "Users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "Users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <input
        placeholder="First Name"
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <input
        placeholder="Middle Name"
        onChange={(event) => {
          setMiddleName(event.target.value);
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      <input
        type="date"
        placeholder="Registration Date"
        onChange={(event) => {
          setRegistered(event.target.value);
        }}
      />
      <input
        placeholder="Full Address"
        onChange={(event) => {
          setFullAddress(event.target.value);
        }}
      />
      <input
        placeholder="Role"
        onChange={(event) => {
          setRole(event.target.value);
        }}
      />
      <input
        type="date"
        placeholder="Birth Date"
        onChange={(event) => {
          setBirthdate(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Total Contributions"
        onChange={(event) => {
          setTotalContributions(event.target.value);
        }}
      />
      <input
        placeholder="Status"
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email Address"
        onChange={(event) => {
          setEmailAddress(event.target.value);
        }}
      />
      <input
        placeholder="Display Image"
        onChange={(event) => {
          setDisplayImage(event.target.value);
        }}
      />
      

      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
