<template>
  <div>
    <div class="hero">
      <h1 class="hero-title">
        Join PolkaSmith on Kusama <br> Parachain Auction
      </h1>
      <p class="hero-subtitle">
        PolkaSmith is the one-stop production hub for DeFi and NFT dApps on Kusama. It aims to provide all the necessary features, services, integrations, and tools for all DeFi and NFT experiments, innovations, and real-world solutions. PolkaSmith is no newcomer but a canary network of PolkaFoundry on Kusama. Learn more about PolkaFoundry here.
      </p>
      <a class="hero-btn" href="https://polkafoundry.com/" target="_blank" rel="noopener noreferrer">Learn more about PolkaFoundry</a>
    </div>
    <div class="explanation" id="explanation">
      <h2 class="title">About Kusama Parachain Slot Auction</h2>
      <div class="content">
        <div class="item">
          <div class="title">Prize</div>
          <p class="detail">Kusama (canary network of Polkadot) is a multichain Network for Radical Innovation.
            It serves as a Relay chain that interconnects all parallel chains (parachains) in its ecosystem. To reasonably determine which blockchains get to leverage on Kusama (and on Polkadot in the future), the networks use Parachain Slot Auctions. Getting a parachain slot on Kusama Network, projects like PolkaSmith can access Polkadot’s unprecedented interoperability, on-chain governance, scalability, and many other benefits.
          </p>
        </div>
        <div class="item">
          <div class="title">Bidding Methods</div>
          <p class="detail">Parachain teams make an offer or bid in the auction by specifying: (1) the slot range that they want to lease,  ranging from 1-8 lease period (s) (each lease period is of 6 weeks); (2) the amount of $KSM tokens willing to lock for the duration of the chosen range. A Verifiable Random Function (VRF) of the Kusama network will determine a random day or date to end the auction. Once the auction ends, the winning parachain will be automatically onboarded at the beginning of the lease.
          </p>
        </div>
        <div class="item">
          <div class="title">Crowdloan</div>
          <p class="detail">Kusama allows parachains to source KSM for their parachain bids in a decentralized crowdloan directly on Kusama or a 3rd-party platform. In crowdloan, KSM holders can contribute their KSM to support the project they believe should receive a parachain slot. In return, the project provides rewards to its supporters. If the project wins, the bonded DOT or KSM is locked by the network for the duration of the parachain slot, after which the tokens are unlocked and may be reclaimed by those who contributed.</p>
        </div>
      </div>
      <div class="notice">
        Get to know more about Kusama Parachain Slot Auction
        <a href="https://kusama.network/auctions" target="_blank" rel="noopener noreferrer">here.</a>
      </div>
    </div>
    <div class="row-flex r">
      <div class="counter">
        <div>
          <div class="open">
            <img alt src="../assets/fire.svg"/>
            Open now
          </div>
          <h1 class="title">PolkaSmith Crowdloan <br> Registration</h1>
        </div>
        <p class="subtitle">Register with your email, Kusama address, and referral code. Please fill in your email exactly to receive updates about special bonuses, important deadlines, and upcoming news related to the parachain auction process. You can use the referral code to claim your Referral reward, in other words, to gain more $PKF.
        </p>
        <div style="margin-top: 24px">
          <h2 class="number">{{ registered | displayNumber }}</h2>
          <span>Registered</span>
        </div>
      </div>
      <div class="form">
        <Form/>
      </div>
      <div class="mask-dot left"></div>
      <div class="mask-dot right"></div>
    </div>
    <div class="crowdloan">
      <h2 class="title">PolkaSmith Auction Plan</h2>
      <div class="grid">
        <div class="item">
          <div class="title">1st - 8th</div>
          <div class="subtitle">Parachain Slot</div>
          <p>PolkaSmith will participate in 1st-8th slot auctions to win. In other words, we aim to lease a parachain slot for 48 weeks (each lease period is six weeks). Understanding that competition for parachain is intense, if PolkaSmith doesn’t win the first auction, we will keep bidding until we won a slot and only give up after N rounds (TBA).
          </p>
        </div>
        <div class="item">
          <div class="title">100 PKS<span class="small"> / 1 KSM</span></div>
          <div class="subtitle">Winning Rewards</div>
          <p>If PolkaSmith wins, every KSM that supports PolkaSmith in the Kusama Parachain Slot auction through the crowdloan will be entitled to 100 $PKS as a reward. PKS is the native token of PolkaSmith, which you can claim from PKF at a 1:1 ratio. Note that if PolkaSmith wins Kusama Slot, the value for PKF may scale significantly.
          </p>
        </div>
        <div class="item">
          <div class="title">50 ePKF<span class="small"> / 1 KSM</span></div>
          <div class="subtitle">Whether Win or Lose</div>
          <p>ePKF is the “equivalent PKF” token on our launchpad, Red Kite, which means even if you don't stake any PKF on Red Kite, you can get the same tier benefits when owning a corresponding amount of ePKF. For example, owning 500 ePKFs gives you all the Dove tier benefits (including joining IDOs) without staking 500 PKFs. Note: This reward only applies to crowdloan on Red Kite.
          </p>
        </div>
        <div class="item">
          <div class="title">0.5<span class="small"> %</span></div>
          <div class="subtitle">Referrals Rewards</div>
          <p>The reward is also exclusive for crowdloan on Red Kite. Community members of PolkaFoundry/PolkaSmith can earn some PKF directly by referring friends to join the project’s crowdloan on Red Kite. Each referrer and the referred person will receive the amount of PKF equivalent to 0.5% of the referred person’s auction incentives.
          </p>
        </div>
        <div class="item">
          <div class="title">7,000,000 PKS</div>
          <div class="subtitle">Prize Pool</div>
          <p>The PolkaSmith’s prize tool for Kusama Parachain Slot Auction is worth 7,000,000 PKS, equivalent to 7,000,000 PKF, 3.5% of PKF’s total supply (200,000,000 PKF). That means when the KSM in the PolkaSmith crowdloan reaches 70,000, there are no more PKS that can be distributed to contributors and we will stop receiving contributions.
          </p>
        </div>
        <div class="item">
          <div class="title">Rewards <br/>Distribution</div>
          <p>As soon as contributors join the PolkaSmith crowdloan, 100% ePKF rewards will be delivered immediately. After PolkaSmith wins a parachain slot, 35% of the PKS tokens in the reward pool will go to the contributors' wallet addresses. The remaining 65% of PKS tokens will be vested over 11 months.
          </p>
        </div>
      </div>
    </div>
    <div class="section">
      <h2 class="title">Crowdloan Participation Methods</h2>
      <div class="section-main">
        <div class="section-item">
          <div class="step">STEP 1</div>
          <div class="title">Register and Subscribe</div>
          <p>After your registration, we will inform you of PolkaSmith's latest auction plan through email. You may also
            want to subscribe to our
            <a href="https://twitter.com/PolkaFoundry" target="_blank">Twitter</a>, <a href="https://t.me/PolkaFoundryANN" target="_blank">Telegram</a>
            and <a href="https://medium.com/polkafoundry/tagged/polkafoundry" target="_blank">Medium</a> for PolkaSmith and PolkaFoundry for updates.
          </p>
          <img style="margin-top: 12px" alt src="../assets/following.png"/>
        </div>
        <div class="section-item">
          <div class="step">STEP 2</div>
          <div class="title">Prepare your KSM</div>
          <p>If your KSM are bonded, you will need to unbond your KSM at least 7 days before the crowdloan start date</p>
          <div style="flex: 1 1 0"/>
          <img style="margin-top: 12px" alt src="../assets/ksm.png"/>
        </div>
      </div>
      <div class="section-item">
        <div class="step">STEP 3</div>
        <div class="title">Participation</div>
        <p>When the crowdloan starts, join the action on any of our participation channels (mentioned below).</p>
        <div class="channels">
          <a class="channel" href="https://redkite.polkafoundry.com/" target="_blank">
            <img alt src="../assets/redkite.png"/>
            <div>
              <p>Redkite</p>
              <p>Upcoming</p>
            </div>
          </a>
          <a class="channel" href="https://kusama.network" target="_blank">
            <img alt src="../assets/kusama.png"/>
            <div>
              <p>Kusama</p>
              <p>Upcoming</p>
            </div>
          </a>
          <div class="channel">
            <img alt src="../assets/exchange.png"/>
            <div>
              <p>Top-tier exchange</p>
              <p>TBA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="faq">
      <div class="title"></div>
      <qa-item v-for="(qa, i) in qas" :key="i" :q="qa.q" :a="qa.a" :note="qa.note"/>
      <div class="mask-dot left"></div>
      <div class="mask-dot right"></div>
    </div>
    <div class="subscribe">
      <img alt src="../assets/logo2.png"/>
      <div class="subtitle">Follow us on social media to hear about Polkasmith <br> updates and events.</div>
<!--      <div class="subscribe-form">-->
<!--        <input placeholder="Enter your email" v-model="subscribe"/>-->
<!--        <button class="subscribe-btn">Subscribe</button>-->
<!--      </div>-->
      <div class="subscribe-info" style="margin-top: 0">
<!--        <p>Community</p>-->
        <div class="row-flex">
          <a href="https://t.me/PolkaFoundryANN" target="_blank"><img alt src="../assets/telegram.svg"/></a>
          <a href="https://twitter.com/PolkaFoundry" target="_blank"><img alt src="../assets/twitter.svg"/></a>
          <a href="https://medium.com/polkafoundry/tagged/polkafoundry" target="_blank"><img alt src="../assets/medium.svg"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Form from '@/components/Form';
import { Count } from '@/services/auctions';
import QaItem from "@/components/QaItem";
export default {
  name: "Home",
  components: {QaItem, Form},
  filters: {
    displayNumber(v) {
      return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  data() {
    return {
      registered: 0,
      accounts: [],
      account: null,
      address: '',
      manual: false,
      email: '',
      referCode: '',
      qas: [
        {
          q: 'What is the difference between PolkaSmith and PolkaFoundry?',
          a: 'PolkaFoundry is implemented on the Polkadot to serve enterprises and B2B applications that require high stability and dependability. Meanwhile, PolkaSmith, a canary network of PolkaFoundry implemented on Kusama, is more suitable for early-stage startups that need to grow quickly and easily experiment with bold new ideas.',
        },
        {
          q: 'Has PolkaSmith launched?',
          a: 'Not yet. Even though we have our testnet and all the technical aspects ready, we will have to wait for a parachain slot to bring into practice. We will launch PolkaSmith once we win a parachain slot on Kusama Network.'
        },
        {
          q: 'Why does PolkaSmith compete for the Kusama Parachain slot?',
          a: 'For PolkaFoundry and PolkaSmith, winning a parachain slot on Kusama is very important to ensure all the products developing on PolkaFoundry can run smoothly before the official deployment on Polkadot.'
        },
        {
          q: 'What is the timeline for PolkaSmith crowdloan?',
          a: 'PolkaSmith crowdloan on Kusama will begin once the Kusama parachain slot auction is open. That date is not what we can decide. However, our crowdloan on Red Kite and 3rd-party platforms will be announced and implemented soon, even before the auction. Please stay tuned on our <a href="https://twitter.com/PolkaFoundry" target="_blank">Twitter</a>, <a href="https://t.me/PolkaFoundryANN" target="_blank">Telegram</a> and <a href="https://medium.com/polkafoundry/tagged/polkafoundry" target="_blank">Medium</a>.'
        },
        {
          q: 'Can I use Ethereum or BSC addresses to participate in the PolkaSmith crowdloan?',
          a: 'No. To join any crowdloan for Kusama Parachain auctions, contributors must use the Kusama address.'
        },
        {
          q: 'Will I get ePKF and referral rewards if I join PolkaSmith crowdloan on Kusama or 3rd-party exchange platforms?',
          a: 'Unfortunately, the answer is no. ePKF and referral rewards are exclusive rewards given to contributors who join crowdloan on our launchpad, Red Kite. The reason for this privilege is the KSM locking period. Crowdloan on Red Kite will start sooner, and we will ask contributors to keep their KSM locked even if we don’t win the first auction since we will keep bidding the next rounds. Meanwhile, Kusama and 3rd-party platforms will automatically unlock your KSM every time the project fails an auction. Therefore, if you are committed to PolkaSmith crowdloan and interested in ePKF along with referral rewards, we recommend you join crowdloan on Red Kite.'
        },
        {
          q: 'If PolkaSmith wins, how long will my KSM be locked?',
          a: 'No matter what participation channels you join our crowdloan, if PolkaSmith wins a parachain slot, your KSM will be locked throughout the PolkaSmith slot range. Our slot range is 48 weeks starting from the day PolkaSmith wins.'
        },
        {
          q: 'If PolkaSmith loses, will my KSM be locked?',
          a: 'If you join PolkaSmith crowdloan on Kusama or 3rd-party platforms, according to their regulation, they will immediately unlock your KSM after PolkaSmith loses an auction. On the other hand, PolkaSmith supporters on Red Kite will still have their KSM in lock-up positions so that PolkaSmith can continue bidding in the subsequent rounds. In exchange, PolkaSmith rewards supporters on Red Kite special treatment, including ePKF and referral rewards. In a worst-case scenario, PolkaSmith has to stop crowdloan after failing N auctions (we will decide N later); we will return KSM for all contributors. Note: supporters on Red Kite still get to keep their ePKF.'
        },
        {
          q: 'How to swap my PKS reward to PKF?',
          a: 'We will provide a bridge to swap PKS to PKF at a 1:1 ratio. Then, you can trade PKF on Uniswap or Gate.io. We will announce this in detail later. Please stay tuned on our <a href="https://twitter.com/PolkaFoundry" target="_blank">Twitter</a>, <a href="https://t.me/PolkaFoundryANN" target="_blank">Telegram</a> and <a href="https://medium.com/polkafoundry/tagged/polkafoundry" target="_blank">Medium</a>.'
        }
      ],
      subscribe: '',
      interval: null
    }
  },
  async created() {
    const res = await Count();
    this.registered = res.total;
    this.interval = setInterval(async () => {
      const res = await Count();
      this.registered = res.total;
    }, 30 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    showError(error) {
      console.log(error)
    },
    scrollNext() {
      const next = document.getElementById('explanation')
      const y = next.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }
}

</script>

<style scoped>

</style>