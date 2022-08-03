<template>
  <div>
    <div v-for="(item, idx) in list" :key="idx">
      <component :is="cardName" :data="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    list: any[]
    card?: string
  }>()

  const cardName = props.card || 'CardBasic'
</script>

<script lang="ts">
  import CardBasic from './card/basic.vue'
  export default {
    components: {
      CardBasic,
    },
  }
</script>
