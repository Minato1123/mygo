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
</script>

<template>
  <div
    class="h-[100dvh] w-full dark:bg-dark flex flex-col"
  >
    <NavBar />
    <ImgList :img-card-list="imgCardList" class="grow min-h-0" />
  </div>
</template>

<style>
  html {
    font-family: 'Noto Sans TC', sans-serif;
  }
</style>
