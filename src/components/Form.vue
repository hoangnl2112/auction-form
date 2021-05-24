<template>
  <form @submit.prevent="submit">
    <a href="https://polkadot.js.org/extension/" target="_blank" rel="noopener noreferrer">Get Polkadot.js extension?</a>
    <div>
      <label>Participating KSM Address <span style="color: #e53e3e">*</span></label>
      <input autocomplete="false" v-if="manual" placeholder="Enter your address" v-model="ksm_address" :required="manual"/>
      <template v-else>
        <button v-if="accounts.length === 0" @click.prevent="requestExtension">Connect Polkadot.js Extension</button>
        <select-address v-else :accounts="accounts" v-model="account"/>
      </template>
      <div class="row-flex">
        <a @click="manual = !manual">Get KSM Address manually</a>
        <switch-btn style="margin: 0" v-model="manual"/>
      </div>
    </div>
    <div>
      <label>Email <span style="color: #e53e3e">*</span></label>
      <input autocomplete="false" placeholder="Enter your email" type="email" v-model="email" required/>
    </div>
    <div>
      <label>Reference code (Optional)</label>
      <input autocomplete="false" placeholder="Enter your reference code" v-model="referrer_code"/>
    </div>
    <div>
      <label>Copy & paste your referral code to others</label>
      <div class="code" @click="copyCode">
        {{your_referrer_code}}
        <img alt src="../assets/copy.svg"/>
      </div>
    </div>
    <div class="rule">
      <input v-model="isAgree" type="checkbox"/>
      <div>I have read and accept the <a href="#/privacy" target="_blank">Privacy Policy</a>
        and I agree to receive email communications about PolkaSmith and PolkaFoundry, including exclusive launch updates and liquidity provider program.
      </div>
    </div>
    <button type="submit" class="btn">Register</button>
    <vue-hcaptcha
        sitekey="e8140feb-2d1f-4393-b4d8-5c83c982b919"
        @verify="onVerify"
        ref="captcha"
        size="invisible"
        @reset="captchaReset"
        @expired="onExpire"
        @challengeExpired="onExpire"
        @error="onError"
    />
  </form>
</template>

<script>
import { checkEmail } from '@/libs/validate';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto'
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import SwitchBtn from "@/components/SwitchBtn";
import SelectAddress from "@/components/SelectAddress";
import { Add } from '@/services/auctions';
import { GenerateCode } from '@/services/referal-code​';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

export default {
  name: "Form",
  components: { SelectAddress, SwitchBtn
    , VueHcaptcha
  },
  data() {
    return {
      your_referrer_code: '',
      accounts: [],
      account: null,
      manual: false,
      ksm_address: '',
      email: '',
      referrer_code: '',
      isAgree: false,
      verified: false,
      expired: false,
      token: null,
      eKey: null,
      error: null,
    }
  },

  async created () {
    // await this.GenerateCodeYourCode();
  },

  watch: {
    account(val) {
      if(val && val.ksm_address) {
        this.ksm_address = val.ksm_address
      }
    },

    ksm_address: async function(val) {
      await this.GenerateCodeYourCode(val);
    }
  },

  methods: {
    showError(error) {
      console.log(error)
    },

    async GenerateCodeYourCode(ksm_address) {
      try {
        const res = await GenerateCode({ ksm_address });
        this.your_referrer_code = res.code;
      } catch (e) {
        console.error(e);
      }
    },

    async onVerify(token, ekey) {
      this.verified = true;
      this.token = token;
      this.eKey = ekey;
      await this.submit();
    },

    captchaReset() {
      this.verified = false;
      this.token = null;
      this.eKey = null;
    },

    onExpire() {
      this.verified = false;
      this.token = null;
      this.eKey = null;
      this.expired = true;
      return this.$notify({
        type: 'error',
        text: `Captcha Expired`});
    },

    onError(err) {
      this.token = null;
      this.eKey = null;
      this.error = err;
      return this.$notify({
        type: 'error',
        text: `Captcha error:  ${err}`});
    },

    async submit() {
      // validate data

      if (!checkEmail(this.email)) {
        return this.$notify({
          type: 'error',
          text: 'Email not valid'});
      }

      if (!this.ksm_address) {
        return this.$notify({
          type: 'error',
          text: 'Please enter KSM address'});
      }
      
      if (!this.isAgree) {
        return this.$notify({
          type: 'error',
          text: 'Please accept the Privacy Policy'});
      }

      if (!this.verified) {
        if (!this.verified) {
          return this.$refs.captcha.execute();
        }
      }

      try {
        const res = await Add({
          ksm_address: this.ksm_address,
          email: this.email,
          referrer_code: this.referrer_code,
          your_referrer_code: this.your_referrer_code,
          captcha_code: this.token
        });

        if (res) {
          // reset form
          // this.ksm_address = '';
          this.email = '';
          this.referrer_code = '';
          // this.your_referrer_code = '';
          // await this.GenerateCodeYourCode();
        }
        return this.$notify({
          type: 'success',
          text: 'Register successful'});
      } catch (e) {
        return this.$notify({
          type: 'error',
          text: e && e.response && e.response.data && e.response.data.message ? e.response.data.message : e.toString() });
      }
      finally {
        this.$refs.captcha.reset();
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
        this.accounts = accounts.map(acc => ({
          ksm_address: encodeAddress(decodeAddress(acc.address), 2),
          ...acc
        }));
        this.account = this.accounts[0];
        this.ksm_address = this.accounts[0].ksm_address;
      } catch(e) {
        this.showError("You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension at \"Manage Website Access\" then reload this page.",)
      }
    },

    async copyCode() {
      await navigator.clipboard.writeText(this.your_referrer_code);
      return this.$notify({
        type: 'success',
        text: `Copied!`});
    },
  }
}
</script>

<style scoped>
  form {
    display: grid;
    grid-gap: 12px;
  }

  .code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(273.46deg, #D52D6F 0%, #D62B69 0.01%, #F98395 48.66%, #0DCCFF 100%);
    padding: 8px 16px;
  }

  .code img {
    width: 16px;
    height: 16px;
  }

  input[type=checkbox] {
    margin: 5px;
    cursor: pointer;
  }
</style>
