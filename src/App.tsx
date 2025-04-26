import React from 'react';
import { Home } from 'lucide-react';
import Calculator from './components/Calculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Home className="w-5 h-5 text-primary-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Mortgage Affordability Calculator
            </h1>
          </div>
          
          <p className="text-dark-300 mb-8">
            Find out how much home loan you can afford based on your income, existing debt, and down payment.
            This calculator is designed specifically for the Indian housing market.
          </p>
          
          <Calculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;