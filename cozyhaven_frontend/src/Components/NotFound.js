import React, { useEffect } from 'react';
import  notfound  from '../Assets/not found.jpg';
import { CursorAnimation } from './CursorAnimation/CursorAnimation';

const NotFound = () => {
    useEffect(()=>{
        CursorAnimation()
    },[])
  return (
    <div className='notfound'>
        <div id='cursor-blur'></div>
      <img src={notfound} alt="Page Not Found"/>
      404 Not found
    </div>
  );
};

export default NotFound;
