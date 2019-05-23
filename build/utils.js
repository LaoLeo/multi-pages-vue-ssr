const glob = require('glob')
const path = require('path')

const PAGE_PATH = path.resolve(__dirname, '../src/pages')

const entries = function(isServer) {
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
        // map['common-api'] = path.resolve(__dirname,
        //   '../src/common/index.js'
        // )
    console.log(map)
    return map
}

exports.entries = entries