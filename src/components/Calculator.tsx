import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, BarChart3, IndianRupee } from 'lucide-react';
import InputField from './InputField';
import MortgageChart from './MortgageChart';
import ResultsDisplay from './ResultsDisplay';
import { calculateAffordability, calculateEMI } from '../utils/calculatorUtils';
import { CalculationResult } from '../types/calculator';

const Calculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  const [existingEMI, setExistingEMI] = useState<number>(10000);
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateResults = () => {
    const maxLoanAmount = calculateAffordability(
      monthlyIncome,
      existingEMI,
      interestRate,
      loanTerm
    );
    
    const maxPropertyValue = maxLoanAmount + downPayment;
    const emi = calculateEMI(maxLoanAmount, interestRate, loanTerm);
    const debtToIncomeRatio = ((existingEMI + emi) / monthlyIncome) * 100;
    
    setResults({
      maxLoanAmount,
      maxPropertyValue,
      emi,
      debtToIncomeRatio,
      downPayment,
      interestRate,
      loanTerm,
    });
  };

  // Recalculate whenever any input changes
  useEffect(() => {
    calculateResults();
  }, [monthlyIncome, existingEMI, downPayment, interestRate, loanTerm]);

  return (
    <div className="calculator-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <CalcIcon className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Your Financial Information</h2>
          </div>
          
          <div className="space-y-6">
            <InputField
              label="Monthly Income"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              prefix="₹"
              placeholder="Enter your monthly income"
              id="monthly-income"
              tooltip="Include your salary and any additional income sources after tax"
            />
            
            <InputField
              label="Existing Monthly EMIs"
              value={existingEMI}
              onChange={setExistingEMI}
              prefix="₹"
              placeholder="Enter your existing EMIs"
              id="existing-emi"
              tooltip="Include all ongoing loan repayments like personal loans, car loans, etc."
            />
            
            <InputField
              label="Down Payment Amount"
              value={downPayment}
              onChange={setDownPayment}
              prefix="₹"
              placeholder="Enter your down payment amount"
              id="down-payment"
              tooltip="The amount you can pay upfront (minimum 20% recommended)"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Interest Rate (%)"
                value={interestRate}
                onChange={setInterestRate}
                suffix="%"
                placeholder="Interest rate"
                id="interest-rate"
                tooltip="Current home loan interest rates in India range from 6.5% to 9.5%"
                showDecimals
              />
              
              <InputField
                label="Loan Term (Years)"
                value={loanTerm}
                onChange={setLoanTerm}
                suffix="years"
                placeholder="Loan term in years"
                id="loan-term"
                tooltip="Typical home loan terms in India range from 5 to 30 years"
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">Affordability Results</h2>
          </div>
          
          {results && (
            <>
              <ResultsDisplay results={results} />
              <MortgageChart results={results} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;