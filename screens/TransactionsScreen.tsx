import React, { useState } from 'react';
import { Transaction } from '../types';
import { MOCK_TRANSACTIONS, THEME_COLORS } from '../constants';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const amountColor = transaction.type === 'received' ? 'text-green-400' : 
                      transaction.type === 'sent' ? 'text-red-400' : 'text-yellow-400';
  const sign = transaction.type === 'received' ? '+' : transaction.type === 'sent' ? '-' : '';
  
  const statusColor = transaction.status === 'success' ? 'text-green-500' :
                      transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500';

  return (
    <li className="p-4 shadow rounded-lg mb-3 hover:opacity-80 transition-opacity" style={{backgroundColor: THEME_COLORS.surfaceLight}}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold" style={{color: THEME_COLORS.textPrimary}}>{transaction.partyName}</p>
          <p className="text-xs" style={{color: THEME_COLORS.textSecondary}}>{transaction.upiId || 'Bill Payment'}</p>
          <p className="text-xs" style={{color: THEME_COLORS.textSecondary}}>{transaction.date}</p>
        </div>
        <div className="text-right">
          <p className={`font-bold text-lg ${amountColor}`}>
            {sign}₹{transaction.amount.toLocaleString('en-IN')}
          </p>
          <p className={`text-xs font-medium ${statusColor}`}>{transaction.status.toUpperCase()}</p>
        </div>
      </div>
      {transaction.description && <p className="text-sm mt-1" style={{color: THEME_COLORS.textSecondary}}>{transaction.description}</p>}
    </li>
  );
};

const TransactionsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sent' | 'received' | 'pending'>('all');
  
  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'pending') return tx.status === 'pending';
    return tx.type === filter;
  });

  return (
    <div className="p-4 flex-grow" style={{backgroundColor: THEME_COLORS.background}}>
      <h2 className={`text-xl font-semibold mb-4 text-center p-3 rounded-t-lg`} style={{backgroundColor: THEME_COLORS.surface, color: THEME_COLORS.textPrimary}}>Transaction History</h2>
      
      <div className="mb-4 flex space-x-2 p-2 rounded-lg shadow" style={{backgroundColor: THEME_COLORS.surfaceLight}}>
        {(['all', 'sent', 'received', 'pending'] as const).map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-md font-medium flex-1 transition-colors
              ${filter === f ? `text-black shadow-sm` : `hover:opacity-80`}`}
            style={ filter === f ? 
                {backgroundColor: THEME_COLORS.primaryAction, color: 'black'} : 
                {backgroundColor: '#3A3A3C', color: THEME_COLORS.textSecondary}
            }
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredTransactions.length > 0 ? (
        <ul>
          {filteredTransactions.map(tx => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </ul>
      ) : (
        <p className="text-center mt-8" style={{color: THEME_COLORS.textSecondary}}>No transactions found for this filter.</p>
      )}
    </div>
  );
};

export default TransactionsScreen;
