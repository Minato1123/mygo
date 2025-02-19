<script setup lang="ts">
import { useClipboardItems } from '@vueuse/core'
import { useStarListStore } from '~/stores/star';


const props = defineProps<{
  img: string
  title: string
  tags: string[]
}>()

const myHoverableElement = ref()
const isHovered = useElementHover(myHoverableElement)

const mime = 'text/plain'
const source = ref([
new ClipboardItem({
    [mime]: new Blob(['plain text'], { type: mime }),
  })
])

const { content, copy, copied, isSupported } = useClipboardItems({ source })
async function copyImage() {
  const response = await fetch(props.img)
  const blob = await response.blob()
  const mime = blob.type

  await copy([
    new ClipboardItem({
      [mime]: blob,
    })
  ])
}

function downloadImage() {
  const link = document.createElement('a')
  link.href = props.img
  link.download = props.title
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


const { addToStarList, removeFromStarList, isInStarList } = useStarListStore()

</script>

<template>
  <div>
     <div ref="myHoverableElement" class="bg-gray w-full rounded aspect-[16/9] mb-1 relative bg-cover" :style="{ backgroundImage: `url(${img})` }">
      <Transition>
        <div v-if="isHovered" class="absolute w-full h-full bg-black/20 top-0 left-0 rounded flex justify-center items-center gap-x-8">
          <button class="flex justify-center items-center" @click="downloadImage">
            <div class="i-mingcute:download-2-line text-4xl text-white/60 hover:text-white/90 transition-colors duration-300" />
          </button>
          <button class="flex justify-center items-center" @click="copyImage">
            <div class="i-material-symbols:content-copy-outline-rounded text-4xl text-white/60 hover:text-white/90 transition-colors duration-300" />
          </button>
          <button class="flex justify-center items-center" @click="isInStarList(img) ? removeFromStarList(img) : addToStarList(img)">
            <div v-show="!isInStarList(img)" class="i-material-symbols:kid-star-outline text-4xl text-white/60 hover:text-white/90 transition-colors duration-300" />
            <div v-show="isInStarList(img)" class="i-material-symbols:kid-star text-4xl text-white/60 hover:text-white/90 transition-colors duration-300" />
          </button>
        </div>
      </Transition>
     </div>
    <p class="text-center">
      {{ title }}
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