import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchMe } from '@/store/auth/authSlice';
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state=>state?.auth)
    useEffect(()=>{
      dispatch(fetchMe())
    },[])
    

    if(user.status==='loading')
    {
        return (
            <p>Loading.....</p>
        )
    }

    const isAuthenticated = Boolean(user.accessToken)

  return isAuthenticated ? <Outlet/>: <Navigate to='/login' replace/>;
}

export default ProtectedRoutes