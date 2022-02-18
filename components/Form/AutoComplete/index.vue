<template>
  <div class="auto-complete">
    <input
      type="text"
      class="input"
      :value="search"
      @click="showOptions = true"
      @input="search = $event.target.value"
    >

    <div v-if="showOptions" class="auto-complete__options">

      <div
        v-for="option in filteredOptions"
        :key="option"
        class="options__item"
        @click="selectOption(option)"
      >
        {{option}}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AutoSelect",
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      showOptions: false,

      search: ''
    }
  },

  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        const clearSearch = this.search.trim().toLowerCase()
        return option.includes(clearSearch)
      })
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(options){
        if (options && options.length > 0 && !this.value) {
          this.$emit('input', options[0])
        }
      }
    },
    value:{
      immediate: true,
      handler(value){
        this.search = value
      }
    }
  },
  methods: {
    selectOption(option) {
      this.showOptions = false
      this.$emit('input', option)
    }
  },


}
</script>

<style lang="scss" scoped>

.auto-complete{
  position: relative;
  &__options{
    position: absolute;
    z-index: 2;
    bottom: -100px;
    left: 0;
    width: 100%;
    max-height: 100px;
    overflow: auto;

    border-radius: 15px;
    .options__item{
      background: #fff;
      color: #333;
      height: 30px;
      padding: 5px;
      text-align: center;

      transition: all .4s linear;
      &:hover{
        background: rgba(142, 142, 233);
      }
    }

  }
}
</style>
