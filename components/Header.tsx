import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen, UserProfile } from '../types';
import { IconNotificationBell, THEME_COLORS } from '../constants';

interface HeaderProps {
  userProfile: UserProfile;
  onNavigate: (screen: Screen) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate }) => {
  
  return (
    <View style={styles.header}>
      {/* PK Avatar */}
      <TouchableOpacity 
        onPress={() => onNavigate(Screen.Home)}
        style={[styles.avatarButton, { backgroundColor: THEME_COLORS.pkAvatarBg }]}
        aria-label="Go to Home"
      >
        <Text style={[styles.avatarText, { color: THEME_COLORS.textPrimary }]}>{userProfile.initials}</Text>
      </TouchableOpacity>

      {/* Placeholder for potential title or empty space */}
      <View style={styles.titleContainer}>
        {/* Optional: Add a title here if needed in the future */}
      </View>

      {/* Notification Bell */}
      <TouchableOpacity style={styles.notificationButton} aria-label="Notifications">
        <View style={styles.notificationIcon}>
          {IconNotificationBell}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME_COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
});

export default Header;
