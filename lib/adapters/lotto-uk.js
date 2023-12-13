import moment from 'moment';
const gameURL = 'https://www.national-lottery.co.uk/results/lotto/draw-history';
const backupURL = 'https://www.lotterypost.com/game/253';
import { filterGameRow } from '../helpers/lotteryUSA';
import { getJackpot, getNextJackpot, getFloatValue } from '../helpers/lotteryPost';

export const lottoukRecent = [
  // Scraper for the recently passed draw (Primary)
  {
    lotteryName:'lottouk',
    regions: ['UK'],
    url:gameURL,
    data: {
      numbers: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2)',
        transform: async (html) => {
          let text = html.find('>li:nth-child(3) >.table_cell_padding >.table_cell_block').text();
          const numbers = text.match(/\d+/g);

          text = html.find('>li:nth-child(4) >.table_cell_padding >.table_cell_block').text();
          const bonus = text.match(/\d+/g);

          for(var i=0; i<bonus.length; i++) {
            numbers.push(bonus[i]);
          }
          return numbers;
        }
      },
      jackpot: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2) >li:nth-child(2) >.table_cell_padding >.table_cell_block',
        transform: async (html) => {
          const text = html.text().replace(/\D/g,'');
          return parseInt(text);
        }
      },
      date: {
        path: '#draw_history_lotto >ul >li:nth-child(2) >ul:nth-child(2) >li:first-child >.table_cell_padding >.table_cell_block',
        transform: async (html) => {
          const text = html.text();
          const date = await moment(text, "ddd DD MMM YYYY").format();
          return date;
        }
      }
    }
  },
];
