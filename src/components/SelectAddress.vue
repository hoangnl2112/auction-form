<template>
  <div class="dropdown">
    <input class="dropdown-input" @click="toggleShow" v-model="computedValue"/>
    <div class="dropdown-content" v-show="optionsShown">
      <div class="dropdown-item"
          @mousedown="selectOption(account)"
          v-for="(account, index) in accounts"
          :key="index">
        {{ account.meta.name }} ({{corruptAddress(account.address)}})
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
      return this.value?.meta.name + ' (' + this.corruptAddress(this.value?.address) + ')'
    }
  },
  methods: {
    corruptAddress(adr) {
      if(!adr) return ''
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
  font-size: 0.8em;
  padding: 6px;
  min-width: 250px;
  width: 100%;
}
.dropdown .dropdown-input:hover {
  background: #f8f8fa;
}
.dropdown .dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 248px;
  width: 100%;
  max-height: 248px;
  border: 1px solid #e7ecf5;
  box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
  overflow: auto;
  z-index: 1;
}
.dropdown .dropdown-content .dropdown-item {
  color: black;
  font-size: 0.7em;
  line-height: 1em;
  padding: 8px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
.dropdown .dropdown-content .dropdown-item:hover {
  background-color: #e7ecf5;
}
.dropdown .dropdown:hover .dropdowncontent {
  display: block;
}
</style>