import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { PaymentFlowData } from '../types';
import { THEME_COLORS } from '../constants';
import PinKeypad from '../components/PinKeypad';
import { IconDropdownTriangle, IconExclamationCircle, IconUpiLogo } from '../assets/icons';

interface EnterPinScreenProps {
  paymentDetails: PaymentFlowData;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}

const EnterPinScreen: React.FC<EnterPinScreenProps> = ({ paymentDetails, onSubmit, onCancel }) => {
  const [pin, setPin] = useState('');
  const PIN_LENGTH = 6;

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setPin(prev => prev.slice(0, -1));
    } else if (pin.length < PIN_LENGTH && /^\d$/.test(key)) {
      setPin(prev => prev + key);
    }
  };

  const handleSubmit = () => {
    if (pin.length === PIN_LENGTH) {
      onSubmit(pin);
    } else {
        Alert.alert("Please enter a 6-digit PIN.");
    }
  };
  
  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      // handleSubmit(); 
    }
  }, [pin]);


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelButton}>CANCEL</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {/* Payment Summary */}
        <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
                <View>
                    <Text style={styles.bankName}>State Bank Of India</Text>
                    <Text style={styles.accountNumber}>XXXX{paymentDetails.selectedAccount?.accountNumberLast4}</Text>
                </View>
                <SvgXml xml={IconUpiLogo} width={40} height={20} />
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
                <View>
                    <Text style={styles.recipientLabel}>To:</Text>
                    <Text style={styles.recipientName}>{paymentDetails.recipientName}</Text>
                </View>
                 <View style={styles.amountContainer}>
                    <Text style={styles.amount}>₹{parseFloat(paymentDetails.amount || "0").toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
                    <SvgXml xml={IconDropdownTriangle} width={12} height={12} color={THEME_COLORS.textSecondary} />
                </View>
            </View>
             {paymentDetails.remarks && <Text style={styles.remarks}>Note: {paymentDetails.remarks}</Text>}
        </View>
        

        <Text style={styles.pinLabel}>ENTER 6-DIGIT UPI PIN</Text>
        <View style={styles.pinContainer}>
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <View
              key={i}
              style={[styles.pinDot, { borderColor: pin.length > i ? THEME_COLORS.primaryAction : THEME_COLORS.textPlaceholder }]}
            >
              {pin.length > i && <View style={[styles.pinDotFilled, {backgroundColor: THEME_COLORS.primaryAction}]} />}
            </View>
          ))}
        </View>

        {/* Warning Message */}
        <View style={styles.warningContainer}>
            <SvgXml xml={IconExclamationCircle} width={28} height={28} color={THEME_COLORS.warningIcon} />
            <Text style={styles.warningText}>
                You are SENDING <Text style={styles.bold}>₹{parseFloat(paymentDetails.amount || "0").toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text> from your account to <Text style={styles.bold}>{paymentDetails.recipientName}</Text>.
            </Text>
        </View>
      </View>

      <PinKeypad onKeyPress={handleKeyPress} onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.pinInputBackground,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cancelButton: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.textLink,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  summaryContainer: {
    width: '100%',
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bankName: {
    fontSize: 12,
    color: 'gray',
  },
  accountNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.pinInputText,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 12,
  },
  recipientLabel: {
    fontSize: 12,
    color: 'gray',
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.pinInputText,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: THEME_COLORS.pinInputText,
    marginRight: 4,
  },
  remarks: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  pinLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: THEME_COLORS.pinInputText,
  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDotFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  warningContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: THEME_COLORS.warningBackground,
    borderWidth: 1,
    borderColor: THEME_COLORS.warningBorder,
    marginTop: 'auto',
  },
  warningText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 16,
    color: THEME_COLORS.warningText,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default EnterPinScreen;
