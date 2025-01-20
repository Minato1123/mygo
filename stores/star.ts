import { useStorage } from '@vueuse/core'

export const useStarListStore = defineStore('star-list', () => {
  const starList = useStorage<string[]>('star', [])
  const isShowOnlyStar = ref(false)

  function addToStarList(path: string) {
    starList.value.push(path)
  }
  function removeFromStarList(path: string) {
    starList.value = starList.value.filter((item) => item !== path)
  }

  function isInStarList(path: string) {
    return starList.value.includes(path)
  }

  return { 
    starList,
    isShowOnlyStar,
    addToStarList,
    removeFromStarList,
    isInStarList
   }
})