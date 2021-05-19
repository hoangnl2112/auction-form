<template>
  <div>
    <div class="hero" align="center">
      <div style="width: 640px">
        <h1>
          PolkaSmith on Kusama Parachain Auction
        </h1>
        <div class="form" style="margin-top: 0;flex: none;padding-right: 0">
          <a href="https://polkadot.js.org/extension/" target="_blank" rel="noopener noreferrer">Get Polkadot.js
            extension?</a>
          <div>
            <label>Participating KSM Address <span style="color: #e53e3e">*</span></label>
              <a class="link-btn" style="border-radius: 4px;width: 100%" v-if="!currentWallet || isWalletLoading" @click="requestExtension">{{ isWalletLoading ? 'Loading...' : 'Connect Polkadot.js Extension' }}</a>
              <select-address v-else :accounts="selectOptions" v-model="selectedAccount"/>
          </div>
          <div>
            <label>Link your ERC20 wallet<span style="color: #e53e3e">*</span></label>
            <div style="display: flex; width: 100%">
              <input placeholder="Only ERC20 Address" type="text" v-model="erc20Address" :readonly="isLinked"/>
              <button class="link-btn" style="border-top-left-radius: 0; border-bottom-left-radius: 0" :disabled="isSigning || !erc20Address || !validAddress || isLinked"
                      @click="linkAddress">
                {{ isSigning ? 'loading...' : (isLinked ? 'Linked' : 'Link address') }}
              </button>
            </div>
            <span v-show="erc20Address && !isLinked" v-if="!validAddress" style="color: #a51c1c; font-size: 11px">Invalid Address !</span>
            <span v-show="erc20Address && !isLinked" v-else style="color: #00b33a; font-size: 11px">Valid Address</span>
          </div>
          <div>
            <div style="width: 100%; display: flex">
              <label style="width: 50%">KSM Amount<span style="color: #e53e3e">*</span></label>
              <div v-show="selectedAccount" style="width: 50%; text-align: right"><span>Balance: {{ ksmBalance ? ksmBalance.toHuman() : '...' }}</span></div>
            </div>
            <input placeholder="Enter KSM Amount" type="number" v-model="amount"/>
          </div>
          <div class="rule">
            <input type="checkbox" style="margin: 10px" v-model="policyConfirmed"/>
            <div>I have read and accept the
              <a class="css-7rgjox" target="_blank" rel="noopener noreferrer" href="/privacy">Privacy Policy.</a>
              and I agree to receive email communications about Karura and Acala, including exclusive launch updates and
              liquidity provider program.
            </div>
          </div>
          <button class="link-btn" style="width: 100%; background: linear-gradient(273.09deg, #D62860 0.01%, #FF919D 48.66%, #00E0FF 100%);" :disabled="!isLinked || !amount || !selectedAccount || isSubmitting || !policyConfirmed" @click.prevent="submit" title="Complete link address and fill amount first">
            {{ isSubmitting ? 'Transfering' : 'Sign transfer' }}
          </button>
        </div>
        <div v-show="message" variant="info">
          <pre style="white-space: pre-wrap">{{ message }}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp'
import {ApiPromise, WsProvider} from '@polkadot/api'
import {BN_MILLION, stringToHex} from '@polkadot/util'
import BN from "bn.js"
import SelectAddress from "@/components/SelectAddress";

const WAValidator = require('wallet-address-validator');
const receivedAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const provider = new WsProvider('wss://rococo.polkafoundry.com');

export default {
  name: "Transfer",
  components: {SelectAddress},
  data() {
    return {
      manual: false,
      policyConfirmed: false,
      selectOptions: [],
      selectedAccount: null,
      erc20Address: null,
      isLinked: false,
      amount: null,
      validAddress: true,
      isWalletLoading: true,
      message: '',
      successMessage: null,
      isSubmitting: false,
      errorMessage: null,
      signature: null,
      isSigning: true,
      currentWallet: localStorage.getItem('SELECTED_KSM_WALLET'),
      ksmBalance: null,
    }
  },
  methods: {
    async linkAddress() {
      this.isSigning = true
      if (!this.selectedAccount || !this.erc20Address || !this.validAddress) {
        this.errorMessage = "Invalid Address!!!"
        this.isSigning = false
        return
      }
      const injector = await web3FromSource(this.selectedAccount.meta.source);

      const signRaw = injector?.signer?.signRaw;

      if (signRaw) {
        signRaw({
          address: this.selectedAccount.address,
          data: stringToHex(this.selectedAccount.address + '|' + this.erc20Address),
          type: 'bytes'
        }).then((signature) => {
          this.signature = signature.signature
          this.sendLinkRequest({
            signature: signature.signature,
            ksm_address: this.selectedAccount.address,
            erc20_address: this.erc20Address,
          })
        }).catch(() => {
          this.errorMessage = "Link Address failed. You must sign to link address before confirming the transaction"
          this.isSigning = false
          this.isLinked = false
        })
      }
    },
    async submit() {
      this.message = ''
      this.isSubmitting = true
      if (!this.selectedAccount || !this.amount || this.amount <= 0 || !this.isLinked) {
        this.errorMessage = 'Invalid input or unlinked Address!!!'
        this.isSubmitting = false
        return
      }
      const x = new BN(this.amount).mul(BN_MILLION).mul(BN_MILLION)
      if (x.gte(new BN(this.ksmBalance))) {
        this.errorMessage = 'Insufficient Balance'
        this.isSubmitting = false
        return
      }

      const api = await ApiPromise.create({provider});
      const transferExtrinsic = api.tx.balances.transfer(receivedAddress, x)
      const injector = await web3FromSource(this.selectedAccount.meta.source);

      transferExtrinsic.signAndSend(this.selectedAccount.address, {signer: injector.signer}, ({status}) => {
        if (status.isInBlock) {
          this.message = this.message + `Completed at block hash #${status.asInBlock.toString()}\n`
        } else {
          this.message = this.message + `Current status: ${status.type}\n`
          if (status.type === 'Finalized') {
            this.successMessage = 'Transfer successful'
          }
          this.isSubmitting = false
        }
      }).catch((error) => {
        this.errorMessage = this.message + 'transaction failed:' + error.toString()
        this.isSubmitting = false
      });
    },
    requestExtension() {
      web3Enable('Polkafoundry Crowdloan').then((extensions) => {
        if (extensions.length === 0) {
          this.errorMessage = "Polkadot.js Extension is not installed!"
          return
        }
        web3Accounts().then((allAccounts) => {
          if (allAccounts.length === 0) {
            this.errorMessage = "KSM wallet list is empty. Please create or import your wallet!"
            return
          }
          localStorage.setItem('SELECTED_KSM_WALLET', allAccounts[0].address);
          this.selectOptions = allAccounts
          this.selectedAccount = allAccounts[0]
          this.currentWallet = allAccounts[0].address
        })
      }).catch(() => {
        localStorage.setItem('IS_REJECTED', true)
        this.errorMessage = "You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension at \"Manage Website Access\" then reload this page."
      })
    },
    sendLinkRequest(data) {
      fetch('https://crowdloan.polkafoundry.com/api/v1/account/verify-message', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      }).then(r => {
        if (r.status === 200) {
          this.successMessage = 'Link Address successful'
          this.isSigning = false
          this.isLinked = true
        } else {
          this.isSigning = false,
              this.isLinked = false,
              this.errorMessage = 'Sending linked address to the server failed. Please contact support@example.com. Block hash: #' + data.block_hash
        }
      })
    },
    validateERC20Address(erc20Address) {
      this.isSigning = true
      if (!WAValidator.validate(erc20Address, 'ETH')) {
        this.validAddress = false
        this.isSigning = false
        return
      }
      fetch(`https://crowdloan.polkafoundry.com/api/v1/account/link?kusama_address=${this.selectedAccount.address}&erc20_address=${erc20Address}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      }).then(response => {
        return response.json();
      }).then(data => {
        if (data.code === 422) {
          this.isSigning = false
          this.validAddress = false
          this.errorMessage = 'ERC20 The address is invalid or has been linked to another KSM address address'
        }
        if (data.code === 200) {
          this.isSigning = false
          this.validAddress = true
          this.erc20Address = erc20Address
        }
      }).catch((err) => {
        this.errorMessage = 'Check linked address failed: ' + err.toString()
      });
    },
    checkLinkedWallet(address) {
      this.isSigning = true
      fetch(`https://crowdloan.polkafoundry.com/api/v1/account/${address}/check-link`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      }).then(response => {
        return response.json();
      }).then(data => {
        if (data.code === 422) {
          this.isSigning = false
          this.isLinked = false
          this.erc20Address = null
        }
        if (data.code === 200) {
          this.isSigning = false
          this.isLinked = true
          this.erc20Address = data.data
        }
      }).catch((err) => {
        this.errorMessage = 'Check linked address failed: ' + err.toString()
      });
    },
    listenBalanceChanged(address) {
      ApiPromise.create({provider}).then((api) => {
        api.query.system.account(address).then(
            rs => {
              let {data: {free: previousFree}} = rs
              api.query.system.account(address, ({data: {free: currentFree}}) => {
                const change = currentFree.sub(previousFree);
                if (!change.isZero()) {
                  api.query.system.account(address).then(account => {
                    this.ksmBalance = account.data.free
                  })
                  previousFree = currentFree;
                }
              });
            })
      })
    }
    ,
    getBalance(address) {
      ApiPromise.create({provider}).then((api) => {
        api.query.system.account(address).then(account => {
          this.ksmBalance = account.data.free
        })
      })
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.currentWallet) {
        this.getBalance(this.currentWallet)
        this.listenBalanceChanged(this.currentWallet)
        web3Enable('Polkafoundry Crowdloan').then((extensions) => {
          if (extensions.length === 0) {
            this.errorMessage = 'Polkadot.js Extension not installed or denied access. Please install or accept access to Polkadot.js Extension at "Manage Website Access" then reload this page.'
            return
          }
          web3Accounts().then((allAccounts) => {
            if (allAccounts.length === 0) {
              return
            }
            allAccounts.map((val) => {
              if (val.address === this.currentWallet) {
                this.selectedAccount = val
              }
            })
            this.selectOptions = allAccounts
            if (!this.currentWallet) {
              this.selectedAccount = allAccounts[0]
              this.currentWallet = allAccounts[0].address
            }
            this.checkLinkedWallet(this.currentWallet)
          })
        })
      }
      this.isWalletLoading = false
      this.isSigning = false
    }, 1000)
  },
  watch: {
    erc20Address() {
      if (!this.isLinked) {
        this.validateERC20Address(this.erc20Address)
      }
    },
    errorMessage () {
      this.$notify({
        type: 'error',
        text: this.errorMessage
      })
    },
    successMessage () {
      this.$notify({
        type: 'success',
        text: this.successMessage
      })
    },
    selectedAccount() {
      this.getBalance(this.selectedAccount.address)
      this.checkLinkedWallet(this.selectedAccount.address)
    }
  }
}
</script>

<style scoped>

</style>