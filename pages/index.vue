<template>
  <div class="">
    <transition name="fade">
      <div v-if="!loading" class="swap" >
        <div class="title">
          Exchange
        </div>
        <div class="subtitle">
          you pay
        </div>
        <CoinInput
          :options="cryptoCurrencyOptions"
          :currency="formCurrency"
          :amount="formAmount"
          @input:currency="formCurrency = $event"
          @input:amount="formAmount = $event"
        />
        <div class="subtitle">
          you get
        </div>
        <CoinInput
          :currency="toCurrency"
          :options="fiatCurrencies"
          disabled
          :amount="toAmount"
          @input:currency="toCurrency = $event"
          @input:amount="toAmount = $event"
        />

      </div>
    </transition>
    <Loader v-if="loading" />
  </div>
</template>

<script>


import { getList, getRatio} from '@/services/cryptocurrency'
import fiatCurrencies from '@/utils/fiatCurrencies'

import CoinInput from '~/components/Form/CoinInput/index.vue'
import Loader from '~/components/UI/Loader.vue'
export default {
  name: 'SwapPage',
  components:{
    CoinInput,
    Loader
  },
  data() {
    return {
      loading: false,

      fiatCurrencies,
      cryptoCurrencyOptions: [],
      formCurrency: {},
      toCurrency: {},

      formAmount: 0,
      toAmount: 0
    }
  },

  watch: {
    async formAmount(newValue) {
      const from = this.formCurrency.id
      const to = this.toCurrency.symbol
      try {
        const monetRatio  = (await getRatio(from, to))[from][to]
        this.toAmount = this.formAmount * monetRatio
      } catch (error) {
        alert(error)
      }

    }
  },

  async mounted(){
    // todo create module in store
    this.loading = true
    try {
      this.cryptoCurrencyOptions = (await getList())
    } catch (error) {
      alert(error)
    } finally{
      this.loading = false
    }

  },
}
</script>

<style lang="scss" scoped>
.swap{
  width: 90%;
  margin: 20px auto;

}

</style>
