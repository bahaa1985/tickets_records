import React, { useEffect, useState } from 'react';
import {getAuth,setAuthUsr} from './LoginApi.js';

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const response_auth =await setAuthUsr({ userName: userName, password: password });
            const data = await response_auth.json()
             console.log(data.user);
            if(data.user){
            window.location.href='/';           
            }
        }
        catch(error){
            setError(error.message);
        }
        
    }

    useEffect(() =>{
        handleSubmit();
    })

    return(
        <div>
            <form className='w-1/2 mx-auto p-4 flex flex-col justify-center ' onSubmit={(e)=>handleSubmit(e)}>
                <div className='flex flex-row space-x-4 my-2'>
                    <label>Username:</label>
                    <input className='w-40 round-lg text-lg border border-slate-500 rounded-lg' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className='flex flex-row space-x-4 my-2'>
                    <label>Password:</label>
                    <input className='w-40 round-lg text-lg border border-slate-500 rounded-lg' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button className='w-20 h-12 rounded-lg border' type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    )
}