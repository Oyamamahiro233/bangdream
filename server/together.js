const path = require('path')
const fs = require('fs')
const files = ['nav', 'calendar']
const template = 'bang-bream'

function addHtml(name) {
    return name + '.html'
}
function handleTemplateStr(template, files) {
    let data = fs.readFileSync(path.resolve('./', addHtml(template)), 'utf-8')

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const start = data.indexOf(`<${file}>`)
        const end = data.indexOf(`</${file}>`)
        const beforStr = data.slice(0, start)
        const afterStr = data.slice(end + `</${file}>`.length)
        data = handlePice(beforStr, afterStr, handleModuleStr(addHtml(file)))
    }
    return data
}
function handlePice(beforStr, afterStr, piceString) {
    return result = beforStr + piceString + afterStr

}
function handleModuleStr(file) {

    let data = fs.readFileSync(path.resolve('./', file), 'utf-8')
    let start = data.indexOf('<body>') + 6
    let end = data.indexOf('</body>')
    let result = data.slice(start, end)
    return result
}
function appendData(data) {
    let filePath = path.resolve('./', 'dist', 'together.html')
    if (fs.existsSync(filePath)) {
        console.log('have');
        fs.unlink(filePath, (err) => {
            if (err) console.log(err);
        })
    }
    fs.access(path.resolve(filePath, '../'), (err) => {
        if (err) {
            fs.mkdir(path.resolve(filePath, '../'), (err) => {
                console.log(err);
            })
        }
    })
    fs.appendFile(filePath, data, (err) => {
        if (err) console.log(err);
    })
}

function bind() {
    const data = handleTemplateStr(template, files)
    // appendData(data)

}
bind()