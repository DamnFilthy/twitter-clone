<template>
  <div>Global feed</div>
  <div class="feed__wrapper">
    <div><AppFeed :api-url="apiUrl" /></div>
    <div><h2>Popular tags</h2></div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed'
export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeed,
  },
  data() {
    return {
      apiUrl: '/articles',
    }
  },
}
</script>
<style lang="scss" scoped>
.feed__wrapper {
  padding: 0 100px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
