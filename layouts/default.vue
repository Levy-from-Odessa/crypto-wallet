<template>
  <div class="default-layout">
    <div class="default-layout__content">
      <div class="default-layout__navbar">
        <a
          v-for="navItem in nav"
          :key="navItem.name"
          class="navbar__item "
          :class="{
            'navbar__item--active': navItem.route === activeRoute
          }"
          @click="$router.push(navItem.route)"
        >
          {{navItem.name}}
        </a>
      </div>
      <Nuxt class="main" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout",
    data() {
      return {
        nav: [{
          name: 'swap',
          route: '/'
        },
        {
          name: 'list',
          route: '/list'
        },
        ]
      }
    },

    computed: {
      activeRoute(){
        return this.$route.path
      }
    }

  }
</script>

<style lang="scss" scoped>
.default-layout{
  background-image: linear-gradient(to right, #141e30, #243b55);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content{
    min-width: 350px;
    height: 400px;
    width: 40%;

    border-radius: 30px;
    background: rgba(15, 23, 92, 0.171);
    box-shadow: 0px 0px 13px 5px #1d2431;
    position: relative;

    display: flex;
    .main{
      padding: 30px;
      height: 100%;
      width: 100%;
    }
  }
  &__navbar{
    position: absolute;
    top: 25px;
    right: -60px;
    display: flex;
    flex-direction: column;


    .navbar__item{
      width: 50px;
      height: 30px;
      margin: 10px 0px;
      cursor: pointer;
      text-align: center;
      padding: 5px;
      background: rgba(255, 255, 255, 0.199);
      color: #333;

      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      &--active{
        background: rgba(15, 23, 92, 0.171);
        box-shadow: 0px 0px 5px 5px #1d2431;
        color: #fff;
      }
    }
  }
}
</style>
