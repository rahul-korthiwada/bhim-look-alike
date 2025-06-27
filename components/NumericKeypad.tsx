import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { THEME_COLORS } from '../constants';
import { IconBackspace } from '../assets/icons';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  showDot?: boolean;
}

const KeyButton: React.FC<{ value: string; onClick: (value: string) => void; children?: React.ReactNode; isIcon?: boolean;}> = ({ value, onClick, children, isIcon }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(value)}
      style={styles.keyButton}
      aria-label={isIcon ? value : `Number ${value}`}
    >
      {children || <Text style={styles.keyText}>{value}</Text>}
    </TouchableOpacity>
  );
};


const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress, showDot = false }) => {
  const baseKeys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
  ];
  
  const bottomRowKeys = showDot ? ['.', '0', 'backspace'] : [' ', '0', 'backspace'];

  const allKeys = [...baseKeys, ...bottomRowKeys];

  return (
    <View style={styles.keypad}>
      {allKeys.map((key, index) => {
        if (key === 'backspace') {
          return <KeyButton key={index} value={key} onClick={onKeyPress} isIcon><SvgXml xml={IconBackspace} width={24} height={24} color={THEME_COLORS.textPrimary} /></KeyButton>;
        }
        if (key === ' ' && !showDot) {
            return <View key={index} style={styles.keyButton} />;
        }
        return <KeyButton key={index} value={key} onClick={onKeyPress}><Text style={styles.keyText}>{key}</Text></KeyButton>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: THEME_COLORS.keypadBackground,
  },
  keyButton: {
    width: '33.33%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.keypadButtonBackground,
    borderWidth: 0.5,
    borderColor: THEME_COLORS.keypadBackground,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '500',
    color: THEME_COLORS.textPrimary,
  },
});

export default NumericKeypad;
