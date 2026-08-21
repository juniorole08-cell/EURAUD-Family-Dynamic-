// Authentication Service with Demo Mode
// In production, this would connect to a real auth provider

const DEMO_USERS = {
  '6USA1PPUFT39AYBF': {
    id: '6USA1PPUFT39AYBF',
    email: 'demo@euraud.local',
    name: 'Demo Trader',
    role: 'user',
    createdAt: new Date('2026-08-01'),
  },
};

let currentUser = null;

export const authService = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return currentUser !== null;
  },

  // Get current user
  getCurrentUser: () => {
    return currentUser;
  },

  // Demo login
  loginDemo: (userId = '6USA1PPUFT39AYBF') => {
    try {
      if (DEMO_USERS[userId]) {
        currentUser = {
          ...DEMO_USERS[userId],
          loginTime: new Date(),
        };
        localStorage.setItem('euraud_current_user', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
      }
      return { success: false, error: 'User not found' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Logout
  logout: () => {
    try {
      currentUser = null;
      localStorage.removeItem('euraud_current_user');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Restore session from localStorage
  restoreSession: () => {
    try {
      const saved = localStorage.getItem('euraud_current_user');
      if (saved) {
        currentUser = JSON.parse(saved);
        return { success: true, user: currentUser };
      }
      return { success: false, error: 'No saved session' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // Create demo account (for first-time users)
  createDemoAccount: (email = null) => {
    try {
      const user = {
        id: '6USA1PPUFT39AYBF',
        email: email || 'demo@euraud.local',
        name: 'Demo Trader',
        role: 'user',
        createdAt: new Date(),
        loginTime: new Date(),
      };
      currentUser = user;
      localStorage.setItem('euraud_current_user', JSON.stringify(user));
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },
};