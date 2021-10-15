import { useLocation } from 'react-router-dom';
import React from 'react';

import HHALogo from 'components/HHALogo/HHALogo';
import Button from 'components/Button/Button';
import ElementStyleProps from 'components/IProps/IProps';
import CustomCssProps from 'components/ICustomCSS/ICustomCSS';

import './styles.css';

interface IHeader extends ElementStyleProps{
}

const Header = (props: IHeader) => {
  const location = useLocation();

  return (  
    <div className={props.classes} 
    style={props.style}>
      {location.pathname === '/home' && (
        <>
          <HHALogo 
            classes='logo grid-item' 
            style={
              {'--griditem-alignself': 'center',
              '--griditem-justifyself': 'center',
              'width' : '300px',
              } as CustomCssProps
            }
          />
          <Button classes='btn grid-item goto-admin-btn'
            style= {
              {'--griditem-alignself':'center'} as CustomCssProps
            }
            value='ADMIN PANEL'
          />
          <Button classes='btn grid-item signout-btn'
            style = {
              {'--griditem-alignself':'center'} as CustomCssProps
            } 
            value='SIGN OUT'/>
        </>
      )}
    </div>
  );
}

export default Header;