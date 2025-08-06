import React, { useState } from 'react';

interface ProductCardProps {
    image: React.ReactNode;
    title: string;
    description: string;
};

const Subtitle = () => (
    <p style={{ color: 'grey', fontSize: '18px', padding: '10px', }}>
        Learn how to integrate Jupiter in various methods and leverage the power of our products.
    </p>
);

const ProductCard: React.FC<ProductCardProps> = ({ image, title, description, link }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={link}
            style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            margin: '10px',
            boxShadow: isHovered ? '0 0 10px darkseagreen' : '0 2px 5px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
            height: 'auto',
            minHeight: '120px',
            textDecoration: 'none',
            color: 'inherit',
            flex: '1',
            alignItems: 'stretch',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
        <div style={{ marginRight: '10px', alignSelf: 'center' }}>
            <div
                style={{
                    marginRight: '10px',
                    alignSelf: 'center',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {image}
            </div>
        </div>
        <div style={{ alignItems: 'center' }}>
                <h3 style={{ margin: '0.5rem 0', fontSize: '20px' }}>{title}</h3>
                <p style={{ margin: '0', fontSize: '16px' }}>{description}</p>
        </div>
        </a>
    );
};

const SwapProductList = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <h2 style={{ marginBottom: '10px', color: 'grey', fontSize: '18px' }}>JUPITER SPOT</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px',
                width: '100%',
                maxWidth: '1200px',
                alignItems: 'stretch',
                gridAutoRows: 'auto',
            }}>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/swap.svg" alt="Swap API" style={{ width: '60px', height: '60px' }} />}
                        title="Swap API"
                        description="Integrate Swap to access Solana's deep liquidity."
                        link="/docs/swap-api/get-quote"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/swap.svg" alt="Payment" style={{ width: '60px', height: '60px' }} />}
                        title="Payments"
                        description="Integrate payments by leveraging Swap API."
                        link="/docs/swap-api/payments-through-swap"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/kit.svg" alt="Jupiter Plugin" style={{ width: '60px', height: '60px' }} />}
                        title="Jupiter Plugin"
                        description="Bring Jupiter Ultra swap interface directly into your app."
                        link="/docs/tool-kits/plugin"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/more.svg" alt="Limit Order API" style={{ width: '60px', height: '60px' }} />}
                        title="Limit Order API"
                        description="Integrate Jupiter Limit Order program built on top of Jupiter Swap."
                        link="/docs/swap-api/limit-order-api"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/more.svg" alt="DCA SDK" style={{ width: '60px', height: '60px' }} />}
                        title="DCA SDK"
                        description="Integrate Dollar Cost Average program built on top of Jupiter Swap."
                        link="/docs/swap-api/dca-sdk"
                    />
                </div>
            </div>
        </div>
    );
};

const PerpProductList = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <h2 style={{ marginBottom: '10px', color: 'grey', fontSize: '18px' }}>JUPITER PERPETUAL</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px',
                width: '100%',
                maxWidth: '1200px',
                alignItems: 'stretch',
                gridAutoRows: 'auto',
            }}>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/perp.svg" alt="Perp API" style={{ width: '60px', height: '60px' }} />}
                        title="Perp API"
                        description="✨ Coming soon! ✨"
                        link="/docs/perp-api/perp-api"
                    />
                </div>
            </div>
        </div>
    );
};

const MoreProductList = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <h2 style={{ marginBottom: '10px', color: 'grey', fontSize: '18px' }}>MORE!</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px',
                width: '100%',
                maxWidth: '1200px',
                alignItems: 'stretch',
                gridAutoRows: 'auto',
            }}>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/kit.svg" alt="Unified Wallet Kit" style={{ width: '60px', height: '60px' }} />}
                        title="Unified Wallet Kit"
                        description="Leverage our wallet adapter to build efficiently."
                        link="/docs/tool-kits/unified-wallet-kit"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/price.svg" alt="Price API" style={{ width: '60px', height: '60px' }} />}
                        title="Price API"
                        description="Use prices derived from Jupiter Swap in your app."
                        link="/docs/utility/price-api"
                    />
                </div>
                <div style={{ flex: '1 1 calc(33% - 10px)', display: 'flex', margin: '5px', minWidth: '300px' }}>
                    <ProductCard
                        image={<img src="/docslanding/price.svg" alt="Token API" style={{ width: '60px', height: '60px' }} />}
                        title="Token API"
                        description="Use all of Solana tokens that are tradable on Jupiter in your app."
                        link="/docs/utility/token-api"
                    />
                </div>
            </div>
        </div>
    );
};

const DocsLanding = () => {
    return (
        <div>
            <Subtitle />
            <SwapProductList />
            <PerpProductList />
            <MoreProductList />
        </div>
    );
};

export default DocsLanding;