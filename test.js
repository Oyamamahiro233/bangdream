// import * as cheerio from 'cheerio';
const cheerio = require('cheerio')

const $ = cheerio.load(`
  <ul>
    <li>One</li>
    <li>Two</li>
    <li class="blue sel">Three</li>
    <li class="red">Four</li>
  </ul>
`);
// Extract the text content of the first .red element
const data = $.extract({
    red: '.red',
  });