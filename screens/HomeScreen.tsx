import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { SvgXml } from 'react-native-svg';
import { Screen, ModalType, UserProfile, BankAccount } from '../types';
import HomeActionButton from '../components/HomeActionButton';
import { 
  IconSendToMobile, IconSendToBank, IconUpiCircle, IconBillsRecharges, IconIpoMandate, IconApproveToPay,
  THEME_COLORS 
} from '../constants';
import { IconLink, IconCopy, IconWand } from '../assets/icons';

interface HomeScreenProps {
  onAction: (type: ModalType, account?: BankAccount) => void;
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onAction, onNavigate, userProfile }) => {
  const primaryAccount = userProfile.linkedAccounts.find(acc => acc.isPrimary) || userProfile.linkedAccounts[0];
  const [currentCard, setCurrentCard] = useState(0); // For carousel, if implemented

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("UPI ID copied to clipboard!");
  };

  return (
    <View style={styles.container}>
      {/* Greeting and UPI ID */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hello 👋</Text>
        <View style={styles.upiIdContainer}>
          <SvgXml xml={IconLink} width={16} height={16} color={THEME_COLORS.textSecondary} />
          <Text style={styles.upiIdText} numberOfLines={1} ellipsizeMode="middle">{userProfile.upiId}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(userProfile.upiId)} style={styles.copyButton}>
            <SvgXml xml={IconCopy} width={16} height={16} color={THEME_COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bank Account Card */}
      {primaryAccount && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.bankInfo}>
              {primaryAccount.bankLogoUrl ? (
                <Image source={{ uri: primaryAccount.bankLogoUrl }} style={styles.bankLogo} />
              ) : (
                <View style={styles.bankLogoPlaceholder} />
              )}
              <View style={styles.bankDetails}>
                <View style={styles.bankNameContainer}>
                  <Text style={styles.bankName}>{primaryAccount.bankName}</Text>
                  {primaryAccount.isPrimary && (
                     <View style={styles.defaultBadge}>
                       <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                     </View>
                  )}
                </View>
                <Text style={styles.accountNumber}>XX{primaryAccount.accountNumberLast4.slice(-4)} Bank account</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.carouselDots}>
            {userProfile.linkedAccounts.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentCard(index)}
                style={[styles.dot, index === currentCard ? styles.activeDot : styles.inactiveDot]}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </View>
        </View>
      )}

      {/* Main Action Grid */}
      <View style={styles.actionGrid}>
        <HomeActionButton
          icon={IconSendToMobile}
          label="Send to mobile"
          onClick={() => onNavigate(Screen.SendMoney)}
          badgeText="Upto ₹10"
        />
        <HomeActionButton
          icon={IconSendToBank}
          label="Send to bank/ UPI/Self"
          onClick={() => onNavigate(Screen.SendMoney)}
        />
        <HomeActionButton
          icon={IconUpiCircle}
          label="UPI Circle"
          onClick={() => Alert.alert("UPI Circle clicked")}
        />
        <HomeActionButton
          icon={IconBillsRecharges}
          label="Bills & recharges"
          onClick={() => Alert.alert("Bills & Recharges clicked")}
        />
        <HomeActionButton
          icon={IconIpoMandate}
          label="IPO/Mandate/ Services"
          onClick={() => Alert.alert("IPO/Mandate clicked")}
        />
        <HomeActionButton
          icon={IconApproveToPay}
          label="Approve to Pay"
          onClick={() => onAction(ModalType.RequestMoney)}
        />
      </View>

      {/* Promotion Banner */}
      <View style={styles.promoBanner}>
        <SvgXml xml={IconWand} width={24} height={24} color={THEME_COLORS.textPrimary} />
        <Text style={styles.promoText}>Get ₹30 on Prepaid Mobile Recharge</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  greetingContainer: {
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
  },
  upiIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  upiIdText: {
    flex: 1,
    color: THEME_COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 4,
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: THEME_COLORS.surfaceDarker,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  bankDetails: {
    flex: 1,
  },
  bankNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: THEME_COLORS.textPrimary,
  },
  defaultBadge: {
    marginLeft: 8,
    backgroundColor: 'green',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  accountNumber: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  promoBanner: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.surfaceLight,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  promoText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.textPrimary,
  },
});

export default HomeScreen;
