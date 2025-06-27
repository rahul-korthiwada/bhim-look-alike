import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { THEME_COLORS } from '../constants';
import { IconChevronLeft } from '../assets/icons';

interface ScanPayScreenProps {
    onSimulateScan: () => void;
    onBack: () => void;
}

const ScanPayScreen: React.FC<ScanPayScreenProps> = ({ onSimulateScan, onBack }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <SvgXml xml={IconChevronLeft} width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
      </View>
      
      <View style={styles.content}>
        {/* Mock Scanner Viewfinder */}
        <View style={styles.scannerContainer}>
          <View style={styles.scannerBox} />
          {/* Corner elements */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        <Text style={styles.instructions}>
          Align QR code within the frame to scan.
        </Text>

        <TouchableOpacity
          onPress={onSimulateScan}
          style={styles.simulateButton}
        >
          <Text style={styles.simulateButtonText}>Simulate Scan</Text>
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.action}>
            <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`} width={32} height={32} color="white" />
            <Text style={styles.actionText}>From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
             <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a15.07 15.07 0 01-4.5 0m3.75-10.845a12.06 12.06 0 01-4.5 0m3.75 2.355a15.07 15.07 0 01-4.5 0M9.75 5.25A2.25 2.25 0 007.5 7.5v9.75a2.25 2.25 0 004.5 0V7.5A2.25 2.25 0 009.75 5.25zm0 0H7.5M9.75 5.25c0-1.036.784-1.875 1.75-1.875S13.25 4.214 13.25 5.25v9.75c0 1.036-.784 1.875-1.75 1.875S9.75 16.036 9.75 15m0-9.75v9.75" /></svg>`} width={32} height={32} color="white" />
             <Text style={styles.actionText}>Enter UPI ID</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerContainer: {
    width: 256,
    height: 256,
    marginBottom: 32,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00BFFF',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  instructions: {
    color: 'lightgray',
    textAlign: 'center',
    marginBottom: 24,
  },
  simulateButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.primaryAction,
  },
  simulateButtonText: {
    color: THEME_COLORS.textPrimary,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  action: {
    alignItems: 'center',
  },
  actionText: {
    color: 'lightgray',
    marginTop: 4,
    fontSize: 12,
  },
});

export default ScanPayScreen;
