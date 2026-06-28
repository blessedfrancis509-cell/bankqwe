
import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Flag } from 'lucide-react';
import { Account } from '../../types';

interface BalanceCardProps {
  account: Account;
  allAccounts?: Account[]; // All user accounts for cross-flagging
  isActive?: boolean;
  onClick?: () => void;
  onSend?: (e: React.MouseEvent) => void;
  onAdd?: (e: React.MouseEvent) => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ account, allAccounts = [], isActive, onClick, onSend, onAdd }) => {
  const isDisabled = account.status === 'disabled';
  // Show flagged if THIS account is flagged OR if ANY user account is flagged
  const anyAccountFlagged = allAccounts.some(a => a.flagged);
  const isFlagged = account.flagged || anyAccountFlagged;
  const hasWarning = isDisabled || isFlagged;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`sleek-card cursor-pointer transition-all relative overflow-hidden p-4 sm:p-5 ${
        isActive ? 'ring-2 ring-brand-primary' : 'hover:shadow-md'
      } ${account.type === 'savings' ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white border-none shadow-lg shadow-brand-primary/20' : ''}
      ${isDisabled ? 'opacity-75 ring-2 ring-red-300' : ''}
      ${isFlagged && !isDisabled ? 'ring-2 ring-amber-300' : ''}`}
    >
      {hasWarning && (
        <div className={`absolute top-0 right-0 px-2.5 py-0.5 text-[7px] font-black uppercase tracking-wider rounded-bl-xl shadow-sm ${
          isDisabled ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
        }`}>
          {isDisabled ? 'Account Disabled' : 'Flagged'}
        </div>
      )}
      <div className="flex justify-between items-start mb-5">
        <div className={`p-1.5 rounded-lg ${account.type === 'savings' ? 'bg-white/10 text-white' : 'bg-brand-primary/5 text-brand-primary'}`}>
          <CreditCard size={20} />
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-wider ${account.type === 'savings' ? 'text-white/60' : 'text-text-muted'}`}>
          {account.type}
        </span>
      </div>
      
      <div>
        <h3 className={`text-sm font-medium mb-0.5 ${account.type === 'savings' ? 'text-white/80' : 'text-text-muted'}`}>{account.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency }).format(account.balance)}
          </span>
        </div>
        <p className={`text-[10px] font-mono mt-2 ${account.type === 'savings' ? 'text-white/40' : 'text-text-muted/40'}`}>{account.number}</p>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) onSend?.(e);
          }}
          className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-2 rounded-lg transition-all ${
            isDisabled ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400' :
            account.type === 'savings' ? 'bg-white text-brand-primary hover:bg-white/90' : 'bg-brand-primary text-white hover:bg-brand-secondary'
          }`}>
          <ArrowUpRight size={12} /> {isDisabled ? 'Frozen' : 'Send'}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) onAdd?.(e);
          }}
          className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-2 rounded-lg transition-all ${
            isDisabled ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400' :
            account.type === 'savings' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-50 text-text-main hover:bg-slate-100'
          }`}>
          <ArrowDownLeft size={12} /> {isDisabled ? 'Frozen' : 'Add'}
        </button>
      </div>
    </motion.div>
  );
};
