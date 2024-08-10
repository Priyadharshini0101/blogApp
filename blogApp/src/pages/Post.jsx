import React, {useEffect, useState} from 'react'
import { Link, useParams} from "react-router-dom"
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { useSnackbar } from 'react-simple-snackbar'
import Button from "../components/Button"
import Container from "../components/Container"
import { getDocs,collection,query,where,deleteDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Post() {
  const [post, setPost] = useState([])
  const [openSnackbar] = useSnackbar()
  const [user, setUser] = useState(useSelector((state) => state.auth.user.user))
  const navigate = useNavigate()
  const { slug } = useParams()
  const [loading,setLoading] = useState(false)

  const deletePost = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, "blog"), where("id", "==", slug));
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.warn("Post with slug", slug, "not found in the 'blog' collection.");
        return; 
      }
  
      const docRef = querySnapshot.docs[0].ref;
  
      await deleteDoc(docRef);
  
    openSnackbar("Post with slug deleted successfully.");
    
    navigate("/")            
    } catch (error) {
    openSnackbar("Error deleting post"); 
    }
      
    setLoading(false)               
  };
  


  useEffect(() =>{
    const submit = async()=>{

     const querySnapshot = collection(db, "blog")
     
let q = query(querySnapshot, where("id", "==", slug));
q = await getDocs(q);

      q.forEach((doc) => {
          setPost(doc.data())             
       });
    }
    submit()
    console.log(user ? true : false)
  }, [])
 
  const isAuthor =  user ? post['uid'] === user.uid : false
 
  return (
    <>  
  {!loading ?  <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative  rounded-xl flex-col'>
        { isAuthor && (
            <div className="absolute top-0 right-0 p-2.5 flex gap-[10px]">
              <Link to={`/edit-post/${post.id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
    <Link>   <Button bgColor="bg-red-500" 
              onClick={deletePost} 
              >Delete</Button>
              </Link></div>
          )}
          <img src={post.imgUrl} alt={post.title} className='rounded-xl w-full object-contain bg-stone-500 h-[600px] shadow-sm ' />

        </div>
        <div className="w-full">
          <div className='flex gap-[10px] font-bold text-[16px] text-stone-500'>
            <h1>{post.category}</h1>
            <h1>{post.datePosted}</h1>
          </div>
          <h1 className="text-[24px] font-bold italic uppercase">{post.title}</h1>
          <div className=" text-[18px] text-gray-800">
            {parse(`${post.content}`)}
          </div>
        </div>
      </Container>
    </div>:
        
          <div className="flex h-screen w-full justify-center items-center">
            <div
              className="inline-block h-[45px] w-[45px] text-teal-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>}
    </>
   ) 
}

export default Post