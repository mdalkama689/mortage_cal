import React from 'react';
import { formatCurrency } from '../utils/formatter';
import { CalculationResult } from '../types/calculator';
import { HomeIcon, LineChart, PieChart, Wallet } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { maxLoanAmount, maxPropertyValue, emi, debtToIncomeRatio } = results;

  // Determine affordability insights
  const getAffordabilityStatus = () => {
    if (debtToIncomeRatio <= 40) {
      return {
        status: 'Healthy',
        color: 'success',
        description: 'Your debt-to-income ratio is within the recommended range.',
      };
    } else if (debtToIncomeRatio <= 50) {
      return {
        status: 'Caution',
        color: 'warning',
        description: 'Your debt-to-income ratio is slightly high. Consider increasing your down payment.',
      };
    } else {
      return {
        status: 'High Risk',
        color: 'error',
        description: 'Your debt-to-income ratio is too high. Consider reducing your target or increasing your down payment.',
      };
    }
  };

  const affordabilityInsight = getAffordabilityStatus();

  return (
    <div className="space-y-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="result-card group">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-700/30 transition-colors duration-300">
              <HomeIcon className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-dark-300 text-sm">Maximum Property Value</h3>
          <p className="text-2xl font-semibold text-white mt-1">
            {formatCurrency(maxPropertyValue)}
          </p>
        </div>

        <div className="result-card group">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-700/30 transition-colors duration-300">
              <Wallet className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-dark-300 text-sm">Maximum Loan Amount</h3>
          <p className="text-2xl font-semibold text-white mt-1">
            {formatCurrency(maxLoanAmount)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="result-card group">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-700/30 transition-colors duration-300">
              <LineChart className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-dark-300 text-sm">Estimated Monthly EMI</h3>
          <p className="text-2xl font-semibold text-white mt-1">
            {formatCurrency(emi)}
          </p>
        </div>

        <div className="result-card group">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary-900/50 flex items-center justify-center group-hover:bg-primary-700/30 transition-colors duration-300">
              <PieChart className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-dark-300 text-sm">Debt-to-Income Ratio</h3>
          <p className="text-2xl font-semibold text-white mt-1">
            {debtToIncomeRatio.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className={`p-4 rounded-lg border bg-${affordabilityInsight.color}-700/10 border-${affordabilityInsight.color}-700/30`}>
        <div className="flex items-start gap-3">
          <div className={`w-3 h-3 rounded-full bg-${affordabilityInsight.color}-500 mt-1.5`}></div>
          <div>
            <h3 className="font-medium text-white">
              Affordability Status: <span className={`text-${affordabilityInsight.color}-500`}>{affordabilityInsight.status}</span>
            </h3>
            <p className="text-sm text-dark-300 mt-1">{affordabilityInsight.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;