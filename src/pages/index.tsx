import React, { ReactNode, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import GradientText from "../components/GradientText";
import Layout from "@theme/Layout";
import { TweetCardProps } from "react-tweet-card";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { cn } from "../utils";
import SearchBar from '@theme/SearchBar';
import styles from '../components/JupiterSearch.module.css';
import { PRODUCT_CARDS } from '../constant';

const JupiterSearch = () => {
  return (
    <div className="mt-10 mb-16 md:mb-0 xl:mt-12 max-w-3xl mx-auto w-full px-4">
      <div className={`relative w-full homeSearchContainer`}>
        <SearchBar />
      </div>
    </div>
  );
};

const JupiterExplore = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#17212C] p-8 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-white mb-4">Product</h2>
            <p className="text-gray-400 text-base py-2">
              Best crypto products.
            </p>
            <p className="text-gray-400 text-base py-2">
              Trade seamlessly with the best tools from spot to meme to leveraged products.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <a 
              href="https://jup.ag/" 
              className="flex-1 bg-[#AAEB42] !text-black font-semibold py-3 px-1 rounded-lg text-center hover:bg-[#AAEB42]/80 transition-colors !no-underline"
            >
              Jupiter
            </a>
            <a 
              href="https://ape.pro/" 
              className="flex-1 bg-[#fbbf24] !text-black font-semibold py-3 px-1 rounded-lg text-center hover:bg-[#fbbf24]/80 transition-colors !no-underline"
            >
              ApePro
            </a>
            <a 
              href="https://jup.ag/mobile/" 
              className="flex-1 bg-[#22CCEE] !text-black font-semibold py-3 px-1 rounded-lg text-center hover:bg-[#22CCEE]/80 transition-colors !no-underline"
            >
              Mobile
            </a>
          </div>
        </div>
        <div className="bg-[#17212C] p-8 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-white mb-4">Development</h2>
            <p className="text-gray-400 text-base py-2">
              Build world class applications.
            </p>
            <p className="text-gray-400 text-base py-2">
              Tap into our infrastructure to build your own bots, products and more.
            </p>
          </div>
          <a 
            href="https://station.jup.ag/docs/" 
            className="mt-8 bg-[#22CCEE] !text-black font-semibold py-3 px-4 rounded-lg text-center hover:bg-[#22CCEE]/80 transition-colors !no-underline"
          >
            Integrate API
          </a>
        </div>
        <div className="bg-[#17212C] p-8 rounded-2xl flex flex-col h-full">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-white mb-4">Discovery</h2>
            <p className="text-gray-400 text-base py-2">
              Best community in crypto.
            </p>
            <p className="text-gray-400 text-base py-2">
              Join the Catdets to learn more about Jupiverse, Solana and the future ahead!
            </p>
          </div>
          <a 
            href="https://jup.com/" 
            className="mt-8 bg-[#22CCEE] !text-black font-semibold py-3 px-4 rounded-lg text-center hover:bg-[#22CCEE]/80 transition-colors !no-underline"
          >
            Jup.com
          </a>
        </div>
      </div>
    </div>
  );
};

// const JupiterDevelopers = () => {
//   return (
//     <div className="w-full">
//       <div className="text-3xl xl:text-4xl text-center lg:text-start font-bold !text-[#00BEF0]">
//         Developers
//       </div>

//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
//         <a
//           href="https://station.jup.ag/docs/apis/swap-api"
//           target="_blank"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>v6 Swap API</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://station.jup.ag/docs/apis/payments-api"
//           target="_blank"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>Payments API</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://terminal.jup.ag"
//           target="_blank"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>Jupiter Terminal</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://station.jup.ag/docs/dca/dca-sdk"
//           target="_blank"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>DCA with SDK</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://station.jup.ag/docs/apis/adding-fees"
//           target="_blank"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>Referral Program</span>
//           <ChevronRight />
//         </a>
//       </div>
//     </div>
//   );
// };

const JupiterDirectory = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-16 md:pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCT_CARDS.map((card, index) => (
          <div key={index} className="bg-[#17212C] rounded-xl p-6 flex flex-col">
            <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
            <div className="flex gap-3 text-gray-400">
              {card.links.map((link, linkIndex) => (
                <a 
                  key={linkIndex}
                  href={link.href}
                  className="pr-2 !text-gray-400 hover:!text-[#22CCEE] transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JupiterCommunity = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-16 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://discord.gg/jup" target="_blank" className="bg-[#17212C] rounded-xl p-6 flex items-center gap-4 hover:bg-[#17212C]/80 transition-colors">
          <div className="bg-[#131C25] p-3 rounded-xl w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#5865F2]">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Get Support</h3>
            <p className="text-gray-400">Join our Discord Community</p>
          </div>
        </a>

        <a href="https://jupresear.ch" target="_blank" className="bg-[#17212C] rounded-xl p-6 flex items-center gap-4 hover:bg-[#17212C]/80 transition-colors">
          <div className="bg-[#131C25] p-3 rounded-xl w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M12 3C6.5 3 2 6.9 2 11.8c0 2.5 1.2 4.7 3 6.3-.1.5-.4 1.6-1.7 3.1-.2.2-.2.5 0 .7.1.1.2.1.4.1 2.3 0 4.1-1.4 4.9-2.1.9.2 2 .4 3.4.4 5.5 0 10-3.9 10-8.5S17.5 3 12 3zm0 15c-1.2 0-2.3-.2-3.3-.5-.2-.1-.4 0-.6.1-.6.4-1.8 1.3-3.2 1.7.5-.9.8-1.7 1-2.3.1-.3 0-.6-.2-.8C4.1 15 3 13.5 3 11.8 3 7.4 7 4 12 4s9 3.4 9 7.8-4 7.2-9 7.2z"/>            </svg>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Discuss Topics</h3>
            <p className="text-gray-400">Learn more in Jupresear.ch</p>
          </div>
        </a>

        <a href="https://github.com/jup-ag/space-station/issues" target="_blank" className="bg-[#17212C] rounded-xl p-6 flex items-center gap-4 hover:bg-[#17212C]/80 transition-colors">
          <div className="bg-[#131C25] p-3 rounded-xl w-12 h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Feedback & Contribute</h3>
            <p className="text-gray-400">Share your suggestions on GitHub</p>
          </div>
        </a>
      </div>
    </div>
  );
};

// const JupiterProducts = () => {
//   return (
//     <div className="flex flex-col justify-center items-center mt-16 xl:mt-[100px] mb-16 max-w-screen-xl max-md:mt-10 max-md:max-w-full bg-[#13181D]">
//       <div className="text-2xl font-semibold mt-6 text-center max-md:max-w-full">
//         Directory
//       </div>
//       <div className="mt-6 w-full">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-2 lg:gap-5 lg:gap-y-14">
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold text-center">Swap</div>
//               <a
//                 href="https://jup.ag/swap"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Swap</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/swap/"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>

//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center whitespace-nowrap">
//                 Limit Order
//               </div>
//               <a
//                 href="https://jup.ag/limit"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Limit Order</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/limit-order/limit-order"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center">DCA</div>
//               <a
//                 href="https://jup.ag/dca"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch DCA</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/dca/how-to-dca"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center">
//                 Value Average
//               </div>
//               <a
//                 href="https://jup.ag/va"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Value Average</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/va/how-to-va"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/7111a82941aa614d6513ab0b6fd9fe5fafe5d1a46c07d49684acb29ccdb98c52?"
//                   className="my-auto w-4 aspect-square"
//                 />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold text-center">Perps</div>
//               <a
//                 href="https://jup.ag/perps"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Perps</div>
//               </a>
//               <a
//                 href="http://station.jup.ag/guides/perpetual-exchange/overview"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>

//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center whitespace-nowrap">
//                 JLP
//               </div>
//               <a
//                 href="https://jup.ag/perps-earn"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Buy JLP</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/jlp/JLP"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center">JupSOL</div>
//               <a
//                 href="https://jup.ag/swap/SOL-JupSOL"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Buy JupSOL</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/jupsol/jupsol"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-guide.svg" />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center">Ape Pro</div>
//               <a
//                 href="https://ape.pro/"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Ape Pro</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/apepro/overview"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/7111a82941aa614d6513ab0b6fd9fe5fafe5d1a46c07d49684acb29ccdb98c52?"
//                   className="my-auto w-4 aspect-square"
//                 />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>

//           <div className="flex flex-col flex-1">
//             <div className="relative flex-1 flex flex-col justify-center p-4 lg:p-6 mx-auto w-full rounded-2xl bg-[#71E5EC]/[0.05] bg-opacity-10 max-md:px-1 max-md:pb-2">
//               <div className="text-lg font-bold  text-center">Jupiter Lock</div>
//               <a
//                 href="https://lock.jup.ag"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-3 lg:mt-4 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img src="img/home/icon-launch.svg" />
//                 <div className="text-xs lg:text-sm">Launch Jupiter Lock</div>
//               </a>
//               <a
//                 href="https://station.jup.ag/guides/jupiter-lock/jupiter-lock"
//                 target="_blank"
//                 className={cn(
//                   "flex gap-3 px-3.5 py-2.5 mt-2 text-sm font-semibold hover:no-underline !text-[#00BCF0] rounded-lg bg-[#00BCF0] bg-opacity-10 outline outline-1 outline-[rgba(0,190,240,0.5)] hover:bg-opacity-20 cursor-pointer",
//                 )}
//               >
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/7111a82941aa614d6513ab0b6fd9fe5fafe5d1a46c07d49684acb29ccdb98c52?"
//                   className="my-auto w-4 aspect-square"
//                 />
//                 <div className="text-xs lg:text-sm">User Guide</div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ChevronRight = ({ width = 14, height = 14 }) => {
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 14 14"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M1.1665 7.00033H12.8332M12.8332 7.00033L6.99984 1.16699M12.8332 7.00033L6.99984 12.8337"
//         stroke="currentColor"
//         strokeWidth="1.66667"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const JupiterJupAcronym = () => {
//   return (
//     <div className="w-full text-v2-lily/[.03]">
//       <div className="text-3xl xl:text-4xl text-center lg:text-start font-semibold !text-[#00BEF0]">
//         {"J.U.P"}
//       </div>
//       <div className="mt-5 flex flex-col gap-2">
//         <a
//           href="https://twitter.com/weremeow/status/1764304344545894904"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>What is J.U.P</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://twitter.com/JupiterExchange/status/1763214551900729797"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>What is J.U.P. (video)</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://twitter.com/JupiterExchange/status/1757079166212505989"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>Working Groups</span>
//           <ChevronRight />
//         </a>
//         <a
//           href="https://station.jup.ag/docs/get-your-token-onto-jup"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={cn(
//             "py-3 px-6 font-semibold !text-[#00BEF0] rounded-xl items-center flex gap-2 bg-[#00BEF0]/[.03] hover:bg-[#00BEF0]/[.1] !no-underline",
//             `transition-all hover:gap-3`,
//           )}
//         >
//           <span>Get Listed on Jupiter</span>
//           <ChevronRight />
//         </a>
//       </div>
//     </div>
//   );
// };

// const JupiterCredits = () => {
//   return (
//     <div className="w-full">
//       <div className="text-center text-lime-200 text-2xl font-semibold">
//         The Best On-Chain Exchange
//       </div>

//       <div className="flex flex-col md:flex-row gap-2 lg:gap-8 mt-6">
//         <div className="justify-center items-start gap-8 w-full">
//           <a
//             href="https://twitter.com/jerallaire/status/1724718929447371174"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 lg:p-8 bg-[#20292F] rounded-2xl justify-center items-start flex flex-col w-full hover:bg-[#20292F]/[.9] hover:no-underline"
//           >
//             <div className="flex gap-3">
//               <img
//                 className="w-9 h-9 rounded-full border border-lime-200 border-opacity-20"
//                 src="/img/home/credit-avatar-1.png"
//               />
//               <div className="items-start">
//                 <div className="text-lime-200 font-semibold">
//                   Jeremy Allaire (@jerallaire)
//                 </div>
//                 <div className="text-lime-200 text-opacity-50 text-xs leading-none">
//                   5:20 PM · Nov 15, 2023
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start gap-6 leading-6 text-xs md:text-sm lg:text-base">
//               <div className="mt-5 text-v2-lily/[.65] inline">
//                 <span className="">I am super impressed with</span>
//                 <br />
//                 <a
//                   className="text-decoration-none underline text-v2-lily/[.65] pr-1"
//                   href="https://twitter.com/JupiterExchange"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   @JupiterExchange
//                 </a>
//                 <span className="">on</span>
//                 <a
//                   className="text-decoration-none underline text-v2-lily/[.65]  pl-1"
//                   href="https://twitter.com/solana"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   @solana
//                 </a>
//                 <span className="">
//                   . Truly excellent UX and features. An example of maturation in
//                   a range of infrastructure -- wallets, usdc on solana liquidity
//                   and availability, and product execution.
//                 </span>
//               </div>
//             </div>
//           </a>
//         </div>

//         <div className="justify-center items-start gap-8 w-full">
//           <a
//             href="https://twitter.com/TopoGigio_sol/status/1737844551317147964"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 lg:p-8 bg-[#20292F] rounded-2xl justify-center items-start flex flex-col w-full hover:bg-[#20292F]/[.9] hover:no-underline"
//           >
//             <div className="flex gap-3">
//               <img
//                 className="w-9 h-9 rounded-full border border-lime-200 border-opacity-20"
//                 src="/img/home/credit-avatar-2.png"
//               />
//               <div className="items-start">
//                 <div className="text-lime-200 font-semibold">
//                   Topo Gigio (@TopoGigio_sol)
//                 </div>
//                 <div className="text-lime-200 text-opacity-50 text-xs leading-none">
//                   10:36 PM · Dec 21, 2023
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start gap-6 leading-6 text-xs md:text-sm lg:text-base">
//               <div className="mt-5 text-v2-lily/[.65]">
//                 <span className="">Did you know?: </span>
//                 <a
//                   className="text-decoration-none underline text-v2-lily/[.65] px-1"
//                   href="https://twitter.com/JupiterExchange"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   @JupiterExchange
//                 </a>

//                 <div className="">
//                   {" "}
//                   has a bridge feature? Where it will compare rates and find you
//                   the most efficient path to $SOL Jupiter, for me, is the single
//                   most important app on $SOL
//                   <div className="mt-3" />
//                   It is our Grand Central Station.
//                   <div className="mt-3" />
//                   Love at first swap
//                   <div className="mt-3" />
//                   GM
//                 </div>
//               </div>
//             </div>
//           </a>
//         </div>

//         <div className="justify-center items-start gap-8 w-full">
//           <a
//             href="https://twitter.com/Abbasshaikh42/status/1735940030865277244"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-4 lg:p-8 bg-[#20292F] rounded-2xl justify-center items-start flex flex-col w-full hover:bg-[#20292F]/[.9] hover:no-underline"
//           >
//             <div className="flex gap-3">
//               <img
//                 className="w-9 h-9 rounded-full border border-lime-200 border-opacity-20"
//                 src="/img/home/credit-avatar-3.png"
//               />
//               <div className="items-start">
//                 <div className="text-lime-200 text-base font-semibold">
//                   Abbas (@abbassshaikh42)
//                 </div>
//                 <div className="text-lime-200 text-opacity-50 text-xs leading-none">
//                   4:28 PM · Dec 16, 2023
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-start gap-6">
//               <div className="mt-5 text-v2-lily/[.65] leading-6 text-xs md:text-sm lg:text-base">
//                 <span className="">
//                   Tell me this isn't a gorgeous fucking product by{" "}
//                 </span>
//                 <a
//                   className="text-decoration-none underline text-v2-lily/[.65] px-1"
//                   href="https://twitter.com/JupiterExchange"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   @JupiterExchange
//                 </a>
//                 <p className="mt-4">
//                   This would previously require me to use a slow, redacted CEX
//                   that requires KYC and requires me to handover custody of my
//                   assets.
//                 </p>
//                 <p className="mt-4">
//                   The performant chain thesis is simple: When your base layer
//                   does not require weeks and months of development efforts
//                   purely directed towards gas/fee optimizations, you allow your
//                   builders to innovate and focus purely on the product & they
//                   make the magic happen
//                 </p>
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

const Content = () => {
  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center bg-[#13181D]">
      <div className="bg-v2-lily/5 w-full h-[1px]" />

      <div className="w-full max-xl:px-2 flex flex-col">
        <div className="bg-[#131C25] flex flex-col justify-center self-center px-20 text-center max-md:px-5 w-full md:py-24 pt-0">
          <div
            className={cn(
              "font-bold max-md:max-w-full text-6xl xl:text-7xl leading-[1] py-2 mt-12 md:mt-0",
              "bg-gradient-to-r from-[rgba(0,190,240,1)] to-[rgba(199,242,132,1)] text-transparent bg-clip-text",
            )}
          >
            Getting Started on Jupiter
          </div>
          <div className="self-center text-s xl:text-[20px] text-v2-lily/50 w-full text-wrap px-4 mt-4 xl:mt-8">
            Home for Catdets curious about Jupiter
          </div>
          <JupiterSearch />
        </div>
        <JupiterExplore />
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8">Browse by product</h2>
        </div>
        <JupiterDirectory />
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-8">We'd love to hear from you!</h2>
        </div>
        <JupiterCommunity />
      </div>
    </div>
  );
};

export default function Home(): JSX.Element {
  return (
    <div className="home overflow-hidden">
      <Layout>
        <Content />
        {/* <div className="relative isolate min-h-screen overflow-hidden text-[#E8F9FF]/60 px-[44px]">
          <div className="absolute flex sm:hidden z-[-1] w-full top-0 right-0">
            <img
              src="/img/home/header-bg-mobile.png"
              alt=""
              className="w-full"
            />
            <div className=" absolute w-[40%] bottom-[60%] right-1/2 translate-x-1/2 translate-y-1/2">
              <img src="/img/home/cat.png" alt="" className="cat" />
            </div>
          </div>
          <div className="mt-[276px] sm:mt-[226px] max-w-content ml-auto mr-auto">
            <section className="mr-auto text-center sm:text-left text-white">
              <span className="max-w-[574px]">
                <h1 className="font-bold text-[40px] sm:text-[80px] 1.1125]">
                  Jupiter <br /> Space Station
                </h1>
                <p className="mt-5 opacity-75 text-lg font-medium">
                  Welcome to the space station — home for cats curious about
                  Jupiter.
                </p>
                <div className="md:space-x-4">
                  <Link
                    href="/guides"
                    style={{
                      boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
                    }}
                    className="!text-[#19232D] hover:text-black hover:bg-white transition duration-250 ease-linear !no-underline group items-center bg-[#C7F284] rounded-lg font-semibold text-base px-8 py-4 space-x-2 mt-4 uppercase"
                  >
                    <span>User Guides</span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:translate-x-1 duration-300 h-[20px]"
                    >
                      <path
                        d="M4.16602 10.5911H15.8327M15.8327 10.5911L9.99935 4.75781M15.8327 10.5911L9.99935 16.4245"
                        stroke="#19232D"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/docs"
                    style={{
                      boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
                    }}
                    className="text-white border-white hover:text-black hover:bg-white transition duration-250 ease-linear !no-underline group items-center bg-transparent rounded-lg font-semibold text-base px-[14px] py-[15px] space-x-2 mt-4 uppercase border-[1px] border-solid"
                  >
                    <span>Developer Docs</span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:translate-x-1 duration-300 stroke-white group-hover:stroke-black"
                    >
                      <path
                        d="M4.16602 10.5911H15.8327M15.8327 10.5911L9.99935 4.75781M15.8327 10.5911L9.99935 16.4245"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </span>
            </section>
            <div className="sm:bg-[url('/img/home/stars.png')] bg-cover">
              <div className="max-w-content mx-auto">
                <section className="mt-[108px] sm:mt-[145px] text-center sm:text-left">
                  <h2 className="text-white text-[28px] sm:text-[36px] 1.22]">
                    The <GradientText>Best Onchain Exchange</GradientText> 🚀
                  </h2>
                  <p className="mt-6 text-lg">
                    We deliver the finest onchain experience, marrying Solana's
                    low transaction fees with Jupiter's advanced routing and
                    commitment to product excellence.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mt-9">
                    {tweetsBestExchange.map((tweet, index) => (
                      <div key={index}>
                        <BrowserOnly>
                          {() => {
                            const TweetCard =
                              require("react-tweet-card").default;
                            return <TweetCard {...tweet} theme="dim" />;
                          }}
                        </BrowserOnly>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="max-w-content mx-auto">
                <section className="mt-[108px] sm:mt-[145px] text-center sm:text-left">
                  <h2 className="text-white text-[28px] sm:text-[36px] 1.22]">
                    With <GradientText>Features That People Love</GradientText>{" "}
                    ❤️
                  </h2>
                  <p className="mt-6 text-lg">
                    Jupiter's products covers swaps, DCA, limit orders,
                    perpetuals, and a launchpad, with different options for
                    users and developers. We're also constantly adding new
                    features to serve you even better.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mt-9">
                    {tweetsFeatures.map((tweet, index) => (
                      <div key={index}>
                        <BrowserOnly>
                          {() => {
                            const TweetCard =
                              require("react-tweet-card").default;
                            return <TweetCard {...tweet} theme="dim" />;
                          }}
                        </BrowserOnly>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="max-w-content mx-auto">
                <section className="mt-[108px] sm:mt-[145px] text-center sm:text-left">
                  <h2 className="text-white text-[28px] sm:text-[36px] 1.22]">
                    Put Together By An{" "}
                    <GradientText>Awesome Community</GradientText> 🙌
                  </h2>
                  <p className="mt-6 text-lg">
                    With catdets, working groups, and the DAO growing everyday,
                    we have a strong decentralized community of users and
                    builders working together to bring you the very best.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] mt-9">
                    {tweetsCommunity.map((tweet, index) => (
                      <div key={index}>
                        <BrowserOnly>
                          {() => {
                            const TweetCard =
                              require("react-tweet-card").default;
                            return <TweetCard {...tweet} theme="dim" />;
                          }}
                        </BrowserOnly>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </div>
  );
}
