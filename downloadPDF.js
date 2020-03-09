const puppeteer = require("puppeteer");
const fs = require("fs");
const download = require("download");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://www.acm.org/media-center/2014/january/acm-ieee-cs-launch-innovative-computer-science-curriculum";
  await page.goto(url);
  let sel = 'a[href$=".pdf"]';
  let totalLinks = await page.evaluate(sel => {
    let elements = Array.from(document.querySelectorAll(sel));
    let links = elements.map(element => {
      return element.href;
      
    });
    return links;
  }, sel);


  for (var i = 0; i < totalLinks.length; i++) {
    //console.log(totalLinks[i])
     let value = totalLinks[i].toString();
     download(value,"dist").then(() => {
       console.log("***PDF Descargado***")
     })
    
     
 }
  await browser.close();
})();
