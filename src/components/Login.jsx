import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { AuthContext } from '../providers/Authprovider';
import { auth } from '../firebase.init';



const Login = () => {

    const emailRef = useRef();

  const {signInUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

    const handleLogin = (e) =>{

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
      
        signInUser(email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        //  console.log(user)
          Swal.fire({
            title: "Login Successfull",
            text: "You clicked the button!",
            icon: "success"
          });
          navigate("/")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Oppssssss",
            text: "You Wrong password or user",
            icon: "error"
          });
         
        });

       


    }


    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider )
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    icon: 'success',
                });
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });


            
    };


    const handleForgetPassword = () => {
        const email=emailRef.current.value;
        if(!email){
            Swal.fire({
                title: 'Email needed',
                text: 'Please enter your email',
                icon: 'error',
            });

          
        }
        else{
            navigate('/forgetPassowrd', {state: {email}})
        }



    }
    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
           
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" ref={emailRef} placeholder="email" className="input input-bordered"  name="email" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" name="password" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover" onClick={handleForgetPassword}>Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

           <p className='text-center'>New user?? <Link to='/register' className='text-blue-400'>Register</Link></p>

           <div className="text-center mt-4">
                        <button
                           onClick={handleGoogleLogin}
                            className="btn btn-primary w-full"
                        >
                            Login with Google
                        </button>
                    </div>
    
           
          </div>
          

          
          
        </div>
       
      </div>
     
    );
};

export default Login;