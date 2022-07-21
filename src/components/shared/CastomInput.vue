<template>
  <div class="wrapper-input">
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="updateValue"
      @blur="blurHandler"
      class="custom-input"
      :class="!isValid && 'custom-input--error'"
    />
    <span v-if="!isValid" class="custom-input__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CastomInput",
  data() {
    return {
      isValid: true,
      error: "",
      isFirstInput: true,
    };
  },
  inject: {
    form: {
      default: null,
    },
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    modelValue() {
      if (this.isFirstInput) return;
      this.validate();
    },
  },
  mounted() {
    if (!this.form) return;
    this.form.registerInput(this);
  },
  beforeUnmount() {
    if (!this.form) return;
    this.form.unRegisterInput(this);
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    validate() {
      this.isValid = this.rules.every((rule) => {
        const { hasPassed, message } = rule(this.modelValue);
        if (!hasPassed) {
          this.error = message || this.errorMessage;
        }

        return hasPassed;
      });

      return this.isValid;
    },
    blurHandler() {
      if (this.isFirstInput) {
        this.validate();
      }
      this.isFirstInput = false;
    },
    reset() {
      this.isFirstInput = true;
      this.isValid = true;
      this.$emit("update:modelValue", "");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.wrapper-input {
  position: relative;
  display: inline-flex;
}
.custom-input {
  height: 40px;
  width: 100%;
  border: 2px solid $main-color;
  font-size: 18px;
  outline: none;
  line-height: inherit;
  padding: 8px 15px;
  &::placeholder {
    color: inherit;
  }
  &--error {
    border-color: red;
  }
  &__error {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    font-size: 12px;
    color: red;
    line-height: 1.3;
  }
}
</style>
