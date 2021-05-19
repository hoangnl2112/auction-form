<template>
  <form @submit.prevent="submit">
    <a href="https://polkadot.js.org/extension/" target="_blank" rel="noopener noreferrer">Get Polkadot.js extension?</a>
    <div>
      <label>Participating KSM Address <span style="color: #e53e3e">*</span></label>
      <input v-if="manual" placeholder="Enter your address" v-model="ksm_address" :required="manual"/>
      <template v-else>
        <button v-if="accounts.length === 0" @click.prevent="requestExtension">Connect Polkadot.js Extension</button>
        <select-address v-else :accounts="accounts" v-model="account"/>
      </template>
      <div class="row-flex">
        <a href="https://wiki.acala.network/karura/ksm-address/check-ksm-addr" target="_blank" rel="noopener noreferrer">Get KSM Address manually</a>
        <switch-btn style="margin: 0" v-model="manual"/>
      </div>
    </div>
    <div>
      <label>ERC20 address <span style="color: #e53e3e">*</span></label>
      <input placeholder="Enter your ERC20 wallet to get rewarded" type="text" v-model="erc20_address" required/>
    </div>
    <div>
      <label>Email <span style="color: #e53e3e">*</span></label>
      <input placeholder="Enter your email" type="email" v-model="email" required/>
    </div>
    <div>
      <label>Reference code (Optional)</label>
      <input placeholder="Enter your reference code" v-model="referrer_code"/>
    </div>
    <div class="rule">
      <input v-model="isAgree" type="checkbox"/>
      <div>I have read and accept the
        <a class="css-7rgjox" target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy.</a>
        and I agree to receive email communications about Karura and Acala, including exclusive launch updates and liquidity provider program.
      </div>
    </div>
    <button type="submit" class="btn">Notify me</button>
  </form>
</template>

<script>
import { checkEmail } from '@/libs/validate';
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import SwitchBtn from "@/components/SwitchBtn";
import SelectAddress from "@/components/SelectAddress";
import { Add } from '@/services/auctions';
import { GenerateCode } from '@/services/referal-code​';

export default {
  name: "Form",
  components: { SelectAddress, SwitchBtn },
  data() {
    return {
      your_referrer_code: '',
      accounts: [],
      account: null,
      manual: false,
      ksm_address: '',
      erc20_address: '',
      email: '',
      referrer_code: '',
      isAgree: false,
    }
  },

  async created () {
    await this.GenerateCodeYourCode();
  },

  methods: {
    showError(error) {
      console.log(error)
    },

    async GenerateCodeYourCode() {
      try {
        const res = await GenerateCode();
        this.your_referrer_code = res.code;
      } catch (e) {
        console.error(e);
      }
    },

    async submit() {
      // validate data
      if (!checkEmail(this.email)) {
        return alert('Email not valid');
      }

      if (!this.ksm_address) {
        return alert('Please enter KSM address');
      }

      if (!this.erc20_address) {
        return alert('Please enter ERC20 address');
      }

      try {
        const res = await Add({
          ksm_address: this.ksm_address,
          erc20_address: this.erc20_address,
          email: this.email,
          referrer_code: this.referrer_code,
          your_referrer_code: this.your_referrer_code,
        });

        if (res) {
          // reset form
          this.ksm_address = '';
          this.erc20_address = '';
          this.email = '';
          this.referrer_code = '';
          this.your_referrer_code = '';
          await this.GenerateCodeYourCode();
        }
        alert('Done');
      } catch (e) {
        alert(e.message);
      }
    },

    async requestExtension() {
      try {
        const extensions = await web3Enable('PolkaSmith Auction')
        if (extensions.length === 0) {
          this.showError("Polkadot.js Extension is not installed!")
          return
        }
        const accounts = await web3Accounts()
        if (accounts.length === 0) {
          this.showError("KSM wallet list is empty. Please create or import your wallet!")
          return
        }
        this.accounts = accounts;
        this.account = accounts[0];
        this.ksm_address = accounts[0].address;
      } catch(e) {
        console.error(e)
        this.showError("You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension at \"Manage Website Access\" then reload this page.",)
      }
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 32px !important;
  height: 16px !important;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #14C4FF;
}

input:focus + .slider {
  box-shadow: 0 0 1px #14C4FF;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 16px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
