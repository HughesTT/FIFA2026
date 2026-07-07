import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTeamStore } from '~/store/teamStore';
import { useknockoutStore } from '~/store/knockoutStore';
import { useGroupStandings } from '~/composable/useGroupStandings';

export function useGameScheduleModal() {
  const router = useRouter();
  const isVisible = ref(true);
  const closeModal = () => {
    isVisible.value = false;
  };

  const groupRef = ref('');
  const { enhancedMatches } = useGroupStandings(groupRef);

  const teamStore = useTeamStore();
  const knockoutStore = useknockoutStore();

  // 篩選出今天或明天的比賽，且只顯示未開始的比賽
  const upcomingMatches = computed(() => {
    const now = new Date();
    const tomorrowEnd = new Date();
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1); // 設定為明天的結束時間
    tomorrowEnd.setHours(23, 59, 59, 999); // 確保涵蓋到明天一整天

    const knockoutMatches = knockoutStore.matches ?? [];
    return knockoutMatches
      .filter(match => {
        const matchDateTime = new Date(`${match.date}T00:00:00`); // 將比賽日期轉換為 Date 物件
        return matchDateTime >= now && matchDateTime <= tomorrowEnd;
      })
      .map(match => { // 使用國家隊名稱和旗幟
        const homeTeamInfo = teamStore.teams.find(t => t.teamCode === match.homeTeam.teamCode);
        const awayTeamInfo = teamStore.teams.find(t => t.teamCode === match.awayTeam.teamCode);
        return {
          ...match, // 取得原有的資料
          homeTeam: homeTeamInfo ? homeTeamInfo.teamName : match.homeTeam.teamName, // 使用國家隊名稱
          homeFlag: homeTeamInfo ? homeTeamInfo.teamFlag : '', // 使用國家隊旗幟
          homeCode: homeTeamInfo ? homeTeamInfo.teamCode : match.homeTeam.teamCode, // 使用國家隊代碼
          awayTeam: awayTeamInfo ? awayTeamInfo.teamName : match.awayTeam.teamName, // 使用國家隊名稱
          awayFlag: awayTeamInfo ? awayTeamInfo.teamFlag : '', // 使用國家隊旗幟
          awayCode: awayTeamInfo ? awayTeamInfo.teamCode : match.awayTeam.teamCode, // 使用國家隊代碼
        };
      })
      .sort((a, b) => { // 按照時間排序
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
  });

  // 點擊國旗後，跳轉到該國家的小組賽戰績頁面
  const viewCountryGameSchedule = (teamCode: string) => {
    closeModal();
    router.push({ path: '/CountryGameSchedule', query: { teamCode } });
  };

  return {
    isVisible,
    closeModal,
    groupRef,
    enhancedMatches,
    upcomingMatches,
    viewCountryGameSchedule,
  };
}
