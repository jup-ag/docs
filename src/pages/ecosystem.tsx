import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';

const wallet = '/img/wallet.png';
const defi = '/img/defi.png';
const dex_amm = '/img/dex_amm.png';
const bridge = '/img/bridge.png';
const payment = '/img/payment.png';
const nft = '/img/nft.png';
const game = '/img/game.png';
const infra = '/img/infra.png';

const bitget = 'img/wallet/bitget.png';
const crypto = 'img/wallet/crypto.png';
const gemwallet = '/img/wallet/gemwallet.svg';
const phantom = '/img/wallet/phantom.svg';
const solflare = '/img/wallet/solflare.svg';
const ultimate = '/img/wallet/ultimate.png';
const brave = '/img/wallet/brave.png';
const coinbase = '/img/wallet/coinbase.png';
const glow = '/img/wallet/glow.png';
const heywallet = '/img/wallet/heywallet.png';
const backpack = '/img/wallet/backpack.svg';
const frontier = '/img/wallet/frontier.svg';
const nightly = '/img/wallet/nightly.svg';
const tiplink = '/img/wallet/tiplink.svg';
const okx = '/img/wallet/okx.png';
const reown = '/img/wallet/reown.svg';

const birdeye = '/img/defi/birdeye.png';
const bonfida = '/img/defi/bonfida.png';
const sonar = '/img/defi/sonar.png';
const kamino = '/img/defi/kamino.png';
const mango = '/img/defi/mango.png';
const mean = '/img/defi/mean.svg';
const tulip = '/img/defi/tulip.png';
const marginfi = '/img/defi/marginfi.svg';
const samoyed = '/img/defi/samoyed.svg';
const hawksight = '/img/defi/hawksight.png';
const drift = '/img/defi/drift.png';
const vybe = '/img/defi/vybe.svg';
const coinhall = '/img/defi/coinhall.svg';
const vaultka = '/img/defi/vaultka.png';
const adrastea = '/img/defi/adrastea.svg';
const moonshot = 'img/defi/moonshot.png';

const balansol = '/img/dex_amm/balansol.svg';
const crema = '/img/dex_amm/crema.png';
const raydium = '/img/dex_amm/raydium.png';
const goosefx = '/img/dex_amm/goosefx.svg';
const dexlab = '/img/dex_amm/dexlab.png';
const ellipsis = '/img/dex_amm/ellipsislab.svg';
const phoenix = '/img/dex_amm/phoenix.svg';
const invariant = '/img/dex_amm/invariant.svg';
const lifinity = '/img/dex_amm/lifinity.png';
const oasis = '/img/dex_amm/oasis.svg';
const marinade = '/img/dex_amm/marinade.png';
const meteora = '/img/dex_amm/meteora.png';
const openbook = '/img/dex_amm/openbook.png';
const orca = '/img/dex_amm/orca.png';
const saros = '/img/dex_amm/saros.png';
const stepfinance = '/img/dex_amm/stepfinance.png';
const stepn = '/img/dex_amm/stepn.svg';
const bonkswap = '/img/dex_amm/bonkswap.png';
const symmetry = '/img/dex_amm/symmetry.svg';
const sanctum = 'img/dex_amm/sanctum.svg';
const fluxbeam = 'img/dex_amm/fluxbeam.png';
const helium = 'img/dex_amm/helium.svg';
const pumpfun = 'img/dex_amm/pumpfun.png';
const obric = 'img/dex_amm/obric.png';
const perena = 'img/dex_amm/perena.png';
const stabble = 'img/dex_amm/stabble.png';
const daosfun = 'img/dex_amm/daosfun.png';
const virtuals = 'img/dex_amm/virtuals.png';

const debridge = '/img/bridge/debridge.png';
const rango = '/img/bridge/rango.png';
const allbridge = '/img/bridge/allbridge.png';
const atlasdex = '/img/bridge/atlasdex.svg';
const wormhole = '/img/bridge/wormhole.svg';
const mayan = '/img/bridge/mayan.svg';

const aurory = '/img/game/aurory.jpg';
const defiland = '/img/game/defiland.png';
const genopets = '/img/game/genopets.png';
const staratlas = '/img/game/staratlas.png';

const candypay = '/img/payment/candypay.svg';
const helio = '/img/payment/helio.svg';
const sphere = '/img/payment/sphere.svg';
const elusiv = '/img/payment/elusiv.svg';

const sniper = '/img/nft/sniper.svg';
const famousfoxfederation = '/img/nft/fff.png';
const hadeswap = '/img/nft/hadeswap.png';
const hyperspace = '/img/nft/hyperspace.svg';
const liquifynft = '/img/nft/liquifynft.svg';
const solsea = '/img/nft/solsea.svg';

const triton = '/img/infra/triton.png';
const helius = '/img/infra/helius.png';

const sections = [
    {
        id: 1,
        logo: dex_amm,
        title: 'DEXes',
        header: (
            <div className="relative mb-4">
                <img src={dex_amm} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">DEXes</h2>
            </div>
        ),
        description: `A decentralized exchange (DEX) is a cryptocurrency exchange where users trade directly with each other using smart contracts and blockchain technology, without intermediaries. DEXs provide users with greater control over their funds.
        Automated market makers (AMMs) are decentralized exchanges (DEXs) that use mathematical algorithms to automatically set prices and execute trades. Unlike traditional order-book exchanges, which rely on central limit order matching, AMMs use liquidity pools where users can deposit funds to facilitate trades. The algorithm automatically adjusts the price based on the supply and demand of assets in the pool.DEXs & AMMs description`,
        cards: [
            {
                title: 'Orca',
                logo: orca,
                link: 'https://www.orca.so/',
            },
            {
                title: 'Raydium',
                logo: raydium,
                link: 'https://raydium.io/',
            },
            {
                title: 'Meteora',
                logo: meteora,
                link: 'https://meteora.ag/',
            },
            {
                title: 'Pumpfun',
                logo: pumpfun,
                link: 'https://pump.fun/',
            },
            {
                title: 'Obric',
                logo: obric,
                link: 'https://obric.xyz/',
            },
            {
                title: 'Perena',
                logo: perena,
                link: 'https://perena.org/',
            },
            {
                title: 'Stabble',
                logo: stabble,
                link: 'https://stabble.org/',
            },
            {
                title: 'Daos.fun',
                logo: daosfun,
                link: 'https://daos.fun/',
            },
            {
                title: 'Virtuals',
                logo: virtuals,
                link: 'https://app.virtuals.io/',
            },
            {
                title: 'GooseFX',
                logo: goosefx,
                link: 'https://goosefx.io/',
            },
            {
                title: 'Openbook',
                logo: openbook,
                link: 'https://openbookdex.com/',
            },
            {
                title: 'Lifinity',
                logo: lifinity,
                link: 'https://lifinity.io/',
            },
            {
                title: 'Phoenix',
                logo: phoenix,
                link: 'https://ellipsislabs.xyz/',
            },
            {
                title: 'Symmetry',
                logo: symmetry,
                link: 'https://www.symmetry.fi/',
            },
            {
                title: 'Helium Network',
                logo: helium,
                link: 'https://www.helium.com/',
            },
            {
                title: 'Sanctum',
                logo: sanctum,
                link: 'https://www.sanctum.so/',
            },
            {
                title: 'Fluxbeam',
                logo: fluxbeam,
                link: 'https://fluxbeam.xyz/',
            },
            {
                title: 'Bonkswap',
                logo: bonkswap,
                link: 'https://www.bonkswap.io/',
            },
            {
                title: 'Step Finance',
                logo: stepfinance,
                link: 'https://www.step.finance/',
            },
            {
                title: 'Crema',
                logo: crema,
                link: 'https://www.crema.finance/',
            },
            {
                title: 'Invariant',
                logo: invariant,
                link: 'https://invariant.app/',
            },
            {
                title: 'Dexlab',
                logo: dexlab,
                link: 'https://www.dexlab.space/',
            },
            {
                title: 'Saros',
                logo: saros,
                link: 'https://saros.finance/',
            },
            {
                title: 'Sentre - Balansol',
                logo: balansol,
                link: 'https://sentre.io/',
            },
            {
                title: 'Oasis',
                logo: oasis,
                link: 'https://oasis.gobi.so/',
            },
            {
                title: 'StepN DOOAR',
                logo: stepn,
                link: 'https://stepn.com/',
            },
        ],
    },
    {
        id: 2,
        logo: defi,
        title: 'DeFi',
        header: (
            <div className="relative mb-4">
                <img src={defi} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">DeFi</h2>
            </div>
        ),
        description: `DeFi, or Decentralized Finance, is a financial system built on blockchain technology that uses cryptocurrencies and smart contracts for activities like lending, borrowing, and trading in a transparent and secure way. DeFi aims to provide more financial inclusion, transparency, and accessibility while reducing costs and eliminating central points of failure. It's an ever-changing space with new developments and applications being created constantly.`,
        cards: [
            {
                title: 'Tulip',
                logo: tulip,
                link: 'https://tulip.garden/',
            },
            {
                title: 'Sonar Watch',
                logo: sonar,
                link: 'https://sonar.watch/',
            },
            {
                title: 'Birdeye',
                logo: birdeye,
                link: 'https://birdeye.so/',
            },
            {
                title: 'Mean Finance',
                logo: mean,
                link: 'https://meanfi.com/',
            },
            {
                title: 'Bonfida',
                logo: bonfida,
                link: 'https://bonfida.org/',
            },
            {
                title: 'Kamino',
                logo: kamino,
                link: 'https://kamino.finance/',
            },
            {
                title: 'Mango',
                logo: mango,
                link: 'https://mango.markets/',
            },
            {
                title: 'Marinade',
                logo: marinade,
                link: 'https://marinade.finance/',
            },
            {
                title: 'Margin Fi',
                logo: marginfi,
                link: 'https://www.marginfi.com/',
            },
            {
                title: 'Step Finance',
                logo: stepfinance,
                link: 'https://www.step.finance/',
            },
            {
                title: 'Samoyed',
                logo: samoyed,
                link: 'https://dogcoincomparison.com/',
            },
            {
                title: 'Hawksight',
                logo: hawksight,
                link: 'https://www.hawksight.co/',
            },
            {
                title: 'Drift',
                logo: drift,
                link: 'https://app.drift.trade',
            },
            {
                title: 'Vybe Network',
                logo: vybe,
                link: 'https://alpha.vybenetwork.com'
            },
            {
                title: 'Coinhall',
                logo: coinhall,
                link: 'https://coinhall.org'
            },
            {
                title: 'Vaultka',
                logo: vaultka,
                link: 'https://www.vaultka.com'
            },
            {
                title: 'Adrastea',
                logo: adrastea,
                link: 'https://adrastea.fi'
            },
            {
                title: 'Moonshot',
                logo: moonshot,
                link: 'https://moonshot.money/'
            },
        ],
    },
    {
        id: 3,
        logo: wallet,
        title: 'Wallets',
        header: (
            <div className="relative mb-4">
                <img src={wallet} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">Wallets</h2>
            </div>
        ),
        description: `DeFi wallets are a crucial tool for interacting with DeFi protocols in the Web3 ecosystem. They store and manage cryptocurrency assets and allow access to decentralized exchanges, lending platforms, and liquidity pools. Wallet partners have an in-wallet swap feature, like Jupiter, available on iOS, Android, and Web Widget platforms. This allow users to easily exchange cryptocurrencies within their wallet for the optimum price with seamless experience.`,
        cards: [
            {
                title: 'Reown',
                logo: reown,
                link: 'https://reown.com/',
            },
            {
                title: 'Bitget Wallet',
                logo: bitget,
                link: 'https://web3.bitget.com/en',
            },
            {
                title: 'OKX Wallet',
                logo: okx,
                link: 'https://www.okx.com/web3',
            },
            {
                title: 'Gem Wallet',
                logo: gemwallet,
                link: 'https://gemwallet.com',
            },
            {
                title: 'Crypto.com',
                logo: crypto,
                link: 'https://crypto.com/defi-wallet',
            },
            {
                title: 'Phantom',
                logo: phantom,
                link: 'https://phantom.app',
            },
            {
                title: 'Solflare',
                logo: solflare,
                link: 'https://solflare.com/',
            },
            {
                title: 'Glow Wallet',
                logo: glow,
                link: 'https://glow.app/',
            },
            {
                title: 'Coinbase Wallet',
                logo: coinbase,
                link: 'https://www.coinbase.com/wallet',
            },
            {
                title: 'Brave Wallet',
                logo: brave,
                link: 'https://brave.com/wallet/',
            },
            {
                title: 'Hey Wallet',
                logo: heywallet,
                link: 'https://heywallet.com/',
            },
            {
                title: 'Backpack',
                logo: backpack,
                link: 'https://backpack.app/',
            },
            {
                title: 'Frontier Wallet',
                logo: frontier,
                link: 'https://www.frontier.xyz/',
            },
            {
                title: 'Nightly',
                logo: nightly,
                link: 'https://wallet.nightly.app/',
            },
            {
                title: 'Ultimate Wallet',
                logo: ultimate,
                link: 'https://ultimate.app/',
            },
            {
                title: 'TipLink',
                logo: tiplink,
                link: 'https://tiplink.io/',
            },
        ],
    },
    {
        id: 4,
        logo: payment,
        title: 'Payment',
        header: (
            <div className="relative mb-4">
                <img src={payment} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">Payment</h2>
            </div>
        ),
        description: `Crypto payments involve using cryptocurrencies, like stablecoins (e.g., USDC, USDT) or established tokens like Bitcoin and Ethereum, to pay for goods or services. Solana's fast, secure, and low-cost infrastructure has contributed to the rise in popularity of crypto payments on the platform. Jupiter is being integrated into crypto payments protocols to allow for the instant conversion of SPL tokens to fiat stablecoins, which can then be used to pay merchants directly.`,
        cards: [
            {
                title: 'Helio',
                logo: helio,
                link: 'https://helio.co/',
            },
            {
                title: 'CandyPay',
                logo: candypay,
                link: 'https://candypay.fun/',
            },
            {
                title: 'Sphere',
                logo: sphere,
                link: 'https://spherepay.co/',
            },
            {
                title: 'Elusiv',
                logo: elusiv,
                link: 'https://elusiv.io/',
            },
        ],
    },
    {
        id: 5,
        logo: bridge,
        title: 'Bridges',
        header: (
            <div className="relative mb-4">
                <img src={bridge} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">Bridges</h2>
            </div>
        ),
        description: `Crypto bridges are platforms that allow users to exchange different cryptocurrencies across different blockchain networks. They enable seamless transfer of tokens or assets between ecosystems like Solana and Ethereum. Additionally, they promote liquidity and cross-chain communication between blockchains, creating an interconnected and efficient crypto ecosystem.`,
        cards: [
            {
                title: 'Debridge',
                logo: debridge,
                link: 'https://debridge.io/',
            },
            {
                title: 'Wormhole',
                logo: wormhole,
                link: 'https://wormhole.com/',
            },
            {
                title: 'Allbridge',
                logo: allbridge,
                link: 'https://allbridge.io/',
            },
            {
                title: 'AtlasDEX',
                logo: atlasdex,
                link: 'https://atlasdex.finance/',
            },
            {
                title: 'Rango Exchange',
                logo: rango,
                link: 'https://rango.exchange/',
            },
            {
                title: 'Mayan Finance',
                logo: mayan,
                link: 'https://mayan.finance/',
            },
        ],
    },
    {
        id: 6,
        logo: game,
        title: 'Games',
        header: (
            <div className="relative mb-4">
                <img src={game} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">Games</h2>
            </div>
        ),
        description: `Web3 games is the use of cryptocurrencies or blockchain technology in online gaming. This allows for transparent, secure gameplay and ownership of in-game assets. Players can trade or sell these assets on decentralized marketplaces, and some platforms even offer opportunities to earn cryptocurrency while playing.`,
        cards: [
            {
                title: 'Star Atlas',
                logo: staratlas,
                link: 'https://staratlas.com/',
            },
            {
                title: 'Genopets',
                logo: genopets,
                link: 'https://www.genopets.me/',
            },
            {
                title: 'Aurory',
                logo: aurory,
                link: 'https://aurory.io/',
            },
            {
                title: 'Defi Land',
                logo: defiland,
                link: 'https://defiland.app/',
            },
        ],
    },
    {
        id: 7,
        logo: nft,
        title: 'NFTs',
        header: (
            <div className="relative mb-4">
                <img src={nft} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">NFTs</h2>
            </div>
        ),
        description: `NFTs (Non-Fungible Tokens) marketplaces refer to online platforms where individuals can buy, sell, and trade unique digital assets represented as NFTs. NFTs are digital assets that are verified on a blockchain network and are used to represent unique digital items such as artwork, music, videos, and more.`,
        cards: [
            {
                title: 'Sniper',
                logo: sniper,
                link: 'https://sniper.xyz/',
            },
            {
                title: 'Hyperspace',
                logo: hyperspace,
                link: 'https://hyperspace.xyz/',
            },
            {
                title: 'Hadeswap',
                logo: hadeswap,
                link: 'https://www.hadeswap.com/',
            },
            {
                title: 'Solsea',
                logo: solsea,
                link: 'https://solsea.io/',
            },
            {
                title: 'LiquifyNFT',
                logo: liquifynft,
                link: 'https://liquifynft.com/',
            },
            {
                title: 'Famous Fox Federation',
                logo: famousfoxfederation,
                link: 'https://famousfoxes.com/',
            },
        ],
    },
    {
        id: 8,
        logo: infra,
        title: 'Infrastructure',
        header: (
            <div className="relative mb-4">
                <img src={nft} height={37} />
                <h2 className="absolute top-[4px] left-[40px]">Infrastructure</h2>
            </div>
        ),
        description: `Blockchain infrastructure providers deliver the backbone for decentralized networks, offering scalable and secure platforms for transactions, smart contracts, and application development. They enable seamless access to blockchain ecosystems, supporting the growth of decentralized applications and services.`,
        cards: [
            {
                title: 'Triton',
                logo: triton,
                link: 'https://www.triton.one/',
            },
            {
                title: 'Helius',
                logo: helius,
                link: 'https://www.helius.xyz/',
            },
        ],
    },
];

const ButtonFilter = ({ children, active }) => (
    <button
        className={`
  flex
  cursor-pointer
  rounded-[30px]
  text-black/50
  dark:text-white/90
  font-light
  text-sm text-black px-4 py-2 border-solid
  border-gray-200 ml-2 ${active ? 'bg-black/5!' : 'bg-transparent'}`}
    >
        {children}
    </button>
);

export default function Home(): JSX.Element {
    const [selectedCat, setSelectedCat] = useState('all');
    const onSelectCat = (id: string) => {
        setSelectedCat(id);
    };

    const { search } = useLocation();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(search);
            const cateogry = params.get('category');

            if (cateogry) {
                setSelectedCat(cateogry);
            }
        }
    }, [search]);

    return (
        <Layout title={`Partners`} description="Jupiter Ecosystem">
            <div className="my-10 container mt-28 mb-28">
                <div className="mb-10">
                    <div>
                        <h1 className="font-extrabold text-5xl text-center">
                            Jupiter Ecosystem
                        </h1>
                    </div>
                    <div className="font-light text-base max-w-[570px] m-auto mt-8">
                        <div className="text-center">
                            Browse and search projects and partners in our expansive ecosystem.
                        </div>
                    </div>
                </div>
                <div className="container pl-0 mb-14">
                    <div className="flex justify-center">
                        <div role="list" className="powered-categoryes-wrap w-dyn-items">
                            <Link href={`?`}>
                                <div
                                    role="listitem"
                                    className="inline-block"
                                    onClick={() => onSelectCat('all')}
                                >
                                    <ButtonFilter active={selectedCat === 'all'}>
                                        All
                                    </ButtonFilter>
                                </div>
                            </Link>

                            {sections.map((section) => (
                                <Link key={section.id} href={`?category=${section.title}`}>
                                    <div
                                        role="listitem"
                                        className="inline-block"
                                    >
                                        <ButtonFilter active={selectedCat === section.title}>
                                            {section.title}
                                        </ButtonFilter>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="rounded-lg border min-h-[400px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {sections
                                .filter((f) => selectedCat == 'all' || f.title === selectedCat)
                                .map((section) =>
                                    section.cards.flatMap((card) => (
                                        <a
                                            target="_blank"
                                            href={card.link}
                                            key={card.title}
                                            className="relative !no-underline rounded-lg border border-solid border-gray-200 dark:border-gray-700 flex items-center flex-col text-black dark:text-white dark:bg-white/10"
                                            rel="noreferrer"
                                        >
                                            <div
                                                style={{
                                                    background:
                                                        'linear-gradient(rgba(0,0,0,.015),transparent)',
                                                    width: '100%',
                                                    padding: '20px 20px 8px',
                                                }}
                                                className="flex justify-center rounded-lg overflow-hidden transition duration-300"
                                            >
                                                <img
                                                    src={card.logo}
                                                    className="absolute scale-[1.38] opacity-[0.16] blur-[28px] rounded-[20px] h-[60px]"
                                                />
                                                <img
                                                    src={card.logo}
                                                    style={{
                                                        // boxShadow: '0 8px 16px hsla(0,0%,8%,.07)',
                                                        transition: 'transform .2s ease-in-out',
                                                        zIndex: 1,
                                                    }}
                                                    className="relative h-[60px] rounded-[20px] img-scale"
                                                />
                                            </div>
                                            <h3 className="text-center mt-2 mb-4 text-base font-bold opacity-80">
                                                {card.title}
                                            </h3>
                                            {/* <div className="mt-4 space-x-2 flex items-center">
                    {card.links.map((link) => (
                      <a className="underline" href={link.url}>
                        {link.label}
                      </a>
                    ))}
                  </div> */}
                                        </a>
                                    ))
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}