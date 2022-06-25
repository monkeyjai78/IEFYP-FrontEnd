import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/search.vue'
import Oil from '../views/main.vue'
import Price from '../views/price.vue'
import Cotton from '../views/cotton.vue'
import Gold from '../views/gold.vue'
import Search from '../views/search.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/oil',
        name: 'Oil',
        component: Oil
    },
    {
        path: '/price',
        name: 'Price',
        component: Price
    },
    {
        path: '/cotton',
        name: 'Cotton',
        component: Cotton
    },
    {
        path: '/gold',
        name: 'Gold',
        component: Gold
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router