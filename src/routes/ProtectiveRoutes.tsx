// ProtectedRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GamePage from './../containers/GamePage'
import MenuPage from './../containers/MenuPage';
import ProfilePage from './../containers/ProfilePage';
import StatsPage from './../containers/StatsPage';
import HowToPlayPage from './../containers/HowToPlayPage';
import LeaderBoardPage from './../containers/LeaderboardPage';
import ProtectedRoute from './ProtectiveRoute';
import SettingsPage from '../containers/SettingsPage';

const ProtectedRoutes: React.FC = () => (
  <Routes>
    <Route path="play" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
    <Route path="menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
    <Route path="menu/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="menu/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
    <Route path="menu/how-to-play" element={<ProtectedRoute><HowToPlayPage /></ProtectedRoute>} />
    <Route path="menu/leaderboards" element={<ProtectedRoute><LeaderBoardPage /></ProtectedRoute>} />
    <Route path="menu/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
  </Routes>
);

export default ProtectedRoutes;
