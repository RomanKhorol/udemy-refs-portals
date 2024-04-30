import { useState, useRef } from "react";

export default function Player() {
  const userName = useRef();
  const [enteredName, setUserName] = useState("");

  function handleClick() {
    setUserName(userName.current.value);
    userName.current.value = "";
    // we litle bit violating rules of declarative writiing for React
    //  and writting imperative cod
    // straightly changing DOM, instead let it for React
  }
  return (
    <section id="player">
      <h2>Welcome {enteredName ? enteredName : "unknown entity"}</h2>
      <p>
        <input ref={userName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
