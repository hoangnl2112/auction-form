<template>
  <div id="app">
    <nav class="header">
      <img class="header-logo" src="./assets/logo.png"/>
      <ul class="header-list">
        <li>Developer Hub</li>
        <li>Documention</li>
        <li>One Pagers</li>
        <li>Token metric</li>
      </ul>
      <a class="header-btn" href="#">Let's chat now</a>
    </nav>
    <div class="hero">
      <h1 class="hero-title">
        Support the Pokasmith <br> Parachain Auction.
      </h1>
      <p class="hero-subtitle">
        Karura is the decentralized financial hub of Kusama. The blockchain, optimized for DeFi and <a href="#">powered by KAR,</a> was built to
        enable scalable financial applications with micro gas fees and communication with other networks on Kusama, Polkadot, and beyond.
      </p>
      <a class="hero-btn" href="#" target="_blank" rel="noopener noreferrer">Learn more</a>
    </div>
    <div class="explanation">
      <h2 class="title">What is a Parachain Auction and how <br> does it work?</h2>
      <div class="content">
        <div class="item">
          <div class="title">Gaining a slot on Kusama</div>
          <p class="detail">Kusama is a multi-chain network based on the Polkadot code that allows blockchains to connect for interoperability, scalability, and plug-and-play network security. To gain a slot on Kusama’s network, all parachains must win an auction. Karura is crowdsourcing KSM to use in the upcoming parachain auction.</p>
        </div>
        <div class="item">
          <div class="title">Crowdloan module to bootstrap Karura’s parachain auction</div>
          <p class="detail">Karura’s crowdsourcing event will be used to participate in the Kusama parachain auction. In return for the KSM contributed by the community, Karura will issue KAR, Karura’s native token when Karura wins the parachain auction. Learn more.</p>
        </div>
        <div class="item">
          <div class="title">Karura launches after winning the auction</div>
          <p class="detail">After a successful auction, Karura will launch our mainnet on Kusama following the auction and become an the DeFi hub of Kusama as planned. Learn more</p>
        </div>
      </div>
    </div>
    <div class="row-flex">
      <div class="counter">
        <div class="row-flex">
          <h1 class="title">Crowdloan <br> Registration</h1>
          <div class="open">
            <img alt src="./assets/fire.svg"/>
            Open now
          </div>
        </div>
        <p class="subtitle">You can now connect your Polkadot.js extension to register with your email, KSM address, and referral code (optional). Registering will allow you to skip these steps when the crowdloan begins.</p>
        <p class="subtitle">Your email will be used to inform you of any special bonuses, important deadlines, and upcoming news related to the parachain auction process.</p>
        <div>
          <h2 class="number">{{ registered }}</h2>
          <span>Registered</span>
        </div>
      </div>
      <div class="form">
        <form id="form">
          <a href="https://polkadot.js.org/extension/" target="_blank" rel="noopener noreferrer">Get Polkadot.js extension?</a>
          <div>
            <label>Participating KSM Address <span style="color: #e53e3e">*</span></label>
            <button style="width: 100%">Connect Polkadot.js Extension</button>
            <div class="row-flex">
              <a href="https://wiki.acala.network/karura/ksm-address/check-ksm-addr" target="_blank" rel="noopener noreferrer">Get KSM Address manually</a>
              <switch-btn/>
            </div>
          </div>
          <div>
            <label>Email <span style="color: #e53e3e">*</span></label>
            <input placeholder="Enter your email" type="email" v-model="email"/>
          </div>
          <div>
            <label>Reference code (Optional)</label>
            <input placeholder="Enter your reference code" v-model="referCode"/>
          </div>
          <div class="rule">
            <checkbox/>
            <div>I have read and accept the
              <a class="css-7rgjox" target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy.</a>
              and I agree to receive email communications about Karura and Acala, including exclusive launch updates and liquidity provider program.
            </div>
          </div>
          <button class="btn">Notify me</button>
        </form>
      </div>
    </div>
    <div class="crowdloan">
      <h2 class="title">What is a Crowdloan?</h2>
      <div class="row-flex align-items-center">
        <div class="item">
          <img alt src="./assets/crowdloan.svg"/>
          <div class="title">Crowdsourced Network Security</div>
          <p>KSM holders lock their tokens on Kusama for a period of time (6, 12 or 24 months) to help Karura lease a parachain slot and gain access to Kusama’s plug-and-play security. In return for KSM holders’ loan, KAR (Karura’s native token) will be distributed to participants.
          </p>
        </div>
        <div class="item">
          <img alt src="./assets/crowdloan.svg"/>
          <div class="title">Community-backed Launch</div>
          <p>Tokens will be returned to holders following parachain lease, with a guarantee of receiving the KSM principal back. It can be seen as a community-backed launch for individuals looking to contribute to the evolution of Kusama’s network and parachains.
          </p>
        </div>
        <div class="item">
          <img alt src="./assets/crowdloan.svg"/>
          <div class="title">Fair Network Bootstrapping</div>
          <p>The KAR distributed to participants will be vested over a period of time, but the full balance can be used to participate in governance and other activities besides transferring. This helps us to build a strong and well-intentioned community from the ground up.
          </p>
        </div>
      </div>
    </div>
    <div class="section">
      <h2 class="title">Why host a Crowdloan and <br/> how does it work?</h2>
      <div class="section-main">
        <img alt src="./assets/mask-crowdloan.svg"/>
        <div>
          <div class="section-item">
            <div class="title">Parachain Auction</div>
            <p>Kusama is a sharded, multi-chain network that allows blockchains to connect for interoperability, scalability, and plug-and-play network security. Kusama is the cousin network of Polkadot. To join Kusama’s network, all parachains must participate in and win a unpermissioned candle auction to secure a slot on the network. Parachains can choose to raise KSM in a variety of ways in order to participate in the auction.
            </p>
          </div>
          <div class="section-item">
            <div class="title">Karura’s Crowdloan</div>
            <p>Karura has chosen to host an Crowdloan to trustlessly crowdsource KSM, which will be used to participate in the Kusama parachain auction. These KSM will be bonded, or ‘locked’, in the Kusama Relay Chain for the duration of Karura’s parachain lease.
            </p>
          </div>
          <div class="section-item">
            <div class="title">Karura (KAR) Distribution</div>
            <p>In the event Karura succeeds in its auction bid and secures a Kusama parachain lease, and network genesis of Karura occurs on Kusama, Karura will gift KAR to Karura supporters’. Kusama supporters will be distributed KAR in the same account they used to bond KSM in support of Karura’s parachain lease. The amount of KAR distributed is dependant on the level of support provided.
            </p>
          </div>
          <div class="section-item">
            <div class="title">Acala & Karura - Sister Networks</div>
            <p>Acala will operate its DeFi parachains on Polkadot and Kusama to serve both communities. Acala and Karura will operate in parallel, and will eventually be interoperable once Polkadot and Kusama are bridged.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="participation">
      <h2 class="title">How do I participate?</h2>
      <div class="steps">
        <div class="step-1">
          <div class="detail">
            <p>Step 1</p>
            <p>Learn</p>
            <div>
              <a href="https://medium.com/acalanetwork/karuras-approach-to-the-upcoming-parachain-lease-offering-plo-on-kusama-12fbf09ee463" target="_blank" rel="noopener noreferrer" title="Learn">Learn</a>
              how the Crowdloan works.
            </div>
          </div>
        </div>
        <div class="step-2">
          <div class="detail">
            <p>Step 2</p>
            <p>Follow us</p>
            <div>Join our <a href="https://discord.gg/HpsZx5r" target="_blank" rel="noopener noreferrer">Discord</a>, <a href="https://acala.network/newsletter-sign-up.html" target="_blank" rel="noopener noreferrer">Newsletter</a>, <a href="https://twitter.com/karuranetwork" target="_blank" rel="noopener noreferrer">Twitter</a>, and <a href="https://t.me/karuranetwork"  target="_blank" rel="noopener noreferrer">Telegram</a> for updates.</div>
          </div>
        </div>
        <div class="step-3">
          <div class="detail">
            <p>Step 3</p>
            <p>Unbond your KSM</p>
            <div>If your KSM are bonded, you will need to unbond your KSM at least 7 days before the Crowdloan start date</div>
          </div>
        </div>
        <div class="step-4">
          <div class="detail">
            <p>Step 4</p>
            <p>Participate</p>
            <div>When the Crowdloan starts, join the action on this acala.network website, Polkadot.js, Polkawallet.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="faq">
      <qa-item/>
    </div>
  </div>
</template>

<script>

import Checkbox from "./components/Checkbox";
import QaItem from "./components/QaItem";
import SwitchBtn from "./components/SwitchBtn";
export default {
  name: 'App',
  components: {SwitchBtn, QaItem, Checkbox},
  data() {
    return {
      registered: 11240,
      email: '',
      referCode: '',
      scroll: 0
    }
  },
  created() {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0f133e;
  color: #fff;
}

@import "style/style.css";
</style>
