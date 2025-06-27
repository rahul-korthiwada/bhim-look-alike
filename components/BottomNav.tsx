import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen } from '../types';
import { IconOffers, IconScan, IconHistory, THEME_COLORS } from '../constants';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface NavItemProps {
  icon: React.ReactElement;
  label: string;
  screen: Screen;
  isActive: boolean;
  onClick: (screen: Screen) => void;
  isCentralButton?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, screen, onClick, isCentralButton = false }) => {
  const textColor = isCentralButton ? THEME_COLORS.textPrimary : THEME_COLORS.textSecondary;
  
  if (isCentralButton) {
    return (
      <TouchableOpacity
        onPress={() => onClick(screen)}
        style={styles.centralButton}
        aria-label={label}
      >
        <View style={[styles.centralIconContainer, { backgroundColor: THEME_COLORS.primaryAction }]}>
          {React.cloneElement(icon, { width: 32, height: 32, color: textColor })}
        </View>
        <Text style={[styles.centralLabel, { color: THEME_COLORS.primaryAction }]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => onClick(screen)}
      style={styles.navItem}
      aria-label={label}
    >
      {React.cloneElement(icon, { width: 24, height: 24, color: textColor })}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  return (
    <View style={styles.nav}>
      <NavItem
        icon={IconOffers}
        label="Offers"
        screen={Screen.Offers}
        isActive={currentScreen === Screen.Offers || currentScreen === Screen.Home}
        onClick={onNavigate}
      />
      <NavItem
        icon={IconScan}
        label="Scan"
        screen={Screen.ScanPay}
        isActive={currentScreen === Screen.ScanPay}
        onClick={onNavigate}
        isCentralButton={true}
      />
      <NavItem
        icon={IconHistory}
        label="History"
        screen={Screen.Transactions}
        isActive={currentScreen === Screen.Transactions}
        onClick={onNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: THEME_COLORS.surface,
    borderColor: '#2A2A2C',
    height: 56,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  centralButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -15,
  },
  centralIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  centralLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BottomNav;
