import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Modal from './Modal';
import { THEME_COLORS } from '../constants';

interface RequestMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { upiId: string; amount: string; remarks: string }) => void;
}

const RequestMoneyModal: React.FC<RequestMoneyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = () => {
    if (!upiId || !amount) {
        Alert.alert("Payer UPI ID and Amount are required.");
        return;
    }
    onSubmit({ upiId, amount, remarks });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Money">
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Payer UPI ID</Text>
          <TextInput
            value={upiId}
            onChangeText={setUpiId}
            style={styles.input}
            placeholder="name@upi"
            placeholderTextColor={THEME_COLORS.textPlaceholder}
          />
        </View>
        <View>
          <Text style={styles.label}>Amount (₹)</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={THEME_COLORS.textPlaceholder}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Remarks (Optional)</Text>
          <TextInput
            value={remarks}
            onChangeText={setRemarks}
            style={styles.input}
            placeholder="e.g., Shared expenses"
            placeholderTextColor={THEME_COLORS.textPlaceholder}
          />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={onClose}
                style={[styles.button, styles.cancelButton]}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, styles.submitButton]}
            >
                <Text style={styles.submitButtonText}>Request</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.inputBackground,
    borderColor: '#4A4A4C',
    color: THEME_COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: THEME_COLORS.surfaceLight,
  },
  cancelButtonText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: THEME_COLORS.primaryAction,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default RequestMoneyModal;
