import React, { useEffect } from 'react'
import AppRouter from './routers/AppRouter';
import { setuser } from './redux/actions/actionLogin'
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';


export const GestWork = () => {



  let dispatch = useDispatch()

  useEffect(()=>{
    const auth = getAuth ();
    auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        // setuser()
        dispatch(setuser(authUser))
      }else{
        dispatch(setuser(null))
      }
    })
  }, [dispatch])
  return (
    <div>
        <AppRouter/>
    </div>
  )
}
