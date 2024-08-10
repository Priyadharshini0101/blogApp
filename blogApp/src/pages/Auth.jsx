import React,{useState, useEffect} from 'react'
import {Logo,Input,Button} from '../components/index'
import {signup,login,auth} from '../firebase'
import {useForm} from "react-hook-form"
import { useSnackbar } from 'react-simple-snackbar'


function Auth() {
        const [openSnackbar,closeSnackbar] = useSnackbar()
        const [name,setName] = useState()
        const [password,setPassword] = useState()
        const [email, setEmail] = useState()
        const [signIn,setSignIn] = useState(true)
     
        
    const {register, handleSubmit} = useForm()
    
        const user_auth = async(event) =>{
          event.preventDefault()
         try{
          if(!signIn){
         
            await login(email,password)
          
          }else{
            await signup(name,email,password)
           
          }
        }catch(error){
            openSnackbar(error.code.split('/')[1].split('-').join(" "))
            
        //    closeSnackbar("wdfasdfdf")
        }
      
        
        }

        

        
        
        return (
        <div className="flex items-center justify-center w-full h-screen bg-stone-50">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-gray-200`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo className="w-[64px] h-[64px] mx-[5px]" />
                        </span>
                    </div>
                  {signIn ?<><h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                  <div className='flex gap-[5px]  justify-center mt-2'>
                    <p className=" text-center text-base text-black/60">
                        Already have an account?&nbsp;
                    
                        </p>
                        <p
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                            onClick={() => setSignIn((signIn) => !signIn)}
                        >
                            Sign In
                        </p>
                        </div>
                        </>
                   :     <>     <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                   <div className='flex gap-[5px]  justify-center mt-2' >
                <p className=" text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                        
                </p>
                    <p
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                        onClick={() => setSignIn((signIn) => !signIn)}
                    >
                        Sign Up
                    </p>
                    </div>
               
                </>}
                    {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
                    <form  className="mt-8" onSubmit={user_auth}>
                        <div className="space-y-5">
                       { signIn ?    <Input
                                {...register("name", { required: true })}
                                label="Full Name : "
                                placeholder="Full Name"
                                onChange = {(e) => setName(e.target.value)}
                            />:("")}
                            <Input
                                {...register("email", {
                                    required: true,
                                    
                                })}
                                label="Email : "
                                placeholder="Email Address"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                {...register("password", { required: true })}
                                label="Password : "
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full">
                         {signIn ?  "Register" :"Login"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>);
    }

export default Auth