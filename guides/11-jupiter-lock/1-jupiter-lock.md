---
sidebar_label: Jupiter Lock Overview
title: Jupiter Lock Overview
description: "Jupiter Lock is an open-sourced, audited, and free ecosystem tool to lock and distribute tokens over-time."
---

<head>
    <title>Jupiter Lock</title>
    <meta name="twitter:card" content="summary" />
</head>

Jupiter Lock (https://lock.jup.ag/) is an [open-sourced](https://github.com/jup-ag/jup-lock), audited and free way to lock and distribute tokens over-time. Lock will be free for all project teams to lock tokens, implement cliff, and vest non-circulating supply in a clear and transparent manner.

### Jupiter Lock Specifications

Jupiter Lock is currently in Beta, we aim to improve and introduce additional features. Let us know what you are interested in!

Audited Twice by [OtterSec](https://github.com/jup-ag/jup-lock/blob/main/audits/OtterSec_2024_08_15.pdf) & [Sec3](https://github.com/jup-ag/jup-lock/blob/main/audits/Sec3_2024_08_05.pdf).

Program code is available here: https://github.com/jup-ag/jup-lock

Mainnet Deployment: `LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn`

The **IDL** for the Jupiter Lock program can be found on [Solscan](https://solscan.io/account/LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn#anchorProgramIdl), or available here: 

:::info Jupiter Lock is in Beta
Feel free to submit PRs, suggestions, or reach out to us! If you need help with Jupiter Lock or have any feedback on how to improve, let us know on Discord or [Telegram](https://t.me/xianxlb).
:::

---

### How to Use Jupiter Lock

**Create Token Lock**

<video controls style={{ maxWidth: '50%', height: 'auto' }}>

  <source src={require('../static/media/lock-walkthrough.mp4').default} type="video/mp4" />
  Your browser does not support the video tag.
</video>

Video credits: [Aremia Vincenzo](https://twitter.com/Arimiyahu1)

1. Navigate to https://lock.jup.ag/.
2. Click `+ Create Token Lock` button.
3. Click `Connect Wallet` button. Note that you can only lock the tokens you have in your connected wallet.
4. Search for the token you wish to lock via contract address or ticker.
5. Fill in the required details:
   1. Lock Title. Name this lock e.g. Team Tokens.
   2. Lock Amount. You can see the amount of token within your wallet.
   3. Recipient Wallet Address. The tokens can be claimable by this wallet after the defined vesting period.
   4. Vesting Start Date. You can select any future date and time. This is based on your current timezone.
   5. Vesting Duration and intervals. Vesting Duration determines the entire vesting schedule from the Start Date.
   6. (Optional) Cliff Period & intervals. Cliff refers to a time period that has to pass before the tokens start vesting.
   7. Unlock Schedule. This determines how much tokens is being vested and unlocked within that regular time interval.
   8. Who can cancel the contract and who can change the recipient. Choose None, Only Creator, Only Recipient or Either Creator or Recipient
6. (Optional) Add more locks for the same token but with different parameters by clicking `Add Another Lock` button.
7. Press `Proceed` to review the token lock contract. After confirming all the details, click `Create Contract` button.
8. Navigate to Jupiter Lock home page is to view the lock that you’ve created!

---

**View Locks & Claim Tokens**

1. Navigate to https://lock.jup.ag/. You will be able to see All Locks powered by Jupiter Lock.
2. Click `Connect Wallet` at the upper right corner to check Your Locked Tokens and Locks You Created.
   1. Your Locked Tokens include tokens that others and yourself have locked and your wallet is a recipient.
   2. Locks You Created shows the locks that you created.
3. Select the token of interest and check all locks associated, powered by Jupiter Lock. The details include:
   1. Lock Title: Title describes the lock. Clicking on this will be directed to the explorer.
   2. Unlocked/Total: Amounts of token vested and unlocked over the total locked amount.
   3. Actions: The `Claim` button will light up if there's unlocked tokens to claim.
   4. Vesting Schedule: The schedule shows the full vesting period, including date and time.
   5. Cliff Date: If a cliff date was added to the contract, it will show up here.
   6. Unlock Rate: The amount of token vested and unlocked will be shown against the time period.
   7. Creator/Recipient: The wallet addresses of Creator and Recipient. 
   8. Claim Progress: Progress bar showing the tokens claimed against locked amount.


<details>
  <summary>Jupiter Lock Terms and Conditions</summary>

Last Updated: 27 September 2024

These Terms and Conditions of Use (these "Terms") are between you (also referred to herein as "user", "you" and "your") and Block Raccoon S.A., a company incorporated under the laws of Panama ("Jupiter Lock", "we", "us" and "our"). These Terms govern your use of the services provided by Jupiter Lock described below (the "Services"). By accessing the Services made available on https://lock.jup.ag/ (the "Website") you agree that you have read, understand, and accept all of the terms and conditions contained in these Terms.

We may make changes to these Terms from time to time. If we do this, we will post the revised Terms on the Website and will indicate at the top of this page the date the was last revised. You understand and agree that your continued use of the Service or the Website after we have made any such changes constitutes your acceptance of the new Terms.

1.	INTRODUCTION

1.1.	Eligibility
To be eligible to use the Website you must be at least eighteen (18) years of age or older. The Website, interface and Services (as defined below) is strictly NOT offered to persons or entities who reside in, are citizens of, are incorporated in, or have a registered office in any Restricted Territory, as defined below (any such person or entity from a Restricted Territory shall be a “Restricted Person”). If you are a Restricted Person, then do not attempt to access or use the Website. Jupiter Lock will implement technical measures such as "geoblocking" to ensure that the Website, interface and Services are not available to Restricted Persons. Use of a virtual private network (e.g., a VPN) or other means by Restricted Persons to access or use the Website, interface or Services is prohibited. For the purpose of these Terms, Restricted Territory shall mean the United States, People's Republic of China, Russia, Democratic People’s Republic of Korea (North Korea), or any other state, country or region that is subject to sanctions enforced by the United States, the United Kingdom or the European Union.

1.2.	Terms
We reserve the right to disable access to the Website interface at any time in the event of any breach of the Terms, including without limitation, if we, in our sole discretion, believe that you, at any time, fail to satisfy the eligibility requirements set forth in the Terms. Further, we reserve the right to limit or restrict access to the Website interface by any person or entity, or within any geographic area or legal jurisdiction, at any time and at our sole discretion. We will not be liable to you for any losses or damages you may suffer as a result of or in connection with the Website interface being inaccessible to you at any time or for any reason.

1.3.	Legality
You are solely responsible for adhering to all laws and regulations applicable to you and your use or access to the Website and interface thereon. Your use of the Website and Services is prohibited by and otherwise violate or facilitate the violation of any applicable laws or regulations, or contribute to or facilitate any illegal activity. We make no representations or warranties that the information, products, or services provided through the Website, are appropriate for access or use in other jurisdictions. We reserve the right to limit the availability of our Website to any person, geographic area, or jurisdiction, at any time and at our sole and absolute discretion.

2.	THE SERVICES

2.1.	Jupiter Lock and Services

Jupiter Lock is a open-sourced, audited and free tool for users to lock and distribute their own digital assets over-time, allowing project teams to lock tokens, implement cliffs, and vest non-circulating supply in a clear and transparent manner. Jupiter Lock performs its core functions via interoperable smart contracts, functioning solely as a back-end technical tool allowing users to perform the above functions. 

2.2.	Peer-to-peer interactions
The Services facilitates peer-to-peer interactions between users (for example, between third party project teams which decide to utilise the Services to lock their tokens and the community members of such third party projects) and we are not a party to any such arrangements. Accordingly, you agree that we are not responsible for any activities between users accessing the Services, and you shall bear all risks (including civil claims or regulatory risk) of (a) all activities being performed by you in connection with any other user utilising the Services, and (b) all activities and interactions with other users. Any claims arising in connection with the foregoing shall be directly against the relevant user, and we shall not be liable for the same. 

Users are solely responsible for the acquisition and security (including without limitation enabling of access, applying appropriate security measures, encrypting sensitive data, and not allowing unauthorised access to) while utilising the Services.

2.3.	Usage of Services
Jupiter Lock may launch, change, upgrade, impose conditions to, suspend, or stop offering the Services or any component, feature, element or function of the same, including additional sign-on procedures and requirements, and the manner of access to the Services (including any code repositories or URLs used in connection therewith) without prior notice.

2.4.	Non-custodial nature of smart contracts
The user interface will allow you to access a non-custodial smart contract to perform a variety of transactions. In particular, you confirm that all actions and functions performed via the Jupiter Lock smart contract are irrevocable. You remain in full control of your digital assets, which are not held or controlled in any way by Jupiter Lock. Jupiter Lock does not custody your digital assets, nor collect or hold your keys or information - accordingly, if you lose control over these assets, Jupiter Lock cannot access your digital assets; digital backups; recover keys, passwords, or other information; reset passwords; or reverse transactions. You are solely responsible for the safety of your digital assets and your use of the Services, including without limitation for storing, backing up, and maintaining the confidentiality of your private keys, passwords, and information, and for the security of any transactions you perform using the Website. You expressly relieve and release Jupiter Lock from any and all liability and/or loss arising from your use of the Services.

2.5.	Service fees
If you elect to utilise the Services, all transactions will be conducted solely through the relevant blockchain network (on which your tokens are issued). We will have no insight into or control over these payments or transactions, nor do we have the ability to reverse any transactions. With that in mind, we will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage in via the Website, or using the smart contracts, or any other transactions that you conduct via the relevant blockchain network.

The underlying blockchain network typically requires the payment of a transaction fee ("Gas Fee") for every transaction that occurs on the relevant blockchain network. The Gas Fee funds the network of validators, nodes or resource providers that run the decentralised network. This means that you will need to pay a Gas Fee for each transaction that occurs via the Website.

Jupiter Lock also reserves the right to levy additional fees for access via the smart contracts or the Website in the future. You agree to promptly pay all aforementioned fees and commissions.

2.6.	Not an Offering of Banking business, Trust business, Custodial business, Escrow business, Securities or Commodities
You understand and affirm that Jupiter Lock is a non-custodial provider of technical smart-contract services which allow users to manage their digital assets. The content of the Website and the Services do not constitute any banking business, trust business, custodial business, escrow business, any offer to buy or sell, or a solicitation of an offer to buy or sell investments, securities, partnership interests, commodities or any other financial instruments in any jurisdiction. The content or the Website and the Services also do not constitute, and may not be used for or in connection with, an offer or solicitation by anyone in any state or jurisdiction in which such an offer or solicitation is not authorized or permitted, or to any person to whom it is unlawful to make such offer or solicitation. In particular, the Services do not constitute any "banking business" within the meaning of any banking laws, "custody" within the meaning of any virtual assets law, or "capital markets products" or "securities" within the meaning of any securities law.

2.7.	No Advice
Jupiter Lock makes no representation or warranty, express or implied, to the extent not prohibited by applicable law, regarding the advisability of participating in digital assets on any blockchain, any financial products, securities, funds, commodity interests, partnership interests or other investments or funding or purchasing loans. Jupiter Lock is merely a technology service provider allowing you to manage your own digital assets connecting you with various third parties and does not offer fiduciary services, and is not your agent, trustee, advisor or fiduciary.

2.8.	Non-reliance
The Services allow users to create a variety of applications. It is solely your responsibility to determine the legality of the applications created and the legal relationship created between you and your end user in respect of such developed applications/users services. Jupiter Lock provides no guarantees as to the suitability or legality of the Services or software tools.

2.9.	Taxes
It is your sole responsibility to determine whether, and to what extent, any taxes apply to any interest received through the Services, and to withhold, collect, report and remit the correct amount of tax to the appropriate tax authorities.

2.10.	Amendment or Withdrawal of Services
Jupiter Lock may impose additional terms for the usage of the Service, as set forth in separate Service-specific Terms and Conditions. Jupiter Lock may increase or restrict the scope of Services, and may modify, limit or discontinue existing Services, from time to time and at Jupiter Lock 's sole discretion.

2.11.	Technical documentation
You must comply with all relevant technical documentation applicable to the Services as posted and updated by Jupiter Lock from time to time on the Website. You further agree, as a continuing condition for your use of the Services, to abide by all license terms and conditions of all third-party software components, libraries and application programme interfaces comprised in any Services as from time to time notified on the Website.

3.	USER TERMS

3.1.	User Conduct
You agree that you are responsible for your own conduct while accessing or using the Website or the Services, and for any consequences thereof. You agree to use the Website and the Services only for purposes that are legal, proper and in accordance with these Terms and any applicable laws or regulations, including without limitation you may not: (a) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent, obscene, or otherwise objectionable content; (b) distribute viruses, worms, defects, Trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature; (c) impersonate another person (via the use of an email address or otherwise); (d) upload, post, transmit or otherwise make available through the Website or the Services any content that infringes the intellectual proprietary rights of any party; (e) use the Website or the Services to violate the legal rights (such as rights of privacy and publicity) of others; (f) engage in, promote, or encourage illegal activity (including, without limitation, money laundering); (g) interfere with other users' enjoyment of the Website or the Services; (h) exploit the Website or the Services for any unauthorised commercial purpose; (i) modify, adapt, translate, decompile, disassemble or reverse engineer any portion of the Website or the Services; (j) attempt to bypass any measure of the Website or the Services designed to prevent or restrict access to the same (or any portion thereof); (k) harass, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Website or the Services to you; (l) remove any copyright, trademark or other proprietary rights notices contained in the Website, the Services or the Content (or any part thereof); (m) reformat or frame any portion of the Website; (n) display any content on the Website or the Services that contains any hate-related or violent content or contains any other material, products or services that violate or encourage conduct that would violate any criminal laws, any other applicable laws, or any third party rights; (o) use any robot, spider, site search/retrieval application, or other device to retrieve or index any portion of the Website or the Services or the content thereon, or to collect information about its users for any unauthorised purpose; (p) upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”); (q) access or use the Website or the Services by automated means or under false or fraudulent pretences; (r) access or use the Website or the Services for the purpose of, directly or indirectly, creating or enabling a party to create a product or service that is competitive with any of our products or services; (s) use the Website, the Services or the underlying smart contracts to advertise or offer to sell goods and services; (t) conduct any activity that violates any applicable law, rule, or regulation concerning the integrity of trading markets, including (but not limited to) the manipulative tactics commonly known as spoofing, wash trading, cornering, accommodation trading, fictitious transactions, "money pass" (i.e. transactions without a net change in either party's open positions but with a resulting profit to one party and a loss to the other party), or pre-arranged or non-competitive transactions, or (u) disparage, tarnish, or otherwise harm, in our opinion, us and/or the Website or the Services. If you engage in any of the activities prohibited by this section 3, we may, at our sole and absolute discretion, without notice to you, and without limiting any of our other rights or remedies at law or in equity, immediately suspend or terminate your access to the Website or the Services and delete all your provided input as well as output generated/processed in connection with the Services.

3.2.	User Representations and Warranties
By using the Website, the Services or the underlying smart contracts, you represent and warrant that: (a) you have read and understood these Terms and all documentation on the Website and/or relating to the Services; (b) you have good and sufficient experience and understanding of the functionality, usage, storage, transmission mechanisms and other material characteristics of cryptographic tokens, token storage mechanisms (such as token wallets), blockchain technology, blockchain-like technology and blockchain-based software systems to understand these Terms and to appreciate the risks and implications of using or otherwise interacting with the Website or the Services; (c) you acknowledge and agree that we may impose eligibility criteria to access certain functionality in respect of the Services which may require you to incur additional time and money costs; (d) you use and/or  interact with the Website and the Services for your own account and shall not do the same on behalf of any other entity or person; (e) your usage and/or interaction with the Website and the Services complies with applicable law and regulation in your jurisdiction, and the law and regulation of any jurisdiction to which you may be subject (including, but not limited to legal capacity and any other threshold requirements for using and/or interacting with the Website or the Services, interacting with other users of the Website or the Services, and any governmental or other consents that may need to be obtained; (f) all information you submit will be true, accurate, current, and complete (if you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to refuse or terminate your current or future use of the Website or the Services (or any portion thereof); (g) you will maintain the accuracy of such information and promptly update such information as necessary; (h) you have the legal capacity and you agree to comply with these Terms; (i) you are not a minor in the jurisdiction in which you reside; (j) you will not use the Website, the Services or the underlying smart contracts for any illegal and unauthorised purpose; (k) you will not use the Website or the Service or the underlying smart contracts for any commercial purpose (save as approved by us in writing); (l) your use of the Website, the Services and the underlying smart contracts will not violate any applicable law or regulation; and (m) any funds or digital assets you use to interact with the Website or the Services are not derived from or related to any unlawful activities, including but not limited to money laundering or terrorist financing and all applicable statutes of all jurisdictions in which you are located, resident, organised or operating, and/or to which it may otherwise be subject and the rules and regulations thereunder (collectively, the "Compliance Regulations"), and you will not use the Website, the Services or the underlying smart contracts to finance, engage in, or otherwise support any unlawful activities or in a manner which aids or facilitates another party in the same. To the extent required by applicable laws and regulations, you shall fully comply with all Compliance Regulations.

4.	RISK FACTORS

You acknowledge and agree that the Services are currently in the initial development stages and there are a variety of unforeseeable risks with utilising the Services or Website. In the worst scenario, this could lead to the loss of all or part of your digital assets associated with the Services. IF YOU DECIDE TO UTILISE SERVICES YOU EXPRESSLY ACKNOWLEDGE, ACCEPT AND ASSUME THE BELOW RISKS AND AGREE NOT TO HOLD JUPITER LOCK OR ANY OF THEIR RELATED PARTIES RESPONSIBLE FOR THE FOLLOWING RISKS:

4.1.	Third-party Risk
The Services rely on whole or partly, on third-party open and closed source software networks, and the continued development and support of third parties. There is no assurance or guarantee that those third parties will maintain their support of their software, which might have a material adverse effect on the Services. Further, where digital assets are locked as collateral for applications built with Jupiter Lock tools and/or are deployed by such third party applications towards third-party decentralized finance protocols to further generate yield, a failure or security incident in respect of such third-party protocol may result in users losing all or substantially all of their digital assets.

4.2.	No Insurance
Digital assets are not legal tender, are not backed by the government, and are not subject to the Deposit Insurance Scheme or protections under any banking or securities laws. Jupiter Lock is not a bank and does not offer fiduciary services, nor does it offer any security broking services.

4.3.	New Technical Risk
The software used for Jupiter Lock is new. While this software has been extensively tested, the underlying smart contracts and software used for the Services is still relatively new and could have bugs or security vulnerabilities. Further, the software is still under development and may undergo significant changes over time that may not meet users’ expectations.

4.4.	Risks
The underlying smart contracts run on a variety of supported blockchain networks, using specially-developed smart contracts. Accordingly, upgrades to the relevant blockchain network, a hard fork in the relevant blockchain network, re-organisations of blockchain structure or blocks, or a change in how transactions are confirmed on the relevant blockchain network may have unintended, adverse effects on the smart contracts built thereon, including Jupiter Lock software and smart contracts.

4.5.	Information Security Risk
Digital assets, and use of the Services may be subject to expropriation and/or theft. Hackers or other malicious groups or organizations may attempt to interfere with the Services in a variety of ways, including, but not limited to, malware attacks, denial of service attacks, consensus-based attacks, Sybil attacks, smurfing and spoofing. Furthermore, because the underlying blockchain networks comprise open-source software, there is the software underlying the Services may contain intentional or unintentional bugs or weaknesses that may negatively affect the Services or result in the loss of the user’s digital assets, the loss of the user’s ability to access or control their digital assets. In the event of such a software bug or weakness, there may be no remedy, and users are not guaranteed any remedy, refund or compensation.

4.6.	Regulatory risks
The regulatory status of digital assets, and distributed ledger technology is unclear or unsettled in many jurisdictions. While every effort has been taken to ensure that the Services are compliant with local laws, it is difficult to predict how or whether regulatory agencies may apply existing regulation with respect to the Services. It is likewise difficult to predict how or whether legislatures or regulatory agencies may implement changes to law and regulation affecting distributed ledger technology and its applications, including the Services. Regulatory actions could negatively impact Jupiter Lock in various ways, and thus the Services may not be available in certain areas.

4.7.	Taxation Risk
The tax characterization of digital assets, and the usage of the Services are uncertain. It is possible that the user's intended treatment of digital assets may be challenged. You must seek your own tax advice in connection with the Services provided by Jupiter Lock, which may result in adverse tax consequences to you, including, without limitation, withholding taxes, transfer taxes, value-added taxes, income taxes and similar taxes, levies, duties or other charges and tax reporting requirements.

4.8.	Additional conditions of usage of the Website and Services

Your usage of the Website and Services is subject to the following additional conditions:
(a)	Unlawful Activity: you agree not to engage, or assist, in any activity that violates any law, statute, ordinance, regulation, or sanctions program, including but not limited to the U.S. Department of Treasury’s Office of Foreign Assets Control (OFAC), or that involves proceeds of any unlawful activity.
(b)	Abusive Activity: you agree not to engage in any activity that poses a threat to Jupiter Lock or the Website, for example by distributing a virus or other harmful code, or through unauthorized access to the Website or other users’ digital assets.
(c)	Inappropriate Behaviour: you agree not to interfere with other users’ access to or use of the Services.
(d)	Communication: you agree not to communicate with other users for purposes of (1) sending unsolicited advertising or promotions, requests for donations, or spam; (2) harassing or abusing other users; (3) interfering with transactions of other users. You agree not to use data collected from the Website to contact individuals, companies, or other persons or entities outside the Website for any purpose, including but not limited to marketing activity.
(e)	Fraud: you agree not to engage in any activity which operates to defraud Jupiter Lock, other users, or any other person; or to provide any false, inaccurate, or misleading information to Jupiter Lock. 
(f)	Gambling: you agree not to utilize the Services to engage in any lottery, bidding fee auctions, contests, sweepstakes, or other games of chance.
5.	WEBSITE AVAILABILITY AND ACCURACY

5.1.	Access and Availability
Access to the Services may become degraded or unavailable on Jupiter Lock during times of significant volatility or volume. This could result in the inability to interact with Jupiter Lock, or third-party services for periods of time and may also lead to support response time delays. Users will, however, be able to access these third-party services through other means. Although we strive to provide you with excellent service, we do not guarantee that the Website or Services will be available without interruption and we do not guarantee that requests to interact with third-party services will be successful.

5.2.	Website Accuracy
Although we intend to provide accurate and timely information on the Website, the Website (including, without limitation, the Services and the content on the Website may not always be entirely accurate, complete or current and may further also include technical inaccuracies or typographical errors. In an effort to continue to provide you with as complete and accurate information as possible, information may, to the extent permitted by applicable law, be changed or updated from time to time without notice, including without limitation information regarding our policies, products and services. Accordingly, you should verify all information before relying on it, and all decisions based on information contained on the Website are your sole responsibility and we shall have no liability for such decisions. Links to third-party materials (including without limitation any websites) may be provided as a convenience but are not controlled by us. You acknowledge and agree that we are not responsible for any aspect of the information, content, or services contained in any such third-party materials accessible or linked to from the Website.

5.3.	Not a Backup or Storage Site
The Website is intended solely to provide you with a visual interface to access and use the Services. It is not intended for use as a data backup or storage site. You are solely responsible for ensuring that you maintain copies of your applications developed, code base, or other content. Except as may be required under applicable data privacy or other laws and regulations, Jupiter Lock is under no obligation to provide you with access to any data or other materials stored on the Website or to ensure their reliability or availability.

6.	CONSENT TO ELECTRONIC DISCLOSURES AND SIGNATURES

6.1.	General
Because Jupiter Lock operates only on the Internet, it is necessary for you to consent to transact business with us online and electronically. As part of doing business with us, therefore, we also need you to consent to our providing you certain disclosures electronically, either via our Website or to the email address (if applicable) you provide to us. By agreeing to these Terms, you agree to receive electronically all documents, communications, notices, contracts, and agreements arising from or relating to your use of the Website and Service.

6.2.	Scope of Consent
Your consent to receive disclosures and transact business electronically, and our agreement to do so, applies to any transactions to which such disclosures relate, whether between you and Jupiter Lock or a third party by and through the Service. Your consent will remain in effect for so long as you are a user and, if you are no longer a user, will continue until such a time as all disclosures relevant to Services received through the Website.

6.3.	Withdrawing Consent
You may withdraw your consent to receive agreements or disclosures electronically by contacting us at legal@jup.ag. However, once you have withdrawn your consent you will not be able to access the Services.

7.	INTELLECTUAL PROPERTY, COPYRIGHTS AND IDENTIFYING MARKS

7.1.	Jupiter Lock Intellectual Property 
You acknowledge that all Intellectual Property Rights in Jupiter Lock smart contracts, the Website, or any service/product thereon (including without limitation any information, licenses, business plans, data, patent disclosures, system applications, structures, models, flow charts, techniques, processes, compositions, compounds, software, programs, source code and object code, comments to the source or object code, specifications, documents, reports, presentations, test results, findings, ideas, knowhow, copyright, trade secrets, abstracts and/or summaries thereof) exclusively belongs and shall exclusively belong to Jupiter Lock, and you shall have no rights in or to such Intellectual Property Rights, save that you are granted a license during the term of this Agreement to utilise the published Jupiter Lock contracts issued under the relevant [BSL] License) at code repository [*], and subject always to the provisions of these Terms.

	To the extent any Jupiter Lock intellectual property rights are deemed to belong to you, you hereby irrevocably assigns and transfers to Jupiter Lock all right, title and interest in all such intellectual property rights, and agrees to execute all documents reasonably requested by Jupiter Lock for the purpose of perfecting such assignment and/or transfer and applying for and obtaining any domestic and foreign patent and copyright registrations.

7.2.	Limited License
All content on the Website, including but not limited to designs, text, graphics, pictures, video, information, software, music, sound and other files, and their selection and arrangement (the "Content"), are the proprietary property of Jupiter Lock with all rights reserved. No Content may be modified, copied, distributed, framed, reproduced, republished, downloaded, displayed, posted, transmitted, or sold in any form or by any means, in whole or in part, without Jupiter Lock's prior written permission, except as provided in the following sentence and except that the foregoing does not apply to your own User Content (as defined below) that you legally post on the Website. Provided that you are eligible for use of the Website, you are granted a limited license to access and use the Website and Services, and to download or print a copy of any portion of the Content solely for your use in connection with your use of the Website or Service, provided that you keep all copyright or other proprietary notices intact. Except for your own User Content (as defined below), you may not republish Content on any Internet, Intranet or Extranet site or incorporate the information in any other database or compilation, and any other use of the Content is strictly prohibited. Any use of the Website or the Content other than as specifically authorized herein, without the prior written permission of Jupiter Lock, is strictly prohibited and will terminate the license granted herein. Such unauthorized use may also violate applicable laws including without limitation copyright and trademark laws and applicable communications regulations and statutes. Unless explicitly stated herein, nothing in these Terms shall be construed as conferring any license to intellectual property rights, whether by estoppel, implication or otherwise. This license is revocable by us at any time without notice and with or without cause.

7.3.	Trademarks
Jupiter Lock and other Jupiter Lock graphics, logos, designs, page headers, button icons, scripts, and service names are registered trademarks, trademarks or trade dress of Jupiter Lock in Panama and/or other countries. Jupiter Lock's trademarks and trade dress may not be used, including as part of trademarks and/or as part of domain names, in connection with any product or service in any manner that is likely to cause confusion and may not be copied, imitated, or used, in whole or in part, without the prior written permission of Jupiter Lock. Jupiter Lock may, at its sole discretion, limit access to the Website by any users who infringe any intellectual property rights of Jupiter Lock or others.

7.4.	Copyright Complaints
If you believe that any material on the Website infringes upon any copyright which you own or control, you may send a written notification of such infringement to Jupiter Lock at legal@jup.ag.

7.5.	Suggestions
You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information about the Website or the Service ("Suggestions"), provided by you to Jupiter Lock are non-confidential and shall become the sole property of Jupiter Lock. Jupiter Lock shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Suggestions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.

8.	DATA PROTECTION AND SECURITY

8.1.	Loss or Compromise
Any loss or compromise of your electronic device or your security details may result in unauthorized access to your digital assets by third parties and the loss or theft of such assets.

8.2.	Shared Access
You should never allow remote access or share your computer screen with someone else when you are accessing the Services. Jupiter Lock will never under any circumstances ask you for your private keys or passwords, or to screen share or otherwise seek to access your computer or digital assets. You should not provide your details to any third party for the purposes of remotely accessing your computer or digital assets.

8.3.	Safety and Security of Your Computer and Devices
Jupiter Lock is not liable for any damage or interruptions caused by any computer viruses or other malicious code that may affect your computer or other equipment, or any phishing, spoofing or other attacks. We advise the regular use of a reputable and readily available virus screening and prevention software.

9.	USER FEEDBACK, QUERIES, COMPLAINTS, DISPUTES

9.1.	Contact Jupiter Lock
If you have feedback or general questions, please contact us via our User Support at legal@jup.ag. When you contact us please provide us with your name, email address, and any other information we may need to identify you, your transactions conducted, and digital assets held.

9.2.	Dispute Resolution
PLEASE READ THIS SECTION CAREFULLY BECAUSE IT CONTAINS CERTAIN PROVISIONS, SUCH AS A BINDING ARBITRATION SECTION AND CLASS ACTION WAIVER, WHICH AFFECT YOUR LEGAL RIGHTS. THIS SECTION REQUIRES YOU TO ARBITRATE CERTAIN DISPUTES AND CLAIMS WITH JUPITER LOCK AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM US.
Each party (i) waives all its respective right(s) to have any and all disputes, claims, suits, actions, causes of action, demands or proceedings (collectively, "Disputes") arising from or related to these Terms resolved in a court, and (ii) waive all its respective right(s) to have any Disputes heard before a court. Instead, each party shall arbitrate Disputes through binding arbitration (which is the referral of a Dispute to one or more persons charged with reviewing the Dispute and making a final and binding determination to resolve it instead of having the Dispute decided by a judge or jury in court).

Any Dispute arising out of or related to these Terms is personal to you and will be resolved solely through individual arbitration, and in no circumstances shall be brought as a class arbitration, class action or any other type of representative proceeding. There will be no class arbitration or arbitration in which an entity attempts to resolve a Dispute as a representative of another individual or group of individuals. Further, a Dispute cannot be brought as a class or other type of representative action, whether within or outside of arbitration, or on behalf of any other individual or group of individuals.

Any Dispute arising out of or in connection with these Terms (including without limitation the enforceability of this section or any question regarding its existence, validity or termination) shall be referred to and finally resolved by arbitration administered by Panama Conciliation and Arbitration Centre in accordance with its procedural rules for the time being in force. The tribunal shall consist of 1 arbitrator. The language of the arbitration shall be English.

Each party will notify the other party in writing of any Dispute within thirty (30) days of the date it arises, so that the Parties can attempt in good faith to resolve the Dispute informally. Notice to Jupiter Lock shall be sent by e-mail to Jupiter Lock at legal@jup.ag. Notice to you shall be either posted on the Website or, if available, will be sent by email to your email on record. Your notice must include (i) your name, postal address, email address and telephone number, (ii) a full and sufficient description of the nature or basis of the Dispute, and (iii) the specific relief that you are seeking. If you and Jupiter Lock cannot agree on how to resolve the Dispute within thirty (30) days after the date the notice is received by the applicable party, then either you or Jupiter Lock may, as appropriate and in accordance with this section, commence an arbitration proceeding or, to the extent specifically provided for in this section, file a claim in court.

The arbitrator does not have the authority to conduct a class arbitration or a representative or class action, which is prohibited by these Terms. The arbitrator may only conduct an individual arbitration and may not consolidate more than one individual’s claims, preside over any type of class or representative proceeding or preside over any proceeding involving more than one individual.

If any term, clause or provision of this section is held invalid or unenforceable, it will be held to the minimum extent applicable and required by law, and all other terms, clauses and provisions of this section will remain valid and enforceable. Further, the waivers set forth in this section are severable from the other provisions of these Terms and will remain valid and enforceable, except as prohibited by applicable law.

You agree that this section of these Terms has been included to rapidly and inexpensively resolve any disputes with respect to the matters described herein, and that this section shall be grounds for dismissal of any court action commenced by you with respect to a dispute arising out of such matters.

A printed version of these Terms shall be admissible in judicial or administrative proceedings.

9.3.	Disclaimers
None of Jupiter Lock, its parent, any of its affiliates, subsidiaries, providers or their respective officers, directors, employees, agents, independent contractors or licensors (collectively the "Indemnified Parties") guarantees the accuracy, adequacy, timeliness, reliability, completeness, or usefulness of the Services or the Content, and the Indemnified Parties disclaim liability for errors or omissions in the Content. This Website, the Services and all of the Content is provided "as is" and "as available," without any warranty, either express or implied, including the implied warranties of merchantability, fitness for a particular purpose, non-infringement or title. Without prejudice to the generality of the foregoing, Jupiter Lock provides no warranties as to the results of your use of the Services or Content, or any application development in connection therewith. The Indemnified Parties do not warrant that the Website is free of viruses or other harmful components. This does not affect those warranties which are incapable of exclusion, restriction or modification under the laws applicable to these Terms. Jupiter Lock cannot guarantee and does not promise any specific results from use of the Website and/or the Service.

9.4.	Availability
The Website and the Service may be temporarily unavailable from time to time for maintenance or other reasons. Jupiter Lock assumes no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of, user communications. Jupiter Lock is not responsible for any problems or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or on the Website or combination thereof, including injury or damage to users or to any other person's computer related to or resulting from participating or downloading materials in connection with the Website and/or in connection with the Service. Under no circumstances will Jupiter Lock be responsible for any loss or damage, including any loss or damage to any user Content, financial damages or lost profits, loss of business, or personal injury or death, resulting from anyone's use of the Website or the Service, any User Content or Third Party Content posted on or through the Website or the Service or transmitted to users, or any interactions between users of the Website, whether online or offline.

9.5.	Limitation on Liability
EXCEPT IN JURISDICTIONS WHERE SUCH PROVISIONS ARE RESTRICTED, IN NO EVENT WILL JUPITER LOCK OR ITS DIRECTORS, EMPLOYEES OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING FOR ANY LOST PROFITS OR LOST DATA ARISING FROM YOUR USE OF THE WEBSITE OR THE SERVICE OR ANY OF THE CONTENT OR OTHER MATERIALS ON OR ACCESSED THROUGH THE WEBSITE, EVEN IF JUPITER LOCK IS AWARE OR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, TO THE EXTENT PERMITTED BY APPLICABLE LAW JUPITER LOCK'S LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO JUPITER LOCK FOR THE SERVICES. IN NO CASE WILL JUPITER LOCK'S LIABILITY TO YOU EXCEED $200. YOU ACKNOWLEDGE THAT IF NO FEES ARE PAID TO JUPITER LOCK FOR THE SERVICE, YOU SHALL BE LIMITED TO INJUNCTIVE RELIEF ONLY, UNLESS OTHERWISE PERMITTED BY LAW, AND SHALL NOT BE ENTITLED TO DAMAGES OF ANY KIND FROM JUPITER LOCK, REGARDLESS OF THE CAUSE OF ACTION.

CERTAIN LOCAL, STATE OR FEDERAL LAWS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES OR LIMITATIONS ON IMPLIED WARRANTIES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.

9.6.	Governing Law; Venue and Jurisdiction
By visiting or using the Website and/or the Service, you agree that the laws of Panama, without regard to any principles of conflict of laws that would require or permit the application of the laws of any other jurisdiction, will govern these Terms. If you contract with any third party through Jupiter Lock, the terms of such contract will be governed by the contractual terms prescribed by such third party.

9.7.	Indemnity
You agree to indemnify and hold the Indemnified Parties, its subsidiaries and affiliates, and each of their directors, officers, agents, contractors, partners and employees, harmless from and against any loss, liability, claim, demand, damages, costs and expenses, including reasonable attorney's fees, arising out of any dispute with another user of the Website or any third party. You also agree to indemnify and hold the Indemnified Parties, its subsidiaries and affiliates and service providers, and each of its or their respective officers, directors, agents, joint venturers, employees and representatives, harmless from any claim or demand (including attorneys' fees and any fines, fees or penalties imposed by any regulatory authority) arising out of or related to your breach of these Terms or your violation of any law, rule or regulation, or the rights of any third party.

10.	GENERAL PROVISIONS

10.1.	Amendments
We may amend or modify these Terms by posting on the Website the revised Terms, and the revised Terms shall be effective at such time. If you do not agree with any such modification, your sole and exclusive remedy is to terminate your use of the Services and Website. You agree that we shall not be liable to you or any third party for any modification or termination of the Services, or suspension or termination of your access to the Services, except to the extent otherwise expressly set forth herein. If the revised Terms include a material change, we will endeavour to provide you advanced notice via the Website before the material change becomes effective.

10.2.	Force Majeure
Jupiter Lock shall not be liable for delays, failure in performance or interruption of service which result directly or indirectly from any cause or condition beyond our reasonable control, including but not limited to, significant market volatility, any delay or failure due to any act of God, act of civil or military authorities, act of terrorists, civil disturbance, war, strike or other labour dispute, fire, interruption in telecommunications or Internet services or network provider services, failure of equipment and/or software, other catastrophe or any other occurrence which is beyond our reasonable control and shall not affect the validity and enforceability of any remaining provisions.

10.3.	Links to Other Web Websites and Content
The Website contains (or you may be sent through the Website or the Services) links to other websites ("Third Party Websites"), as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, software and other content belonging to or originating from third parties (the "Third Party Content"). Such Third Party Websites and Third Party Content are not investigated, monitored or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third Party Websites accessed through the Website or any Third Party Content posted on the Website, including without limitation the content, accuracy, offensiveness, opinions, reliability or policies of or contained in the Third Party Websites or the Third Party Content. Inclusion of or linking to any Third Party Website or any Third Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Website and access Third Party Websites, you do so at your own risk and you should be aware that our terms and policies no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any site to which you navigate from the Website.

10.4.	Assignment
These Terms, or your rights and obligations hereunder, may not be transferred by you, but may be assigned by us without restriction (without having to seek your prior consent). Any attempted transfer or assignment by you in violation hereof shall be null and void. These Terms shall be binding and inure to the benefit of the parties hereto, our successors, and permitted assigns.

10.5.	No-Waiver
The failure of Jupiter Lock to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision in that or any other instance. If any provision of these Terms is held invalid, the remainder of these Terms shall continue in full force and effect. If any provision of these Terms shall be deemed unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from these Terms and shall not affect the validity and enforceability of any remaining provisions.

10.6.	Relationship of the parties
You agree and understand that nothing in these Terms shall be deemed to constitute, create, imply, give effect to, or otherwise recognize a partnership, employment, joint venture, or formal business entity of any kind; and the rights and obligations of the parties shall be limited to those expressly set forth herein. Except for the indemnity and exculpation provisions herein, nothing expressed in, mentioned in, or implied from these Terms is intended or shall be construed to give any person other than the parties hereto any legal or equitable right, remedy, or claim under or in respect to these Terms to enforce any of its terms which might otherwise be interpreted to confer such rights to such persons, and these Terms and all representations, warranties, covenants, conditions and provisions hereof are intended to be and are for the exclusive benefit of you and us.

10.7.	Notices
To give us notice under these Terms, the user must contact Jupiter Lock by email at legal@jup.ag.

10.8.	Entire Agreement
These Terms and our Privacy Policy, incorporated by reference herein, comprise the entire understanding and agreement entered into by and between you and us as to the subject matter hereof, and supersede any and all prior discussions, agreements, and understandings of any kind (including without limitation any prior versions of these Terms), as well as every nature between and among you and us.

10.9.	Severability
If any provision of these Terms shall be determined to be invalid or unenforceable under any rule, law, or regulation of any local, state, or federal government agency, such provision will be changed and interpreted to accomplish the objectives of the provision to the greatest extent possible under any applicable law and the validity or enforceability of any other provision of these Terms shall not be affected. If such construction is not possible, the invalid or unenforceable portion will be severed from these Terms but the rest of these Terms will remain in full force and effect.

10.10.	Survival
The following provisions of these Terms shall survive termination of your use or access to the Website: the sections concerning Intellectual Property, Disclaimer of Warranties, Limitation on Liability, Waiver, Applicable Law and Dispute Resolution, and General Provisions, and any other provision that by its terms survives termination of your use or access to the Website.

10.11.	English language
Notwithstanding any other provision of these Terms, any translation of these Terms is provided for your convenience. The meanings of terms, conditions, and representations herein are subject to their definitions and interpretations in the English language. In the event of conflict or ambiguity between the English language version and translated versions of these terms, the English language version shall prevail. You acknowledge that you have read and understood the English language version of these Terms.

</details>
