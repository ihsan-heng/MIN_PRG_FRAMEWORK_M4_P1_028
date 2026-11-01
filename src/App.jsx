import { useState } from 'react';
import './App.css';
import DiskonKonsonan from './components/DiskonKonsonan';
import DiskonPalindrom from './components/DiskonPalindrom';

function App() {
  const [activeTab, setActiveTab] = useState('latihan1');

  return (
    <div className="app-container">
      <h2 className="header-title">Praktikum M04 - React Vite</h2>

      {/* Navigasi Tab */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'latihan1' ? 'active' : ''}`}
          onClick={() => setActiveTab('latihan1')}
        >
          Latihan 1: Diskon Konsonan
        </button>
        <button
          className={`tab-btn ${activeTab === 'latihan2' ? 'active' : ''}`}
          onClick={() => setActiveTab('latihan2')}
        >
          Latihan 2: Diskon Palindrom
        </button>
      </div>

      {/* Konten Latihan Sesuai Tab yang Dipilih */}
      <div className="tab-content">
        {activeTab === 'latihan1' ? <DiskonKonsonan /> : <DiskonPalindrom />}
      </div>
    </div>
  );
}

export default App;
