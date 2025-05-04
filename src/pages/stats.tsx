import React from "react";
import Layout from '@theme/Layout';

const StatsContent: React.FC = () => {
  return (
    <div className="stats dark">
      <div className="w-full px-2 lg:px-4 mt-16 lg:p-0 margin-vert--lg mb-[133px] max-w-desktop !mx-auto">
        You can refer to the{" "}
        <a href="https://dune.com/ilemi/jupiter-aggregator-solana" target="_blank" rel="noopener noreferrer">
          Dune dashboard
        </a>
        .
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
