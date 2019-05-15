const puppeteer = require('puppeteer')

void (async () => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const search_SELECTOR = '#buscar_nrc'

        await page.goto('https://guayacan.uninorte.edu.co/registro_pruebas/consulta_horarios.asp')

        await page.select('#periodo', '201910')
        await page.select('#nivel', 'PR')
        await page.select('#departamento', '0047')
        await page.click(search_SELECTOR)

        await page.waitFor(1000)

        let nrc_ant2 = '0'
        let nrc_ant1 = '1' 
        let sw = 0

        const departamentos = []

        departamentos[0] = 'Dpto. Arquitectura y Urbanismo'
        departamentos[1] = 'Dpto. Ciencias Básicas Médicas'
        departamentos[2] = 'Dpto. Comunicación Social'
        departamentos[3] = 'Dpto. Cs Politica y Rel Internacionales'
        departamentos[4] = 'Dpto. Derecho'
        departamentos[5] = 'Dpto. Diseño'
        departamentos[6] = 'Dpto. Educación'
        departamentos[7] = 'Dpto. Enfermería'
        departamentos[8] = 'Dpto. Español'
        departamentos[9] = 'Dpto. Física'
        departamentos[10] = 'Dpto. Historia y Cs. Sociales'
        departamentos[11] = 'Dpto. Humanidades y Filosofía'
        departamentos[12] = 'Dpto. Ing. Civil y Ambiental'
        departamentos[13]= 'Dpto. Ingeniería Básica'
        departamentos[14] = 'Dpto. Ingeniería Industrial'
        departamentos[15] = 'Dpto. Ingeniería Mecánica'
        departamentos[16] = 'Dpto. Ingeniería de Sistemas'
        departamentos[17] = 'Dpto. Lenguas'
        departamentos[18] = 'Dpto. Lenguas Extranjeras'
        departamentos[19] = 'Dpto. Matemáticas y Estadística'
        departamentos[20] = 'Dpto. Medicina'
        departamentos[21] = 'Dpto. Mercadeo y Neg. Internacionales'
        departamentos[22] = 'Dpto. Minors Ingenierias'
        departamentos[23] = 'Dpto. Música'
        departamentos[24] = 'Dpto. Odontología'
        departamentos[25] = 'Dpto. Psicología'
        departamentos[26] = 'Dpto. Química y Biología'
        departamentos[27] = 'Dpto. Relaciones Internacionales'
        departamentos[28] = 'Dpto. Salud Pública'
        departamentos[29] = 'Dpto. Tecnología'
        departamentos[30] = 'Dpto. de Economía'
        departamentos[31] = 'Dpto. Finanzas y Organizaciones'
        departamentos[32] = 'Dpto. Eléctrica-Electrónica'

        for (let i = 0; i < departamentos.length; i++) {
            nrc_ant2 = '0'
            nrc_ant1 = '1' 
            sw = 0
            while (sw < 3) {
                nrc_ant2 = nrc_ant1
                nrc_ant1 = ''
                await page.click('#programa')
                await page.keyboard.press('ArrowDown')
                await page.keyboard.press('Enter')
    
                await page.waitFor(1000)

                try {
                    await page.waitForSelector('#acreditaciones_resultado > div > div > p.msg1 > b', { timeout: 5000 })
                    const nombre = await page.evaluate(() => document.querySelector('#acreditaciones_resultado > div > div > p.msg1 > b').textContent);
                    const materia = nombre.substring(1, nombre.length)
        
                    const profesor = await page.evaluate(() => document.querySelector('#acreditaciones_resultado > div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)').textContent);

                    let nrc_ant = await page.evaluate(() => document.querySelector('#acreditaciones_resultado > div > div > p:nth-child(2)').textContent);
        
                    for (let i = nrc_ant.length-2; i >= nrc_ant.length-5; i--) {
                        nrc_ant1 = nrc_ant.substring(i, i+1) + nrc_ant1;
                    }

                    console.log(departamentos[i] + ',' + materia + ','+ profesor + ',' + nrc_ant1)
        
                    if (nrc_ant1 == nrc_ant2) {
                        sw++
                    }else{
                        sw = 0
                    }
                  } catch (error) {
                    console.log("The element didn't appear.")
                  }
                //await page.waitForSelector('#acreditaciones_resultado > div > div > p.msg1 > b')
    
                
    
                //console.log(nrc_ant1)
                //console.log('')
            }
            await page.click('#form_nivel')
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('Enter')
        }

        await browser.close()
    } catch (error) {
        console.log(error)
    }


})()