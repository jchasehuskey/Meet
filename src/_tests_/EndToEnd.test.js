import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     slowMo: 250, // slow down by 250ms
    //    ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    //   });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeNull(); //toBeNull just means it's collapsed
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.Event .details-button');
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.Event .details-button');
    const eventDetails = await page.$('.Event .details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {
    let browser;
    let page;
    jest.setTimeout(40000);
    beforeAll(async () => {
        browser = await puppeteer.launch();
        
        // browser = await puppeteer.launch({
        //   headless: false,
        //   slowMo: 250, // slow actions by 250ms
        //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default settings
        // });
        
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.Event');
    });

    afterAll(() => {
        browser.close();
    });

    test('When user has not searched for a city, show upcoming events from all cities.', async () => {
        const eventDetails = await page.$('.Event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        const CitySearch = await page.$('.suggestions li');
        expect(CitySearch).toBeDefined()
    });

    test('User can select a city from the suggested list', async () => {
        await page.reload();
        await page.type('.city', 'Berlin', { delay: 100 });
        await page.click('.suggestions li');
        const selectCity = await page.$$eval('.Event', (element) => element.length);
        expect(selectCity).toBe(1);
    })
})