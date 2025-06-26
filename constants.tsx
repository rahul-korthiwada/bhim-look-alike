import React from 'react';
import { UserProfile, Transaction, Contact } from './types';

export const APP_NAME = "BHIM"; 

export const THEME_COLORS = {
  background: '#0D0D0D', 
  surface: '#1A1A1A',    
  surfaceDarker: '#1C1C1E', 
  surfaceLight: '#2C2C2E',  
  primaryAction: '#FF6F00', 
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0', 
  textPlaceholder: '#707070',
  textLink: '#4A90E2', 
  inputBackground: '#2C2C2E', 
  pkAvatarBg: '#5856D6', 
  inputBorderLight: '#4A4A4C', // For modal inputs etc.
  keypadBackground: '#333333',
  keypadButtonBackground: '#4A4A4A',
  pinInputBackground: '#FFFFFF', // White background for PIN screen elements
  pinInputText: '#000000',      // Black text for PIN screen elements
  warningBackground: 'rgba(251, 191, 36, 0.1)', // Light yellow for warning box background (bg-yellow-400 opacity 10%)
  warningBorder: '#FBBF24', // yellow-400 for warning box border
  warningIcon: '#FBBF24',   // yellow-400 for warning icon
  warningText: '#374151', // Changed to dark gray (gray-700) for better contrast on light warning backgrounds
  successGreenScreen: '#042f10', // Dark green for success screen background
  failureRedScreen: '#2f0404',   // Dark red for failure screen background
  successBannerGreen: '#166534', // Brighter green for success banner
  failureBannerRed: '#991B1B', // Brighter red for failure banner
};

export const PRIMARY_COLOR = "bg-indigo-700"; 
export const ACCENT_COLOR = "bg-orange-500"; 
export const MOCK_REFERRAL_BANNER_URL = "https://via.placeholder.com/350x80.png?text=Refer+&+Get+₹500+Cashback";


// --- NEW ICONS ---

export const IconLargeCheckVerified = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-white bg-green-500 rounded-full p-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const IconLargeCrossFailed = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-white bg-red-500 rounded-full p-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconShare = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.044.588.05H11.25m-3.445 0H21m-9.75 0a2.25 2.25 0 002.25 2.25m-2.25-2.25a2.25 2.25 0 01-2.25 2.25m0-2.25a2.25 2.25 0 00-2.25 2.25m2.25-2.25M11.25 6h3.75a2.25 2.25 0 012.25 2.25v3.75m0 0a2.25 2.25 0 01-2.25 2.25h-3.75m0 0a2.25 2.25 0 01-2.25-2.25V8.25a2.25 2.25 0 012.25-2.25m9.75-3.75H3.75A2.25 2.25 0 001.5 8.25v7.5A2.25 2.25 0 003.75 18h16.5a2.25 2.25 0 002.25-2.25V8.25A2.25 2.25 0 0020.25 6h-3.75" />
  </svg>
);

export const IconDownloadArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);


export const IconPerson = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const IconGroup = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m0 0a9.094 9.094 0 013.741-.479m0 0a4.5 4.5 0 01-1.5 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.25 4.5A2.625 2.625 0 1115.75 12a2.625 2.625 0 010 4.5zm-5.25 0a2.625 2.625 0 110-4.5 2.625 2.625 0 010 4.5zM12 9.75a2.625 2.625 0 110-4.5A2.625 2.625 0 0112 5.25zM15 9.75a2.625 2.625 0 110-4.5 2.625 2.625 0 010 4.5zM9 9.75A2.625 2.625 0 119 5.25a2.625 2.625 0 010 4.5z" />
  </svg>
);

export const IconNotificationBell = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const IconLink = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

export const IconCopy = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 9.25c0-.621-.504-1.125-1.125-1.125H18v-3.028c0-.703-.278-1.35-.732-1.844a2.458 2.458 0 00-1.844-.732H13.5V7.875c0-.621-.504-1.125-1.125-1.125H9.375a1.125 1.125 0 00-1.125 1.125v10.5A1.125 1.125 0 009.375 21h5.25c.488 0 .927-.312 1.06-.753l.876-3.125z" />
  </svg>
);

export const IconChevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const IconSendToMobile = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
  </svg>
);
export const IconSendToBank = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 0l-3.75 3.75M12 3l3.75 3.75M3 6h18M4.5 9.75h15M6 13.5h12m-12 3.75h12M7.5 17.25h9" />
  </svg>
);
export const IconUpiCircle = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m0 0a9.094 9.094 0 013.741-.479M12 12c0 3-2.5 5-2.5 5S7 15 7 12c0-2.756 2.244-5 5-5s5 2.244 5 5zm0 0c0-2.062-.506-3.837-1.748-5.303" />
  </svg>
);
export const IconBillsRecharges = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
export const IconIpoMandate = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527c.44-.315.99-.225 1.305.188l.75.75c.315.315.403.865.188 1.305l-.527.737c-.249.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738c.315.44.226.99-.188 1.305l-.75.75c-.315-.315-.865-.403-1.305-.188l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397-.165-.71-.505-.78-.93l-.15-.893zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
export const IconApproveToPay = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
export const IconWand = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 14.25M9.75 3.104c-.251.038-.502.068-.752.092M9.75 3.104a24.167 24.167 0 014.5 0M4.144 7.026a2.25 2.25 0 011.591-.659h5.714M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.892 2.676A2.25 2.25 0 0011.25 21h1.5a2.25 2.25 0 002.25-2.25v-2.625c0-.981.396-1.875 1.048-2.528M15 12H9.372c-.414 0-.75-.336-.75-.75V3.104M15 12V3.75a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 009 3.75M15 12a2.25 2.25 0 012.25 2.25v5.25a2.25 2.25 0 01-2.25-2.25h-3a2.25 2.25 0 01-2.25-2.25V14.25" />
  </svg>
);

export const IconOffers = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962-5.962a.75.75 0 011.06 0l2.298 2.3A.75.75 0 0115.362 5.214z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.75 6.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
export const IconHistory = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
  </svg>
);
export const IconChevronLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
export const IconSearch = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
export const IconDotsVertical = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
);
export const IconBackspace = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0L12 14.25m2.25-2.25H5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const IconStar: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }> = ({ className: customClassName, ...props }) => {
  const baseClassName = "w-4 h-4 text-yellow-400";
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={`${baseClassName} ${customClassName || ''}`.trim()}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
};

export const IconSoundOn = ( // Placeholder sound icon
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.38a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

export const IconCheckCircle = ( // For selected bank account
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const IconRadioButtonUnchecked = ( // For unselected bank account
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

// Small triangle for dropdown-like elements in PIN screen summary
export const IconDropdownTriangle = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

// Exclamation mark in circle for warning
export const IconExclamationCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15h.01" />
  </svg>
);
// UPI Logo (simplified)
export const IconUpiLogo = (
  <svg width="40" height="20" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5">
    <path d="M1.37878 19.3879L0.627716 39.018H9.0195L9.77057 19.3879H1.37878Z" fill="#F8991D"/>
    <path d="M10.1136 26.545L12.9867 19.3879H20.013L20.2032 24.3809H17.7297L17.0738 22.0949H13.2384L12.5599 24.3809H10.1136V26.545Z" fill="#01579B"/>
    <path d="M10.1136 39.018L12.9867 31.8609H20.013L20.2032 36.8539H17.7297L17.0738 34.5679H13.2384L12.5599 36.8539H10.1136V39.018Z" fill="#01579B"/>
    <path d="M22.0461 31.8609H24.5196V39.018H22.0461V31.8609Z" fill="#01579B"/>
    <path d="M22.0461 19.3879H24.5196V26.545H22.0461V19.3879Z" fill="#01579B"/>
    <path d="M26.208 19.3879H28.6815V31.6496L35.5414 19.3879H38.5367L31.6244 31.9868V31.9642H31.5796V39.018H28.6815V26.9113L26.208 22.2232V19.3879Z" fill="#F8991D"/>
    <path d="M40.2255 19.3879H48.989L44.6072 27.6749L40.2255 19.3879ZM39.0195 39.018L44.6072 29.8398L50.1949 39.018H39.0195Z" fill="#01579B"/>
    <path d="M50.9749 19.3879H53.4484V39.018H50.9749V19.3879Z" fill="#01579B"/>
    <path d="M55.1368 19.3879H63.6267L64.0071 21.6012H57.7381L57.5927 22.2232H63.0784L63.4588 24.3809H57.1998L57.0271 25.0477H64.0071V39.018H55.1368V19.3879Z" fill="#F8991D"/>
    <path d="M79.0934 29.213L76.2203 36.3701H69.1939L68.9764 31.3771H71.4499L72.1058 33.6631H75.9412L76.6197 31.3771H79.0934V29.213Z" fill="#01579B"/>
    <path d="M79.0934 16.74L76.2203 23.8971H69.1939L68.9764 18.9041H71.4499L72.1058 21.1901H75.9412L76.6197 18.9041H79.0934V16.74Z" fill="#01579B"/>
  </svg>
);


// --- EXISTING ICONS ---
export const IconHome = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const IconTransactions = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
);

export const IconProfile = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const IconScan = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5v15h16.5V4.5H3.75zm0 3.75h16.5M7.5 12h9m-9 3.75h4.5M3.75 4.5L12 12l8.25-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h.008v.008H3.75V4.5zm0 3.75h.008v.008H3.75v-.008zm0 3.75h.008v.008H3.75v-.008zm0 3.75h.008v.008H3.75v-.008zm3.75-11.25h.008v.008H7.5V4.5zm0 3.75h.008v.008H7.5v-.008zm0 3.75h.008v.008H7.5v-.008zm0 3.75h.008v.008H7.5v-.008zm3.75-11.25h.008v.008h-.008V4.5zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zm3.75-7.5h.008v.008h-.008V8.25zm0 3.75h.008v.008h-.008v-.008zm3.75-7.5h.008v.008H18.75V4.5zm0 3.75h.008v.008H18.75v-.008zm0 3.75h.008v.008H18.75v-.008zm0 3.75h.008v.008H18.75v-.008zM7.5 1.5h9M1.5 7.5v9M22.5 7.5v9M7.5 22.5h9" />
  </svg>
);

export const IconSend = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const IconRequest = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);


export const IconBalance = ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-5.25H21m-9 5.25h9m-9 2.25h9M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M2.25 12.75h19.5" />
  </svg>
);

export const IconClose = (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const MOCK_USER_PROFILE: UserProfile = {
  name: "Prakash Kumar", 
  initials: "PK",
  upiId: "prakashkumar@upi", 
  phoneNumber: "9876543210", // Ensure this is just digits for API if used directly
  email: "prakash.kumar@example.com", // Added for API
  linkedAccounts: [
    { id: "1", bankName: "State Bank Of India", accountNumberLast4: "2262", fullAccountNumber: "455909610144", balance: 50275.50, isPrimary: true, bankLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/512px-SBI-logo.svg.png" }, 
    { id: "2", bankName: "HDFC Bank", accountNumberLast4: "5678", fullAccountNumber: "123456789012", balance: 120500.75, bankLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/HDFC_Bank_Logo.svg/1280px-HDFC_Bank_Logo.svg.png" }, 
  ],
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", type: "sent", partyName: "Store ABC", upiId: "storeabc@upi", amount: 1200, date: "2024-07-28 10:15 AM", status: "success", description: "Groceries" },
  { id: "t2", type: "received", partyName: "Amit Singh", upiId: "amitsingh@upi", amount: 500, date: "2024-07-27 05:30 PM", status: "success", description: "Lunch" },
  { id: "t3", type: "requested", partyName: "Priya Sharma", upiId: "priya@upi", amount: 250, date: "2024-07-26 09:00 AM", status: "pending", description: "Movie ticket" },
  { id: "t4", type: "sent", partyName: "Electricity Bill", amount: 850, date: "2024-07-25 02:00 PM", status: "success", description: "Bill Payment" },
  { id: "t5", type: "received", partyName: "Cashback", amount: 50, date: "2024-07-24 11:00 AM", status: "success", description: "Offer" },
];

export const MOCK_CONTACTS: Contact[] = [
    { id: "c1", name: "Mrs RUKMINI K C", avatarInitials: "MR", avatarColor: "bg-pink-500", upiId: "rukmini@upi", isFavorite: true },
    { id: "c2", name: "SAI HOSPITALITIES FACILI", avatarInitials: "SH", avatarColor: "bg-orange-500", upiId: "9341254396@upi" },
    { id: "c6", name: "PRANESH KUMAR DEVARAJAN", avatarInitials: "PK", avatarColor: THEME_COLORS.pkAvatarBg, upiId: "pranesh246@okhdfcbank", isFavorite: true, phoneNumber: "9876543210" },
    { id: "c3", name: "John Doe", avatarInitials: "JD", avatarColor: "bg-blue-500", upiId: "john.doe@upi", isFavorite: true },
    { id: "c4", name: "Alice Wonderland", avatarInitials: "AW", avatarColor: "bg-green-500", upiId: "alice.w@upi" },
    { id: "c5", name: "Bob The Builder", avatarInitials: "BB", avatarColor: "bg-yellow-500", upiId: "bob.builder@upi" },
];