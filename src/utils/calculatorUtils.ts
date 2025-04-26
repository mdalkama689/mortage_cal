/**
 * Calculate maximum loan amount based on income, existing EMIs, and loan terms
 * Using Indian banking standards (50% maximum debt-to-income ratio)
 */
export const calculateAffordability = (
  monthlyIncome: number,
  existingEMI: number,
  interestRate: number,
  loanTerm: number
): number => {
  // Maximum allowable EMI (50% of income)
  const maxAllowableEMI = monthlyIncome * 0.5;
  
  // Available EMI capacity after existing debts
  const availableEMI = Math.max(0, maxAllowableEMI - existingEMI);
  
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;
  
  // Convert loan term to months
  const loanTermMonths = loanTerm * 12;
  
  // Using EMI formula, solve for principal (P)
  // EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  // P = EMI × ((1 + r)^n - 1) / (r × (1 + r)^n)
  
  const numerator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
  const denominator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
  
  let maxLoanAmount = availableEMI * (numerator / denominator);
  
  // Round to nearest thousand for cleaner numbers
  maxLoanAmount = Math.floor(maxLoanAmount / 1000) * 1000;
  
  return maxLoanAmount;
};

/**
 * Calculate monthly EMI for a given loan amount, interest rate and term
 */
export const calculateEMI = (
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number => {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;
  
  // Convert loan term to months
  const loanTermMonths = loanTerm * 12;
  
  // EMI calculation formula
  // EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  
  const emi = loanAmount * monthlyInterestRate * 
    Math.pow(1 + monthlyInterestRate, loanTermMonths) / 
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
  
  return Math.round(emi);
};