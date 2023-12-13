import { process } from './lib/index'
import { fetchInfo } from './lib/adapter.js'

(async function () {
  let data = null;

  data = await process(fetchInfo[0]);
  console.log(data);
})()