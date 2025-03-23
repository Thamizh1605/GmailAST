import { useEffect, useState } from 'react'
import './App.css'
import LeftContainer from './Components/LeftContainer/leftContainer'
import RightContainer from './Components/RightContainer/RightContainer'

function App() {
  const [isSigned, setIsSigned] = useState(() => {
    return localStorage.getItem("isSigned") === "true";
  });
  
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("useremail") || "";
  });
  
  useEffect(() => {
    localStorage.setItem("isSigned", isSigned);
    localStorage.setItem("username", username);
    localStorage.setItem("useremail", userEmail);
  }, [isSigned, username, userEmail]); 

  return (
    <div className="flex h-screen">
      <LeftContainer 
      isSigned={isSigned} 
      setIsSigned={setIsSigned}

      username = {username}
      userEmail={userEmail}
      />
      <RightContainer 
      isSigned={isSigned} 
      setIsSigned={setIsSigned}

      setUsername={setUsername}
      setUserEmail={setUserEmail} />
    </div>
  )
}

export default App
