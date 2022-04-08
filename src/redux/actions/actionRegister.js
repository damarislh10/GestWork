import {types} from '../types/types';
import {getAuth, createUserWithEmailAndPassword, updateProfile}from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';

export const registroEmailPasswordNombre = (name,email,cargo,password) => {
    return(dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
        .then(async ({user}) => {

           await updateProfile(auth.currentUser, {displayName: name})

           dispatch(registerS(user.email,user.uid,user.displayName))
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: true,
            timer: 5000
          })    

            const docuRef = doc(db, `users/${user.uid}`)
            setDoc(docuRef,{id:user.uid,name: user.displayName, email: user.email,cargo: cargo})
            const fff = getDocs(collection(db, "users"))
            const hh= doc(db, "users", user.uid)
            console.log(fff, hh)
            console.log("fff")

        })
        .catch(e =>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Registro no exitoso',
                showConfirmButton: true,
                timer: 5000
              })    
            console.log(e);
        })
    }
}



export const registerS= (email,password,firstName) => {

    return{
       type: types.register,
       payload: {
           email,
           password,
           firstName
       }
    }
}