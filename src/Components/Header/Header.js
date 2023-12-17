import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FireBaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Header() {
  const { user } = useContext(AuthContext);
  const { fireBaseConfig } = useContext(FireBaseContext);
  const history=useHistory()
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      fireBaseConfig.auth().signOut();
      history.push('/Login')
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage" onClick={() => history.push('/Login')}>
          <span>welcome {user ? user.displayName : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout}>
            Log Out
          </span>
        )}
        <div className="sellMenu">
          <SellButton  />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={()=>history.push('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
