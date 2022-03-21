<template>
  <h1>Feed</h1>
  <h4>Props: {{ apiUrl }}</h4>
</template>
<script>
import {actionTypes} from '@/store/modules/feed'
export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$store
      .dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
      .then((response) => {
        console.log(response)
      })
  },
}
</script>
