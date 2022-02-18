<template>
  <div v-if="show" class="modal" @click.prevent="close">
    <div class="modal__content" @click.prevent.stop>
      <div class="currency">
        <input v-model="searchText"  placeholder="search currency" class="input">
        <CurrencyList :items="filteredOptions" @select="selectCurrency" />
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyList from '@/components/Currency/List/index.vue'
export default {
  name: "ModalPickerCurrency",
  components: {
    CurrencyList
  },
  props: { options: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      show: false,
      controller: {},
      searchText: ''
    }
  },

  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        const indexes = (option.name).toLowerCase() +
          (option.symbol).toLowerCase()

        const clearSearchText = (this.searchText).trim().toLowerCase()

        return indexes.includes(clearSearchText)
      })
    }
  },
  methods: {
    open(){
      const promise = new Promise((resolve, reject) => {
        this.controller = {resolve, reject}
      })
      this.show = true;
      return promise;
    },

    close(){
      this.show = false
      this.controller.resolve(false)
    },

    selectCurrency(currency){
      this.show = false
      this.controller.resolve(currency)
    }

  },



}
</script>

<style lang="scss" scoped>

.modal{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.048);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;

  cursor: pointer;
  &__content{
    width: 350px;
    height: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 15px;
    display: flex;


    .currency{
      width: 100%;
    }
  }
}

</style>
