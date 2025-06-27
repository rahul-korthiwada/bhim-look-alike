import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { PaymentFlowData } from '../types';
import { APP_NAME, THEME_COLORS, MOCK_REFERRAL_BANNER_URL } from '../constants';
import { IconLargeCheckVerified, IconShare, IconDownloadArrow } from '../assets/icons';

interface PaymentSuccessScreenProps {
  paymentDetails: PaymentFlowData;
  onSendAgain: () => void;
  onGoHome: () => void;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ paymentDetails, onSendAgain, onGoHome }) => {
  const amountPaid = parseFloat(paymentDetails.amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const transactionTime = (Math.random() * 2 + 0.5).toFixed(2);
  const transactionDate = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <View style={styles.container}>
      {/* Custom Header Text */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{APP_NAME} - Bharat's Own Payments App</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <SvgXml xml={IconLargeCheckVerified} width={80} height={80} />
        <Text style={styles.paidText}><Text style={{color: 'green'}}>₹</Text> Paid</Text>
        <Text style={styles.amount}>₹{amountPaid}</Text>
        <View style={styles.speedBadge}>
          <Text style={styles.speedBadgeText}>⚡ Paid in {transactionTime} Seconds</Text>
        </View>
      </View>
      
      {/* Transaction Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Banking Name</Text>
            <Text style={styles.detailValue}>{paymentDetails.recipientName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>{paymentDetails.transactionAttemptId}</Text>
          </View>
           <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{transactionDate}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <SvgXml xml={IconDownloadArrow} width={20} height={20} color="white" />
            <Text style={styles.actionButtonText}>More details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <SvgXml xml={IconShare} width={20} height={20} color="white" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Referral Banner */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: MOCK_REFERRAL_BANNER_URL }} style={styles.banner} />
        </View>

        {/* Action Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            onPress={onSendAgain}
            style={[styles.bottomButton, { backgroundColor: THEME_COLORS.surfaceLight }]}
          >
            <Text style={[styles.bottomButtonText, { color: THEME_COLORS.textPrimary }]}>Send Again</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onGoHome}
            style={[styles.bottomButton, { backgroundColor: THEME_COLORS.primaryAction }]}
          >
            <Text style={[styles.bottomButtonText, { color: 'black' }]}>Home</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>POWERED BY NPCI</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.successGreenScreen,
  },
  header: {
    padding: 16,
    backgroundColor: '#105020',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paidText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: 'white',
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  speedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: THEME_COLORS.successBannerGreen,
  },
  speedBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: 'gray',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  bannerContainer: {
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  bottomButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default PaymentSuccessScreen;
