import React, { useContext } from 'react';
import './Navbar.scss';
import Link from 'next/link';
import VariableContext from '@/context/VariableContext';
import Login from '@/container/auth/Login';

const Navbar = () => {

  const { user } = useContext<any>(VariableContext);

  return (
        <ul className='navbar'>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/about'>About us</Link></li>
            <li><Link href='/help'>Help</Link></li>
            <li><Link href='/cart'>Cart{" "}4</Link></li>
            {/* { user? <Drawer/> : <li><Login /></li>} */}
            <Login />
        </ul>
  )
}

export default Navbar