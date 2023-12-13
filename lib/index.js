import cheerio from 'cheerio';
import axios from 'axios';

/**
 * This will fetch the page of the input url using axios
 * @param {String} url - The url to fetch from
 * @returns {cheerio} - The cheerio parsed body or undefined if there was an error
 */
export async function fetch(url) {
  try {
    const { data: response } = await axios.get(url);
    return cheerio.load(response);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Processes the source (primary or backup)
 * @param sourceOptions - object containing url, data and region
 * @returns {{url: String, region: Strings, firstName: String, email: String, cellNumber: String, website: String,  active: String}}
 */
export async function process(sourceOptions) {
  const { url, data: dataSpecs, region } = sourceOptions;

  const $ = await fetch(url);

  // instantiate object that will have all scraped values
  const entity = {
    region,
    url
  };

  // process each field in the source
  for (const key in dataSpecs) {
    const spec = dataSpecs[key];

    // if no transformations are needed then set text as data
    let value = $(spec.path).text();
    // transformation is set then perform

    if (spec.transform) {
      try {
        value = await spec.transform($(spec.path));
      } catch (err) {
        console.log('transform error', err.message);
        value = 'transform error';
      }
    }

    // assign to entity object
    // value:  data returned from the scrape
    // key: data field ie) date
    entity[key] = value;
  }

  return entity;
}
