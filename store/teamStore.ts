import { ref } from 'vue';
import { defineStore } from 'pinia';

// 定義球隊資訊
interface TeamInfo {
  teamGroup: string
  teamName: string // 國家名稱
  teamFlag: string
  teamCode: string // 國家代碼（例如：MX、ZA、KR 等）
  teamGameSchedule: GameSchedule[] // 賽程資訊
}

// 定義賽程資訊
interface GameSchedule {
  matchId: string // 比賽ID
  date: string // 比賽日期
  time: string // 比賽時間
  homeAway: boolean // 主客場(true: 主場, false: 客場)
  opponent: string // 對手國家名稱
  stage: '小組賽' | '淘汰賽' // 比賽階段
}

export const useTeamStore = defineStore('team', () => {
  // 按組別分類的球隊資訊
  const teamsByGroup = {
    A: [
      // Group A
      {
        teamGroup: 'A',
        teamName: '墨西哥',
        teamFlag: 'https://www.worldometers.info/images/flags/original/mx.webp',
        teamCode: 'MX',
        teamGameSchedule: [
          {
            matchId: 'MX-1',
            date: '2026-06-12',
            time: '15:00',
            homeAway: true,
            opponent: '南非',
            stage: '小組賽'
          },
          {
            matchId: 'MX-2',
            date: '2026-06-19',
            time: '09:00',
            homeAway: true,
            opponent: '南韓',
            stage: '小組賽'
          },
          {
            matchId: 'MX-3',
            date: '2026-06-25',
            time: '09:00',
            homeAway: false,
            opponent: '捷克',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'A',
        teamName: '南非',
        teamFlag: 'https://www.worldometers.info/images/flags/original/za.webp',
        teamCode: 'ZA',
        teamGameSchedule: [
          {
            matchId: 'ZA-1',
            date: '2026-06-12',
            time: '15:00',
            homeAway: false,
            opponent: '墨西哥',
            stage: '小組賽'
          },
          {
            matchId: 'ZA-2',
            date: '2026-06-19',
            time: '00:00',
            homeAway: false,
            opponent: '捷克',
            stage: '小組賽'
          },
          {
            matchId: 'ZA-3',
            date: '2026-06-25',
            time: '09:00',
            homeAway: true,
            opponent: '南韓',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'A',
        teamName: '南韓',
        teamFlag: 'https://www.worldometers.info/images/flags/original/kr.webp',
        teamCode: 'KR',
        teamGameSchedule: [
          {
            matchId: 'KR-1',
            date: '2026-06-12',
            time: '10:00',
            homeAway: true,
            opponent: '捷克',
            stage: '小組賽'
          },
          {
            matchId: 'KR-2',
            date: '2026-06-19',
            time: '09:00',
            homeAway: false,
            opponent: '墨西哥',
            stage: '小組賽'
          },
          {
            matchId: 'KR-3',
            date: '2026-06-25',
            time: '09:00',
            homeAway: false,
            opponent: '南非',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'A',
        teamName: '捷克',
        teamFlag: 'https://www.worldometers.info/images/flags/original/cz.webp',
        teamCode: 'CZ',
        teamGameSchedule: [
          {
            matchId: 'CZ-1',
            date: '2026-06-12',
            time: '10:00',
            homeAway: false,
            opponent: '南韓',
            stage: '小組賽'
          },
          {
            matchId: 'CZ-2',
            date: '2026-06-19',
            time: '00:00',
            homeAway: true,
            opponent: '南非',
            stage: '小組賽'
          },
          {
            matchId: 'CZ-3',
            date: '2026-06-25',
            time: '09:00',
            homeAway: true,
            opponent: '墨西哥',
            stage: '小組賽'
          }
        ]
      }
    ],
    B: [
      {
        teamGroup: 'B',
        teamName: '加拿大',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ca.webp',
        teamCode: 'CA',
        teamGameSchedule: [
          {
            matchId: 'CA-1',
            date: '2026-06-13',
            time: '03:00',
            homeAway: true,
            opponent: '波赫',
            stage: '小組賽'
          },
          {
            matchId: 'CA-2',
            date: '2026-06-19',
            time: '06:00',
            homeAway: true,
            opponent: '卡達',
            stage: '小組賽'
          },
          {
            matchId: 'CA-3',
            date: '2026-06-25',
            time: '03:00',
            homeAway: false,
            opponent: '瑞士',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'B',
        teamName: '波赫',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ba.webp',
        teamCode: 'BA',
        teamGameSchedule: [
          {
            matchId: 'BA-1',
            date: '2026-06-13',
            time: '03:00',
            homeAway: false,
            opponent: '加拿大',
            stage: '小組賽'
          },
          {
            matchId: 'BA-2',
            date: '2026-06-19',
            time: '03:00',
            homeAway: false,
            opponent: '瑞士',
            stage: '小組賽'
          },
          {
            matchId: 'BA-3',
            date: '2026-06-25',
            time: '03:00',
            homeAway: true,
            opponent: '卡達',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'B',
        teamName: '卡達',
        teamFlag: 'https://www.worldometers.info/images/flags/original/qa.webp',
        teamCode: 'QA',
        teamGameSchedule: [
          {
            matchId: 'QA-1',
            date: '2026-06-14',
            time: '03:00',
            homeAway: true,
            opponent: '瑞士',
            stage: '小組賽'
          },
          {
            matchId: 'QA-2',
            date: '2026-06-19',
            time: '06:00',
            homeAway: false,
            opponent: '加拿大',
            stage: '小組賽'
          },
          {
            matchId: 'QA-3',
            date: '2026-06-25',
            time: '03:00',
            homeAway: false,
            opponent: '波赫',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'B',
        teamName: '瑞士',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ch.webp',
        teamCode: 'CH',
        teamGameSchedule: [
          {
            matchId: 'CH-1',
            date: '2026-06-14',
            time: '03:00',
            homeAway: false,
            opponent: '卡達',
            stage: '小組賽'
          },
          {
            matchId: 'CH-2',
            date: '2026-06-19',
            time: '03:00',
            homeAway: true,
            opponent: '波赫',
            stage: '小組賽'
          },
          {
            matchId: 'CH-3',
            date: '2026-06-25',
            time: '03:00',
            homeAway: true,
            opponent: '加拿大',
            stage: '小組賽'
          }
        ]
      }
    ],
    C: [
      {
        teamGroup: 'C',
        teamName: '巴西',
        teamFlag: 'https://www.worldometers.info/images/flags/original/br.webp',
        teamCode: 'BR',
        teamGameSchedule: [
          {
            matchId: 'BR-1',
            date: '2026-06-14',
            time: '06:00',
            homeAway: true,
            opponent: '摩洛哥',
            stage: '小組賽'
          },
          {
            matchId: 'BR-2',
            date: '2026-06-20',
            time: '08:30',
            homeAway: true,
            opponent: '海地',
            stage: '小組賽'
          },
          {
            matchId: 'BR-3',
            date: '2026-06-25',
            time: '06:00',
            homeAway: false,
            opponent: '蘇格蘭',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'C',
        teamName: '摩洛哥',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ma.webp',
        teamCode: 'MA',
        teamGameSchedule: [
          {
            matchId: 'MA-1',
            date: '2026-06-14',
            time: '06:00',
            homeAway: false,
            opponent: '巴西',
            stage: '小組賽'
          },
          {
            matchId: 'MA-2',
            date: '2026-06-20',
            time: '06:00',
            homeAway: false,
            opponent: '蘇格蘭',
            stage: '小組賽'
          },
          {
            matchId: 'MA-3',
            date: '2026-06-25',
            time: '06:00',
            homeAway: true,
            opponent: '海地',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'C',
        teamName: '海地',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ht.webp',
        teamCode: 'HT',
        teamGameSchedule: [
          {
            matchId: 'HT-1',
            date: '2026-06-14',
            time: '09:00',
            homeAway: true,
            opponent: '蘇格蘭',
            stage: '小組賽'
          },
          {
            matchId: 'HT-2',
            date: '2026-06-20',
            time: '08:30',
            homeAway: false,
            opponent: '巴西',
            stage: '小組賽'
          },
          {
            matchId: 'HT-3',
            date: '2026-06-25',
            time: '06:00',
            homeAway: true,
            opponent: '摩洛哥',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'C',
        teamName: '蘇格蘭',
        teamFlag: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg',
        teamCode: 'SC',
        teamGameSchedule: [
          {
            matchId: 'SC-1',
            date: '2026-06-14',
            time: '09:00',
            homeAway: false,
            opponent: '海地',
            stage: '小組賽'
          },
          {
            matchId: 'SC-2',
            date: '2026-06-20',
            time: '06:00',
            homeAway: true,
            opponent: '摩洛哥',
            stage: '小組賽'
          },
          {
            matchId: 'SC-3',
            date: '2026-06-25',
            time: '06:00',
            homeAway: true,
            opponent: '巴西',
            stage: '小組賽'
          }
        ]
      },
    ],
    D: [
      {
        teamGroup: 'D',
        teamName: '美國',
        teamFlag: 'https://www.worldometers.info/images/flags/original/us.webp',
        teamCode: 'US',
        teamGameSchedule: [
          {
            matchId: 'US-1',
            date: '2026-06-13',
            time: '09:00',
            homeAway: true,
            opponent: '巴拉圭',
            stage: '小組賽'
          },
          {
            matchId: 'US-2',
            date: '2026-06-20',
            time: '03:00',
            homeAway: true,
            opponent: '澳洲',
            stage: '小組賽'
          },
          {
            matchId: 'US-3',
            date: '2026-06-25',
            time: '10:00',
            homeAway: false,
            opponent: '土耳其',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'D',
        teamName: '巴拉圭',
        teamFlag: 'https://www.worldometers.info/images/flags/original/py.webp',
        teamCode: 'PY',
        teamGameSchedule: [
          {
            matchId: 'PY-1',
            date: '2026-06-13',
            time: '09:00',
            homeAway: false,
            opponent: '美國',
            stage: '小組賽'
          },
          {
            matchId: 'PY-2',
            date: '2026-06-20',
            time: '11:00',
            homeAway: false,
            opponent: '土耳其',
            stage: '小組賽'
          },
          {
            matchId: 'PY-3',
            date: '2026-06-25',
            time: '10:00',
            homeAway: true,
            opponent: '澳洲',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'D',
        teamName: '澳洲',
        teamFlag: 'https://www.worldometers.info/images/flags/original/au.webp',
        teamCode: 'AU',
        teamGameSchedule: [
          {
            matchId: 'AU-1',
            date: '2026-06-14',
            time: '12:00',
            homeAway: true,
            opponent: '土耳其',
            stage: '小組賽'
          },
          {
            matchId: 'AU-2',
            date: '2026-06-20',
            time: '03:00',
            homeAway: false,
            opponent: '美國',
            stage: '小組賽'
          },
          {
            matchId: 'AU-3',
            date: '2026-06-25',
            time: '10:00',
            homeAway: false,
            opponent: '巴拉圭',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'D',
        teamName: '土耳其',
        teamFlag: 'https://www.worldometers.info/images/flags/original/tr.webp',
        teamCode: 'TR',
        teamGameSchedule: [
          {
            matchId: 'TR-1',
            date: '2026-06-14',
            time: '12:00',
            homeAway: false,
            opponent: '澳洲',
            stage: '小組賽'
          },
          {
            matchId: 'TR-2',
            date: '2026-06-20',
            time: '11:00',
            homeAway: true,
            opponent: '巴拉圭',
            stage: '小組賽'
          },
          {
            matchId: 'TR-3',
            date: '2026-06-25',
            time: '10:00',
            homeAway: true,
            opponent: '美國',
            stage: '小組賽'
          }
        ]
      }
    ],
    E: [
      {
        teamGroup: 'E',
        teamName: '德國',
        teamFlag: 'https://www.worldometers.info/images/flags/original/de.webp',
        teamCode: 'DE',
        teamGameSchedule: [
          {
            matchId: 'DE-1',
            date: '2026-06-15',
            time: '01:00',
            homeAway: true,
            opponent: '庫拉索',
            stage: '小組賽'
          },
          {
            matchId: 'DE-2',
            date: '2026-06-21',
            time: '04:00',
            homeAway: true,
            opponent: '象牙海岸',
            stage: '小組賽'
          },
          {
            matchId: 'DE-3',
            date: '2026-06-26',
            time: '04:00',
            homeAway: false,
            opponent: '厄瓜多',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'E',
        teamName: '庫拉索',
        teamFlag: 'https://www.worldometers.info/images/flags/original/cw.webp',
        teamCode: 'CW',
        teamGameSchedule: [
          {
            matchId: 'CW-1',
            date: '2026-06-15',
            time: '01:00',
            homeAway: false,
            opponent: '德國',
            stage: '小組賽'
          },
          {
            matchId: 'CW-2',
            date: '2026-06-21',
            time: '08:00',
            homeAway: false,
            opponent: '厄瓜多',
            stage: '小組賽'
          },
          {
            matchId: 'CW-3',
            date: '2026-06-26',
            time: '04:00',
            homeAway: true,
            opponent: '象牙海岸',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'E',
        teamName: '象牙海岸',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ci.webp',
        teamCode: 'CI',
        teamGameSchedule: [
          {
            matchId: 'CI-1',
            date: '2026-06-15',
            time: '07:00',
            homeAway: true,
            opponent: '厄瓜多',
            stage: '小組賽'
          },
          {
            matchId: 'CI-2',
            date: '2026-06-21',
            time: '04:00',
            homeAway: false,
            opponent: '德國',
            stage: '小組賽'
          },
          {
            matchId: 'CI-3',
            date: '2026-06-26',
            time: '04:00',
            homeAway: false,
            opponent: '庫拉索',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'E',
        teamName: '厄瓜多',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ec.webp',
        teamCode: 'EC',
        teamGameSchedule: [
          {
            matchId: 'EC-1',
            date: '2026-06-15',
            time: '07:00',
            homeAway: false,
            opponent: '象牙海岸',
            stage: '小組賽'
          },
          {
            matchId: 'EC-2',
            date: '2026-06-21',
            time: '08:00',
            homeAway: true,
            opponent: '庫拉索',
            stage: '小組賽'
          },
          {
            matchId: 'EC-3',
            date: '2026-06-26',
            time: '04:00',
            homeAway: true,
            opponent: '德國',
            stage: '小組賽'
          }
        ]
      }
    ],
    F: [
      {
        teamGroup: 'F',
        teamName: '荷蘭',
        teamFlag: 'https://www.worldometers.info/images/flags/original/nl.webp',
        teamCode: 'NL',
        teamGameSchedule: [
          {
            matchId: 'NL-1',
            date: '2026-06-15',
            time: '04:00',
            homeAway: true,
            opponent: '日本',
            stage: '小組賽'
          },
          {
            matchId: 'NL-2',
            date: '2026-06-21',
            time: '01:00',
            homeAway: true,
            opponent: '瑞典',
            stage: '小組賽'
          },
          {
            matchId: 'NL-3',
            date: '2026-06-26',
            time: '07:00',
            homeAway: false,
            opponent: '突尼西亞',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'F',
        teamName: '日本',
        teamFlag: 'https://www.worldometers.info/images/flags/original/jp.webp',
        teamCode: 'JP',
        teamGameSchedule: [
          {
            matchId: 'JP-1',
            date: '2026-06-15',
            time: '04:00',
            homeAway: false,
            opponent: '荷蘭',
            stage: '小組賽'
          },
          {
            matchId: 'JP-2',
            date: '2026-06-21',
            time: '12:00',
            homeAway: false,
            opponent: '突尼西亞',
            stage: '小組賽'
          },
          {
            matchId: 'JP-3',
            date: '2026-06-26',
            time: '07:00',
            homeAway: true,
            opponent: '瑞典',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'F',
        teamName: '瑞典',
        teamFlag: 'https://www.worldometers.info/images/flags/original/se.webp',
        teamCode: 'SE',
        teamGameSchedule: [
          {
            matchId: 'SE-1',
            date: '2026-06-15',
            time: '10:00',
            homeAway: true,
            opponent: '突尼西亞',
            stage: '小組賽'
          },
          {
            matchId: 'SE-2',
            date: '2026-06-21',
            time: '01:00',
            homeAway: false,
            opponent: '荷蘭',
            stage: '小組賽'
          },
          {
            matchId: 'SE-3',
            date: '2026-06-26',
            time: '07:00',
            homeAway: false,
            opponent: '日本',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'F',
        teamName: '突尼西亞',
        teamFlag: 'https://www.worldometers.info/images/flags/original/tn.webp',
        teamCode: 'TN',
        teamGameSchedule: [
          {
            matchId: 'TN-1',
            date: '2026-06-15',
            time: '10:00',
            homeAway: false,
            opponent: '瑞典',
            stage: '小組賽'
          },
          {
            matchId: 'TN-2',
            date: '2026-06-21',
            time: '12:00',
            homeAway: true,
            opponent: '日本',
            stage: '小組賽'
          },
          {
            matchId: 'TN-3',
            date: '2026-06-26',
            time: '07:00',
            homeAway: false,
            opponent: '荷蘭',
            stage: '小組賽'
          }
        ]
      }
    ],
    G: [
      {
        teamGroup: 'G',
        teamName: '比利時',
        teamFlag: 'https://www.worldometers.info/images/flags/original/be.webp',
        teamCode: 'BE',
        teamGameSchedule: [
          {
            matchId: 'BE-1',
            date: '2026-06-16',
            time: '03:00',
            homeAway: true,
            opponent: '埃及',
            stage: '小組賽'
          },
          {
            matchId: 'BE-2',
            date: '2026-06-22',
            time: '03:00',
            homeAway: true,
            opponent: '伊朗',
            stage: '小組賽'
          },
          {
            matchId: 'BE-3',
            date: '2026-06-26',
            time: '03:00',
            homeAway: false,
            opponent: '紐西蘭',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'G',
        teamName: '埃及',
        teamFlag: 'https://www.worldometers.info/images/flags/original/eg.webp',
        teamCode: 'EG',
        teamGameSchedule: [
          {
            matchId: 'EG-1',
            date: '2026-06-16',
            time: '03:00',
            homeAway: false,
            opponent: '比利時',
            stage: '小組賽'
          },
          {
            matchId: 'EG-2',
            date: '2026-06-22',
            time: '09:00',
            homeAway: false,
            opponent: '紐西蘭',
            stage: '小組賽'
          },
          {
            matchId: 'EG-3',
            date: '2026-06-26',
            time: '11:00',
            homeAway: true,
            opponent: '伊朗',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'G',
        teamName: '伊朗',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ir.webp',
        teamCode: 'IR',
        teamGameSchedule: [
          {
            matchId: 'IR-1',
            date: '2026-06-16',
            time: '09:00',
            homeAway: true,
            opponent: '紐西蘭',
            stage: '小組賽'
          },
          {
            matchId: 'IR-2',
            date: '2026-06-22',
            time: '03:00',
            homeAway: false,
            opponent: '比利時',
            stage: '小組賽'
          },
          {
            matchId: 'IR-3',
            date: '2026-06-26',
            time: '11:00',
            homeAway: false,
            opponent: '埃及',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'G',
        teamName: '紐西蘭',
        teamFlag: 'https://www.worldometers.info/images/flags/original/nz.webp',
        teamCode: 'NZ',
        teamGameSchedule: [
          {
            matchId: 'NZ-1',
            date: '2026-06-16',
            time: '09:00',
            homeAway: false,
            opponent: '伊朗',
            stage: '小組賽'
          },
          {
            matchId: 'NZ-2',
            date: '2026-06-22',
            time: '09:00',
            homeAway: true,
            opponent: '埃及',
            stage: '小組賽'
          },
          {
            matchId: 'NZ-3',
            date: '2026-06-26',
            time: '11:00',
            homeAway: true,
            opponent: '比利時',
            stage: '小組賽'
          }
        ]
      }
    ],
    H: [
      {
        teamGroup: 'H',
        teamName: '西班牙',
        teamFlag: 'https://www.worldometers.info/images/flags/original/es.webp',
        teamCode: 'ES',
        teamGameSchedule: [
          {
            matchId: 'ES-1',
            date: '2026-06-16',
            time: '00:00',
            homeAway: true,
            opponent: '維德角',
            stage: '小組賽'
          },
          {
            matchId: 'ES-2',
            date: '2026-06-22',
            time: '00:00',
            homeAway: true,
            opponent: '沙烏地阿拉伯',
            stage: '小組賽'
          },
          {
            matchId: 'ES-3',
            date: '2026-06-27',
            time: '08:00',
            homeAway: false,
            opponent: '烏拉圭',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'H',
        teamName: '維德角',
        teamFlag: 'https://www.worldometers.info/images/flags/original/cv.webp',
        teamCode: 'CV',
        teamGameSchedule: [
          {
            matchId: 'CV-1',
            date: '2026-06-16',
            time: '00:00',
            homeAway: false,
            opponent: '西班牙',
            stage: '小組賽'
          },
          {
            matchId: 'CV-2',
            date: '2026-06-22',
            time: '06:00',
            homeAway: false,
            opponent: '烏拉圭',
            stage: '小組賽'
          },
          {
            matchId: 'CV-3',
            date: '2026-06-27',
            time: '08:00',
            homeAway: true,
            opponent: '沙烏地阿拉伯',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'H',
        teamName: '沙烏地阿拉伯',
        teamFlag: 'https://www.worldometers.info/images/flags/original/sa.webp',
        teamCode: 'SA',
        teamGameSchedule: [
          {
            matchId: 'SA-1',
            date: '2026-06-16',
            time: '06:00',
            homeAway: true,
            opponent: '烏拉圭',
            stage: '小組賽'
          },
          {
            matchId: 'SA-2',
            date: '2026-06-22',
            time: '00:00',
            homeAway: false,
            opponent: '西班牙',
            stage: '小組賽'
          },
          {
            matchId: 'SA-3',
            date: '2026-06-27',
            time: '08:00',
            homeAway: false,
            opponent: '維德角',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'H',
        teamName: '烏拉圭',
        teamFlag: 'https://www.worldometers.info/images/flags/original/uy.webp',
        teamCode: 'UY',
        teamGameSchedule: [
          {
            matchId: 'UY-1',
            date: '2026-06-16',
            time: '06:00',
            homeAway: false,
            opponent: '沙烏地阿拉伯',
            stage: '小組賽'
          },
          {
            matchId: 'UY-2',
            date: '2026-06-22',
            time: '06:00',
            homeAway: true,
            opponent: '維德角',
            stage: '小組賽'
          },
          {
            matchId: 'UY-3',
            date: '2026-06-27',
            time: '08:00',
            homeAway: false,
            opponent: '西班牙',
            stage: '小組賽'
          }
        ]
      }
    ],
    I: [
      {
        teamGroup: 'I',
        teamName: '法國',
        teamFlag: 'https://www.worldometers.info/images/flags/original/fr.webp',
        teamCode: 'FR',
        teamGameSchedule: [
          {
            matchId: 'FR-1',
            date: '2026-06-17',
            time: '03:00',
            homeAway: true,
            opponent: '塞內加爾',
            stage: '小組賽'
          },
          {
            matchId: 'FR-2',
            date: '2026-06-23',
            time: '05:00',
            homeAway: true,
            opponent: '伊拉克',
            stage: '小組賽'
          },
          {
            matchId: 'FR-3',
            date: '2026-06-27',
            time: '03:00',
            homeAway: false,
            opponent: '挪威',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'I',
        teamName: '塞內加爾',
        teamFlag: 'https://www.worldometers.info/images/flags/original/sn.webp',
        teamCode: 'SN',
        teamGameSchedule: [
          {
            matchId: 'SN-1',
            date: '2026-06-17',
            time: '03:00',
            homeAway: false,
            opponent: '法國',
            stage: '小組賽'
          },
          {
            matchId: 'SN-2',
            date: '2026-06-23',
            time: '08:00',
            homeAway: false,
            opponent: '挪威',
            stage: '小組賽'
          },
          {
            matchId: 'SN-3',
            date: '2026-06-27',
            time: '03:00',
            homeAway: true,
            opponent: '伊拉克',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'I',
        teamName: '伊拉克',
        teamFlag: 'https://www.worldometers.info/images/flags/original/iq.webp',
        teamCode: 'IQ',
        teamGameSchedule: [
          {
            matchId: 'IQ-1',
            date: '2026-06-17',
            time: '06:00',
            homeAway: true,
            opponent: '挪威',
            stage: '小組賽'
          },
          {
            matchId: 'IQ-2',
            date: '2026-06-23',
            time: '05:00',
            homeAway: false,
            opponent: '法國',
            stage: '小組賽'
          },
          {
            matchId: 'IQ-3',
            date: '2026-06-27',
            time: '03:00',
            homeAway: true,
            opponent: '塞內加爾',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'I',
        teamName: '挪威',
        teamFlag: 'https://www.worldometers.info/images/flags/original/no.webp',
        teamCode: 'NO',
        teamGameSchedule: [
          {
            matchId: 'NO-1',
            date: '2026-06-17',
            time: '06:00',
            homeAway: false,
            opponent: '伊拉克',
            stage: '小組賽'
          },
          {
            matchId: 'NO-2',
            date: '2026-06-23',
            time: '08:00',
            homeAway: true,
            opponent: '塞內加爾',
            stage: '小組賽'
          },
          {
            matchId: 'NO-3',
            date: '2026-06-27',
            time: '03:00',
            homeAway: true,
            opponent: '法國',
            stage: '小組賽'
          }
        ]
      }
    ],
    J: [
      {
        teamGroup: 'J',
        teamName: '阿根廷',
        teamFlag: 'https://www.worldometers.info/images/flags/original/ar.webp',
        teamCode: 'AR',
        teamGameSchedule: [
          {
            matchId: 'AR-1',
            date: '2026-06-17',
            time: '09:00',
            homeAway: true,
            opponent: '阿爾及利亞',
            stage: '小組賽'
          },
          {
            matchId: 'AR-2',
            date: '2026-06-23',
            time: '01:00',
            homeAway: true,
            opponent: '奧地利',
            stage: '小組賽'
          },
          {
            matchId: 'AR-3',
            date: '2026-06-28',
            time: '10:00',
            homeAway: false,
            opponent: '約旦',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'J',
        teamName: '阿爾及利亞',
        teamFlag: 'https://www.worldometers.info/images/flags/original/dz.webp',
        teamCode: 'DZ',
        teamGameSchedule: [
          {
            matchId: 'DZ-1',
            date: '2026-06-17',
            time: '09:00',
            homeAway: false,
            opponent: '阿根廷',
            stage: '小組賽'
          },
          {
            matchId: 'DZ-2',
            date: '2026-06-23',
            time: '11:00',
            homeAway: false,
            opponent: '約旦',
            stage: '小組賽'
          },
          {
            matchId: 'DZ-3',
            date: '2026-06-28',
            time: '10:00',
            homeAway: true,
            opponent: '奧地利',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'J',
        teamName: '奧地利',
        teamFlag: 'https://www.worldometers.info/images/flags/original/at.webp',
        teamCode: 'AT',
        teamGameSchedule: [
          {
            matchId: 'AT-1',
            date: '2026-06-17',
            time: '12:00',
            homeAway: true,
            opponent: '約旦',
            stage: '小組賽'
          },
          {
            matchId: 'AT-2',
            date: '2026-06-23',
            time: '01:00',
            homeAway: false,
            opponent: '阿根廷',
            stage: '小組賽'
          },
          {
            matchId: 'AT-3',
            date: '2026-06-28',
            time: '10:00',
            homeAway: false,
            opponent: '阿爾及利亞',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'J',
        teamName: '約旦',
        teamFlag: 'https://www.worldometers.info/images/flags/original/jo.webp',
        teamCode: 'JO',
        teamGameSchedule: [
          {
            matchId: 'JO-1',
            date: '2026-06-17',
            time: '12:00',
            homeAway: false,
            opponent: '奧地利',
            stage: '小組賽'
          },
          {
            matchId: 'JO-2',
            date: '2026-06-23',
            time: '11:00',
            homeAway: true,
            opponent: '阿爾及利亞',
            stage: '小組賽'
          },
          {
            matchId: 'JO-3',
            date: '2026-06-28',
            time: '10:00',
            homeAway: true,
            opponent: '阿根廷',
            stage: '小組賽'
          }
        ]
      }
    ],
    K: [
      {
        teamGroup: 'K',
        teamName: '葡萄牙',
        teamFlag: 'https://www.worldometers.info/images/flags/original/pt.webp',
        teamCode: 'PT',
        teamGameSchedule: [
          {
            matchId: 'PT-1',
            date: '2026-06-18',
            time: '01:00',
            homeAway: true,
            opponent: '剛果民主共和國',
            stage: '小組賽'
          },
          {
            matchId: 'PT-2',
            date: '2026-06-24',
            time: '01:00',
            homeAway: true,
            opponent: '烏茲別克',
            stage: '小組賽'
          },
          {
            matchId: 'PT-3',
            date: '2026-06-28',
            time: '07:30',
            homeAway: false,
            opponent: '哥倫比亞',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'K',
        teamName: '剛果民主共和國',
        teamFlag: 'https://www.worldometers.info/images/flags/original/cd.webp',
        teamCode: 'CD',
        teamGameSchedule: [
          {
            matchId: 'CD-1',
            date: '2026-06-18',
            time: '01:00',
            homeAway: false,
            opponent: '葡萄牙',
            stage: '小組賽'
          },
          {
            matchId: 'CD-2',
            date: '2026-06-24',
            time: '10:00',
            homeAway: false,
            opponent: '哥倫比亞',
            stage: '小組賽'
          },
          {
            matchId: 'CD-3',
            date: '2026-06-28',
            time: '07:30',
            homeAway: true,
            opponent: '烏茲別克',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'K',
        teamName: '烏茲別克',
        teamFlag: 'https://www.worldometers.info/images/flags/original/uz.webp',
        teamCode: 'UZ',
        teamGameSchedule: [
          {
            matchId: 'UZ-1',
            date: '2026-06-18',
            time: '10:00',
            homeAway: true,
            opponent: '哥倫比亞',
            stage: '小組賽'
          },
          {
            matchId: 'UZ-2',
            date: '2026-06-24',
            time: '01:00',
            homeAway: false,
            opponent: '葡萄牙',
            stage: '小組賽'
          },
          {
            matchId: 'UZ-3',
            date: '2026-06-28',
            time: '07:30',
            homeAway: false,
            opponent: '剛果民主共和國',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'K',
        teamName: '哥倫比亞',
        teamFlag: 'https://www.worldometers.info/images/flags/original/co.webp',
        teamCode: 'CO',
        teamGameSchedule: [
          {
            matchId: 'CO-1',
            date: '2026-06-18',
            time: '10:00',
            homeAway: false,
            opponent: '烏茲別克',
            stage: '小組賽'
          },
          {
            matchId: 'CO-2',
            date: '2026-06-24',
            time: '10:00',
            homeAway: true,
            opponent: '剛果民主共和國',
            stage: '小組賽'
          },
          {
            matchId: 'CO-3',
            date: '2026-06-28',
            time: '07:30',
            homeAway: true,
            opponent: '葡萄牙',
            stage: '小組賽'
          }
        ]
      }
    ],
    L: [
      {
        teamGroup: 'L',
        teamName: '英格蘭',
        teamFlag: 'https://www.worldometers.info/images/flags/original/gb.webp',
        teamCode: 'GB',
        teamGameSchedule: [
          {
            matchId: 'GB-1',
            date: '2026-06-18',
            time: '04:00',
            homeAway: true,
            opponent: '克羅埃西亞',
            stage: '小組賽'
          },
          {
            matchId: 'GB-2',
            date: '2026-06-24',
            time: '04:00',
            homeAway: true,
            opponent: '迦納',
            stage: '小組賽'
          },
          {
            matchId: 'GB-3',
            date: '2026-06-28',
            time: '05:00',
            homeAway: false,
            opponent: '巴拿馬',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'L',
        teamName: '克羅埃西亞',
        teamFlag: 'https://www.worldometers.info/images/flags/original/hr.webp',
        teamCode: 'HR',
        teamGameSchedule: [
          {
            matchId: 'HR-1',
            date: '2026-06-18',
            time: '04:00',
            homeAway: false,
            opponent: '英格蘭',
            stage: '小組賽'
          },
          {
            matchId: 'HR-2',
            date: '2026-06-24',
            time: '07:00',
            homeAway: false,
            opponent: '巴拿馬',
            stage: '小組賽'
          },
          {
            matchId: 'HR-3',
            date: '2026-06-28',
            time: '05:00',
            homeAway: true,
            opponent: '迦納',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'L',
        teamName: '迦納',
        teamFlag: 'https://www.worldometers.info/images/flags/original/gh.webp',
        teamCode: 'GH',
        teamGameSchedule: [
          {
            matchId: 'GH-1',
            date: '2026-06-18',
            time: '07:00',
            homeAway: true,
            opponent: '巴拿馬',
            stage: '小組賽'
          },
          {
            matchId: 'GH-2',
            date: '2026-06-24',
            time: '04:00',
            homeAway: false,
            opponent: '英格蘭',
            stage: '小組賽'
          },
          {
            matchId: 'GH-3',
            date: '2026-06-28',
            time: '05:00',
            homeAway: false,
            opponent: '克羅埃西亞',
            stage: '小組賽'
          }
        ]
      },
      {
        teamGroup: 'L',
        teamName: '巴拿馬',
        teamFlag: 'https://www.worldometers.info/images/flags/original/pa.webp',
        teamCode: 'PA',
        teamGameSchedule: [
          {
            matchId: 'PA-1',
            date: '2026-06-18',
            time: '07:00',
            homeAway: false,
            opponent: '迦納',
            stage: '小組賽'
          },
          {
            matchId: 'PA-2',
            date: '2026-06-24',
            time: '07:00',
            homeAway: true,
            opponent: '克羅埃西亞',
            stage: '小組賽'
          },
          {
            matchId: 'PA-3',
            date: '2026-06-28',
            time: '05:00',
            homeAway: true,
            opponent: '英格蘭',
            stage: '小組賽'
          }
        ]
      }
    ]
  }

  // 將 teamsByGroup 轉換為 teams 陣列
  const teams = ref<TeamInfo[]>(Object.values(teamsByGroup).flat())

  // 日期格式化
  const formatDate = (dateStr) => {
    const date = new Date(dateStr) // 將日期字串轉換
    return date.toLocaleDateString('zh-TW', {
      month: '2-digit', // 顯示兩位數的月份
      day: 'numeric', // 顯示數字的日期
      weekday: 'short' // 顯示簡短的星期幾名稱
    })
  }

  // 回傳 teams 和 teamsByGroup 以供使用
  return {
    teams,
    teamsByGroup,
    formatDate
  }
})