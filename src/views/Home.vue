<template>
  <div>
    <div class="hero">
      <h1 class="hero-title">
        Join PolkaSmith on Kusama <br> Parachain Auction
      </h1>
      <p class="hero-subtitle">
        PolkaSmith is the one-stop production hub for DeFi and NFT dApps on Kusama. Its aim is to provide all the
        necessary features, services, integrations, and tools for all DeFi and NFT experiments, innovations, and
        real-world solutions. PolkaSmith is no newcomer, but actually a canary network of PolkaFoundry on Kusama.
      </p>
      <a class="hero-btn" href="#" target="_blank" rel="noopener noreferrer">Learn more</a>
    </div>
    <div class="explanation">
      <h2 class="title">About Kusama Parachain Slot Auction</h2>
      <div class="content">
        <div class="item">
          <div class="title">Prize</div>
          <p class="detail">Kusama is the canary network of Polkadot, a scalable heterogeneous multi-chain blockchain
            which consists of “relay chain + parachain”. Therefore, Kusama will roll out parachain auctions first for
            testing and optimization. To become a parachain on Kusama, projects like Polkasmith can access Polkadot’s
            security, cross-chain interoperability, on-chain governance, fork-free on-chain upgrade, scalability, low
            commission and many other benefits. </p>
        </div>
        <div class="item">
          <div class="title">Bidding Methods</div>
          <p class="detail">Parachain teams bid in the auction by specifying: (1) the slot range that they want to
            lease, ranging from 1-8 lease period (each lease period is 6 weeks); (2) the amount of $KSM tokens willing
            to lock for the duration of the chosen range. The winning parachain is automatically on boarded at the start
            of the lease. The KSM amount that was bid remains locked for the duration of the lease, after which it can
            be unlocked.
          </p>
        </div>
        <div class="item">
          <div class="title">Crowdloan</div>
          <p class="detail">Anyone can create a new crowd loan campaign for a parachain slot. In crowdloan, contributors
            agree to lock up their own $KSM to support a project winning a parachain slot. Tokens will be returned to
            holders following the parachain lease. Teams can reward their contributors however they see fit, and can
            structure their crowdloan in various ways, hosting it either natively on Kusama or on a 3rd-party
            platform.</p>
        </div>
        <div class="divider"></div>
        <div class="notice">
          Get to know more about Kusama Parchain Slot Auction
          <a href="#" target="_blank">Click here</a>
        </div>
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
        <p class="subtitle">Register with your email, Kusama address and referral code. Your email will be used to
          inform you of any special bonuses, important deadlines, and upcoming news related to the parachain auction
          process. The referral code will be used to claim your Referrals reward, in other words, to gain more $PKF.
        </p>
        <div style="margin-top: 24px">
          <h2 class="number">{{ registered }}</h2>
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
      <h2 class="title">PolkaSmith Crowd Loan Reward</h2>
      <div class="row-flex align-items-center">
        <div class="item">
          <img alt src="../assets/reward1.svg"/>
          <div class="title">$PKF Reward</div>
          <p>Every KSM that supports PolkaSmith in the Kusama Parachain Slot auction through the Crowdloan will be
            entitled to a decent number of $PKF as rewards (TBA). Note that if PolkaSmith wins Kusama Slot, the value
            for $PKF may scale significantly.</p>
        </div>
        <div class="item">
          <img alt src="../assets/reward2.svg"/>
          <div class="title">Referrals</div>
          <p>If a crowdloan participant invites an additional participant who makes a contribution, they will each
            receive an additional reward (TBA). E.g. you invite your friend, so additional reward, let say equivalent to
            10% your friend incentives split for both you and your friend.</p>
        </div>
        <div class="item">
          <img alt src="../assets/reward3.svg"/>
          <div class="title">Other perks</div>
          <p>PolkaSmith supporters will get up to <br/> 25 ePKF/ 1 KSM and gain high tier tickets for IDOs in the Red
            Kite launchpad (a sister network of PolkaSmith). In the case PolkaSmith fails to lease a parachain slot,
            this perk is still guaranteed. (ePKF = Equivalent PKF).</p>
        </div>
      </div>
    </div>
    <div class="section">
      <h2 class="title">Crowdloan <br/>Participation Methods</h2>
      <img alt src="../assets/mask-crowdloan.svg"/>
      <div class="section-item">
        <div class="title">STEP 1- Register and Subscribe</div>
        <p>After your registration, we will inform you of PolkaSmith's latest auction plan through email. You may also
          want to subscribe to our
          <a href="#" target="_blank">Twitter</a>, <a href="#" target="_blank">Telegram</a>
          and <a href="#" target="_blank">Medium</a> for PolkaSmith and PolkaFoundry for updates.
        </p>
      </div>
      <div class="section-item">
        <div class="title">STEP 2- Prepare your KSM</div>
        <p>If your KSM are bonded, you will need to unbond your KSM at least 7 days before the Crowdloan start date</p>
      </div>
      <div class="section-item">
        <div class="title">STEP 3 - Participation</div>
        <p>When the Crowdloan starts, join the action on any of our participation channels (mentioned below).</p>
      </div>
    </div>
    <div class="participation">
      <h2 class="title">Participation channels</h2>
      <div class="channels">
        <div class="channel">
          <img alt src="../assets/redkite.png"/>
          <div>
            <p>Redkite</p>
            <p>Upcoming</p>
          </div>
        </div>
        <div class="channel">
          <img alt src="../assets/kusama.png"/>
          <div>
            <p>Kusama</p>
            <p>Upcoming</p>
          </div>
        </div>
        <div class="channel">
          <img alt src="../assets/exchange.png"/>
          <div>
            <p>Top-tier exchange</p>
            <p>TBA</p>
          </div>
        </div>
        <div class="channel">
          <img alt src="../assets/redkite.png"/>
          <div>
            <p>Redkite</p>
            <p>Upcoming</p>
          </div>
        </div>
      </div>
    </div>
    <div class="faq">
      <div class="title">Frequently Asked Questions</div>
      <qa-item v-for="(qa, i) in qas" :key="i" :q="qa.q" :a="qa.a" :note="qa.note"/>
      <div class="mask-dot left"></div>
      <div class="mask-dot right"></div>
    </div>
    <div class="subscribe">
      <img alt src="../assets/logo2.png"/>
      <div class="subtitle">Subscribe to the newsletter to hear about Polkasmith <br> updates and events.</div>
      <div class="subscribe-form">
        <input placeholder="Enter your email" v-model="subscribe"/>
        <button class="subscribe-btn">Subscribe</button>
      </div>
      <div class="subscribe-info">
        <p>Comunity</p>
        <div class="row-flex">
          <a href="#" target="_blank"><img alt src="../assets/telegram.svg"/></a>
          <a href="#" target="_blank"><img alt src="../assets/twitter.svg"/></a>
          <a href="#" target="_blank"><img alt src="../assets/linkedin.svg"/></a>
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
  data() {
    return {
      registered: '11,240',
      accounts: [],
      account: null,
      address: '',
      manual: false,
      email: '',
      referCode: '',
      qas: [
        {
          q: 'When is the PolkaSmith (PolkaFoundry on Kusama) Crowdloan?',
          a: 'This is technically dependent on the Polkadot/Kusama parachain auction readiness. Subscribe to our Twitter, Telegram and Medium for PolkaSmith for updates.'
        },
        {
          q: 'What does it mean to unbond my KSM, and how do I do it?',
          a: 'When nominating on Kusama, you have a delayed exit period, called the unbonding period, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed. Read more and find instructions on the Kusama wiki.'
        },
        {
          q: 'Do I have to unbond my KSM if they are on an exchange?',
          a: 'Not necessarily. You need to contact your exchange to find out how to participate directly on the exchange. In case it is not supported on your exchange, you would need to unbound, transfer your KSM to polkadot-js extension wallet and use one of the aforementioned methods to participate.'
        },
        {
          q: 'My friend filled out my referral code. Will we both get $PKF?',
          a: 'Yes.'
        },
        {
          q: 'Can the pledged KSM be withdrawn at any time?',
          a: 'The KSM pledged by ordinary users will be locked. After the slot auction is over, KSM will return the original way to the user.',
          note: 'If PolkaSmith wins the slot auction, the KSM of each node will continue to lock up positions.'
        },
        {
          q: 'Will my KSM be returned after the parachain lease ends?',
          a: 'Yes, your KSM will be automatically returned to you when the parachain lease ends.'
        },
        {
          q: 'What if PolkaSmith doesn’t win the parachain auction - what happens to my KSM?',
          a: 'If PolkaSmith does not win the initial auction, it will continue to bid in the subsequent auctions. If PolkaSmith fails to win any auction, then it will end the crowdloan and return all funds to holders.'
        },
        {
          q: 'Where to trade my $PKF reward?',
          a: 'In Uniswap or Gate.io.'
        }
      ],
      subscribe: ''
    }
  },
  async created() {
    const res = await Count();
    this.registered = res.total;
  },
  methods: {
    showError(error) {
      console.log(error)
    }
  }
}

</script>

<style scoped>

</style>