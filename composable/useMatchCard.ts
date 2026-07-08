import { computed } from 'vue';
import { getStageLabel } from '~/utils/getStageLabel';

/**
 * MatchCard 可重用邏輯
 */
export function useMatchCard(
  props: { match: any },
  emit: (event: string, payload?: any) => void
) {
  const { stageText } = getStageLabel() // 轉換階段名稱
  // 點擊國旗或隊名時觸發
  const onTeamClick = (teamCode: string | undefined) => {
    if (!teamCode) return;
    emit('team-click', teamCode);
  };
  //是否有比分
  const hasScore = computed(() =>
    props.match.homeScore !== undefined &&
    props.match.homeScore !== null &&
    props.match.awayScore !== null
  );
  //格式化日期
  const formattedDate = computed(() => {
    const dateStr = props.match.date || props.match.matchDate;
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-TW', {
      month: '2-digit',
      day: 'numeric',
      weekday: 'short',
    });
  });
  //轉換主隊名稱
  const homeTeamName = computed(() => {
    const name = props.match.homeTeam?.teamName ?? props.match.homeTeam ?? '';
    const code = props.match.homeTeam?.teamCode ?? '';
    const pending = !name || /^[WL]/i.test(name) || (code && /^[WL]/i.test(code));
    return pending ? '待定' : name;
  });
  //轉換客隊名稱
  const awayTeamName = computed(() => {
    const name = props.match.awayTeam?.teamName ?? props.match.awayTeam ?? '';
    const code = props.match.awayTeam?.teamCode ?? '';
    const pending = !name || /^[WL]/i.test(name) || (code && /^[WL]/i.test(code));
    return pending ? '待定' : name;
  });

  return {
    onTeamClick,
    hasScore,
    formattedDate,
    homeTeamName,
    awayTeamName,
    stageText,
  };
}