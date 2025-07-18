import React, { useState } from 'react';
import { Save, User, Bell, Shield, Palette, Globe, Mail } from 'lucide-react';

const Settings = ({ toast, isDarkMode, toggleDarkMode, user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    bio: 'Ecommerce manager with 5+ years of experience.',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    marketingEmails: false,
    weeklyReports: true,
    
    // Security settings
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Appearance settings
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    currency: 'INR'
  });

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (section) => {
    toast.success('Settings Saved', `${section} settings have been updated successfully.`);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">
            {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h3>
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>
        <div className="form-group" style={{gridColumn: 'span 2'}}>
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-input"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
          />
        </div>
        <div className="form-group" style={{gridColumn: 'span 2'}}>
          <label className="form-label">Bio</label>
          <textarea
            className="form-textarea"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => handleSave('Profile')}
      >
        <Save size={16} />
        Save Profile
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-gray-600">Receive push notifications in browser</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.pushNotifications}
              onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Order Updates</h4>
            <p className="text-sm text-gray-600">Get notified about order status changes</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.orderUpdates}
              onChange={(e) => handleInputChange('orderUpdates', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Marketing Emails</h4>
            <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.marketingEmails}
              onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Weekly Reports</h4>
            <p className="text-sm text-gray-600">Receive weekly analytics reports</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.weeklyReports}
              onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => handleSave('Notification')}
      >
        <Save size={16} />
        Save Notifications
      </button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.twoFactorAuth}
              onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Login Alerts</h4>
            <p className="text-sm text-gray-600">Get notified of new login attempts</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={formData.loginAlerts}
              onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Change Password</h4>
          <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
          <button className="btn btn-secondary">
            Change Password
          </button>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => handleSave('Security')}
      >
        <Save size={16} />
        Save Security Settings
      </button>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-600">Switch between light and dark themes</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Language</h4>
          <select
            className="form-select"
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Timezone</h4>
          <select
            className="form-select"
            value={formData.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
          >
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-7">Mountain Time (UTC-7)</option>
            <option value="UTC-6">Central Time (UTC-6)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
          </select>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={() => handleSave('Appearance')}
      >
        <Save size={16} />
        Save Appearance
      </button>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Preferences</h3>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Date Format</h4>
          <select
            className="form-select"
            value={formData.dateFormat}
            onChange={(e) => handleInputChange('dateFormat', e.target.value)}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Currency</h4>
          <select
            className="form-select"
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => handleSave('Preferences')}
        >
          <Save size={16} />
          Save Preferences
        </button>
        <button className="btn btn-secondary btn-lg">
          Reset to Default
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'preferences':
        return renderPreferencesSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="settings">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="card">
          <nav className="space-y-2">
            {settingSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="col-span-3">
          <div className="card">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;