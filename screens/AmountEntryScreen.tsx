import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { THEME_COLORS } from '../constants';
import NumericKeypad from '../components/NumericKeypad';
import { IconChevronLeft, IconStar, IconSoundOn } from '../assets/icons';

interface AmountEntryScreenProps {
  recipientName: string;
  recipientUpiId: string;
  recipientInitials: string;
  recipientAvatarColor?: string;
  prefilledAmount?: string;
  onNext: (amount: string, remarks?: string) => void;
  onBack: () => void;
}

const AmountEntryScreen: React.FC<AmountEntryScreenProps> = ({
  recipientName,
  recipientUpiId,
  recipientInitials,
  recipientAvatarColor = THEME_COLORS.pkAvatarBg,
  prefilledAmount,
  onNext,
  onBack,
}) => {
  const [amount, setAmount] = useState(prefilledAmount || '');
  const [remarks, setRemarks] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (prefilledAmount) {
        setAmount(prefilledAmount);
    }
  }, [prefilledAmount]);

  const handleNumericKeyPress = (key: string) => {
    if (key === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.' && !amount.includes('.')) {
      setAmount(prev => prev + key);
    } else if (/\d/.test(key)) {
      const parts = amount.split('.');
      if (parts.length === 2 && parts[1].length >= 2) {
        return; 
      }
      if (parts[0].length >= 7 && !amount.includes('.')) {
          return;
      }
      setAmount(prev => prev + key);
    }
  };

  const handleNext = () => {
    if (parseFloat(amount) > 0) {
      onNext(amount, remarks);
    } else {
      Alert.alert("Please enter a valid amount.");
    }
  };

  const displayAmount = amount ? `₹${amount}` : "₹0.0";
  const avatarBg = recipientAvatarColor || THEME_COLORS.pkAvatarBg;

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
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
            <Text style={styles.avatarText}>{recipientInitials}</Text>
        </View>
        <Text style={styles.recipientName}>Paying {recipientName}</Text>
        <Text style={styles.recipientUpi}>{recipientUpiId}</Text>

        <Text style={[styles.amountDisplay, {color: amount ? THEME_COLORS.textPrimary : THEME_COLORS.textPlaceholder}]}>
            {displayAmount}
        </Text>

        <TextInput
          value={remarks}
          onChangeText={setRemarks}
          placeholder="What is this for?"
          style={styles.remarksInput}
          placeholderTextColor={THEME_COLORS.textPlaceholder}
        />
        
        <TouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)} 
            style={styles.favoriteButton}
        >
            <SvgXml xml={IconStar} width={20} height={20} color={isFavorite ? THEME_COLORS.primaryAction : THEME_COLORS.textSecondary} fill={isFavorite ? THEME_COLORS.primaryAction : 'none'} />
            <Text style={[styles.favoriteText, {color: isFavorite ? THEME_COLORS.primaryAction : THEME_COLORS.textSecondary}]}>Add to favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={handleNext}
            style={[styles.nextButton, { backgroundColor: parseFloat(amount) > 0 ? THEME_COLORS.primaryAction : THEME_COLORS.surfaceLight }]}
            disabled={!(parseFloat(amount) > 0)}
        >
            <Text style={[styles.nextButtonText, { color: parseFloat(amount) > 0 ? 'black' : THEME_COLORS.textPlaceholder }]}>Next</Text>
        </TouchableOpacity>
      </View>

      <NumericKeypad onKeyPress={handleNumericKeyPress} showDot={true} />
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
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 16,
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
    marginBottom: 24,
  },
  amountDisplay: {
    fontSize: 48,
    fontWeight: '300',
    marginVertical: 16,
    minHeight: 72,
  },
  remarksInput: {
    width: '80%',
    padding: 12,
    marginVertical: 16,
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: THEME_COLORS.inputBackground,
    color: THEME_COLORS.textPrimary,
    borderColor: THEME_COLORS.inputBorderLight,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginVertical: 16,
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 14,
  },
  nextButton: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AmountEntryScreen;
