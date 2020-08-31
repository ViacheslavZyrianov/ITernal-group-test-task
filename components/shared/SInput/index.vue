<template>
  <div :class="inputClassList">
    <div
      v-if="icon"
      :class="iconClassList"
    ></div>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  name: 'SInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    inputValue: ''
  }),
  computed: {
    inputClassList () {
      return [
        's-input',
        { 's-input_with-icon': this.icon }
      ]
    },
    iconClassList () {
      return [
        's-input__icon',
        `s-input__icon_${this.icon}`
      ]
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.inputValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.s-input {
  position: relative;
  width: 100%;

  input {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    padding: 7px 16px;
    width: 100%;
    border: 1px solid #E0E0E0;
    border-radius: 4px;

    &::placeholder {
      color: #909597;
    }

    &:focus {
      outline: none;
    }

    &[type="search"]::-webkit-search-decoration,
    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-results-button,
    &[type="search"]::-webkit-search-results-decoration {
      display: none;
    }
  }

  &_with-icon {
    input {
      padding-left: 46px;
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 14px;
    margin: auto;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    pointer-events: none;

    &_search {
      background-image: url('~assets/img/icons/input/search.svg');
    }
  }
}
</style>