import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { UserProfile, Contact } from '../types';
import { THEME_COLORS, MOCK_CONTACTS } from '../constants';
import NumericKeypad from '../components/NumericKeypad';
import { IconChevronLeft, IconSearch, IconDotsVertical, IconStar } from '../assets/icons';

interface SendMoneyScreenProps {
  onClose: () => void;
  onProceed: (recipient: Partial<Contact> & {name: string, upiId: string, avatarInitials?: string, avatarColor?: string}) => void;
  userProfile: UserProfile;
}

const SendMoneyScreen: React.FC<SendMoneyScreenProps> = ({ onClose, onProceed, userProfile }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'favourites' | 'contacts'>('favourites');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);

  const handleNumericKeyPress = (key: string) => {
    if (key === 'backspace') {
      setMobileNumber(prev => prev.slice(0, -1));
    } else if (mobileNumber.length < 10 && /^\d$/.test(key)) { 
      setMobileNumber(prev => prev + key);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = contact.name.toLowerCase().includes(lowerSearchTerm) || 
                          contact.upiId.toLowerCase().includes(lowerSearchTerm) ||
                          (contact.phoneNumber && contact.phoneNumber.includes(searchTerm));
    if (activeTab === 'favourites') {
      return contact.isFavorite && matchesSearch;
    }
    return matchesSearch;
  });
  
  const handleContactSelect = (contact: Contact) => {
    onProceed(contact);
  };

  const handlePayToEnteredNumber = () => {
    if (mobileNumber.length > 0 && mobileNumber.length <= 10) {
        onProceed({
            name: `Mobile: ${mobileNumber}`,
            upiId: `${mobileNumber}@upi`,
            phoneNumber: mobileNumber,
            avatarInitials: mobileNumber.substring(0,2),
            avatarColor: THEME_COLORS.surfaceLight
        });
    } else {
        Alert.alert("Please enter a valid mobile number.");
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <SvgXml xml={IconChevronLeft} width={24} height={24} color={THEME_COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter mobile number to send money</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            value={mobileNumber}
            editable={false}
            style={styles.input}
            placeholder=""
            placeholderTextColor={THEME_COLORS.textPlaceholder}
          />
        </View>
        { mobileNumber.length > 0 && mobileNumber.length <= 10 && (
            <TouchableOpacity 
                onPress={handlePayToEnteredNumber}
                style={styles.proceedButton}
            >
                <Text style={styles.proceedButtonText}>Proceed with {mobileNumber}</Text>
            </TouchableOpacity>
        )}


        <TouchableOpacity onPress={() => { setSearchTerm(''); setActiveTab('contacts'); }}>
          <Text style={styles.linkText}>Or choose from your contacts</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity 
            onPress={() => setActiveTab('favourites')}
            style={[styles.tab, activeTab === 'favourites' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'favourites' && styles.activeTabText]}>Favourites</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('contacts')}
            style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>Contacts</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <SvgXml xml={IconSearch} width={20} height={20} color={THEME_COLORS.textPlaceholder} />
          <TextInput
            placeholder="Search by name or number"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
            placeholderTextColor={THEME_COLORS.textPlaceholder}
          />
        </View>

        {/* Contacts List */}
        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
                style={[styles.contactItem, searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? styles.highlightedContact : null]}
                onPress={() => handleContactSelect(item)}
            >
              <View style={styles.contactInfo}>
                <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
                  <Text style={styles.avatarText}>{item.avatarInitials}</Text>
                </View>
                <View>
                  <View style={styles.contactNameContainer}>
                    <Text style={styles.contactName}>{item.name}</Text>
                    {item.isFavorite && activeTab === 'contacts' && <SvgXml xml={IconStar} width={12} height={12} style={{ marginLeft: 6 }} />}
                  </View>
                  <Text style={styles.contactUpi}>{item.upiId}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <SvgXml xml={IconDotsVertical} width={20} height={20} color={THEME_COLORS.textSecondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyListText}>No contacts found.</Text>}
        />
      </View>

      <NumericKeypad onKeyPress={handleNumericKeyPress} />
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
    backgroundColor: THEME_COLORS.surface,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  countryCode: {
    fontSize: 28,
    color: THEME_COLORS.textSecondary,
    marginRight: 8,
  },
  input: {
    fontSize: 28,
    color: THEME_COLORS.textPrimary,
    flex: 1,
    letterSpacing: 2,
  },
  proceedButton: {
    marginTop: 8,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.primaryAction,
  },
  proceedButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: THEME_COLORS.textLink,
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: THEME_COLORS.primaryAction,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: THEME_COLORS.textSecondary,
  },
  activeTabText: {
    color: THEME_COLORS.primaryAction,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.inputBackground,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: THEME_COLORS.textPrimary,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  highlightedContact: {
    backgroundColor: THEME_COLORS.surfaceLight,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contactNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName: {
    fontWeight: '500',
    fontSize: 14,
    color: THEME_COLORS.textPrimary,
  },
  contactUpi: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  moreButton: {
    padding: 4,
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 16,
    color: THEME_COLORS.textSecondary,
  },
});

export default SendMoneyScreen;
