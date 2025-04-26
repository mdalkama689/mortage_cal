export interface CalculationResult {
  maxLoanAmount: number;
  maxPropertyValue: number;
  emi: number;
  debtToIncomeRatio: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
}