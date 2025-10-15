import React, { useEffect } from "react";
import Layout from '@theme/Layout';

const StatsContent: React.FC = () => {
  useEffect(() => {
    window.location.href = "https://dune.com/raccoons/jupiter-the-solana-superapp";
  }, []);

  return (
    <div className="stats dark">
      <div className="w-full px-2 lg:px-4 mt-16 lg:p-0 margin-vert--lg mb-[133px] max-w-desktop !mx-auto">
        Redirecting to Jupiter stats dashboard...
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <Layout>
      <StatsContent />
    </Layout>
  );
};

export default Stats;
