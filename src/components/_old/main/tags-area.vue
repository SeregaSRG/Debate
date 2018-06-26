<template>
  <div class="tags-area">
    <div class="tags__wrapper">
      <div class="tag__item" v-for="item in items" :key="item.name">
        <p>{{ item.name }}</p>
        <span v-on:click="deleteItem(item.name)">×</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tags-area',
  data () {
    return {
      items: [
        { name: 'Foo' },
        { name: 'Bar' }
      ]
    }
  },
  methods: {
    deleteItem: function (name) {
      let _this = this
      this.items.forEach(function (item, i, arr) {
        if (item.name === name) {
          _this.items.splice(i, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags__wrapper {
  width: 80%;
  margin: 50px auto 0 auto;
  display: flex;
  flex-wrap: wrap;

  .tag__item {
    padding: 7px 14px;
    border-radius: 20px;
    background-color: #bb6dec;
    color: white;
    margin: 3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    span {
      margin-left: 7px;
      cursor: pointer;
    }
  }
}
</style>
