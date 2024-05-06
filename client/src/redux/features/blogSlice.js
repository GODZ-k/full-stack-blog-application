import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    blogs:[]
}

const blogSlice = createSlice({
    name:"Blogs",
    initialState,
    reducers:{
        addBlog:(state, action)=>{},
        deleteBlog:(state,action)=>{},
        updateBlog:(state, action)=>{},
        getAllBlogs:(state,action)=>{}
    }
})


const {addBlog , deleteBlog , updateBlog , getAllBlogs} = blogSlice.actions
export default blogSlice