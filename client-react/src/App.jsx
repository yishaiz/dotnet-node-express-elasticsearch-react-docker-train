import { useState } from 'react';
import MainScreen from './components/MainScreen';
import OrderSummary from './components/OrderSummary';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main');

  return (
    <>
      {currentScreen === 'main' && (
        <MainScreen onProceedToCheckout={() => setCurrentScreen('summary')} />
      )}
      {currentScreen === 'summary' && (
        <OrderSummary onBackToMain={() => setCurrentScreen('main')} />
      )}
    </>
  );
}

export default App;
