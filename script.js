document.addEventListener('DOMContentLoaded', () => {
  const startPage = document.getElementById('start-page');
  const quizPage = document.getElementById('quiz-page');
  const startButton = document.getElementById('start-button');
  const mapContainer = document.getElementById('country-map');
  const optionsContainer = document.getElementById('options-container');
  const messageDiv = document.getElementById('message');
  const scoreValueSpan = document.getElementById('score-value');
  const timerDisplay = document.getElementById('timer');
  const resultPage = document.getElementById('result-page');
  const finalScoreSpan = document.getElementById('final-score');
  const medalImage = document.getElementById('medal');

  let score = 0;
  let countriesData;
  let currentCountry;
  let timeLeft = 120; // 2 minutes
  let timerInterval;
  let unusedCountries = [];
  let usedCountries = [];

  const countryInfo = {
    "DZA": { "name": "Algeria 阿爾及利亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/4e/15/07/dz-03.jpg" },
    "RUS": { "name": "Russia 俄羅斯", "image": "https://www.worldatlas.com/r/w960-q80/upload/f9/6b/25/ru-03.jpg" },
    "CHN": { "name": "China 中國", "image": "https://www.worldatlas.com/r/w960-q80/upload/ee/23/62/cn-03.jpg" },
    "CAN": { "name": "Canada 加拿大", "image": "https://www.worldatlas.com/r/w1200/upload/82/38/b7/ca-03.jpg" },
    "USA": { "name": "United States 美國", "image": "https://www.worldatlas.com/r/w960-q80/upload/9d/ac/e8/us-03.png" },
    "BRA": { "name": "Brazil 巴西", "image": "https://www.worldatlas.com/r/w960-q80/upload/7a/ae/2b/br-03.png" },
    "AUS": { "name": "Australia 澳大利亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/d8/e7/0e/au-03.png" },
    "IND": { "name": "India 印度", "image": "https://www.worldatlas.com/r/w960-q80/upload/ed/95/3f/in-03.jpg" },
    "ARG": { "name": "Argentina 阿根廷", "image": "https://www.worldatlas.com/r/w1200/upload/65/b0/58/ar-03.png" },
    "KAZ": { "name": "Kazakhstan 哈薩克", "image": "https://www.worldatlas.com/r/w1200/upload/99/6d/4b/kz-03.jpg" },
    "COG": { "name": "Republic of the Congo 剛果共和國", "image": "https://www.worldatlas.com/r/w1200/upload/c9/4d/40/cg-03.jpg" },
    "DNK": { "name": "Denmark 丹麥", "image": "https://www.worldatlas.com/r/w960-q80/upload/48/bb/01/dk-03.jpg" },
    "SAU": { "name": "Saudi Arabia 沙烏地阿拉伯", "image": "https://www.worldatlas.com/r/w960-q80/upload/57/e5/f5/sa-03.jpg" },
    "MEX": { "name": "Mexico 墨西哥", "image": "https://www.worldatlas.com/r/w1200/upload/d4/d8/a9/mx-03.png" },
    "IDN": { "name": "Indonesia 印尼", "image": "https://www.worldatlas.com/r/w1200/upload/60/a2/ce/id-03.jpg" },
    "SDN": { "name": "Sudan 蘇丹", "image": "https://www.worldatlas.com/r/w960-q80/upload/e8/1b/2c/sd-03.jpg" },
    "LBY": { "name": "Libya 利比亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/5f/8c/45/ly-03.jpg" },
    "IRN": { "name": "Iran 伊朗", "image": "https://www.worldatlas.com/r/w960-q80/upload/3c/61/05/ir-03.jpg" },
    "MNG": { "name": "Mongolia 蒙古", "image": "https://www.worldatlas.com/r/w960-q80/upload/96/7c/12/mn-03.jpg" },
    "PER": { "name": "Peru 秘魯", "image": "https://www.worldatlas.com/r/w960-q80/upload/e0/4c/37/pe-03.png" },
    "TCD": { "name": "Chad 查德", "image": "https://www.worldatlas.com/r/w1200/upload/99/24/83/td-03.jpg" },
    "NER": { "name": "Niger 尼日", "image": "https://www.worldatlas.com/r/w960-q80/upload/f4/a3/c2/ne-03.jpg" },
    "AGO": { "name": "Angola 安哥拉", "image": "https://www.worldatlas.com/r/w960-q80/upload/77/21/5c/ao-03.jpg" },
    "MLI": { "name": "Mali 馬里", "image": "https://www.worldatlas.com/r/w960-q80/upload/88/08/be/ml-03.jpg" },
    "ZAF": { "name": "South Africa 南非", "image": "https://www.worldatlas.com/r/w960-q80/upload/12/37/a0/za-03.jpg" },
    "COL": { "name": "Colombia 哥倫比亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/04/79/7a/outline-2k.png" },
    "ETH": { "name": "Ethiopia 衣索比亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/8d/b6/79/et-03.jpg" },
    "BOL": { "name": "Bolivia 玻利維亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/b2/1f/3b/bo-03.png" },
    "MRT": { "name": "Mauritania 茅利塔尼亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/c8/7a/27/mr-03.jpg" },
    "EGY": { "name": "Egypt 埃及", "image": "https://www.worldatlas.com/r/w1200/upload/91/fb/ea/eg-03.jpg" },
    "TZA": { "name": "Tanzania 坦尚尼亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/66/bd/df/tz-03.jpg" },
    "NGA": { "name": "Nigeria 奈及利亞", "image": "https://www.worldatlas.com/r/w1200/upload/19/b6/f6/ng-03.jpg" },
    "VEN": { "name": "Venezuela 委內瑞拉", "image": "https://www.worldatlas.com/r/w960-q80/upload/41/63/20/ve-03.png" },
    "PAK": { "name": "Pakistan 巴基斯坦", "image": "https://www.worldatlas.com/r/w960-q80/upload/7f/78/3a/pk-03.jpg" },
    "NAM": { "name": "Namibia 納米比亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/39/fa/23/na-03.jpg" },
    "MOZ": { "name": "Mozambique 莫三比克", "image": "https://www.worldatlas.com/r/w960-q80/upload/c4/ec/12/mz-03.jpg" },
    "TUR": { "name": "Turkey 土耳其", "image": "https://www.worldatlas.com/r/w960-q80/upload/e7/c4/c3/tr-03.jpg" },
    "CHL": { "name": "Chile 智利", "image": "https://www.worldatlas.com/r/w960-q80/upload/94/ba/75/cl-03.png" },
    "ZMB": { "name": "Zambia 尚比亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/7b/2f/c2/zm-03.jpg" },
    "MMR": { "name": "Myanmar 緬甸", "image": "https://www.worldatlas.com/r/w960-q80/upload/a2/66/9e/mm-03.jpg" },
    "AFG": { "name": "Afghanistan 阿富汗", "image": "https://www.worldatlas.com/r/w960-q80/upload/9a/2a/47/af-03.jpg" },
    "SSD": { "name": "South Sudan 南蘇丹", "image": "https://www.worldatlas.com/r/w960-q80/upload/a1/9f/ea/ss-03.jpg" },
    "FRA": { "name": "France 法國", "image": "https://www.worldatlas.com/r/w960-q80/upload/84/d6/4f/fr-03.jpg" },
    "SOM": { "name": "Somalia 索馬利亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/98/9d/99/so-03.jpg" },
    "UKR": { "name": "Ukraine 烏克蘭", "image": "https://www.worldatlas.com/r/w960-q80/upload/ff/8b/42/ua-03.jpg" },
    "MDG": { "name": "Madagascar 馬達加斯加", "image": "https://www.worldatlas.com/r/w960-q80/upload/c0/fa/ef/mg-03.jpg" },
    "BWA": { "name": "Botswana 波札那", "image": "https://www.worldatlas.com/r/w960-q80/upload/d5/1d/66/botswana-empty-01.jpg" },
    "KEN": { "name": "Kenya 肯亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/53/1b/65/ke-03.jpg" },
    "THA": { "name": "Thailand 泰國", "image": "https://www.worldatlas.com/r/w960-q80/upload/5d/3a/69/th-03.jpg" },
    "ESP": { "name": "Spain 西班牙", "image": "https://www.worldatlas.com/r/w960-q80/upload/af/b1/30/es-03.jpg" },
    "TKM": { "name": "Turkmenistan 土庫曼", "image": "https://www.worldatlas.com/r/w960-q80/upload/09/90/e3/tm-03.jpg" },
    "CMR": { "name": "Cameroon 喀麥隆", "image": "https://www.worldatlas.com/r/w960-q80/upload/b2/ee/cf/cm-03.jpg" },
    "PNG": { "name": "Papua New Guinea 巴布亞紐幾內亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/43/06/32/pg-03.png" },
    "YEM": { "name": "Yemen 葉門", "image": "https://www.worldatlas.com/r/w960-q80/upload/a0/b1/22/ye-03.jpg" },
    "SWE": { "name": "Sweden 瑞典", "image": "https://www.worldatlas.com/r/w960-q80/upload/75/cc/3a/se-03.jpg" },
    "UZB": { "name": "Uzbekistan 烏茲別克", "image": "https://www.worldatlas.com/r/w960-q80/upload/22/32/62/uz-03.jpg" },
    "MAR": { "name": "Morocco 摩洛哥", "image": "https://www.worldatlas.com/r/w960-q80/upload/2e/3e/1b/ma-03.jpg" },
    "IRQ": { "name": "Iraq 伊拉克", "image": "https://www.worldatlas.com/r/w960-q80/upload/25/d4/ae/iq-03.jpg" },
    "PRY": { "name": "Paraguay 巴拉圭", "image": "https://www.worldatlas.com/r/w960-q80/upload/62/2c/3c/py-03.png" },
    "ZWE": { "name": "Zimbabwe 辛巴威", "image": "https://www.worldatlas.com/r/w960-q80/upload/d0/14/76/zw-03.jpg" },
    "NOR": { "name": "Norway 挪威", "image": "https://www.worldatlas.com/r/w960-q80/upload/67/ea/2a/no-03.jpg" },
    "JPN": { "name": "Japan 日本", "image": "https://www.worldatlas.com/r/w960-q80/upload/58/1e/06/jp-03.jpg" },
    "DEU": { "name": "Germany 德國", "image": "https://www.worldatlas.com/r/w960-q80/upload/39/71/55/de-03.jpg" },
    "FIN": { "name": "Finland 芬蘭", "image": "https://www.worldatlas.com/r/w960-q80/upload/17/2e/06/fi-03.jpg" },
    "VNM": { "name": "Vietnam 越南", "image": "https://www.worldatlas.com/r/w960-q80/upload/f6/a3/59/vn-03.jpg" },
    "MYS": { "name": "Malaysia 馬來西亞", "image": "https://www.worldatlas.com/r/w960-q80/upload/ee/63/80/my-03.jpg" },
    "POL": { "name": "Poland 波蘭", "image": "https://www.worldatlas.com/r/w960-q80/upload/fb/59/f7/pl-03.jpg" },
    "OMN": { "name": "Oman 阿曼", "image": "https://www.worldatlas.com/r/w960-q80/upload/96/4b/38/om-03.jpg" },
    "ITA": { "name": "Italy 義大利", "image": "https://www.worldatlas.com/r/w768-q80/upload/57/82/4d/it-03.jpg" },
    "PHL": { "name": "The Philippines 菲律賓", "image": "https://www.worldatlas.com/r/w768-q80/upload/c3/28/64/outline-2k.png" },
    "ECU": { "name": "Ecuador 厄瓜多", "image": "https://www.worldatlas.com/r/w768-q80/upload/27/6d/ef/ec-03.png" },
    "BFA": { "name": "Burkina Faso 布吉納法索", "image": "https://www.worldatlas.com/r/w768-q80/upload/25/b8/cd/bf-03.jpg" },
    "NZL": { "name": "New Zealand 紐西蘭", "image": "https://www.worldatlas.com/r/w768-q80/upload/63/45/06/nz-03.png" },
    "GAB": { "name": "Gabon 加彭", "image": "https://www.worldatlas.com/r/w768-q80/upload/e0/76/4a/ga-03.jpg" },
    "ESH": { "name": "Western Sahara 西撒哈拉", "image": "https://www.worldatlas.com/r/w768-q80/upload/4c/26/86/eh-03.jpg" },
    "GIN": { "name": "Guinea 幾內亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/4a/8a/40/gn-03.jpg" },
    "GBR": { "name": "United Kingdom 英國", "image": "https://www.worldatlas.com/r/w768-q80/upload/66/fb/ff/uk-03.png" },
    "UGA": { "name": "Uganda 烏干達", "image": "https://www.worldatlas.com/r/w768-q80/upload/b9/75/36/ug-03.jpg" },
    "GHA": { "name": "Ghana 迦納", "image": "https://www.worldatlas.com/r/w768-q80/upload/01/bf/92/gh-03.jpg" },
    "ROU": { "name": "Romania 羅馬尼亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/f2/47/06/ro-03.jpg" },
    "LAO": { "name": "Laos 寮國", "image": "https://www.worldatlas.com/r/w768-q80/upload/c7/70/45/la-03.jpg" },
    "CIV": { "name": "Ivory Coast 象牙海岸", "image": "https://www.worldatlas.com/r/w768-q80/upload/d5/1a/d2/ci-03.jpg" },
    "GUY": { "name": "Guyana 圭亞那", "image": "https://www.worldatlas.com/r/w768-q80/upload/53/2c/1e/gy-03.png" },
    "BLR": { "name": "Belarus 白俄羅斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/9d/8a/cf/by-03.jpg" },
    "KGZ": { "name": "Kyrgyzstan 吉爾吉斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/52/7d/d5/kg-03.jpg" },
    "SEN": { "name": "Senegal 塞內加爾", "image": "https://www.worldatlas.com/r/w768-q80/upload/28/53/c1/sn-03.jpg" },
    "SYR": { "name": "Syria 敘利亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/b6/4b/c5/sy-03.jpg" },
    "KHM": { "name": "Cambodia 柬埔寨", "image": "https://www.worldatlas.com/r/w768-q80/upload/85/3a/6d/kh-03.jpg" },
    "URY": { "name": "Uruguay 烏拉圭", "image": "https://www.worldatlas.com/r/w768-q80/upload/0c/82/55/uy-03.png" },
    "SUR": { "name": "Suriname 蘇利南", "image": "https://www.worldatlas.com/r/w768-q80/upload/d0/de/fb/sr-03.png" },
    "TUN": { "name": "Tunisia 突尼西亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/c2/5b/24/tn-03.jpg" },
    "BGD": { "name": "Bangladesh 孟加拉", "image": "https://www.worldatlas.com/r/w768-q80/upload/74/83/a2/bd-03.jpg" },
    "NPL": { "name": "Nepal 尼泊爾", "image": "https://www.worldatlas.com/r/w768-q80/upload/a0/8e/33/np-03.jpg" },
    "TJK": { "name": "Tajikistan 塔吉克", "image": "https://www.worldatlas.com/r/w768-q80/upload/f9/e5/50/tj-03.jpg" },
    "GRC": { "name": "Greece 希臘", "image": "https://www.worldatlas.com/r/w768-q80/upload/d3/91/54/gr-03.jpg" },
    "NIC": { "name": "Nicaragua 尼加拉瓜", "image": "https://www.worldatlas.com/r/w768-q80/upload/28/f3/8a/ni-03.jpg" },
    "PRK": { "name": "North Korea 北韓", "image": "https://www.worldatlas.com/r/w768-q80/upload/0f/25/be/kp-03.jpg" },
    "KOR": { "name": "South Korea 南韓", "image": "https://www.worldatlas.com/r/w768-q80/upload/a8/d4/36/kr-03.jpg" },
    "MWI": { "name": "Malawi 馬拉威", "image": "https://www.worldatlas.com/r/w768-q80/upload/0a/c0/54/mw-03.jpg" },
    "ERI": { "name": "Eritrea 厄立特里亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/ff/fd/65/er-03.jpg" },
    "HND": { "name": "Honduras 宏都拉斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/18/2f/99/hn-03.jpg" },
    "LBR": { "name": "Liberia 賴比瑞亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/3c/82/8b/lr-03.jpg" },
    "BGR": { "name": "Bulgaria 保加利亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/82/86/e2/bg-03.jpg" },
    "CUB": { "name": "Cuba 古巴", "image": "https://www.worldatlas.com/r/w768-q80/upload/fa/fe/3f/cu-03.jpg" },
    "GTM": { "name": "Guatemala 瓜地馬拉", "image": "https://www.worldatlas.com/r/w768-q80/upload/61/63/bd/gt-03.jpg" },
    "ISL": { "name": "Iceland 冰島", "image": "https://www.worldatlas.com/r/w768-q80/upload/2f/c2/46/is-03.jpg" },
    "HUN": { "name": "Hungary 匈牙利", "image": "https://www.worldatlas.com/r/w768-q80/upload/f4/a0/4a/hu-03.jpg" },
    "PRT": { "name": "Portugal 葡萄牙", "image": "https://www.worldatlas.com/r/w768-q80/upload/e8/c2/db/pt-03.jpg" },
    "JOR": { "name": "Jordan 約旦", "image": "https://www.worldatlas.com/r/w768-q80/upload/49/4a/c3/jo-03.jpg" },
    "SRB": { "name": "Serbia 塞爾維亞", "image": "https://www.worldatlas.com/r/w1200/upload/3b/c4/e2/rs-03.jpg" },
    "AZE": { "name": "Azerbaijan 亞塞拜然", "image": "https://www.worldatlas.com/r/w768-q80/upload/e4/d5/0b/az-03.jpg" },
    "AUT": { "name": "Austria 奧地利", "image": "https://www.worldatlas.com/r/w768-q80/upload/35/fe/ef/at-03.jpg" },
    "ARE": { "name": "United Arab Emirates 阿聯酋", "image": "https://www.worldatlas.com/r/w768-q80/upload/18/c7/0e/ae-03.jpg" },
    "CZE": { "name": "Czech Republic 捷克", "image": "https://www.worldatlas.com/r/w768-q80/upload/cf/c1/48/cz-03.jpg" },
    "PAN": { "name": "Panama 巴拿馬", "image": "https://www.worldatlas.com/r/w768-q80/upload/83/f0/e3/pa-03.jpg" },
    "SLE": { "name": "Sierra Leone 獅子山", "image": "https://www.worldatlas.com/r/w768-q80/upload/b4/5f/78/sl-03.jpg" },
    "IRL": { "name": "Ireland 愛爾蘭", "image": "https://www.worldatlas.com/r/w768-q80/upload/f6/b7/c3/ie-03.jpg" },
    "GEO": { "name": "Georgia 喬治亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/09/a1/bb/ge-03.jpg" },
    "LKA": { "name": "Sri Lanka 斯里蘭卡", "image": "https://www.worldatlas.com/r/w768-q80/upload/e8/01/b5/lk-03.jpg" },
    "LTU": { "name": "Lithuania 立陶宛", "image": "https://www.worldatlas.com/r/w768-q80/upload/9a/13/e2/lt-03.jpg" },
    "LVA": { "name": "Latvia 拉脫維亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/af/41/7d/lv-03.jpg" },
    "TG": { "name": "Togo 多哥", "image": "https://www.worldatlas.com/r/w768-q80/upload/9d/11/72/tg-03.jpg" },
    "HR": { "name": "Croatia 克羅埃西亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/1b/81/f4/hr-03.jpg" },
    "BA": { "name": "Bosnia and Herzegovina 波士尼亞與赫塞哥維納", "image": "https://www.worldatlas.com/r/w768-q80/upload/25/95/0e/ba-03.png" },
    "CR": { "name": "Costa Rica 哥斯大黎加", "image": "https://www.worldatlas.com/r/w768-q80/upload/60/58/2b/cr-03.jpg" },
    "SK": { "name": "Slovakia 斯洛伐克", "image": "https://www.worldatlas.com/r/w768-q80/upload/51/09/34/sk-03.jpg" },
    "DO": { "name": "Dominican Republic 多明尼加共和國", "image": "https://www.worldatlas.com/r/w768-q80/upload/1f/b0/9d/do-03.png" },
    "EE": { "name": "Estonia 愛沙尼亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/a8/1e/d6/ee-03.jpg" },
    "DK": { "name": "Denmark 丹麥", "image": "https://www.worldatlas.com/r/w768-q80/upload/48/bb/01/dk-03.jpg" },
    "NL": { "name": "Netherlands 荷蘭", "image": "https://www.worldatlas.com/r/w768-q80/upload/ad/1a/90/nl-03.jpg" },
    "CH": { "name": "Switzerland 瑞士", "image": "https://www.worldatlas.com/r/w768-q80/upload/27/6f/51/ch-03.jpg" },
    "BT": { "name": "Bhutan 不丹", "image": "https://www.worldatlas.com/r/w768-q80/upload/f0/04/6c/bt-03.jpg" },
    "GW": { "name": "Guinea-Bissau 幾內亞比索", "image": "https://www.worldatlas.com/r/w768-q80/upload/87/6b/b9/gw-03.jpg" },
    "TW": { "name": "Taiwan 台灣", "image": "https://www.worldatlas.com/r/w768-q80/upload/22/0b/d5/tw-03.jpg" },
    "MD": { "name": "Moldova 摩爾多瓦", "image": "https://www.worldatlas.com/r/w768-q80/upload/c8/25/2d/md-03.jpg" },
    "BE": { "name": "Belgium 比利時", "image": "https://www.worldatlas.com/r/w768-q80/upload/97/89/63/be-03.jpg" },
    "LS": { "name": "Lesotho 賴索托", "image": "https://www.worldatlas.com/r/w768-q80/upload/21/47/4b/ls-03.jpg" },
    "AM": { "name": "Armenia 亞美尼亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/e8/a5/a2/am-03.jpg" },
    "SB": { "name": "Solomon Islands 所羅門群島", "image": "https://www.worldatlas.com/r/w768-q80/upload/40/bc/20/sb-03.png" },
    "AL": { "name": "Albania 阿爾巴尼亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/a5/ea/4c/al-03.jpg" },
    "GQ": { "name": "Equatorial Guinea 赤道幾內亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/f2/8d/68/gq-03.jpg" },
    "BI": { "name": "Burundi 布隆迪", "image": "https://www.worldatlas.com/r/w768-q80/upload/92/3a/14/bi-03.jpg" },
    "HT": { "name": "Haiti 海地", "image": "https://www.worldatlas.com/r/w768-q80/upload/70/4c/9c/ht-03.png" },
    "RW": { "name": "Rwanda 盧安達", "image": "https://www.worldatlas.com/r/w768-q80/upload/24/a6/18/rw-03.jpg" },
    "MK": { "name": "North Macedonia 北馬其頓", "image": "https://www.worldatlas.com/r/w768-q80/upload/b4/75/7a/mk-03.jpg" },
    "DJ": { "name": "Djibouti 吉布地", "image": "https://www.worldatlas.com/r/w768-q80/upload/d6/f2/54/dj-03.jpg" },
    "BZ": { "name": "Belize 貝里斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/47/1e/6d/bz-03.jpg" },
    "SV": { "name": "El Salvador 薩爾瓦多", "image": "https://www.worldatlas.com/r/w768-q80/upload/90/b9/07/sv-03.jpg" },
    "SI": { "name": "Slovenia 斯洛維尼亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/ac/79/d4/si-03.jpg" },
    "FJ": { "name": "Fiji 斐濟", "image": "https://www.worldatlas.com/r/w768-q80/upload/3f/e0/9c/fj-03.png" },
    "KW": { "name": "Kuwait 科威特", "image": "https://www.worldatlas.com/r/w768-q80/upload/c6/3b/4d/kw-03.jpg" },
    "SZ": { "name": "Eswatini 史瓦帝尼", "image": "https://www.worldatlas.com/r/w768-q80/upload/79/2b/60/sz-03.jpg" },
    "TL": { "name": "Timor-Leste 東帝汶", "image": "https://www.worldatlas.com/r/w768-q80/upload/ca/bd/b7/tl-03.jpg" },
    "BS": { "name": "Bahamas 巴哈馬", "image": "https://www.worldatlas.com/r/w768-q80/upload/55/8c/da/bs-03.jpg" },
    "ME": { "name": "Montenegro 蒙特內哥羅", "image": "https://www.worldatlas.com/r/w768-q80/upload/ef/f3/cc/me-03.jpg" },
    "VU": { "name": "Vanuatu 萬那杜", "image": "https://www.worldatlas.com/r/w768-q80/upload/c6/d8/f2/vu-03.png" },
    "QA": { "name": "Qatar 卡達", "image": "https://www.worldatlas.com/r/w768-q80/upload/94/53/d3/qa-03.jpg" },
    "GM": { "name": "The Gambia 甘比亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/fb/06/a4/gm-03.jpg" },
    "JM": { "name": "Jamaica 牙買加", "image": "https://www.worldatlas.com/r/w768-q80/upload/9e/8a/f0/jm-03.png" },
    "LBN": { "name": "Lebanon 黎巴嫩", "image": "https://www.worldatlas.com/r/w768-q80/upload/f9/01/ce/artboard-4.png" },
    "CYP": { "name": "Cyprus 賽普勒斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/13/6b/b0/cy-03.jpg" },
    "BRN": { "name": "Brunei Darussalam 汶萊", "image": "https://www.worldatlas.com/r/w768-q80/upload/92/66/ff/bn-03.jpg" },
    "TTO": { "name": "Trinidad and Tobago 千里達及托巴哥", "image": "https://www.worldatlas.com/r/w768-q80/upload/8a/4e/0d/tt-03.png" },
    "CPV": { "name": "Cape Verde 維德角", "image": "https://www.worldatlas.com/r/w768-q80/upload/7d/cb/df/cv-03.jpg" },
    "WSM": { "name": "Samoa 薩摩亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/13/35/5b/ws-03.png" },
    "LUX": { "name": "Luxembourg 盧森堡", "image": "https://www.worldatlas.com/r/w768-q80/upload/fd/18/ed/lu-03.jpg" },
    "MUS": { "name": "Mauritius 模里西斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/83/1b/1f/mu-03.jpg" },
    "COM": { "name": "Comoros 科摩羅", "image": "https://www.worldatlas.com/r/w768-q80/upload/77/8a/e7/km-03.jpg" },
    "STP": { "name": "São Tomé and Príncipe 聖多美及普林西比", "image": "https://www.worldatlas.com/r/w768-q80/upload/6f/e6/78/st-03.jpg" },
    "KIR": { "name": "Kiribati 吉里巴斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/b9/df/22/ki-03.png" },
    "BHR": { "name": "Bahrain 巴林", "image": "https://www.worldatlas.com/r/w768-q80/upload/f1/93/f9/bh-03.jpg" },
    "DMA": { "name": "Dominica 多米尼克", "image": "https://www.worldatlas.com/r/w768-q80/upload/09/2d/58/dm-03.png" },
    "TON": { "name": "Tonga 東加", "image": "https://www.worldatlas.com/r/w768-q80/upload/1f/5e/16/to-03.png" },
    "SGP": { "name": "Singapore 新加坡", "image": "https://www.worldatlas.com/r/w768-q80/upload/18/bc/ff/sg-03.jpg" },
    "FSM": { "name": "Micronesia 密克羅尼西亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/d3/3e/0e/fm-03.png" },
    "LCA": { "name": "Saint Lucia 聖露西亞", "image": "https://www.worldatlas.com/r/w768-q80/upload/d7/c6/54/lc-03.png" },
    "AND": { "name": "Andorra 安道爾", "image": "https://www.worldatlas.com/r/w768-q80/upload/0c/f9/d1/ad-03.jpg" },
    "PLW": { "name": "Palau 帛琉", "image": "https://www.worldatlas.com/r/w768-q80/upload/da/17/2c/pw-03.png" },
    "SYC": { "name": "Seychelles 塞席爾", "image": "https://www.worldatlas.com/r/w768-q80/upload/a2/ca/b9/sc-03.jpg" },
    "ATG": { "name": "Antigua and Barbuda 安提瓜及巴布達", "image": "https://www.worldatlas.com/r/w768-q80/upload/e0/db/b7/ag-03.png" },
    "BRB": { "name": "Barbados 巴貝多", "image": "https://www.worldatlas.com/r/w768-q80/upload/c8/2b/c7/bb-03.jpg" },
    "VCT": { "name": "Saint Vincent and the Grenadines 聖文森及格瑞那丁", "image": "https://www.worldatlas.com/r/w768-q80/upload/c4/0b/5e/vc-03.png" },
    "GRD": { "name": "Grenada 格瑞那達", "image": "https://www.worldatlas.com/r/w768-q80/upload/18/30/56/gd-03.png" },
    "MLT": { "name": "Malta 馬爾他", "image": "https://www.worldatlas.com/r/w768-q80/upload/58/03/8d/mt-03.jpg" },
    "MDV": { "name": "Maldives 馬爾地夫", "image": "https://www.worldatlas.com/r/w768-q80/upload/f9/58/15/mv-03.jpg" },
    "KNA": { "name": "Saint Kitts and Nevis 聖克里斯多福及尼維斯", "image": "https://www.worldatlas.com/r/w768-q80/upload/40/bc/75/kn-03.png" },
    "MHL": { "name": "Marshall Islands 馬紹爾群島", "image": "https://www.worldatlas.com/r/w768-q80/upload/e4/47/53/mh-03.png" },
    "LIE": { "name": "Liechtenstein 列支敦士登", "image": "https://www.worldatlas.com/r/w768-q80/upload/54/10/f3/li-03.jpg" },
    "SMR": { "name": "San Marino 聖馬利諾", "image": "https://www.worldatlas.com/r/w768-q80/upload/1e/ed/1b/sm-03.jpg" },
    "TUV": { "name": "Tuvalu 吐瓦魯", "image": "https://www.worldatlas.com/r/w768-q80/upload/38/07/a7/tv-03.png" },
    "NRU": { "name": "Nauru 諾魯", "image": "https://www.worldatlas.com/r/w768-q80/upload/7c/57/d9/nr-03.png" },
    "MCO": { "name": "Monaco 摩納哥", "image": "https://www.worldatlas.com/r/w1200/upload/77/ec/dd/mc-03.jpg" },
    "VAT": { "name": "Vatican City 梵蒂岡", "image": "https://www.worldatlas.com/r/w768-q80/upload/aa/ae/cc/va-03.jpg" }
};

  // Load country data
async function loadData() {
  countriesData = Object.entries(countryInfo).map(([id, data]) => ({
    type: "Feature",
    id: id,
    properties: {
      ...data,
    },
    geometry: {
      type: "Point",
      coordinates: []
    }
  }));
  
  // Initialize the unused countries pool
  unusedCountries = [...countriesData];
  usedCountries = [];
  
  return countriesData;
}

function drawMap(countryToHighlight = null) {
  mapContainer.innerHTML = '';

  const containerWidth = 400;
  const containerHeight = 300;

  if (countryToHighlight && countryToHighlight.properties.image) {
    // Create a temporary image to get the natural dimensions
    const image = new Image();
    image.onload = function() {
      const imageWidth = this.width;
      const imageHeight = this.height;
      const imageAspectRatio = imageWidth / imageHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      
      let finalWidth, finalHeight;
      
      // Calculate dimensions to fit the entire image
      if (imageAspectRatio > containerAspectRatio) {
        // Image is wider - fit to container width
        finalWidth = containerWidth;
        finalHeight = containerWidth / imageAspectRatio;
      } else {
        // Image is taller - fit to container height
        finalHeight = containerHeight;
        finalWidth = containerHeight * imageAspectRatio;
      }

      // Update SVG dimensions
      const svg = d3.select("#country-map")
        .attr("width", finalWidth)
        .attr("height", finalHeight)
        .style("max-width", "100%")
        .style("height", "auto");

      // Add background
      svg.append("rect")
        .attr("width", finalWidth)
        .attr("height", finalHeight)
        .attr("fill", "#f8f9fa");

      // Add the image
      svg.append("image")
        .attr("xlink:href", countryToHighlight.properties.image)
        .attr("width", finalWidth)
        .attr("height", finalHeight)
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 1);
    };
    image.src = countryToHighlight.properties.image;
  } else {
    // If no image, set default size
    const svg = d3.select("#country-map")
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    svg.append("rect")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("fill", "#f8f9fa");
  }
}

function pickRandomCountry() {
  // If all countries have been used, reset the pools
  if (unusedCountries.length === 0) {
    unusedCountries = [...usedCountries];
    usedCountries = [];
    console.log('All countries have been shown - resetting pool');
  }
  
  // Pick a random country from unused pool
  const randomIndex = Math.floor(Math.random() * unusedCountries.length);
  const selectedCountry = unusedCountries[randomIndex];
  
  // Move the selected country from unused to used pool
  unusedCountries.splice(randomIndex, 1);
  usedCountries.push(selectedCountry);
  
  return selectedCountry;
}

  // Function to generate multiple choice options
  function generateOptions(correctCountry) {
    const options = [correctCountry];
    while (options.length < 4) {
      let randomCountry = pickRandomCountry();
      if (!options.find(country => country.id === randomCountry.id)) {
        options.push(randomCountry);
      }
    }
    return shuffleArray(options);
  }

  // Function to shuffle an array (Fisher-Yates shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to render options
  function renderOptions(options) {
    optionsContainer.innerHTML = '';

    options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option.properties.name;
      button.addEventListener('click', () => checkGuess(option));
      optionsContainer.appendChild(button);
    });
  }

  // Function to check if the guess is correct
  function checkGuess(selectedCountry) {
    if (!currentCountry) {
      messageDiv.textContent = 'No country to guess. Please wait...';
      return;
    }

    if (selectedCountry.id === currentCountry.id) {
      messageDiv.textContent = 'Correct!';
      score++;
      scoreValueSpan.textContent = score;

      // Log country name and URL to the console
      if (currentCountry.properties && currentCountry.properties.image) {
        console.log(`Country: ${currentCountry.properties.name}, Image URL: ${currentCountry.properties.image}`);
      } else {
        console.log(`Country: ${currentCountry.properties.name}, No image URL available`);
      }

      setTimeout(newRound, 1000);
    } else {
      messageDiv.textContent = `Incorrect. The correct answer was ${currentCountry.properties.name}.`;
      // Find the button that was clicked and change its color to red
      const buttons = optionsContainer.querySelectorAll('button');
      buttons.forEach(button => {
        if (button.textContent === selectedCountry.properties.name) {
          button.style.backgroundColor = 'red';
        }
      });

      // Disable all buttons temporarily
      buttons.forEach(button => {
        button.disabled = true;
      });

      setTimeout(() => {
        // Reset button styles and enable them
        buttons.forEach(button => {
          button.style.backgroundColor = '#4CAF50';
          button.disabled = false;
        });
        newRound();
      }, 1000);
    }
  }

  // Function to start a new round
  function newRound() {
    const country = pickRandomCountry();
    currentCountry = country;
    drawMap(country);
    const options = generateOptions(country);
    renderOptions(options);
    messageDiv.textContent = '';
  }

  // Function to update the timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Function to end the game
  function endGame() {
    clearInterval(timerInterval);
    quizPage.style.display = 'none';
    resultPage.style.display = 'block';
    finalScoreSpan.textContent = score;

    if (score >= 20) {
      medalImage.src = 'https://alittlemoreenglish.weebly.com/uploads/2/6/6/3/26638990/gold-medal_orig.png';
    } else if (score >= 16) {
      medalImage.src = 'https://alittlemoreenglish.weebly.com/uploads/2/6/6/3/26638990/silver-medal_orig.png';
    } else if (score >= 12) {
      medalImage.src = 'https://alittlemoreenglish.weebly.com/uploads/2/6/6/3/26638990/bronze-medal_orig.png';
    } else {
      medalImage.src = ''; // No medal
    }
  }

  // Timer function
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  // Start button event listener
startButton.addEventListener('click', () => {
  startPage.style.display = 'none';
  quizPage.style.display = 'block';
  score = 0;
  scoreValueSpan.textContent = score;
  timeLeft = 120;
  updateTimerDisplay();
  
  // Reset country pools when starting new game
  unusedCountries = [...countriesData];
  usedCountries = [];
  
  newRound();
  startTimer();
});

  // Initial data loading
  loadData().then(() => {
    countriesData = Object.values(countryInfo).map((country, index) => ({
      type: 'Feature',
      id: Object.keys(countryInfo)[index],
      properties: country,
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
    }));

  });
});
