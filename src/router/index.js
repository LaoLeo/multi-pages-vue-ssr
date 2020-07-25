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
    import ('../pages/home/App.vue')
const AdminPage = () =>
    import ('../pages/admin/App.vue')


export function createRouter() {
    // const isAdmin = url.indexOf('admin') !== -1

    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', redirect: '/home' },
            {
                path: '/home',
                component: HomePage,
                children: [{
                    path: '/',
                    component: HomeView
                }]
            },
            {
                path: '/admin',
                component: AdminPage,
                children: [{
                    path: '/',
                    component: AdminView
                }, {
                    path: "/list",
                    component: AdminList
                }]
            }
        ]
    })
}