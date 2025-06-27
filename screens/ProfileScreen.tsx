import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { UserProfile, BankAccount } from '../types';
import { THEME_COLORS } from '../constants';
import { IconChevronRight } from '../assets/icons';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onCheckBalance: (account: BankAccount) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProfile, onCheckBalance }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, {backgroundColor: THEME_COLORS.pkAvatarBg}]}>
          <Text style={styles.avatarText}>{userProfile.initials}</Text>
        </View>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.upiId}>{userProfile.upiId}</Text>
        <Text style={styles.phoneNumber}>{userProfile.phoneNumber}</Text>
      </View>

      {/* Linked Accounts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
        {userProfile.linkedAccounts.map(account => (
          <View key={account.id} style={styles.accountItem}>
            <View style={styles.accountDetails}>
              <View style={styles.accountInfo}>
                 {account.bankLogoUrl ? (
                    <Image source={{ uri: account.bankLogoUrl }} style={styles.bankLogo} />
                  ) : (
                    <View style={styles.bankLogoPlaceholder} />
                 )}
                <View>
                  <Text style={styles.bankName}>{account.bankName}</Text>
                  <Text style={styles.accountNumber}>Ac/No: XXXX XXXX XXXX {account.accountNumberLast4}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => onCheckBalance(account)}
                style={styles.checkBalanceButton}
              >
                <Text style={styles.checkBalanceButtonText}>Check Balance</Text>
              </TouchableOpacity>
            </View>
            {account.isPrimary && (
              <Text style={styles.primaryBadge}>Primary Account</Text>
            )}
          </View>
        ))}
         <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Account</Text>
        </TouchableOpacity>
      </View>
      
      {/* Settings Options */}
      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Settings & Preferences</Text>
         <View style={styles.settingsContainer}>
            {['Manage UPI IDs', 'Change Language', 'App Lock', 'Notifications', 'Help & Support'].map(item => (
                 <TouchableOpacity 
                    key={item} 
                    style={styles.settingsItem}
                  >
                    <Text style={styles.settingsItemText}>{item}</Text>
                    <SvgXml xml={IconChevronRight} width={16} height={16} color={THEME_COLORS.textSecondary} />
                 </TouchableOpacity>
            ))}
         </View>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.appVersion}>App Version 2.5.1</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: THEME_COLORS.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
  },
  upiId: {
    fontSize: 14,
    color: THEME_COLORS.textSecondary,
  },
  phoneNumber: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_COLORS.textSecondary,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  accountItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: THEME_COLORS.surfaceLight,
  },
  accountDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 2,
  },
  bankLogoPlaceholder: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: 'gray',
  },
  bankName: {
    fontWeight: '500',
    color: THEME_COLORS.textPrimary,
  },
  accountNumber: {
    fontSize: 14,
    color: THEME_COLORS.textSecondary,
  },
  checkBalanceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.primaryAction,
  },
  checkBalanceButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  primaryBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    color: 'lightgreen',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME_COLORS.primaryAction,
  },
  addButtonText: {
    color: THEME_COLORS.primaryAction,
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsContainer: {
    borderRadius: 8,
    backgroundColor: THEME_COLORS.surfaceLight,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: THEME_COLORS.background,
  },
  settingsItemText: {
    color: THEME_COLORS.textPrimary,
  },
  logoutSection: {
    padding: 16,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  appVersion: {
    marginTop: 16,
    fontSize: 12,
    color: THEME_COLORS.textPlaceholder,
  },
});

export default ProfileScreen;
