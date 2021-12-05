import React from 'react'
import {NavLink} from 'react-router-dom'

import {CustomCssProps, ElementStyleProps} from 'constants/interfaces';

import './nav_bar_styles.css';
// import logo from '../../img/logo/LogoWText.svg'
import HhaLogo from 'components/hha_logo/hha_logo';

interface INavBar extends ElementStyleProps {

};

const NavBar = (props:INavBar) => {
  return (
    <nav className={"navbar "+ (props.classes || '')}>
      {/* <NavLink to="/" className="home-button" ><a href="" className="logo"><img className="logo" src={logo} alt="" /></a></NavLink> */}
    
      <NavLink className="navbar-home-button" to="/home">
        {/*<img src={logo}*/}
        {/*alt="logo"  height="100px" width="320px"/> */}
          <HhaLogo
              classes='logo grid-item'
              style={
                  {'--griditem-alignself': 'center',
                      '--griditem-justifyself': 'center',
                      'width' : '300px',
                  } as CustomCssProps
              }
          />
      </NavLink>
      <div className='navbar-other-button'>
        <NavLink className="toLeadersBoard" to="/leaderboard" exact>
            LeadersBoard
        </NavLink>
        <NavLink className="toMessageBoard" to="/messageboard" exact>
            MessageBoard
        </NavLink>
        <NavLink className="toDepartments" to="/DepartmentMain" exact>
            Departments
        </NavLink>
        <NavLink className="toCaseStudy" to="/caseStudyMain" exact>
            CaseStudy
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar;

// Commented out during Js to Ts for future reference
// import React from 'react';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';

// import { logOutUser } from '../../store/actions/authActions';
// import './home_styles.css';

// const Navbar = ({ auth, logOutUser, history }) => {
//   const onLogOut = (event) => {
//     event.preventDefault();
//     logOutUser(history);
//   };

//   return (
//     <nav className="navbar">
//       <h2 className="logo">MERN Boilerplate</h2>
//       <ul className="nav-links flex-1">
//         <li className="nav-item">
//           <Link to="/">Home</Link>
//         </li>
//         {auth.isAuthenticated ? (
//           <>
//             <li className="nav-item">
//               <Link to="/users">Users</Link>
//             </li>
//             <li className="nav-item">
//               <Link to={`/${auth.me.username}`}>Profile</Link>
//             </li>
//             {auth.me?.role === 'ADMIN' && (
//               <li className="nav-item">
//                 <Link to="/admin">Admin</Link>
//               </li>
//             )}
//             <li className="flex-1" />
//             <img className="avatar" src={auth.me.avatar} />
//             <li className="nav-item" onClick={onLogOut}>
//               <a href="#">Log out</a>
//             </li>
//           </>
//         ) : (
//           <>
//             <li className="flex-1" />

//             <li className="nav-item">
//               <Link to="/login">Login</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
