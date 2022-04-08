import {types} from "../types/types";



const initialState = {
   user: {
       email:'jj',
    cargo:'cargando....',
},
cargo:''
}

export const loginReducer = (state = initialState, action) => {

    switch (action.type){
        case types.login:
            console.log('case login')

        return{
            ...state,
            cargo:'',
            id:action.payload.id,
            name: action.payload.displayname,
            user:{...action.payload}
        }
        case types.cargo:
            console.log('case cargo')
        return{
            ...state,
            cargo:action.payload
        }
        case types.logout:
            return{
                
            }
        default:
            return state;
    }


}