import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { UserProfile, BankAccount, PaymentFlowData } from '../types';
import { THEME_COLORS } from '../constants';
import { IconChevronLeft, IconSoundOn, IconCheckCircle, IconRadioButtonUnchecked } from '../assets/icons';

interface SelectAccountScreenProps {
  paymentDetails: PaymentFlowData;
  userProfile: UserProfile;
  onPay: (selectedAccount: BankAccount) => void;
  onBack: () => void;
  onCheckBalance: (account: BankAccount) => void;
}

const SelectAccountScreen: React.FC<SelectAccountScreenProps> = ({
  paymentDetails,
  userProfile,
  onPay,
  onBack,
  onCheckBalance
}) => {
  const primaryAccount = userProfile.linkedAccounts.find(acc => acc.isPrimary) || userProfile.linkedAccounts[0];
  const [selectedAccount, setSelectedAccount] = useState<BankAccount>(primaryAccount);

  const handlePay = () => {
    if (selectedAccount) {
      onPay(selectedAccount);
    }
  };
  
  const avatarBg = paymentDetails.recipientAvatarColor || THEME_COLORS.pkAvatarBg;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <SvgXml xml={IconChevronLeft} width={24} height={24} color={THEME_COLORS.textPrimary} />
        </TouchableOpacity>
         <View style={styles.headerRight}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Previous History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.soundButton}>
                <SvgXml xml={IconSoundOn} width={24} height={24} color={THEME_COLORS.textSecondary} />
            </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {/* Recipient and Amount Display */}
        <View style={styles.recipientContainer}>
            <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
                <Text style={styles.avatarText}>{paymentDetails.recipientInitials || '??'}</Text>
            </View>
            <Text style={styles.recipientName}>Paying {paymentDetails.recipientName}</Text>
            <Text style={styles.recipientUpi}>{paymentDetails.recipientUpiId}</Text>
            <Text style={styles.amount}>₹{paymentDetails.amount}</Text>
            {paymentDetails.remarks && <Text style={styles.remarks}>{paymentDetails.remarks}</Text>}
        </View>

        {/* Account Selection */}
        <View style={styles.accountSelectionContainer}>
          <Text style={styles.sectionTitle}>Select account to pay with</Text>
          <Text style={styles.subSectionTitle}>Bank Account</Text>
          
          {userProfile.linkedAccounts.map(account => (
            <TouchableOpacity
              key={account.id}
              onPress={() => setSelectedAccount(account)}
              style={[styles.accountItem, selectedAccount?.id === account.id && styles.selectedAccountItem]}
            >
              <View style={styles.accountInfo}>
                {account.bankLogoUrl ? (
                  <Image source={{ uri: account.bankLogoUrl }} style={styles.bankLogo} />
                ) : (
                  <View style={styles.bankLogoPlaceholder} />
                )}
                <View>
                  <Text style={styles.bankName}>{account.bankName}</Text>
                  <Text style={styles.accountNumber}>
                    XX{account.accountNumberLast4} {account.isPrimary && <Text style={styles.defaultText}>∙ DEFAULT</Text>}
                  </Text>
                   <TouchableOpacity onPress={(e) => { e.stopPropagation(); onCheckBalance(account); }}>
                    <Text style={styles.linkText}>Check Balance</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <SvgXml xml={selectedAccount?.id === account.id ? IconCheckCircle : IconRadioButtonUnchecked} width={24} height={24} color={selectedAccount?.id === account.id ? THEME_COLORS.primaryAction : THEME_COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
            onPress={handlePay}
            style={styles.payButton}
            disabled={!selectedAccount}
        >
            <Text style={styles.payButtonText}>Pay ₹{paymentDetails.amount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.surface,
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: THEME_COLORS.textLink,
    fontSize: 14,
  },
  soundButton: {
    marginLeft: 16,
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  recipientContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
  },
  recipientName: {
    color: THEME_COLORS.textSecondary,
  },
  recipientUpi: {
    color: THEME_COLORS.textSecondary,
    marginBottom: 12,
  },
  amount: {
    fontSize: 36,
    fontWeight: '300',
    color: THEME_COLORS.textPrimary,
  },
  remarks: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surfaceLight,
    color: THEME_COLORS.textSecondary,
    fontSize: 12,
  },
  accountSelectionContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME_COLORS.textSecondary,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME_COLORS.textPrimary,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  accountItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.surfaceDarker,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedAccountItem: {
    borderWidth: 2,
    borderColor: THEME_COLORS.primaryAction,
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
    fontSize: 14,
    color: THEME_COLORS.textPrimary,
  },
  accountNumber: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  defaultText: {
    color: 'green',
    fontWeight: '500',
  },
  payButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.primaryAction,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SelectAccountScreen;
