import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Usepage from './Usepage';
import StaffPage from './StaffPage'; // Make sure to create this component
import AdminPage from './AdminPage'; // Make sure to create this component
import AUpdateDeleteServices from './AUpdateDeleteServices';
import AUpdateApplicationStatus from './AUpdateApplicationStatus';
import StaffUpdateApplicationStatus from './Staffupdateservices';
import StaffViewServices from './Staffviewservices';
import UApplyServices from './Uapplyservices';
import UMyAppliedServicesStatus from './Umyappliedservicesstatus';
import UMyProfile from './Umyprofile';
import Usersearchservices from './Usearchservices';
import Navbar from './Navbar';
import Footer from './Footer';
import Header from './Header';
import StaffUpdateServices from './Staffupdateservices';

const App = () => {
  return (
    <>
    <Router>
      <div className='admin-page'>
        <Header />
        <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Usepage/>} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/Aupdate-delete-services" element={<AUpdateDeleteServices/>} />
          <Route path="/Aupdate-application-status" element={<AUpdateApplicationStatus/>} />
          <Route path="/staff-update-services" element={<StaffUpdateServices/>} />
          <Route path="/staff-view-services" element={<StaffViewServices/>} />
          <Route path="/apply-services" element={<UApplyServices/>} />
          <Route path="/application-status" element={<UMyAppliedServicesStatus/>} />
          <Route path="/search-services" element={<Usersearchservices/>} />
          <Route path="/my-profile" element={<UMyProfile/>} />
          <Route path="/navbar" element={<Navbar/>}></Route>
          {/* Add other routes as necessary */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  
    </>
  );
};

export default App;
