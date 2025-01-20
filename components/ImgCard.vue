<script setup lang="ts">
import { useClipboardItems } from '@vueuse/core'


defineProps<{
  img: string
  title: string
  tags: string[]
}>()

const myHoverableElement = ref()
const isHovered = useElementHover(myHoverableElement)

const mime = 'image/jpeg'
const source = ref([
  new ClipboardItem({
    [mime]: new Blob(['<b>HTML content</b>'], { type: mime }),
  })
])

const { content, copy, copied, isSupported } = useClipboardItems({ source })

</script>

<template>
  <div>
     <div ref="myHoverableElement" class="bg-gray w-full rounded aspect-[16/9] mb-1 relative">
      <Transition>
        <div v-if="isHovered" class="absolute w-full h-full bg-black/20 top-0 left-0 rounded flex justify-center items-center gap-x-8">
          <button class="flex justify-center items-center">
            <div class="i-mingcute:download-2-line text-4xl text-white/60 hover:text-white/90 transition-colors duration-300"></div>
          </button>
          <button class="flex justify-center items-center">
            <div class="i-material-symbols:content-copy-outline-rounded text-4xl text-white/60 hover:text-white/90 transition-colors duration-300"></div>
          </button>
          <button class="flex justify-center items-center">
            <div class="i-material-symbols:kid-star-outline text-4xl text-white/60 hover:text-white/90 transition-colors duration-300"></div>
            <!-- <div class="i-material-symbols:kid-star text-2xl"></div> -->
          </button>
        </div>
      </Transition>
     </div>
    <p class="text-center">
      {{ title ?? 'alt' }}
    </p>
    <p class="text-sm opacity-40 flex gap-x-2 justify-center flex-wrap" >
      <a v-for="tag in tags" :key="`${img}-${tag}`" href="" class="hover:opacity-80 transition-colors duration-200">#{{ tag }}</a>
    </p>
  </div>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>