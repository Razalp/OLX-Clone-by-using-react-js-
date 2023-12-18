import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FireBaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {postContext} from '../../store/postContext'
function Posts() {
const {fireBaseConfig}=useContext(FireBaseContext)
const [products, setProducts] = useState([]);
const {setPostDetiles}=useContext(postContext)
const history=useHistory()
useEffect(() => {
  fireBaseConfig.firestore().collection('products').get().then((snapshot) => {
    const allpost = snapshot.docs.map((product) => {
      return {
        ...product.data(),
        id: product.id
      };
    });
    console.log(allpost); // Log the data to the console
    setProducts(allpost);
  });
}, []);



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
  {products.map(product => (
    <div className="card" key={product.id} onClick={()=>{
      setPostDetiles(product)
      console.log(product)
      history.push('/view')
    }}>
      <div className="favorite">
        <Heart />
      </div>
      <div className="image">
        <img src={product.url} alt="" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="kilometer">{product.category}</span>
        <p className="name">{product.name}</p>
      </div>
      <div className="date">
      <span>{product.createdAt.toLocaleString()}</span>

      </div>
    </div>
  ))}
</div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
