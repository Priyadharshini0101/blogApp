import React, {useCallback, useState,useEffect,useId} from "react";
import {useForm} from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import RTE from "./RTE"
import Select from './Select'
import moment from "moment"
import dateFormat from 'dataformat'
import {useNavigate, useParams} from "react-router-dom"
import {addDoc,collection,getFirestore,query,where,getDocs,updateDoc} from 'firebase/firestore'
 import { db } from "../firebase";
 import { useSelector } from "react-redux";
 import { useSnackbar } from "react-simple-snackbar";
 import { nanoid } from "nanoid";
 import  parse from 'html-react-parser'
 import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Assuming you're using Firebase v9 or later

export default function PostForm({post}){
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState(useSelector((state) => state.auth.user.user))
  const [reff,setReff] = useState(nanoid())

    const {register, handleSubmit, watch, setValue, control, getValues,reset} = useForm()
 
   
    const navigate = useNavigate()
 

const storage = getStorage();

async function uploadImage(image) {
  try {
    const storageRef = ref(storage, `images/${image[0]['name']}`); 
    const metadata = {
      contentType: image[0]['type'], 
    };
   

    const uploadTask = await uploadBytes(storageRef, image[0], metadata)
    
    
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL; 
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error; 
  }
}
const [currentDate, setCurrentDate] = useState(new Date());

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',   
'December'];

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2,   
'0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

useEffect(() => {
    setCurrentDate(formatDate(currentDate));
 

}, []);
console.log( moment.utc(new Date()).local().startOf('seconds').fromNow(),
        new Date().getTime() )


    const [openSnackbar] = useSnackbar()
    const submit = async(data) =>{
      setLoading(true)

      if(post === undefined){
        
      
        try {
          await addDoc(collection(db,"blog"),{
            uid:user.uid,
            id:reff,
            title:data.title,
            slug:data.slug,
            content:data.content,
            status:data.status,
            datePosted:currentDate,
            category:data.category,
            time:new Date().getTime(),
           imgUrl:(await uploadImage(data.image)).toString()
        });
        uploadImage(data.image,data.title)
        openSnackbar("Blog is Submitted")
        reset()
        setReff(nanoid())

      
        } catch (e) {
          openSnackbar("Error in adding document ");
        }
        
      }else{
        

          try {
            const q = query(collection(db, "blog"), where("id", "==", post.id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              console.warn("Post with ID", post.id, "not found in the 'blog' collection.");
              return; 
            }
            console.log(data.image)
             
            const docRef = querySnapshot.docs[0].ref;
        
            await updateDoc(docRef,{
              uid:user.uid,
              id:post.id,
              title:data.title,
              slug:data.slug,
              content:data.content,
              status:data.status,
              datePosted:currentDate,
              cateogry:data.category,
              time:new Date().getTime(),
             imgUrl:data.image.length > 0 ? (await uploadImage(data.image)).toString() :post.imgUrl,
            });
            // console.log("fasddsafad")
        
            openSnackbar("Blog id updated successfully.");
            navigate("/")
          } catch (error) {
            console.log(error)
            openSnackbar("Error in updating post");
          }
        }
        setLoading(false)
  }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
    }, [])

  

    React.useEffect(() => {
        watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
            if(name === "image"){
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                document.getElementById("display").src = reader.result;
              });
              reader.readAsDataURL(value.image[0]);
          
              console.log( document.getElementById("display"))
              
            }
          
        }) 
    }, [watch, slugTransform, setValue])

    return (
      <>
    {!loading ?
    <>
        <h1 className='text-3xl m-2.5 text-gray-800 font-bold'>{post ? "Update" : "Add"} Blog </h1>
      
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                 defaultValue={post ? setValue("title",post.title,{shouldValidate:true}) : ""}
                {...register("title", {required: true})}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                defaultValue={post ?  setValue("slug", slugTransform(post.slug), {shouldValidate: true}): ""}
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                           <Select
                options={["Food", "Travel","Literature","Sports","Music","Entertainment","Technology"]}
                label="Category"
                className="mb-4"
                 select = {post ? post.category : ""}
               {...register("category", {required: true})}
                /> 
                
                <RTE
                label="Content: "
                name="content"
                defaultValue={post ? post.content : ""}
                control={control}
                className="-z-50"
                // defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
               
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/jfif"
            {...register("image", {required:(post ? false : true)})}
                />
               
               <div className="w-[100px] m-1">
                        <img src={post ? post.imgUrl :""}
                        className="rounded-lg"
                        id="display"
                     
                        />
                        
                    </div>
              
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                select = {post ? post.status : ""}
               {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                defaultValue={post ? post.status : ""}
                >{post ? "Update": "Submit"}</Button>
            </div>
        </form>
        </>
        :
        
          <div className="flex h-screen w-full justify-center items-center">
            <div
              className="inline-block h-[45px] w-[45px] text-stone-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
}
</>
    )
}
