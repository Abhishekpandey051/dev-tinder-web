import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constant';
import { addFeed } from '../utils/feedSlice';
import FeedCart from './FeedCart';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getUserFeed = async() => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
      dispatch(addFeed(res?.data?.data))
    }
    catch(err){
      console.log(err.message)
    }
  }
  
  useEffect(() => {
    getUserFeed()
  }, [])

  console.log("user feed ", feed)
  return (
    <>
    {feed && <div className='flex justify-center mt-10'>
      <FeedCart user = {feed[0]}/>
    </div>}
    </>
  )
}

export default Feed