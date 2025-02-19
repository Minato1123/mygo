<script setup lang="ts">
import AssetsTableJson from '@/data/assetsTable.json'
import { useWindowSize } from '@vueuse/core'
import _ from 'lodash'

useHead({
  title: '一輩子跟我一起組樂團嗎',
})

const filterData = ref({
  keyword: '',
  selected: [],
  isOnlyStar: false,
})
function updateFilterData(data: {
  keyword: '',
  selected: [],
  isOnlyStar: false,
}) {
  filterData.value = data
}

const { width } = useWindowSize()
const currentTab = ref(0)
const { isInStarList } = useStarListStore()

const allImgCardList = ref([...AssetsTableJson])
const filteredImgCardList = computed(() => {
  const { keyword, selected, isOnlyStar } = filterData.value
  console.log(keyword, selected)
  let tempImgCardList = allImgCardList.value
  if (currentTab.value === 1) {
    tempImgCardList = tempImgCardList.filter((item) => item.anime === 'mygo')
  }
  else if (currentTab.value === 2) {
    tempImgCardList = tempImgCardList.filter((item) => item.anime === 'aveMujica')
  }

  if (keyword !== '') {
    tempImgCardList = tempImgCardList.filter((item) => item.title.includes(keyword))
  }
  if (selected.length > 0) {
    tempImgCardList = tempImgCardList.filter((item) => selected.every(s => item.tags.includes(s)))
  }
  if (isOnlyStar) {
    tempImgCardList = tempImgCardList.filter((item) => isInStarList(item.path))
  }


  if (width.value < 560) {
    return _.chunk(tempImgCardList, 1)
  }
  else if (width.value < 768) {
    return _.chunk(tempImgCardList, 2)
  }
  else if (width.value < 1280) {
    return _.chunk(tempImgCardList, 3)
  }
  return _.chunk(tempImgCardList, 4)
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
    <NavBar @filter-img-list="updateFilterData" />
    <div class="flex flex-col grow min-h-0">
      <UTabs :items="items" v-model="currentTab" class="px-2 sm:px-4" />
      <ImgList v-if="filteredImgCardList.length > 0" :img-card-list="filteredImgCardList" />
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
