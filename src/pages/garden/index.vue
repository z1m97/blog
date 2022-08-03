<template>
  <div>
    <div bg-white border-b border-light-700 py-20 px-6 md:px-12>
      <div relative w-full max-w-6xl mx-auto>
        <samp class="text-xl font-medium">Garden</samp>
      </div>
    </div>

    <div>
      <h2>SEED</h2>
      <p>每一颗大树都是从小小的种子开始发芽的</p>

      <p>一些前端应用场景的实践</p>
      <List :list="seed" />

      <h2>Pictures</h2>
      <p>走的再忙，也不要忽略身边的风景</p>

      <h2>Some Noise</h2>
      <p>生活中偶尔也需要一些 “噪音”</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const seed = [{ path: '/garden/cubic', name: 'cubic' }]
</script>
