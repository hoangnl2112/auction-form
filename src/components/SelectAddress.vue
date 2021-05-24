<template>
  <div class="dropdown">
    <div class="dropdown-value" @click="toggleShow">
      <Identicon class="icon" :size="28" theme="polkadot" :value="value && value.address ? value.address : 'none'"/>
      <div class="wrapper">
        <div class="name">{{ value && value.meta ? value.meta.name : 'none' }}</div>
        <div class="address">{{ value && value.ksm_address ? value.ksm_address : 'none' }}</div>
      </div>
    </div>
    <div class="dropdown-content" v-show="optionsShown">
      <div class="dropdown-item"
          @mousedown="selectOption(account)"
          v-for="(account, index) in accounts"
          :key="index">
        <Identicon class="icon" :size="28" theme="polkadot" :value="value.address"/>
        <div class="wrapper">
          <div class="name">{{ account.meta.name }}</div>
          <div class="address">{{corruptAddress(account.ksm_address)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Identicon from '@vue-polkadot/vue-identicon';

export default {
  name: "SelectAddress",
  components: { Identicon },
  props: {
    accounts: {
      type: Array,
    },
    value: null
  },
  data() {
    return {
      optionsShown: false,
    }
  },
  computed: {
    computedValue() {
      return this.value?.meta.name + ' (' + this.corruptAddress(this.value?.ksm_address) + ')'
    }
  },
  methods: {
    corruptAddress(adr) {
      if(!adr) return ''
      const width = window.innerWidth
      if (width > 1024) {
        return adr
      }
      const length = adr.length
      return adr.substr(0, 10) + '...' + adr.substr(length - 10, length - 1)
    },
    selectOption(option) {
      this.$emit('input', option);
      this.optionsShown = false
    },
    toggleShow(){
      this.optionsShown = !this.optionsShown;
    },
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: block;
  margin: auto;
}
.dropdown .dropdown-value {
  background: linear-gradient(273.46deg, #D52D6F 0%, #D62B69 0.01%, #F98395 48.66%, #0DCCFF 100%);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.icon {
  display: flex;
  align-items: center;
}
.wrapper {
  margin-left: 8px;
}
.name {
  font-size: 14px;
  line-height: 18px;
}
.address {
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
}
.dropdown .dropdown-content {
  position: absolute;
  transform: translateY(4px);
  background-color: #fff;
  padding: .5rem 0;
  min-width: 248px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  border-radius: .25rem;
  overflow: auto;
  z-index: 1;
}
.dropdown .dropdown-content .dropdown-item {
  font-size: 1rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
  padding: .5rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
}
.dropdown .dropdown-content .dropdown-item:hover {
  background-color: #e7ecf5;
}
.dropdown .dropdown:hover .dropdowncontent {
  display: block;
}
</style>