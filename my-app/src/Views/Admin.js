import React from 'react';
import User from '../Components/Users/User';
import AdminUsers from '../Components/Users/AdminUsers';
import Viewer from '../Components/Users/Viewer';
import BasOperator from '../Components/Users/BasOperator';
const Admin = () => {

  return (
    <section className="adminbar">
      <AdminUsers/>
      <Viewer/>
      <BasOperator/>
      <User/>
    </section>
  );
};

export default Admin;
