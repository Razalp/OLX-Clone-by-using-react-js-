import { createContext, useState } from 'react';

// const FireBaseContext 


export const FireBaseContext = createContext(null);

export const AuthContext=createContext(null);

export default function Context({childern}){
    const [user,setUser]=useState('')
    return(
        <AuthContext.Provider>
            {childern}
        </AuthContext.Provider>
    )
}

// const AuthContext=