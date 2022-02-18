<template>
  <div class="coin-input">
    <div class="coin-input__item" @click="changeCurrency">
      <img :src="currency.image" alt="">
      {{currency.name}}
    </div>
    <div class="coin-input__item">
      <input
        v-bind="$attrs"
        type="number"
        :value="amount"
        @input="$emit('input:amount', $event.target.value)"
      >
    </div>
    <ModalPickerCurrency
      ref="modalPickerCurrency"
      :options="options"
    />
  </div>
</template>

<script>
import ModalPickerCurrency from '@/components/Form/ModalPickerCurrency/index.vue'
  export default {
    name: "CoinInput",
    components: {
      ModalPickerCurrency
    },
    props: {
      options: {
        type: Array,
        default: () => []
      },
      currency: {
        type: Object,
        default: () => {}
      },
      amount: {
        type: Number,
        default: 0
      },
    },

    watch: {
      options: {
        immediate: true,
        handler(options){
          if (options && options.length > 0 ) {
            this.$emit('input:currency', options[0])
          }
        }
      }
    },

    methods: {
      async changeCurrency(){
        const res = await this.$refs.modalPickerCurrency.open()
        if(res){
          this.$emit('input:currency', res)
          this.$emit('input:amount', 0)

        }
      }
    },


  }
</script>

<style lang="scss" scoped>
.coin-input{
    margin: 20px auto;
    width: 90%;
    height: 70px;
    background: #fefef1;
    color: #333;
    border-radius: 15px;

    display: flex;
    justify-content: space-between;
    &__item{
      cursor: pointer;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
        width: 30px;
      }

      input{
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;

        padding: 20px;
        font-size: 26px;
        &:focus-visible{
          outline: none;
        }
      }
    }
  }

</style>
