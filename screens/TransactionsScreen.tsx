import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Transaction } from '../types';
import { MOCK_TRANSACTIONS, THEME_COLORS } from '../constants';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const amountColor = transaction.type === 'received' ? 'green' : 
                      transaction.type === 'sent' ? 'red' : 'yellow';
  const sign = transaction.type === 'received' ? '+' : transaction.type === 'sent' ? '-' : '';
  
  const statusColor = transaction.status === 'success' ? 'green' :
                      transaction.status === 'pending' ? 'yellow' : 'red';

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <View>
          <Text style={styles.partyName}>{transaction.partyName}</Text>
          <Text style={styles.upiId}>{transaction.upiId || 'Bill Payment'}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: amountColor }]}>
            {sign}₹{transaction.amount.toLocaleString('en-IN')}
          </Text>
          <Text style={[styles.status, { color: statusColor }]}>{transaction.status.toUpperCase()}</Text>
        </View>
      </View>
      {transaction.description && <Text style={styles.description}>{transaction.description}</Text>}
    </View>
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
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      
      <View style={styles.filterContainer}>
        {(['all', 'sent', 'received', 'pending'] as const).map(f => (
          <TouchableOpacity 
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterButton, filter === f && styles.activeFilterButton]}
          >
            <Text style={[styles.filterButtonText, filter === f && styles.activeFilterButtonText]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions found for this filter.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: THEME_COLORS.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    backgroundColor: THEME_COLORS.surface,
    color: THEME_COLORS.textPrimary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: THEME_COLORS.surfaceLight,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#3A3A3C',
  },
  activeFilterButton: {
    backgroundColor: THEME_COLORS.primaryAction,
  },
  filterButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: THEME_COLORS.textSecondary,
  },
  activeFilterButtonText: {
    color: 'black',
  },
  transactionItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: THEME_COLORS.surfaceLight,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyName: {
    fontWeight: 'bold',
    color: THEME_COLORS.textPrimary,
  },
  upiId: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  date: {
    fontSize: 12,
    color: THEME_COLORS.textSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: THEME_COLORS.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: THEME_COLORS.textSecondary,
  },
});

export default TransactionsScreen;
