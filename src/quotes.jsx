import React, { useState, useEffect } from 'react';
import './quotes.css';
import '../templates/Group3.png'

export default function Quotes() {
  const [fact, setFact] = useState('');

useEffect(() => {
fetchQuotes();
const intervalId = setInterval(() => {
    fetchQuotes();
}, 60000);
return () => clearInterval(intervalId);
}, []);

  const fetchQuotes = () => {
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => {
        setFact(data.slip.advice);
      })
      .catch((err) => {
        console.error('Error fetching quotes:', err);
        alert('Something went wrong');
      });
  };

  return (
    <>
      <div className="quotes_container">
        <div className="quote_text">Quote #1</div>
        <div className="quotes">
            {fact}
        </div>
        <div className='fact_circle'>
            <img className='quote_img' src="../templates/Group3.png"/>
        </div>            
      </div>
    </>
  );
}