<script setup lang="ts">
import ImgTableJson from '@/data/imgTable.json'
import { useWindowSize } from '@vueuse/core'
import _ from 'lodash'

useHead({
  title: '一輩子跟我一起組樂團嗎',
})

const { width } = useWindowSize()
const imgCardList = computed(() => {
  if (width.value < 560) {
    return _.chunk(ImgTableJson, 1)
  }
  else if (width.value < 768) {
    return _.chunk(ImgTableJson, 2)
  }
  else if (width.value < 1280) {
    return _.chunk(ImgTableJson, 3)
  }
  return _.chunk(ImgTableJson, 4)
})

const items = [{
  label: '全部',
  slot: 'all',
}, {
  label: 'MyGo!!!!!',
  slot: 'mygo',
}, {
  label: 'Ave Mujica',
  slot: 'ave-mujica',
}]
</script>

<template>
  <div
    class="h-[100dvh] w-full dark:bg-dark flex flex-col"
  >
    <NavBar />
    <div class="flex flex-col">
      <UTabs :items="items" class="px-2 sm:px-4" />
      <ImgList v-if="imgCardList.length > 0" :img-card-list="imgCardList" class="grow min-h-0" />
      <div v-else class="flex flex-col items-center my-10 text-gray gap-y-2">
        <div class="i-hugeicons:image-not-found-01 text-4xl" />
        沒有符合條件的圖片
      </div>
    </div>
  </div>
</template>

<style>
  html {
    font-family: 'Noto Sans TC', sans-serif;
  }
</style>
