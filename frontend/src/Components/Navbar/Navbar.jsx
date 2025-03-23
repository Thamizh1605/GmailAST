import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({isSigned,setIsSigned}) => {
    const navigate = useNavigate();
    const handleLogout=(e)=>{
        e.preventDefault();
        setIsSigned(false);
        navigate("/")
    }
  return (
    <nav className="top-0 text-[#3baea0] shadow-md p-4 w-full relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-black text-[#2c786c]">Gmail<span className='text-[#f8b400]'>AST</span></h1>
        <ul className="flex space-x-6">

         {!isSigned && <li>
            <Link to='/'>
            <p className="hover:text-green-300">Home</p>
            </Link>
        </li>}

          {isSigned && <li><Link to='/dash/board'>
          <p className="hover:text-green-300">Dashboard</p>
          </Link></li>}

          <li>
            <Link to='/About'>
                <p className="hover:text-green-300">About</p>
            </Link>
          </li>
          {!isSigned &&
          <li>
            <Link to='/sign/in'>
            <p className="hover:text-green-300">Sign in</p>
            </Link>
          </li>
          }
          {
            isSigned && 
            <li>
            <Link to='/sign/in'>
            <p className="hover:text-green-300" onClick={(e)=>handleLogout(e)}>Log out</p>
            </Link>
          </li>

          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
