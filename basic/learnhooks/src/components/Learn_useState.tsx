"use client"

import { log } from 'console';
import React, { useState } from 'react';

 const Learn_useState  = () => {

  // simplest way to use  
  const [count, setCount] = useState(0);

  // user authentication
  const [ password , setPassword ] = useState('pasword');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({password});
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    e.target.value = '';
  }

  return (
    <>
      <div>hello world</div>
      <div>Pushed {count}</div>

      <div>
        <button onClick={() => setCount(count + 1)}>push me!</button>
      </div>
      <br/>

      <div>
          <h1>login form</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor='password'>password
          <input
            id='password'
            type='text'
            name='password'
            defaultValue={password}
            onChange={() => handleChangePassword}
          />
          </label>
          <input type='submit'/>
          </form>
      </div>
    </>
  );
};

export default Learn_useState;

