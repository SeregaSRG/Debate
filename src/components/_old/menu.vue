<template>
  <div class="menu shadow-block">
    <router-link to="/promotions">
      <div class="menu_button">
        <div class="menu_image">
          <img src="../assets/calendar.png">
        </div>
        <p class="noselect">АКЦИИ</p>
      </div>
    </router-link>
    <router-link to="/clubs">
      <div class="menu_button">
        <div class="menu_image">
          <img src="../assets/group.png">
        </div>
        <p class="noselect">КЛУБЫ</p>
      </div>
    </router-link>
    <router-link to="/programs">
      <div class="menu_button">
        <div class="menu_image">
          <img src="../assets/training.png">
        </div>
        <p class="noselect">ТРЕНИРОВКИ</p>
      </div>
    </router-link>
    <router-link to="/events">
      <div class="menu_button">
        <div class="menu_image">
          <img src="../assets/calendar.png">
        </div>
        <p class="noselect">СОБЫТИЯ</p>
      </div>
    </router-link>
    <router-link to="/account">
      <div class="menu_button">
        <div class="menu_image">
          <img src="../assets/person.png">
        </div>
        <p class="noselect">АККАУНТ</p>
      </div>
    </router-link>
    <div class="active-line"></div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  computed: {
    currentRoute: function () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../main.scss';
  .menu {
    position: absolute;
    width: 100vw;
    height: calc(100vw / 6.25);
    background-color: $sidebar-color;
    bottom: 0;
    z-index: 2;
    display: flex;

    .menu_button {
      width: 20vw;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      z-index: 3;
      .menu_image {
        height: calc(100% / 2.22);
        max-width: 70%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      p {
        font-size: 11px;
        color: $secondary-color;
        transition: .2s $cubic_bezier;
      }
    }

    .active-line {
      transition: .2s $cubic_bezier;
      width: 20vw;
      height: 3px;
      background-color: $accent-color;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 4;
      transform: translateX(40vw);
    }

    @for $i from 1 through 5 {
      :nth-child(#{$i}).router-link-active {
        .menu_button p {
          color: $text-color;
        }

        ~ .active-line{
          transform: translateX(#{($i * 20 - 20)}vw);
        }
      }
    }
  }
</style>
