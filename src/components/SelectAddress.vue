<template>
  <div class="dropdown">
    <input class="dropdown-input" @click="toggleShow" v-model="computedValue"/>
    <div class="dropdown-content" v-show="optionsShown">
      <div class="dropdown-item"
          @mousedown="selectOption(account)"
          v-for="(account, index) in accounts"
          :key="index">
        {{ account.meta.name }} ({{corruptAddress(account.ksm_address)}})
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectAddress",
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
.dropdown .dropdown-input {
  background: #fff;
  cursor: pointer;
  border: 1px solid #e7ecf5;
  border-radius: 3px;
  color: #333;
  display: block;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-width: 250px;
  width: 100%;
}
.dropdown .dropdown-input:hover {
  background: #f8f8fa;
}
.dropdown .dropdown-input:focus {
  border: 3px solid #14C4FF;
  box-shadow: 0px 0px 20px rgba(22, 193, 255, 0.6);
}
.dropdown .dropdown-content {
  position: absolute;
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
}
.dropdown .dropdown-content .dropdown-item:hover {
  background-color: #e7ecf5;
}
.dropdown .dropdown:hover .dropdowncontent {
  display: block;
}
</style>