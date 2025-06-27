import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME_COLORS } from '../constants';

interface HomeActionButtonProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
  badgeText?: string;
}

const HomeActionButton: React.FC<HomeActionButtonProps> = ({ icon, label, onClick, badgeText }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
      aria-label={label}
    >
      {badgeText && (
        <View style={[styles.badge, { backgroundColor: THEME_COLORS.pkAvatarBg }]}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
      <View style={[styles.iconContainer, { backgroundColor: THEME_COLORS.surfaceLight }]}>
        {React.cloneElement(icon, { width: 28, height: 28, color: '#82c9ff' })}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 8,
    width: '33%',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    color: THEME_COLORS.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: THEME_COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 70,
  },
});

export default HomeActionButton;
