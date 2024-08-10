import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user :{}
}

export const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const userObject = {
                user:action.payload               
            }    
         state.user = userObject
         localStorage.setItem("user",JSON.stringify(state.user))
        },
    }
})

export const {addUser} = authSlice.actions
export default authSlice.reducer