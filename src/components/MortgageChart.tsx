import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CalculationResult } from '../types/calculator';
import { formatCurrency } from '../utils/formatter';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MortgageChartProps {
  results: CalculationResult;
}

const MortgageChart: React.FC<MortgageChartProps> = ({ results }) => {
  const { maxLoanAmount, downPayment, interestRate, loanTerm } = results;

  // Calculate total interest paid over loan term
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;
  const monthlyPayment = results.emi;
  const totalPaid = monthlyPayment * totalMonths;
  const totalInterestPaid = totalPaid - maxLoanAmount;

  const totalMortgageData = {
    labels: ['Down Payment', 'Loan Principal', 'Total Interest'],
    datasets: [
      {
        data: [downPayment, maxLoanAmount, totalInterestPaid],
        backgroundColor: [
          'rgba(94, 234, 212, 0.8)', // secondary-300
          'rgba(129, 140, 248, 0.8)', // primary-400
          'rgba(251, 146, 60, 0.8)', // accent-400
        ],
        borderColor: [
          'rgba(94, 234, 212, 1)',
          'rgba(129, 140, 248, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8', // dark-400
          padding: 16,
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += formatCurrency(context.raw);
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="chart-container">
      <h3 className="section-title mb-4">Mortgage Breakdown</h3>
      
      <div className="h-64 mx-auto">
        <Doughnut data={totalMortgageData} options={chartOptions} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-6 text-center">
        <div className="p-2 rounded bg-dark-900">
          <div className="text-secondary-300 text-sm">Down Payment</div>
          <div className="text-lg font-medium text-white">{((downPayment / (downPayment + maxLoanAmount)) * 100).toFixed(1)}%</div>
        </div>
        
        <div className="p-2 rounded bg-dark-900">
          <div className="text-primary-400 text-sm">Loan Term</div>
          <div className="text-lg font-medium text-white">{loanTerm} years</div>
        </div>
        
        <div className="p-2 rounded bg-dark-900">
          <div className="text-accent-400 text-sm">Interest Rate</div>
          <div className="text-lg font-medium text-white">{interestRate}%</div>
        </div>
      </div>
    </div>
  );
};

export default MortgageChart;