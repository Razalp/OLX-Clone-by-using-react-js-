import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FireBaseContext, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Create = () => {
  const { fireBaseConfig } = useContext(FireBaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const history = useHistory();

  const handelSubmit = () => {
    const storageRef = fireBaseConfig.storage().ref(`/image/${image.name}`);

    storageRef.put(image).then(() => {
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
        fireBaseConfig
          .firestore()
          .collection('products')
          .add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          })
          .then(() => {
            history.push('/');
          });
      });
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="productName">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="productName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="productCategory">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="productCategory"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="productPrice">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="productPrice"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
        </form>
        <br />
        <img
          alt="Product Preview"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
        />
        <br />
        <button onClick={handelSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
