const glob = require('glob')
const path = require('path')
const { pagesPath, entryRoutesConf } = require('./config')

const PAGE_PATH = path.resolve(__dirname, '..', pagesPath)

const entries = (isServer) => {
    let regx = isServer ? /entry-server/ : /entry-client/

    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
            var lastIndex = filePath.lastIndexOf('\/')
            var filename = filePath.substring(filePath.lastIndexOf('\/', lastIndex - 1) + 1, lastIndex)
            if (regx.test(filePath)) {
                map[filename] = filePath
            }

        })
        // console.log(map)
    return map
}


const urlToEntryName = (url) => {
    if (typeof url !== "string") return entryRoutesConf[0].entry

    const target = entryRoutesConf.filter(item => {
        if (url.indexOf(item.routePath) === 0) return true
    })
    const entryName = target[0] ? target[0].entry : entryRoutesConf[0].entry
        // console.log(url, "=>", entryName)
    return entryName
}


exports.urlToEntryName = urlToEntryName
exports.entries = entries