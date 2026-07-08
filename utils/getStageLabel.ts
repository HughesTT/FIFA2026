export function getStageLabel() {
    //轉換階段名稱
  const stageText = (stage: string) => {
    if (stage === 'R32') return '32強賽';
    if (stage === 'R16') return '16強賽';
    if (stage === 'QF') return '8強賽';
    if (stage === 'SF') return '4強賽';
    if (stage === 'Final') return '總決賽';
    return '';
  };
  return {
    stageText,
  }
}