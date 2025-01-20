import { useStorage } from '@vueuse/core'

export const useStarListStore = defineStore('star-list', () => {
  const starList = useStorage<string[]>('star', [])

  function addToStarList(path: string) {
    starList.value.push(path)
  }
  function removeFromStarList(path: string) {
    starList.value = starList.value.filter((item) => item !== path)
  }

  return { starList,
    addToStarList,
removeFromStarList
   }
})