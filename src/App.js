import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import Login from './views/auth/login';
import Register from './views/auth/register';
import ForgotPassword from './views/auth/forgotPassword';
import ResetPassword from './views/auth/resetPassword';
import StudentManagement from './views/studentManagement/index';
import Teachers from './views/teachers/index';
import Classrooms from './views/classrooms/index';
import Consultations from './views/consultations/index';
import Consultation from './views/consultation/index';
import TeachersClassrooms from './views/teachersClassrooms/index';
import Test from './views/tests/index';
import SchoolTest from './views/schoolTests/index';
import Attendance from './views/attendance/index';
import Status from './views/status/index';
import Student from './views/student/index';
import Notes from './views/notes/index';
import ReportCard from './views/reportCard/index';
import Forms from './views/formsManagement/index';
import './style/App.scss';

function App() {
    axios.defaults.headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return (
        <Router basename={'/'}>
            <Switch>
                <Route
                    path={`${process.env.PUBLIC_URL}/login`}
                    component={Login}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/forgotPassword`}
                    component={ForgotPassword}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/resetPassword/:token`}
                    component={ResetPassword}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/register`}
                    component={Register}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/studentManagement`}
                    component={StudentManagement}
                />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={StudentManagement}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/teachers`}
                    component={Teachers}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/classrooms`}
                    component={Classrooms}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/teacher/:id`}
                    component={TeachersClassrooms}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/student/:id`}
                    component={Student}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/test/:id`}
                    component={Test}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/schoolTest/:id`}
                    component={SchoolTest}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/attendance/:id`}
                    component={Attendance}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/consultation/classroom=:classroomId,student=:studentId`}
                    component={Consultations}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/status/classroom=:classroomId,student=:studentId`}
                    component={Status}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/notes/classroom=:classroomId,student=:studentId`}
                    component={Notes}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/reportCard/:id,start=:startDate,end=:endDate`}
                    component={ReportCard}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/consultation/:id`}
                    component={Consultation}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/forms`}
                    component={Forms}
                />
                {/*     </>
                )} */}
            </Switch>
        </Router>
    );
}

export default App;
