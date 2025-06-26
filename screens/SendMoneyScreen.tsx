import React, { useState, useEffect } from 'react';
import { UserProfile, Contact } from '../types';
import { THEME_COLORS, IconChevronLeft, IconSearch, IconDotsVertical, IconStar, MOCK_CONTACTS } from '../constants';
import NumericKeypad from '../components/NumericKeypad';

interface SendMoneyScreenProps {
  onClose: () => void;
  // onSubmit: (data: { recipientId: string; amount: string; remarks?: string }) => void; // Old onSubmit
  onProceed: (recipient: Partial<Contact> & {name: string, upiId: string, avatarInitials?: string, avatarColor?: string}) => void; // New proceed handler
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

  useEffect(() => {
    // If mobile number is 10 digits, consider it for proceeding
    if (mobileNumber.length === 10) {
        // Check if this number exists in contacts
        const existingContact = contacts.find(c => c.phoneNumber === mobileNumber || c.upiId.startsWith(mobileNumber + '@'));
        if (existingContact) {
            // Delay slightly to allow user to see the number, then proceed
            // setTimeout(() => onProceed(existingContact), 200); 
            // For now, let's not auto-proceed. User must click or we'll add a "Next" button for direct number entry.
            // For this iteration, clicking a contact or a new "Pay to this number" button (if added) will proceed.
        } else {
            // Number not in contacts. Could enable a "Pay to this number" button.
            // For now, onProceed will be triggered by contact click.
            // Or, we can create a temporary contact object.
            // Let's assume for now, direct number entry will need explicit action.
        }
    }
  }, [mobileNumber, contacts, onProceed]);


  const filteredContacts = contacts.filter(contact => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = contact.name.toLowerCase().includes(lowerSearchTerm) || 
                          contact.upiId.toLowerCase().includes(lowerSearchTerm) ||
                          (contact.phoneNumber && contact.phoneNumber.includes(searchTerm)); // searchTerm for phone can be direct
    if (activeTab === 'favourites') {
      return contact.isFavorite && matchesSearch;
    }
    return matchesSearch;
  });
  
  const handleContactSelect = (contact: Contact) => {
    onProceed(contact);
  };

  const handlePayToEnteredNumber = () => {
    if (mobileNumber.length > 0 && mobileNumber.length <= 10) { // Basic validation
        onProceed({
            name: `Mobile: ${mobileNumber}`, // Generic name for display
            upiId: `${mobileNumber}@upi`, // Assume a default UPI format
            phoneNumber: mobileNumber,
            avatarInitials: mobileNumber.substring(0,2),
            avatarColor: THEME_COLORS.surfaceLight // A generic color
        });
    } else {
        alert("Please enter a valid mobile number.");
    }
  };


  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: THEME_COLORS.background, color: THEME_COLORS.textPrimary }}>
      {/* Header */}
      <div className="p-3 flex items-center sticky top-0 z-10" style={{ backgroundColor: THEME_COLORS.surface }}>
        <button onClick={onClose} className="p-2 mr-2" aria-label="Go back">
          {IconChevronLeft}
        </button>
        {/* Title removed to match screenshot more closely, as it's implicitly part of the content */}
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-1">Enter mobile number to send money</h1>
        
        <div className="flex items-baseline mb-1">
          <span className="text-3xl mr-2" style={{color: THEME_COLORS.textSecondary}}>+91</span>
          <input
            type="text"
            value={mobileNumber}
            readOnly 
            className="text-3xl bg-transparent border-none focus:outline-none p-0 flex-grow tracking-wider"
            placeholder="" 
            style={{ caretColor: THEME_COLORS.primaryAction, letterSpacing: mobileNumber.length > 0 ? '0.1em' : 'normal' }}
          />
        </div>
        { mobileNumber.length > 0 && mobileNumber.length <= 10 && (
            <button 
                onClick={handlePayToEnteredNumber}
                className="w-full mt-2 mb-3 py-2.5 rounded-md text-sm font-semibold"
                style={{backgroundColor: THEME_COLORS.primaryAction, color: 'black'}}
            >
                Proceed with {mobileNumber}
            </button>
        )}


        <p className="text-sm text-center my-3" style={{ color: THEME_COLORS.textLink, cursor: 'pointer' }} onClick={() => { setSearchTerm(''); setActiveTab('contacts'); }}>
          Or choose from your contacts
        </p>

        {/* Tabs */}
        <div className="flex mb-4">
          <button 
            onClick={() => setActiveTab('favourites')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 ${activeTab === 'favourites' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            style={activeTab === 'favourites' ? {borderColor: THEME_COLORS.primaryAction, color: THEME_COLORS.primaryAction} : {color: THEME_COLORS.textSecondary}}
          >
            Favourites
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-2 text-sm font-medium border-b-2 ${activeTab === 'contacts' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
             style={activeTab === 'contacts' ? {borderColor: THEME_COLORS.primaryAction, color: THEME_COLORS.primaryAction} : {color: THEME_COLORS.textSecondary}}
          >
            Contacts
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center p-3 rounded-lg mb-4" style={{ backgroundColor: THEME_COLORS.inputBackground }}>
          {React.cloneElement(IconSearch, { style: { color: THEME_COLORS.textPlaceholder }})}
          <input
            type="text"
            placeholder="Search by name or number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:outline-none flex-grow ml-2 text-sm"
            style={{ color: THEME_COLORS.textPrimary, caretColor: THEME_COLORS.primaryAction }}
          />
        </div>

        {/* Contacts List */}
        <div className="space-y-1">
          {filteredContacts.map(contact => (
            <div 
                key={contact.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:opacity-80 cursor-pointer transition-colors duration-150" 
                style={{backgroundColor: searchTerm && contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ? THEME_COLORS.surfaceLight : 'transparent' }}
                onClick={() => handleContactSelect(contact)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleContactSelect(contact)}
            >
              <div className="flex items-center">
                <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 font-semibold text-white ${contact.avatarColor}`}
                >
                  {contact.avatarInitials}
                </div>
                <div>
                  <p className="font-medium text-sm flex items-center">
                    {contact.name}
                    {contact.isFavorite && activeTab === 'contacts' && <IconStar className="ml-1.5 w-3 h-3" />}
                  </p>
                  <p className="text-xs" style={{ color: THEME_COLORS.textSecondary }}>{contact.upiId}</p>
                </div>
              </div>
              <button className="p-1 text-gray-500 hover:text-gray-300" style={{ color: THEME_COLORS.textSecondary }} aria-label="More options">
                {IconDotsVertical}
              </button>
            </div>
          ))}
          {filteredContacts.length === 0 && (
            <p className="text-center text-sm py-4" style={{ color: THEME_COLORS.textSecondary }}>
              No contacts found.
            </p>
          )}
        </div>
      </div>

      <NumericKeypad onKeyPress={handleNumericKeyPress} />
    </div>
  );
};

export default SendMoneyScreen;
