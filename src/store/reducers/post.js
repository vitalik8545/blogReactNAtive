import {ADD_POST, EDIT_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";

const initialState = {
    allPosts:[],
    bookedPosts:[],
    loading:true
}

export const postReducer = (state = initialState,action)=>{
    switch (action.type){
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post=>post.booked),
                loading: false
            }
        case TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(post=>{
                if(post.id===action.payload){
                    post.booked = !post.booked
                }
                return post
            })

            return {...state,allPosts,bookedPosts:allPosts.filter(post=>post.booked)}
        case REMOVE_POST:
            const newPosts = state.allPosts.filter(post=>post.id!==action.payload)

            return {...state,allPosts:newPosts,bookedPosts:newPosts.filter(post=>post.booked)}
        case ADD_POST:
            return {...state,allPosts: [{...action.payload},...state.allPosts]}
        case EDIT_POST:
            const allEditPosts = state.allPosts.map(post=>{
                if(post.id===action.payload){
                    post.text = action.text
                    post.title = action.title
                    post.img = action.img
                }
                return post
            })
            return {...state,allPosts:allEditPosts,bookedPosts: allEditPosts.filter(post=>post.booked)}
        default:
            return state
    }
}
