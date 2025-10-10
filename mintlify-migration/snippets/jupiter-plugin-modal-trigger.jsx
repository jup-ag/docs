export const JupiterPluginModalTrigger = ({ children, className = "", style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for the Jupiter script to load
    const checkJupiter = () => {
      if (window.Jupiter) {
        try {
          // Just check if Jupiter is available for modal trigger
          setIsLoaded(true);
        } catch (err) {
          setError('Failed to load Jupiter Plugin');
          console.error('Jupiter Plugin availability check error:', err);
        }
      } else {
        // If Jupiter is not available yet, try again in 100ms
        setTimeout(checkJupiter, 100);
      }
    };

    // Start checking for Jupiter availability
    checkJupiter();
  }, []);

  const launchModal = () => {
    if (window.Jupiter && !error) {
      try {
        window.Jupiter.init({
          displayMode: "modal",
        });
      } catch (err) {
        setError('Failed to initialize Jupiter Plugin modal');
        console.error('Jupiter Plugin modal initialization error:', err);
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center">
          <div className="text-black font-medium mb-1">Plugin Error</div>
          <div className="text-xs text-black">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <button 
      className={className}
      style={style}
      onClick={launchModal}
      disabled={!isLoaded}
    >
      {!isLoaded ? 'Loading Jupiter...' : children}
    </button>
  );
}; 