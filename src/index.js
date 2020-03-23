const puppeteer = require('puppeteer');
const departamentos = require('../constants/departamentos');

void (async () => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const search_SELECTOR = '#buscar_nrc';

        await page.goto('https://guayacan.uninorte.edu.co/4PL1CACI0N35/registro/consulta_horarios.php');

        await page.select('#periodo', '202010');
        await page.select('#nivel', 'PR');
        await page.select('#departamento', '0047');
        await page.click(search_SELECTOR);

        await page.waitFor(1000);

        var arrayGlobal = [];
        let nrc_ant2 = '0';
        let nrc_ant1 = '1' ;
        let sw = 0;

        for (let i = 0; i < departamentos.length; i++) {
            nrc_ant2 = '0';
            nrc_ant1 = '1';
            sw = 0;
            while (sw < 5) {
                nrc_ant2 = nrc_ant1;
                nrc_ant1 = '';
                await page.click('#programa');
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');
    
                await page.waitFor(1500);

                try {
                    await page.waitForSelector('#acreditaciones_resultado > div > div > p.msg1 > b', { timeout: 5000 });
                    const nombre = await page.evaluate(() => document.querySelector('#acreditaciones_resultado > div > div > p.msg1 > b').textContent);
                    const materia = nombre.substring(1, nombre.length);

                    let nrc_ant = await page.evaluate(() => document.querySelector('#acreditaciones_resultado > div > div > p:nth-child(2)').textContent);
        
                    for (let i = nrc_ant.length-2; i >= nrc_ant.length-6; i--) {
                        nrc_ant1 = nrc_ant.substring(i, i+1) + nrc_ant1;
                    }
                    
                    for (var index = 2; index < 300; index++) {
                        const profesor = await page.evaluate((index) => {
                            return document.querySelector(`#acreditaciones_resultado > div > div > table > tbody > tr:nth-child(${index}) > td:nth-child(3)`).textContent;
                        }, index);
                        let cadena = `${departamentos[i].nombre}, ${materia}, ${profesor}, ${nrc_ant1}`;
                        if (arrayGlobal.indexOf(cadena) == -1) {
                            arrayGlobal.push(cadena);
                            console.log(cadena);
                        }
                        if (nrc_ant1 == nrc_ant2) {
                            sw++;
                        }else{
                            sw = 0;
                        }
                    }

                    await page.waitFor(1000);
                 } catch (error) {
                    // console.log(`The element didn't appear: ${error}`);
                }
            }
            await page.click('#form_nivel');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }

        await browser.close();
    } catch (error) {
        console.log(error);
    }


})()