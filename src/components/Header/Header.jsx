import React, { createContext } from "react";

export function Header() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="text" placeholder="Put postcode and the place you want to search" name="searchWord" />
      <label>
        <input type="radio" value="walking" name="navProfile" defaultChecked={true} /> Walking
      </label>
      <label>
        <input type="radio" value="driving" name="navProfile" /> Driving
      </label>
      <label>
        <input type="radio" value="cycling" name="navProfile" /> Cycling
      </label>
    </form>
  );
}
