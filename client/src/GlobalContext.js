import React, { createContext, useEffect, useMemo, useState,useCallback } from 'react'
import AuthApi from './API/AuthApi';
import axios from 'axios'
import { toast } from 'react-toastify';

// context ref
export const DataContext = createContext();

// context provider
function DataProvider(props) {
    const [token,setToken] = useState(false)

    const getToken = async () => {
      await axios.get(`/api/v1/auth/refreshToken`)
      .then(res => {
        // console.log('refreshToken =', res)
        setToken(res.data.accessToken)
      }).catch(err => toast.error(err.data.response.msg))
  };
  
    const initFetch = useCallback(() => {
      if(localStorage.getItem("loginToken")) {
        getToken()
      }
    },[getToken])

    useEffect(()=> {
            initFetch()
    },[initFetch])

    const data = {
      authApi: AuthApi(token)
    }

    const memoValue = useMemo(() => ({
        token,
        data
    }),[token,data])

  return (
    <DataContext.Provider value={memoValue} >   
            {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider