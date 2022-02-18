<template>
  <div class="currency__items">
    <transition-group name="opacity">
      <div
        v-for="item in items"
        :key="item.name"
        class="currency__item"
        :class="{'currency__item--dark' : dark }"
        @click="$emit('select', item)"
      >
        <div class="item__title">
          <img :src="item.image" alt="">
          {{item.name}}
        </div>
        <div class="item__subtitle">
          {{(item.current_price).toFixed(2) }}
          <span
          :class="{
            error:item.price_change_24h < 0,
            success:item.price_change_24h > 0
          }"
          >
            {{(item.price_change_24h).toFixed(2)}}
          </span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "CurrencyList",
    props: {
      items: {
        type: Array,
        default: () => []
      },
      dark: {
        type: Boolean,
        default: false
      },
    },
  }
</script>

<style lang="scss" scoped>

.currency__item--dark{
  color: #fff;
}

.currency__items{
  color: #333;
  margin:  30px 5px;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;


}
.currency__item{
  box-shadow: 0px 0px 3px 1px  rgba(51, 51, 51, 0.315);
  background: rgba(95, 95, 95, 0.096);
  height: 70px;
  margin: 10px 20px;
  padding: 5px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 1s linear;
  cursor: pointer;

  img{
    width: 40px;
    margin-right: 20px;
  }
  &:hover{
    transform: scale(1.1);
    background: rgb(141, 141, 201);
  }
  .item__title{
    display: flex;
    align-items: center;
  }

  .item__subtitle{
    position: relative;
    span{
      position: absolute;
      top: -15px;
      right: 0;
      font-size: 14px;
      &.error{
        color: red
      }
      &.success{
        color: green
      }
    }
  }

}
</style>
