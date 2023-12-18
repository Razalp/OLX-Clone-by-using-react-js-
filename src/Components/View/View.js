import React,{useContext,useState,useEffect} from 'react';

import './View.css';
import { postContext } from '../../store/postContext';
import { FireBaseContext } from '../../store/Context';
function View() {
  const[userDetails,setUserDetails]=useState()
  const{postDetiles}=useContext(postContext)
  const{fireBaseConfig}=useContext(FireBaseContext)
  useEffect(()=>{
     const {userId}= postDetiles
     fireBaseConfig.firestore().collection('users').where('id','==',userId).get().then((res)=>{
  res.forEach(doc => {
    setUserDetails(doc.data())
  });
})
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetiles?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetiles?.price}</p>
          <span>{postDetiles?.name}</span>
          <p>{postDetiles?.category}</p>
          <span>{postDetiles?.ceatedAt}</span>
        </div>
       { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
