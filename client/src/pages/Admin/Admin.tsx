import React from 'react';

import IProps from 'components/IProps/IProps';

import './styles.css';

interface IAdmin extends IProps {

};

const Admin = (props:IAdmin) => {
  return(
    <div></div>
  );
}

export default Admin;

// Comment out during Js to Ts for future reference
// import React from 'react';
// import { Link } from 'react-router-dom';

// import requireAdmin from 'hoc/requireAdmin';
// import Layout from 'layout/Layout';
// import 'pages/Admin/styles.css';

// type Props = {

// }

// const Admin = ({}: Props) => {
//   return (
//     <Layout>
//       <div className="admin-page">
//         <h1>Admin dashboard</h1>
//         <p>
//           This is the Admin page. Only the Admin can access this page. Return back to{' '}
//           <Link className="bold" to="/">
//             Home
//           </Link>
//         </p>
//       </div>
//     </Layout>
//   );
// };

// export default requireAdmin(Admin);