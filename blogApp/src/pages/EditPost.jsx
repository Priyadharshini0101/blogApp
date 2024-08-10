import React from 'react'
import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { useEffect } from 'react'
import Container from "../components/Container"
import PostForm from "../components/PostForm"
import { useSelector } from 'react-redux'
import { collection,getDocs,query,where } from 'firebase/firestore'
import { db } from '../firebase'

function EditPost() {
  const [post, setPost] = useState([])
  const { slug } = useParams()
  const [user, setUser] = useState(useSelector((state) => state.auth.user.user))
  

  const submit = async () => {

         const querySnapshot = collection(db, "blog")
         
    let q = query(querySnapshot, where("id", "==", slug));
    q = await getDocs(q);
    
          q.forEach((doc) => {
              setPost(doc.data())             
           });
        
      
 }

  useEffect(() =>{
    

    submit() 
   
  
  }, [])

  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost