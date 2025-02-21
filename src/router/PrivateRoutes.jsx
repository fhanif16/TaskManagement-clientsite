import React, { useContext } from 'react'
import { AuthContext } from '../providers/Authprovider';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    if(loading){

        return <span className="loading loading-ring loading-lg"></span>

        
        
    }

    if(user){
        return children;
    }

   

    
    return (
        <div>
            <Navigate to='/login'>Login</Navigate>
            
        </div>
    );
};

export default PrivateRoutes;