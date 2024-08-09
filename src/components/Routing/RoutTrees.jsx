import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Lessons from "../Lessons";
import Activities from "../Activity";
import UserProfile from "../UserProfile";
import Chat from "../Chat";
import Gamification from "../Gamification";
import ProgressDashboard from "../ProgressDashboard";
import Schedule from "../Schedule";
import AdminPanel from "../admin/AdminPanel";
import UserManagement from "../admin/UserManagement";
import ContentManagement from "../admin/ContentManagement";
import ParentDashboard from "../parent/ParentDashboard";
import ChildProgress from "../parent/ChildProgress";
import TeacherDashboard from "../teacher/TeacherDashboard";
import StudentProgress from "../teacher/StudentProgress";
import ManageContent from "../teacher/ManageContent";
import ProgressBar from "../ProgressBar";
import LayoutWrap from "../Layout/LayoutWrap";
import Example from "../Example";
import TeacherPanel from "../admin/TeacherPanel";
import StudentPanel from "../admin/StudentPanel";
import MoreInfoPanel from "../admin/MoreInfoPanel";
import TeacherLayout from "../Layout/TeacherLayout";
import MoreInfoTeacher from "../teacher/MoreInfoTeacher";

function RouteTrees({ setLoggedIn }) {
  return (
    <LayoutWrap setLoggedIn={setLoggedIn}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/progress" element={<ProgressBar />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/admin" exact element={<AdminPanel />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/content" element={<ContentManagement />} />
        <Route path="/parent" exact element={<ParentDashboard />} />
        <Route path="/parent/progress/:childId" element={<ChildProgress />} />
        <Route path="/teacher/student" exact element={<TeacherDashboard />} />
        <Route
          path="/teacher/student/:studentId"
          element={<MoreInfoTeacher />}
        />
        <Route
          path="/teacher/manage-content"
          exact
          element={<ManageContent />}
        />
        {/* <Route path="/teacher/*" exact element={<TeacherDashboard />} /> */}
        {/* <Route path="/teacher/students" element={<TeacherDashboard />} /> */}
        {/* <Route
          path="/teacher/progress/:studentId"
          element={<StudentProgress />}
        /> */}
        {/* <Route path="/teacher/manage-content" element={<ManageContent />} /> */}
        {/* <Route path="/example" element={<Example />} /> */}
        {/* <Route path="/admin/teachers" element={<TeacherPanel />} />
        <Route path="/admin/students" element={<StudentPanel />} /> */}
        <Route path="/admin/users/:userId" element={<MoreInfoPanel />} />
      </Routes>
    </LayoutWrap>
  );
}
export default RouteTrees;
