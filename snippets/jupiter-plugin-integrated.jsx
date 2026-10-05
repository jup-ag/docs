import React, { useState, useEffect, useRef } from 'react';

// Jupiter global nesnesinin tipini tanımlamak (TypeScript olmasa da okunabilirlik için)
const JUPITER_PLUGIN_ID = "jupiter-plugin-integrated";
// @ts-ignore
const Jupiter = window.Jupiter;

// Harici betiğin varlığını Promise tabanlı ve temizlenebilir şekilde kontrol eden yardımcı fonksiyon
const waitForJupiter = (timeout = 5000) => {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = timeout / 100;
        
        const check = () => {
            // @ts-ignore
            if (window.Jupiter && window.Jupiter.init) {
                return resolve(window.Jupiter);
            }
            
            if (attempts >= maxAttempts) {
                return reject(new Error("Jupiter script load timeout."));
            }
            
            attempts++;
            setTimeout(check, 100);
        };
        
        check();
    });
};


export const JupiterPluginIntegrated = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  // useRef, init işleminin sadece bir kez yapıldığından emin olmak için kullanılır.
  const isInitialized = useRef(false);

  useEffect(() => {
    // Bileşenin temizlenme (cleanup) fonksiyonunu tutmak için
    let timeoutId;
    let componentMounted = true;

    const initializePlugin = async () => {
      try {
        // 1. Better Polling / Waiting: Use a Promise-based wait for better structure and cleanup
        await waitForJupiter();
        
        // Sadece bir kez başlatıldığından emin ol
        if (componentMounted && !isInitialized.current && Jupiter) {
            
            // 2. Initialization: Initialize the widget
            Jupiter.init({
              displayMode: "integrated",
              integratedTargetId: JUPITER_PLUGIN_ID,
            });

            isInitialized.current = true;
            setIsLoaded(true);
        }
      } catch (err) {
        if (componentMounted) {
            setError('Failed to initialize Jupiter Plugin.');
            console.error('Jupiter Plugin initialization error:', err);
        }
      }
    };
    
    initializePlugin();

    // 3. CLEANUP: useEffect içindeki tüm yan etkileri temizle.
    return () => {
        componentMounted = false;
        if (timeoutId) {
            clearTimeout(timeoutId); 
        }
        
        // Harici kütüphanenin destroy metodu varsa çağrılmalıdır. 
        // Jupiter'in destroy metodu belgelenmemişse bu kısmı atlayın.
        if (isInitialized.current && Jupiter && Jupiter.destroy) {
            Jupiter.destroy();
            isInitialized.current = false;
        }
    };
  }, []); // Bileşen ömrü boyunca sadece bir kez çalışır

  // --- Render Logic ---

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
        <div className="text-center">
          <div className="text-black font-medium mb-2">Plugin Loading Error</div>
          <div className="text-sm text-black">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2 text-black">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00BEF0]"></div>
            <span>Loading Jupiter Plugin...</span>
          </div>
        </div>
      )}
      <div 
        id={JUPITER_PLUGIN_ID} 
        // isLoaded durumuna göre görünürlük ayarlanır
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
