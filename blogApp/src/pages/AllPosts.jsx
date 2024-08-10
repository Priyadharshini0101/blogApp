import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/Container'
import PostCard from "../components/PostCard"

import {getDocs,collection} from 'firebase/firestore'
 import { db } from "../firebase";     
 
function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(() =>{
  
    const submit = async(user)=>{
      setLoading(true)
     const copy = []
     const querySnapshot = await getDocs(collection(db, "blog"))
      querySnapshot.forEach((doc) => {
       copy.push(doc.data())
      });
      setPosts(copy)
      setLoading(false)
    }
    submit() 
  }, [])
  //TODO: add case for array length 0
  return (
 <div className=' h-full flex ml-[100px] flex-col'>
      {/* <Container> */}
      <h1 className='text-3xl mx-2.5 text-gray-800 font-bold pt-[25px]'>All Blogs</h1>
  {!loading ? 
        <div className="flex flex-wrap items-flex-start  content-around py-[10px]">
        {posts ?  posts.map((post) => (
            <div className="p-2.5 w-1/4 h-fit flex " key={post.id}>
              <PostCard {...post} />
            </div>
          )) : 
          <div className="flex h-screen  w-full justify-center items-center">
        <h1 className='text-3xl text-stone-400'> No Blogs Yet!</h1>
          </div>}
      
      {/* </Container> */}
    </div>:
    
        
    <div className="flex h-screen w-full justify-center items-center">
    <div
      className="inline-block h-[45px] w-[45px] text-stone-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  </div>
    }
    </div>
  )
}

export default AllPosts