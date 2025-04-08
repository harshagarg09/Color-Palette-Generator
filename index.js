const colorInput = document.getElementById("color-input")
const colorSchemeMode = document.getElementById("color-scheme-mode")
const getColorBtn = document.getElementById("get-color-btn")
const colorPalette = document.getElementById("color-palette")
const modal = document.getElementById("modal")

function getHtml(colors) {
    return colors.map(color => {
        
        let hex = color.hex.value
        
        return (
        `
            <div class="color">
                <div class="color-display" style="background-color:${hex}" data-hex=${hex}>
                </div>
                <p class="color-hex" data-hex=${hex}>${hex}</p>
            </div> 
        `
    )}).join('')
}

getColorBtn.addEventListener('click', function() {
    console.log(colorInput.value)
    console.log(colorSchemeMode.value)
    let hex = colorInput.value.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorSchemeMode.value}&count=5`)
        .then(res => res.json())
        .then(res => {
            let colors = res.colors
            
            let html = getHtml(colors)
            
            colorPalette.innerHTML = html
        })
})

colorPalette.addEventListener('click', function(e) {
    const hex = e.target.dataset.hex
    modal.style.visibility = "visible"
       // Copy the text inside the text field
    navigator.clipboard.writeText(hex);
    setTimeout(function() {
        modal.style.visibility = "hidden"
    }, 1000)
})