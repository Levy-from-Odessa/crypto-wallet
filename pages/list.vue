<template>
  <div class="">
    <AutoComplete v-model="currentCurrency" :options="supportedCurrencies"/>

    <CurrencyList :items="cryptoCurrencyOptions" dark/>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import { getList, getSupportedVsCurrencies } from '@/services/cryptocurrency'
import CurrencyList from '@/components/Currency/List/index.vue'
import AutoComplete from '@/components/Form/AutoComplete/index.vue'
import Loader from '@/components/UI/Loader.vue'
export default {
  name: "ListPage",
  components: {
    Loader,
    CurrencyList,
    AutoComplete
  },
  data() {
    return {
      loading: false,

      cryptoCurrencyOptions: [],
      supportedCurrencies: [],

      currentCurrency: 'usd'

    }
  },
  watch: {
    // updated current currency
    currentCurrency: {
      immediate: true,
      handler(currency){
        this.fetchList(currency)
      }

    }
  },

  mounted(){
    // todo create module in store
    this.fetchSupportedCurrencies()
  },

  methods: {
    // get list of full info of crypto coin
    async fetchList(currency) {
      this.loading = true
      try {
        this.cryptoCurrencyOptions = await getList(currency)
      } catch (error) {
        alert(error)
      } finally{
        this.loading = false
      }
    },
    // get list of supported curr. - [usd, uah..]
    async fetchSupportedCurrencies() {
      this.loading = true
      try {
        this.supportedCurrencies = await getSupportedVsCurrencies()
      } catch (error) {
        alert(error)
      } finally{
        this.loading = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.list {
  overflow: auto;
  height: 100%;
}

</style>
