<template>
  <div class="checkbox-wrapper">
    <div class="checkbox" :class="checkboxClass" :style="checkboxStyle" @click="toggle">
      <input type="checkbox" ref="input" :checked="isActive.value">
      <span class="checkbox-checkmark"></span>
      <div class="checkbox-hover"></div>
      <slot name="label">
        <label class="checkbox-label">{{label}}</label>
      </slot>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from '@vue/composition-api';
import colorHandler from '../../utils/helpers';
import {isEqual, xorWith, cloneDeep} from 'lodash';
export default {
  name: 'GCheckbox',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    label: String,
    color: String,
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    indeterminate: Boolean,
    //check box all
    multiple: Boolean,
    //custom v-model
    inputValue: null,
    //native value
    value: null
  },
  setup(props, context) {
    const internalValue = computed({
      get: () => props.inputValue,
      set: val => {
        context.emit('change', val)
      }
    });
    const isSelectedArray = computed(() => Array.isArray(internalValue.value));
    //value return when checkbox checked
    const trueValue = computed(() => props.value ? (props.value) : true);
    let isActive = ref(props.inputValue || false);
    //determinate state
    let isDeterminate = ref(true);
    if (props.indeterminate) {
      isDeterminate.value = false;
    }
    //change determinate & active state when value changes
    watch(() => [internalValue.value, props.value], (newVal, oldVal) => {
      //inputValue & value is both array
      if (props.multiple) {
        if (!internalValue.value) {
          // none selected
          isDeterminate.value = true;
          isActive.value = false;
        } else if (internalValue.value.length === 0) {
          isDeterminate.value = true;
          if (isActive.value === props.inputValue) { //default to uncheck
            isActive.value = false
          }
          //check when props.value change
          if(props.value.length > 0 || (oldVal && oldVal.length > 0)) {
            isActive.value = false
          }
        } else if (xorWith(internalValue.value, props.value, isEqual).length === 0) {
          // equal arrays (all selected)
          isDeterminate.value = true;
          isActive.value = true;
        } else {
          // partially selected
          isDeterminate.value = false;
          isActive.value = false;
        }
      } else {
        if (internalValue.value && isSelectedArray.value) {
          isActive.value = internalValue.value.some(v => isEqual(v, trueValue.value));
        } else {
          isActive.value = internalValue.value === true || internalValue.value === 'true' || isEqual(internalValue.value, trueValue.value);
        }
      }
    });
    //define props color is a class or a css style
    const {getColorType, convertColorClass} = colorHandler();
    const type = computed(() => getColorType(props.color));
    const colorClass = computed(() => convertColorClass(props.color));
    const checkboxClass = computed(() => ({
      'checkbox__readonly': props.readonly,
      'checkbox__disabled': props.disabled,
      'checkbox__required': !isActive.value && props.required,
      'checkbox__indeterminate': !isDeterminate.value,
      [colorClass.value]: !!type.value && type.value === 'class',
      'checkbox__active': isActive.value,
    }));
    const checkboxStyle = computed(() => {
      const style = {};
      if (type.value === 'style') {
        Object.assign(style, {'color': props.color});
      }
      return style;
    });
    function toggle() {
      isActive.value = !isActive.value;
      isDeterminate.value = true;
      if (isSelectedArray.value && !props.multiple) {
        //if the checkbox is not checkbox for all & in an multiple input
        const index = internalValue.value.findIndex(v => isEqual(v, trueValue.value));
        if (isActive.value && index === -1) { //check
          // internalValue.value.push(value);
          internalValue.value = [...internalValue.value, trueValue.value]
        } else if (!isActive.value && index > -1) { //uncheck
          internalValue.value.splice(index, 1);
          context.emit('change', internalValue.value)
        }
      } else {
        if (isActive.value) { //checked
          internalValue.value = cloneDeep(trueValue.value);
        } else {
          if (props.multiple) {
            internalValue.value = [];
          } else {
            internalValue.value = null;
          }
        }
      }
    }
    return {
      checkboxClass,
      checkboxStyle,
      isActive,
      toggle,
      trueValue
    }
  },
}
</script>

<style scoped lang="scss">
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}
.checkbox-wrapper {
  margin: 8px 4px;
}
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  left: 0;
  z-index: 2;
}
.checkbox-label {
  color: #1d1d26;
  margin-left: 4px;
  cursor: pointer;
}
.checkbox-hover {
  position: absolute;
  top: 0;
  left: 0;
}
.checkbox-hover:before {
  position: absolute;
  left: -8px;
  content: "";
  font-size: 36px;
  font-family: "Material Design Icons", sans-serif;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  transform: scale(0);
}
.checkbox input:hover ~ .checkbox-hover:before {
  transform: scale(1.2);
}
.checkbox .checkbox-checkmark {
  color: inherit;
}
.checkbox .checkbox-checkmark:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  font-size: 20px;
  font-family: "Material Design Icons", sans-serif;
  color: #717171;
}
.checkbox.checkbox__active .checkbox-checkmark:before {
  content: "";
  color: inherit;
}
.checkbox__indeterminate .checkbox-checkmark:before {
  content: "";
  color: inherit;
}
.checkbox__required .checkbox-label, .checkbox__required .checkbox-checkmark:before {
  color: red !important;
}
.checkbox__disabled {
  pointer-events: none;
}
.checkbox__disabled > .checkbox-checkmark {
  opacity: 0.42;
}
.checkbox__readonly {
  pointer-events: none;
}
</style>