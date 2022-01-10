import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
      console.log(user)
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
          <button id='profile-btn' onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li className='profile-list'>{user.username}</li>
              <li className='profile-list'>{user.email}</li>
              <li className='profile-list'>
                <button onClick={() => dispatch(logout())}>Log Out</button>
              </li>
            </ul>
          )}
        </>
      );
}

export default ProfileButton
