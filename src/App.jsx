import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path, PUBLIC_BASE_URL } from './config/keys';
import { loadUserData, saveUserData } from './services/storageClient';
import { authService } from './server/services/auth';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import StudentHomePage from './pages/student/HomePage';
import ActivityListPage from './pages/student/ActivityListPage';
import ActivityPlayPage from './pages/student/ActivityPlayPage';
import MyJourneyPage from './pages/student/MyJourneyPage';
import TeacherLoginPage from './pages/teacher/LoginPage';
import ClassroomHomePage from './pages/teacher/ClassroomHomePage';
import ClassroomManagementPage from './pages/teacher/ClassroomManagementPage';
import StudentsManagementPage from './pages/teacher/StudentsManagementPage';
import StudentProfilePage from './pages/teacher/StudentProfilePage';
import ActivityManagementPage from './pages/teacher/ActivityManagementPage';
import ReportPage from './pages/teacher/ReportPage';
import AccessibilitySettingsPage from './pages/teacher/accessibility/AccessibilitySettingsPage';
import AccessibilitySettingsForm from './pages/teacher/accessibility/AccessibilitySettingsForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = authService.getStoredToken();
    if (token) {
      loadUserData(token).then((stored) => {
        if (stored) {
          setUser(stored);
          saveUserData(token, stored);
        }
      });
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setUser(data);
    saveUserData(authService.getStoredToken(), data);
  };

  const handleLogout = () => {
    authService.clearStoredToken();
    setUser(null);
    localStorage.removeItem('linguagemEmJogo_user');
  };

  return (
    <BrowserRouter basename={PUBLIC_BASE_URL}>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path={Path.STUDENT_HOME} element={<StudentHomePage user={user} />} />
        <Route path={Path.STUDENT_ACTIVITIES} element={<ActivityListPage user={user} />} />
        <Route path={Path.STUDENT_ACTIVITY_PLAY} element={<ActivityPlayPage user={user} />} />
        <Route path={Path.STUDENT_JOURNEY} element={<MyJourneyPage user={user} />} />
        <Route
          path={Path.TEACHER_LOGIN}
          element={<TeacherLoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path={Path.TEACHER_DASHBOARD}
          element={
            <ProtectedRoute user={user}>
              <ClassroomHomePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_CLASSROOM_MGMT}
          element={
            <ProtectedRoute user={user}>
              <ClassroomManagementPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_STUDENTS_MGMT}
          element={
            <ProtectedRoute user={user}>
              <StudentsManagementPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_STUDENT_PROFILE}
          element={
            <ProtectedRoute user={user}>
              <StudentProfilePage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_ACTIVITIES_MGMT}
          element={
            <ProtectedRoute user={user}>
              <ActivityManagementPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_REPORTS}
          element={
            <ProtectedRoute user={user}>
              <ReportPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_ACCESSIBILITY}
          element={
            <ProtectedRoute user={user}>
              <AccessibilitySettingsPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.TEACHER_ACCESSIBILITY_FORM}
          element={
            <ProtectedRoute user={user}>
              <AccessibilitySettingsForm user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <StudentHomePage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
