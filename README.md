# multi-pages-vue-ssr

基于vue-server-renderer插件改造成为支持可配置多入口的vueSSR多页应用demo

## 功能

假如你的应用中包含了项目首页（A）和后台系统（B）两种相关性不强的页面，但因为都用到共用组件而不好分离。由于vue-server-renderer不能配置多入口的限制（配置多多入口打包server bundle会报错），那么渲染出来的html中的资源文件会是AB两种页面所需资源的混合，可能A页面加载了只有B页面才用到的资源，这正是这个项目需要解决的问题。

在vue-server-renderer原有能力上做了扩展以下的几点能力：

- 支持配置多页应用的多个入口
- 多入口按需加载资源，A页面不会引入B页面才用到资源文件
- dev环境下（热重载）也支持多入口


## 结构预览

<img width="973" alt="screen shot" src="http://m.qpic.cn/psc?/V12x89qA2LlAEO/45NBuzDIW489QBoVep5mcQyMcBQttO*WSkcLH5bz9IY8Jl8FscABxn7MhaRhIckDJDjLNeIFS*xL93bPNT3cNR8H9wKQDbFqL14fW1e4dTg!/b&bo=*APMAfwDzAEDFzI!&rf=viewer_4">


## 多入口配置和目录结构
```js
/**
 * 1. 多入口文件配置
 * /
// config.js
{
  pagesPath: 'src/pages', // 多入口目录配置,
}

// src/pages目录结构
- src
  - pages
    - admin
      - App.vue
      - entry-client.js
      - entry-server.js
      - index.js
    - home
      - App.vue
      - entry-client.js
      - entry-server.js
      - index.js



/**
 * 2. 路由跟入口文件的对应关系配置
 * 通过不同的路由走不同的入口，比如：/home/** 的路由会走home入口
 * /
// config.js
{
  entryRoutesConf: [{
      entry: "home",
      routePath: "/home"
    },
    {
      entry: "admin",
      routePath: "/admin"
    },
  ]
}

```

## 构建和启动

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```