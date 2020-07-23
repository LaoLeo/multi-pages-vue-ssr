var entryRoutesConf = [{
        entry: "home",
        routePath: "/home"
    },
    {
        entry: "admin",
        routePath: "/admin"
    },
]

function urlToEntryName(url) {
    if (typeof url !== "string") return entryRoutesConf[0].entry

    const target = entryRoutesConf.filter(item => {
        if (url.indexOf(item.routePath) === 0) return true
    })
    const entryName = target[0] ? target[0].entry : entryRoutesConf[0].entry
        // console.log(url, "=>", entryName)
    return entryName
}

function entryToRoutePath(entry) {
    var ret = entryRoutesConf.filter(item => item.entry == entry)
    if (ret === undefined) throw new Error("entry config not found, entry:'" + entry + "'")
    console.log(entry, ret.routePath)
    return ret.routePath
}

exports.urlToEntryName = urlToEntryName
exports.entryToRoutePath = entryToRoutePath