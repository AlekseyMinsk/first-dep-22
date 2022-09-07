import React, { useState, useEffect } from 'react';


const Dashboard = () => {
    //const history = useHistory();
    const [showPasswordInput, setpasswordInput] = useState(false);
    const [successPassword, setsuccessPassword] = useState(false);
    const [newPassword, setnewPassword] = useState('');
    //const [oldPassword, setoldPassword] = useState('');
    const [userName, setuserName] = useState('');

    const passwordUpdated = 'Password updated successfully';

    async function logout(event) {
        event.preventDefault();
        try {
          const res = await fetch('http://localhost:5000/auth/logout', {
            method: "post",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            }
          });
          const data = await res.json();
          if (data.message) {
            window.location = '/login';
          } else {
            console.log("Logout error")
          }
        } catch (error) {
          console.log(error);
        }
    }
    async function deleteUser(event) {
        event.preventDefault();
        console.log('deleteUser')
    }
    function showupdatePassword() {
      setpasswordInput(showPasswordInput ? false  : true);
    }
    async function updatePassword(event) {
        event.preventDefault();
        const postData = {
          "username": userName,
          "newpassword": newPassword
        }
        try {
          const res = await fetch('http://localhost:5000/auth/updatepassword', {
            method: "post",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postData),
          });
          const data = await res.json();
          if(data.message) {
            setsuccessPassword(successPassword ? false  : true);
            setTimeout(()=> {
              setsuccessPassword(successPassword ? false  : true);
            },2000)

            setpasswordInput(showPasswordInput ? false  : true);
          }
        } catch (error) {
          console.log(error);
        }
    }

    async function populateQuote() {
      try {
        const res = await fetch('http://localhost:5000/auth/getitems', {
          method: "get",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setuserName(data.user);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      populateQuote()
    },[])

    return (
    <>
        <h3>Hello {userName}!</h3>
        <form onSubmit={logout}>
          <input 
            type="submit" 
            value="Logout" 
          />
        </form>
        <input 
            type="submit" 
            value="Update Password" 
            onClick={showupdatePassword}
        />
        
        { (showPasswordInput) ? 
          <>
            <form onSubmit={updatePassword}>
            <input 
              value={newPassword}
              onChange={e => setnewPassword(e.target.value)}
              type='text'
              placeholder='Enter new password'
            /> 
            <input 
              type="submit" 
              value="Update" 
            />
            <br />
            </form>
          </>
          : <br /> }
          {(setsuccessPassword) ? 
            <span></span>
            :
            <br />
          }
         
        
        <h3>Quote list</h3>
        
        
        <form onSubmit={deleteUser}>
          <input 
            type="submit" 
            value="Delete User" 
          />
        </form>        
    </>
    )
}

export default Dashboard;