import React from "react";

const A = ({ msg }) => (
  <div style={{ padding: "20px", margin: "20px" }}>
    {msg}
  </div>
);

const B = ({ msgs }) => (
  <div style={{ padding: "20px", width: "500px" }}>
    <h1>Stuff!</h1>
    <ul>
      {msgs.map((msg, idx) => (
        <li key={idx}>
          <A msg={msg} />
        </li>
      ))}
    </ul>
  </div>
);

export { A, B };
