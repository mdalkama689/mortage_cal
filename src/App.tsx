import Calculator from './components/Calculator';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto">
    
          <Calculator />
        </div>
      </main>
    </div>
  );
}

export default App;