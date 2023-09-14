//alert('ola!')



const firePixelsArray = []
const fireWidth = 50
const fireHeigth = 50
const fireColorPalete = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]


//inicializa a aplicação
function start(){ 

    createFireDataStructure()
    //console.log(firePixelsArray)
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)

}

//criando estrutura do fogo
function createFireDataStructure(){
    const nunberOPixels = fireWidth * fireHeigth // todos os pixels do fogo ficam na variavel nuber0Pixels

     //criando a estrutura de dados com 6 posições com valor 0. Isso significa que o fogo começa com 0 de intencidade 
    for (let i = 0; i< nunberOPixels; i++){
        firePixelsArray[i] = 0  // injeta o numero 0 em todos os indices da arrey incrementamente 
    }

}

function calculateFirePropagation(){
    for(let colun = 0; colun < fireWidth; colun++){
        for (let row = 0; row < fireHeigth; row++){
            const pixelIndex = colun + (fireHeigth * row)

            // console.log(pixelIndex)
            updateFireIntensutyPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensutyPerPixel(currentPixelIndex){
    const belowPixelIndex  = currentPixelIndex + fireWidth
    if (belowPixelIndex >= fireWidth * fireHeigth){
        return 
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelItensity = firePixelsArray[belowPixelIndex]
    const newFireItensity = belowPixelItensity - decay >= 0 ? belowPixelItensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireItensity
}

//tabela onde será exibido as informação da estrutura de dados 
function renderFire(){
    const debug = false
    let html = '<table cellpadding = 0 cellspacing = 0>'

    for (let row = 0; row < fireHeigth; row++){
        html += '<tr>'

        for (let colun = 0; colun < fireWidth; colun++){
            const pixelIndex = colun+ (fireWidth * row) // decobrir posição vertical e horizontal
            const fireItensity = firePixelsArray[pixelIndex]

            if (debug === true){

                html += '<td>'
                html += `<div class="pixel-index"> ${pixelIndex} </div>`
                html += fireItensity
                html += '</td>'
            }else{
                const color = fireColorPalete[fireItensity]
                const colorString = `${color.r}, ${color.g}, ${color.b}`
                html += `<td class="td.pixel" style="background-color: rgb(${colorString}")>`
                html += '</td>'
            }

        }
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector('#fireCanvas').innerHTML = html

}
function createFireSource (){
    for (let colun = 0; colun <= fireHeigth; colun++){
        const overflowPixelIndex = fireWidth * fireHeigth
        const pixelIndex = (overflowPixelIndex - fireWidth) + colun

        firePixelsArray[pixelIndex] = 36
    }

}

start()