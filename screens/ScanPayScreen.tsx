import React from 'react';
import { THEME_COLORS, IconChevronLeft } from '../constants';

interface ScanPayScreenProps {
    onSimulateScan: () => void;
    onBack: () => void; // Added for back navigation
}

const ScanPayScreen: React.FC<ScanPayScreenProps> = ({ onSimulateScan, onBack }) => {
  return (
    <div className="flex flex-col h-full text-white p-4" style={{backgroundColor: '#000'}}>
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 text-white" aria-label="Go back">
          {IconChevronLeft}
        </button>
        <h2 className="text-xl font-semibold ml-2">Scan QR Code</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Mock Scanner Viewfinder */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8">
          <div className="absolute inset-0 border-4 border-dashed border-neutral-500 rounded-lg"></div>
          {/* Corner elements */}
          {[
            'top-0 left-0 border-t-4 border-l-4',
            'top-0 right-0 border-t-4 border-r-4',
            'bottom-0 left-0 border-b-4 border-l-4',
            'bottom-0 right-0 border-b-4 border-r-4',
          ].map((pos, idx) => (
            <div
              key={idx}
              className={`absolute w-10 h-10 border-sky-400 ${pos} rounded-sm`}
            ></div>
          ))}
          {/* Animated scan line (optional) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-sky-400 animate-scan-line rounded"></div>
          <style jsx-global>{`
            @keyframes scan-line-anim {
              0% { transform: translateY(0); }
              100% { transform: translateY(calc(100% - 4px)); } /* Adjusted for thickness */
            }
            .animate-scan-line {
              animation: scan-line-anim 2.5s infinite alternate ease-in-out;
            }
          `}</style>
        </div>

        <p className="text-neutral-300 text-center mb-6">
          Align QR code within the frame to scan.
        </p>

        <button
          onClick={onSimulateScan}
          className="font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-orange-300"
          style={{backgroundColor: THEME_COLORS.primaryAction, color: THEME_COLORS.textPrimary}}
        >
          Simulate Scan
        </button>

        <div className="mt-8 flex space-x-6">
          <button className="flex flex-col items-center text-neutral-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-xs">From Gallery</span>
          </button>
          <button className="flex flex-col items-center text-neutral-300 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-1">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a15.07 15.07 0 01-4.5 0m3.75-10.845a12.06 12.06 0 01-4.5 0m3.75 2.355a15.07 15.07 0 01-4.5 0M9.75 5.25A2.25 2.25 0 007.5 7.5v9.75a2.25 2.25 0 004.5 0V7.5A2.25 2.25 0 009.75 5.25zm0 0H7.5M9.75 5.25c0-1.036.784-1.875 1.75-1.875S13.25 4.214 13.25 5.25v9.75c0 1.036-.784 1.875-1.75 1.875S9.75 16.036 9.75 15m0-9.75v9.75" />
             </svg>
             <span className="text-xs">Enter UPI ID</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanPayScreen;
