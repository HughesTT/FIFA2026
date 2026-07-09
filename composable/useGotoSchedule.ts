import { useRouter } from 'vue-router'

export function useGotoSchedule() {
  const router = useRouter()

  // 點擊分組時顯示賽程
  const viewGameSchedule = (group) => {
    console.log(`顯示 ${group} 組的賽程`)
    router.push({ path: '/GroupGameSchedule', query: { group } }) // 導航到賽程頁面，並傳遞分組參數
  }

  // 點擊球隊時顯示賽程
  const viewCountryGameSchedule = (teamCode) => {
    console.log(`顯示 ${teamCode} 的賽程`)
    router.push({ path: '/CountryGameSchedule', query: { teamCode } }) // 導向到球隊賽程頁面，並傳遞球隊代碼參數
  }

  return {
    viewGameSchedule,
    viewCountryGameSchedule
  }
}