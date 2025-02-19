<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { tagList } from '@/data/tagList'

const emit = defineEmits<{
  filterImgList: (data: { keyword: string, selected: string[], isOnlyStar: boolean }) => void
}>()

const mode = useColorMode()
const keyword = ref('')
const selected = ref([])


function search(q: string) {
  if (q === '') return tagList
  return tagList.filter((tag) => tag.details.some((detail) => detail.includes(q.toLocaleLowerCase())))
}

const isOnlyStar = ref(false)
watch([keyword, selected, isOnlyStar], () => {
  emit('filterImgList', { 
    keyword: keyword.value, 
    selected: selected.value.map((tag) => tag.value), 
    isOnlyStar: isOnlyStar.value })
})

// const { isShowOnlyStar } = storeToRefs(useStarListStore())
</script>

<template>
  <div class="flex flex-col justify-center gap-2 px-2 sm:px-4 pb-2">
    <div class="flex justify-center items-center text-lg gap-4 pt-2 text-cyan-500 font-500">
      MyGo!!!!! 圖片搜尋工具
      <div class="flex items-center gap-1">
        <UTooltip text="切換主題" >
          <UButton
            :icon="mode === 'light' ? 'i-material-symbols:light-mode-outline' : 'i-material-symbols:dark-mode-rounded'"
            color="primary"
            variant="ghost"
            @click="mode = mode === 'light' ? 'dark' : 'light'"
            class="text-lg"
          />
        </UTooltip>
        <UTooltip text="GitHub" >
          <UButton
            icon="i-bx:bxl-github"
            color="primary"
            variant="ghost"
            class="text-lg"
            @click="navigateTo('https://github.com/Minato1123/mygo', { external: true, open: { target: '_blank' } })"
          />
        </UTooltip>
      </div>
      
    </div>
    <div class="flex justify-center gap-x-4 gap-y-2 flex-col sm:flex-row">
      <UInput
        variant="outline"
        placeholder="搜尋台詞"
        v-model="keyword"
        class="min-w-80"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="keyword.length > 0"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="keyword = ''"
          />
        </template>
      </UInput>
      <div class="flex gap-x-2">
        <USelectMenu
          v-model="selected"
          variant="outline"
          :searchable="search"
          placeholder="選擇標籤"
          option-attribute="name"
          multiple
          trailing
          by="id"
          class="min-w-64 grow"
        />
        <UTooltip :text="isOnlyStar ?'顯示已收藏' : '顯示全部'">
          <UButton
            :icon="isOnlyStar ? 'i-material-symbols:kid-star' : 'i-material-symbols:kid-star-outline'"
            color="primary"
            variant="ghost"
            class="text-lg"
            @click="isOnlyStar = !isOnlyStar"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
