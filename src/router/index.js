import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () =>
    import ('../views/CreateListView').then(m => m.default(id))
const ItemView = () =>
    import ('../views/ItemView.vue')
const UserView = () =>
    import ('../views/UserView.vue')
const HomeView = () =>
    import ('../views/HomeView.vue')
const AdminView = () =>
    import ('../views/AdminView.vue')
const AdminList = () =>
    import ('../views/AdminList.vue')
const HomePage = () =>
    import ('../pages/index/App.vue')
const AdminPage = () =>
    import ('../pages/admin/App.vue')
const entryRoutesConf = [{
        entry: "index",
        routePath: "/home",
        component: HomePage,
        children: [{
            path: '/',
            component: HomeView
        }]
    },
    {
        entry: "admin",
        routePath: "/admin",
        component: AdminPage,
        children: [{
            path: '/',
            component: AdminView
        }, {
            path: "/list",
            component: AdminList
        }]
    },
]

export function createRouter(url) {
    const isAdmin = url.indexOf('admin') !== -1

    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        // routes: !isAdmin ? [
        //     // { path: '/top/:page(\\d+)?', component: createListView('top') },
        //     // { path: '/new/:page(\\d+)?', component: createListView('new') },
        //     // { path: '/show/:page(\\d+)?', component: createListView('show') },
        //     // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
        //     // { path: '/job/:page(\\d+)?', component: createListView('job') },
        //     // { path: '/item/:id(\\d+)', component: ItemView },
        //     // { path: '/user/:id', component: UserView },
        //     // { path: '/', redirect: '/top' }
        //     { path: '/home', component: HomeView },
        //     { path: '/', redirect: '/home' }
        // ] : [
        //     { path: '/admin', component: AdminView }
        // ]
        routes: [
            { path: '/', redirect: '/home' }
        ].concat(entryRoutesConf.map(item => ({
            path: item.routePath,
            component: item.component,
            children: item.children,
        })))
    })
}

export function urlToEntryName(url) {
    if (typeof url !== "string") return entryRoutesConf[0].entry

    entryRoutesConf.forEach(item => {
        if (url.indexOf(item.routePath) === 0) return item.entry
    })
    return entryRoutesConf[0].entry
}