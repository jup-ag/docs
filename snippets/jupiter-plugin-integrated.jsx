export const JupiterPluginIntegrated = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for the Jupiter script to load
    const checkJupiter = () => {
      if (window.Jupiter) {
        try {
          window.Jupiter.init({
            displayMode: "integrated",
            integratedTargetId: "jupiter-plugin-integrated",
          });
          setIsLoaded(true);
        } catch (err) {
          setError('Failed to initialize Jupiter Plugin');
          console.error('Jupiter Plugin initialization error:', err);
        }
      } else {
        // If Jupiter is not available yet, try again in 100ms
        setTimeout(checkJupiter, 100);
      }
    };

    // Start checking for Jupiter availability
    checkJupiter();
  }, []);

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
        id="jupiter-plugin-integrated" 
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}; 