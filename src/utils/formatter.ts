/**
 * Format currency values in Indian Rupee format
 */
export const formatCurrency = (value: number): string => {
  // Indian currency format uses commas at different positions than international format
  // Example: 10,00,000 instead of 1,000,000
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  
  return formatter.format(value);
};