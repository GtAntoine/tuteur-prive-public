import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '../components/auth/RequireAuth';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { UpdatePasswordPage } from '../pages/auth/UpdatePasswordPage';
import { ProfilePage } from '../pages/ProfilePage';
import { ProfileEditPage } from '../pages/ProfileEditPage';
import { LandingPage } from '../pages/LandingPage';
import { MainContent } from '../pages/MainContent';
import { LessonPage } from '../pages/LessonPage';
import { GuidedPage } from '../pages/GuidedPage';
import { SettingsPage } from '../pages/SettingsPage';
import { BillingPage } from '../pages/BillingPage';
import { StatsPage } from '../pages/StatsPage';
import { CorrectionPage } from '../pages/CorrectionPage';
import { History } from '../components/History';
import { HistoryDetail } from '../pages/HistoryDetail';
import { SharedHistoryPage } from '../pages/SharedHistoryPage';
import { CommunityPage } from '../components/community/CommunityPage';
import { CGUPage } from '../pages/CGUPage';
import { CGVPage } from '../pages/CGVPage';
import { FAQPage } from '../pages/FAQPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/update-password" element={<UpdatePasswordPage />} />
      <Route path="/shared/:id/:slug?" element={<SharedHistoryPage />} />
      <Route path="/cgu" element={<CGUPage />} />
      <Route path="/cgv" element={<CGVPage />} />
      <Route path="/faq" element={<FAQPage />} />
      
      {/* Protected routes */}
      <Route path="/app" element={
        <RequireAuth>
          <MainContent />
        </RequireAuth>
      } />
      <Route path="/lesson" element={
        <RequireAuth>
          <LessonPage />
        </RequireAuth>
      } />
      <Route path="/guided" element={
        <RequireAuth>
          <GuidedPage />
        </RequireAuth>
      } />
      <Route path="/correction" element={
        <RequireAuth>
          <CorrectionPage />
        </RequireAuth>
      } />
      <Route path="/community" element={
        <RequireAuth>
          <CommunityPage />
        </RequireAuth>
      } />
      <Route path="/settings" element={
        <RequireAuth>
          <SettingsPage />
        </RequireAuth>
      } />
      <Route path="/settings/billing" element={
        <RequireAuth>
          <BillingPage />
        </RequireAuth>
      } />
      <Route path="/stats" element={
        <RequireAuth>
          <StatsPage />
        </RequireAuth>
      } />
      <Route path="/history" element={
        <RequireAuth>
          <History />
        </RequireAuth>
      } />
      <Route path="/history/:id/:slug?" element={
        <RequireAuth>
          <HistoryDetail />
        </RequireAuth>
      } />

      {/* Profile routes */}
      <Route path="/profiles" element={
        <RequireAuth>
          <ProfilePage />
        </RequireAuth>
      } />
      <Route path="/profile/edit" element={
        <RequireAuth>
          <ProfileEditPage />
        </RequireAuth>
      } />
    </Routes>
  );
}