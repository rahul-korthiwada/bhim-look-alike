
import React, { useState, useCallback } from 'react';
import { Screen, ModalType, UserProfile, BankAccount, PaymentFlowData, Contact } from './types';
import { MOCK_USER_PROFILE, THEME_COLORS, APP_NAME } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScanPayScreen from './screens/ScanPayScreen';
import SendMoneyScreen from './screens/SendMoneyScreen';
import AmountEntryScreen from './screens/AmountEntryScreen';
import SelectAccountScreen from './screens/SelectAccountScreen';
import EnterPinScreen from './screens/EnterPinScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import PaymentFailureScreen from './screens/PaymentFailureScreen';
import RequestMoneyModal from './components/RequestMoneyModal';
import CheckBalanceModal from './components/CheckBalanceModal';
import NotificationModal from './components/NotificationModal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.None);
  const [notification, setNotification] = useState<{ title: string, message: string } | null>(null);
  const [selectedAccountForBalance, setSelectedAccountForBalance] = useState<BankAccount | null>(null);
  const [paymentFlowData, setPaymentFlowData] = useState<PaymentFlowData | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);


  const userProfile: UserProfile = MOCK_USER_PROFILE;

  const handleNavigation = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const resetPaymentFlowAndNavigateHome = useCallback(() => {
    setPaymentFlowData(null);
    setIsProcessingPayment(false);
    handleNavigation(Screen.Home);
  }, [handleNavigation]);

  const showSimpleNotification = useCallback((title: string, message: string) => {
    setNotification({ title, message });
    setActiveModal(ModalType.Notification);
  }, []);


  const openModal = useCallback((modalType: ModalType, account?: BankAccount) => {
    if (modalType === ModalType.CheckBalance && account) {
      setSelectedAccountForBalance(account);
    }
    setActiveModal(modalType);
  }, []);

  const closeModal = useCallback(() => {
    const wasNotification = activeModal === ModalType.Notification;
    setActiveModal(ModalType.None);
    setSelectedAccountForBalance(null);
    if (notification && wasNotification) { 
        setNotification(null);
        // Special handling for post-payment notifications is removed as we navigate to dedicated screens.
    }
  }, [notification, activeModal]);


  // Payment Flow Handlers
  const handleProceedToAmountEntry = useCallback((recipient: Partial<Contact> & {name: string, upiId: string, avatarInitials?: string, avatarColor?: string}) => {
    setPaymentFlowData({ 
        recipientName: recipient.name, 
        recipientUpiId: recipient.upiId,
        recipientInitials: recipient.avatarInitials || recipient.name.substring(0,2).toUpperCase(),
        recipientAvatarColor: recipient.avatarColor || THEME_COLORS.pkAvatarBg 
    });
    handleNavigation(Screen.AmountEntry);
  }, [handleNavigation]);

  const handleProceedToSelectAccount = useCallback((amount: string, remarks?: string) => {
    setPaymentFlowData(prev => prev ? ({ ...prev, amount, remarks }) : null);
    handleNavigation(Screen.SelectAccount);
  }, [handleNavigation]);

  const handleProceedToPinEntry = useCallback((selectedAccount: BankAccount) => {
    setPaymentFlowData(prev => prev ? ({ ...prev, selectedAccount }) : null);
    handleNavigation(Screen.EnterPin);
  }, [handleNavigation]);

  const handleConfirmPayment = useCallback(async (pin: string) => {
    if (!paymentFlowData || !paymentFlowData.selectedAccount || isProcessingPayment) return;

    setIsProcessingPayment(true);
    const updatedPaymentData = { ...paymentFlowData, pin, transactionAttemptId: `BHIM${Date.now()}` };
    setPaymentFlowData(updatedPaymentData);

    const apiPayload = {
        pan: "179d46ed-a85d-47de-9958-ca89c5f0937e", // Hardcoded
        aadhar: "123412341234", // Hardcoded
        email: userProfile.email || "user@example.com", // From profile or hardcoded
        MOBILENO: userProfile.phoneNumber.replace(/\D/g, ''), // Ensure only digits
        ACCOUNTNUMBER: updatedPaymentData.selectedAccount.fullAccountNumber || "455909610144", // From selected account or hardcoded
        CARDNUMBER: "309944" // Hardcoded
    };

    try {
        const response = await fetch('http://localhost:8080/check_fraud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiPayload)
        });

        if (response.ok) { // Assuming 2xx status means success (no fraud)
            setPaymentFlowData(prev => prev ? ({ ...prev, paymentStatus: 'success' }) : null);
            handleNavigation(Screen.PaymentSuccess);
        } else {
            // Any non-2xx response from API is treated as failure/fraud for this simulation
            setPaymentFlowData(prev => prev ? ({ ...prev, paymentStatus: 'failed', failureReason: "Blocked due to security reasons." }) : null);
            handleNavigation(Screen.PaymentFailure);
        }
    } catch (error) {
        console.error("API call failed:", error);
        setPaymentFlowData(prev => prev ? ({ ...prev, paymentStatus: 'failed', failureReason: "Payment failed due to a network error. Please try again." }) : null);
        handleNavigation(Screen.PaymentFailure);
    } finally {
       //setIsProcessingPayment(false); // Processing ends when navigating to success/failure screen, reset via explicit actions like retry/home.
    }
  }, [paymentFlowData, userProfile, handleNavigation, isProcessingPayment]);


  const renderScreen = () => {
    if (isProcessingPayment && currentScreen === Screen.EnterPin) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white p-4" style={{ backgroundColor: THEME_COLORS.pinInputBackground }}>
                <div 
                  className="animate-spin rounded-full h-12 w-12 border-b-2"
                  style={{ borderColor: THEME_COLORS.primaryAction }}
                ></div>
                <p className="mt-4 text-lg" style={{color: THEME_COLORS.pinInputText}}>Processing Payment...</p>
            </div>
        );
    }
    
    switch (currentScreen) {
      case Screen.Home:
        return <HomeScreen onAction={openModal} onNavigate={handleNavigation} userProfile={userProfile} />;
      case Screen.Transactions:
        return <TransactionsScreen />;
      case Screen.Profile:
        return <ProfileScreen userProfile={userProfile} onCheckBalance={(acc) => openModal(ModalType.CheckBalance, acc)} />;
      case Screen.ScanPay:
        return <ScanPayScreen 
                    onSimulateScan={() => {
                         setPaymentFlowData({ 
                            recipientName: "Scanned Merchant", 
                            recipientUpiId: "merchant@scannerupi",
                            recipientInitials: "SM",
                            recipientAvatarColor: THEME_COLORS.primaryAction,
                            amount: "150" 
                        });
                        handleNavigation(Screen.AmountEntry);
                    }} 
                    onBack={() => handleNavigation(Screen.Home)} 
                />;
      case Screen.SendMoney:
        return <SendMoneyScreen 
                  onClose={() => handleNavigation(Screen.Home)} 
                  onProceed={handleProceedToAmountEntry}
                  userProfile={userProfile} 
                />;
      case Screen.AmountEntry:
        if (!paymentFlowData || !paymentFlowData.recipientName) return <SendMoneyScreen onClose={() => handleNavigation(Screen.Home)} onProceed={handleProceedToAmountEntry} userProfile={userProfile} />; // Fallback
        return <AmountEntryScreen
                  recipientName={paymentFlowData.recipientName}
                  recipientUpiId={paymentFlowData.recipientUpiId || ''}
                  recipientInitials={paymentFlowData.recipientInitials || '??'}
                  recipientAvatarColor={paymentFlowData.recipientAvatarColor}
                  prefilledAmount={paymentFlowData.amount}
                  onNext={handleProceedToSelectAccount}
                  onBack={() => handleNavigation(Screen.SendMoney)}
                />;
      case Screen.SelectAccount:
        if (!paymentFlowData || !paymentFlowData.amount) return <AmountEntryScreen recipientName="Error" recipientUpiId="" recipientInitials="ER" onNext={() => {}} onBack={() => handleNavigation(Screen.Home)} />; // Fallback
        return <SelectAccountScreen
                  paymentDetails={paymentFlowData}
                  userProfile={userProfile}
                  onPay={handleProceedToPinEntry}
                  onBack={() => handleNavigation(Screen.AmountEntry)}
                  onCheckBalance={(acc) => openModal(ModalType.CheckBalance, acc)}
                />;
      case Screen.EnterPin:
        if (!paymentFlowData || !paymentFlowData.selectedAccount) return <SelectAccountScreen paymentDetails={{}} userProfile={userProfile} onPay={() => {}} onBack={() => handleNavigation(Screen.Home)} onCheckBalance={() => {}}/>; // Fallback
        return <EnterPinScreen
                  paymentDetails={paymentFlowData}
                  onSubmit={handleConfirmPayment}
                  onCancel={resetPaymentFlowAndNavigateHome}
                />;
      case Screen.PaymentSuccess:
        if (!paymentFlowData) return <HomeScreen onAction={openModal} onNavigate={handleNavigation} userProfile={userProfile} />;
        return <PaymentSuccessScreen 
                  paymentDetails={paymentFlowData}
                  onSendAgain={() => {
                    setIsProcessingPayment(false); // Reset processing flag
                    const recipient = paymentFlowData.recipientContact || {
                        name: paymentFlowData.recipientName || 'Unknown',
                        upiId: paymentFlowData.recipientUpiId || '',
                        avatarInitials: paymentFlowData.recipientInitials,
                        avatarColor: paymentFlowData.recipientAvatarColor,
                    };
                    handleProceedToAmountEntry(recipient as any); 
                  }}
                  onGoHome={resetPaymentFlowAndNavigateHome} 
                />;
      case Screen.PaymentFailure:
        if (!paymentFlowData) return <HomeScreen onAction={openModal} onNavigate={handleNavigation} userProfile={userProfile} />;
        return <PaymentFailureScreen 
                  paymentDetails={paymentFlowData}
                  onRetry={() => {
                    setIsProcessingPayment(false); // Reset processing flag
                    handleNavigation(Screen.EnterPin); 
                  }}
                  onGoHome={resetPaymentFlowAndNavigateHome}
                />;
      case Screen.Offers: 
        return <HomeScreen onAction={openModal} onNavigate={handleNavigation} userProfile={userProfile} />; 
      default:
        return <HomeScreen onAction={openModal} onNavigate={handleNavigation} userProfile={userProfile} />;
    }
  };

  const showChrome = ![
      Screen.SendMoney, 
      Screen.ScanPay, 
      Screen.AmountEntry, 
      Screen.SelectAccount, 
      Screen.EnterPin,
      Screen.PaymentSuccess,
      Screen.PaymentFailure,
    ].includes(currentScreen);

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#333' }}>
      <div 
        className="w-full max-w-sm h-[800px] max-h-[90vh] flex flex-col shadow-2xl rounded-3xl overflow-hidden border-8 border-black"
        style={{ backgroundColor: THEME_COLORS.background }}
      >
        {showChrome && <Header userProfile={userProfile} onNavigate={handleNavigation} />}
        <main className="flex-grow overflow-y-auto flex flex-col" style={{ backgroundColor: THEME_COLORS.background }}>
          {renderScreen()}
        </main>
        {showChrome && <BottomNav currentScreen={currentScreen} onNavigate={handleNavigation} />}

        {activeModal === ModalType.RequestMoney && (
          <RequestMoneyModal
            isOpen={true}
            onClose={closeModal}
            onSubmit={(data) => {
              console.log("Request Money Data:", data);
              closeModal();
              showSimpleNotification("Request Sent", `Requesting ₹${data.amount} from ${data.upiId} has been sent.`);
            }}
          />
        )}
        {activeModal === ModalType.CheckBalance && selectedAccountForBalance && (
          <CheckBalanceModal
            isOpen={true}
            onClose={closeModal}
            account={selectedAccountForBalance}
          />
        )}
        {activeModal === ModalType.Notification && notification && (
            <NotificationModal
                isOpen={true}
                onClose={closeModal}
                title={notification.title}
                message={notification.message}
            />
        )}
      </div>
    </div>
  );
};

export default App;
