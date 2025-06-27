import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { THEME_COLORS } from '../constants';
import { IconBackspace } from '../assets/icons';

interface PinKeypadProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

const PinKeyButton: React.FC<{ 
    value: string; 
    onClick: () => void; 
    children?: React.ReactNode; 
    isIcon?: boolean;
    isSubmit?: boolean;
}> = ({ value, onClick, children, isIcon, isSubmit }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.keyButton, isSubmit && styles.submitButton]}
      aria-label={isIcon ? value : (isSubmit ? 'Submit PIN' : `Number ${value}`)}
    >
      {children || <Text style={[styles.keyText, isSubmit && styles.submitButtonText]}>{value}</Text>}
    </TouchableOpacity>
  );
};

const PinKeypad: React.FC<PinKeypadProps> = ({ onKeyPress, onSubmit }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'backspace', '0', 'submit'
  ];

  return (
    <View style={styles.keypad}>
      {keys.map(key => {
        if (key === 'backspace') {
          return <PinKeyButton key={key} value={key} onClick={() => onKeyPress(key)} isIcon><SvgXml xml={IconBackspace} width={24} height={24} color={THEME_COLORS.pinInputText} /></PinKeyButton>;
        }
        if (key === 'submit') {
          return <PinKeyButton key={key} value={key} onClick={onSubmit} isSubmit><Text style={styles.submitButtonText}>SUBMIT</Text></PinKeyButton>;
        }
        return <PinKeyButton key={key} value={key} onClick={() => onKeyPress(key)}><Text style={styles.keyText}>{key}</Text></PinKeyButton>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#D1D5DB',
  },
  keyButton: {
    width: '33.33%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.pinInputBackground,
    borderWidth: 0.5,
    borderColor: '#D1D5DB',
  },
  keyText: {
    fontSize: 20,
    fontWeight: '500',
    color: THEME_COLORS.pinInputText,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  submitButtonText: {
    color: THEME_COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PinKeypad;
