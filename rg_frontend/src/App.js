import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import LoginPage from './components/LoginPage';
import DomainTitleForm from './components/DomainTitleForm';
import ViewProfile from './components/ViewProfile';
import Members from './components/Members';
import FacultyCoordinator from './components/FacultyCoordinator'; 
import StudentCoordinator from './components/StudentCoordinator'; 
import Submissions from './components/Submissions';
import Member from './components/Members';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/domain-title" element={<DomainTitleForm />} />
        <Route path="/login/profile" element={<ViewProfile />} />
        <Route path="/current_members" element={<Members />} />
        <Route path="/faculty-coordinators" element={<FacultyCoordinator />} /> 
        <Route path="/student-coordinators" element={<StudentCoordinator />} />
        <Route path="/members" component={Member} />
        <Route path="/submissions/:memberName" element={<Submissions />} />
      </Routes>
    </Router>
  );
};

export default App;
