const pageURL = 'https://apps.calbar.ca.gov/attorney/Licensee/Detail/151211';

export const fetchInfo = [
  {
    region: 'California',
    url: pageURL,
    data: {
      /*
      Full Name
      Email
      Cell Number
      Website
      Active
      */
      fullName: {
        path: '#moduleMemberDetail >div >h3',
        transform: async (html) => {
          let text = html.eq(0).text();
          text = text
            .split('#')[0]
            .trim()
            .replace(/[\t\n\r]/g, '');
          return text;
        }
      },
      email: {
        path: '#moduleMemberDetail >div',
        transform: async (html) => {
          let text = html.eq(2).find('>p').eq(2).find('>span').eq(8).text();
          text = text
            .split('|')[0]
            .trim()
            .replace(/[\t\n\r\s]/g, '')
            .replace(/email:/i, '');
          return text;
        }
      },
      cellNumber: {
        path: '#moduleMemberDetail >div',
        transform: async (html) => {
          let text = html.eq(2).find('>p').eq(1).text();
          text = text
            .split('|')[0]
            .trim()
            .replace(/[\t\n\r\s]/g, '')
            .replace(/phone:/i, '');
          return text;
        }
      },
      website: {
        path: '#moduleMemberDetail >div',
        transform: async (html) => {
          let text = html.eq(2).find('>p').eq(2).text();
          text = text
            .split('|')[1]
            .trim()
            .replace(/[\t\n\r]/g, '')
            .replace(/website:/i, '');
          return text;
        }
      },
      active: {
        path: '#moduleMemberDetail >div',
        transform: async (html) => {
          let text = html.eq(1).find('>div').text();
          text = text
            .trim()
            .replace(/[\t\n\r]/g, '');
          return text;
        }
      }
    }
  },
];
