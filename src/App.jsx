import { useState, useEffect } from 'react'
import './App.css'
import SignInSide from './templates/SignInSide'
import Dashboard from './dashboard/Dashboard';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const xUser = localStorage.getItem('user');
    if (xUser) {
      setUser(JSON.parse(xUser))
    }
  }, []);

  return (
    <>
      {!user ? <SignInSide /> : <Dashboard/>}

    </>
  )
}

export default App
