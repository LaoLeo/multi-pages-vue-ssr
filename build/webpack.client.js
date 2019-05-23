const createClientConfig = require('./webpack.client.config')
const webpack = require('webpack')
const utils = require('./utils')

const entries = utils.entries()

Object.keys(entries).forEach(name =>{
    const entry = {}
    entry[name] = entries[name]

    const config = createClientConfig(entry)
    console.log(config)
    webpack(config)
    console.log("compiled!!!")
})
