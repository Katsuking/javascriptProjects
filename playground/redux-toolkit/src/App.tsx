import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CartItems from './components/CartItems';
import Posts from './components/Posts';

function App() {
  return (
    <main>
      <Navbar />
      <CartItems />
      <Posts />
    </main>
  );
}

export default App;
