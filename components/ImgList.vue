<script setup lang="ts">
import { UseVirtualList } from '@vueuse/components'

defineProps<{
  imgCardList: {
    title: string
    path: string
    tags: string[]
    anime: string
  }[][]
}>()


</script>

<template>
  
    <div class="w-full grow min-h-0 overflow-y-auto">
      <UseVirtualList :list="imgCardList" :options="{ itemHeight: 300 }" height="full">
        <template #default="props">
          <div class="flex flex-wrap px-2 sm:px-4">
            <ImgCard
              v-for="item in props.data"
              :key="item.path"
              :img="item.path"
              :title="item.title"
              :tags="item.tags"
              class="mb-4 w-full min-[560px]:w-1/2 md:w-1/3 xl:w-1/4 px-1"
            />
          </div>
        </template>
      </UseVirtualList>
  </div>
</template>
