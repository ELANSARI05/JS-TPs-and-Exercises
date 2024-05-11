import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";
import SHOW from "../components/SHOW.vue";
import JOB_DETAIL from "../components/JOB_DETAIL.vue"
import EDIT from  "../components/EDIT.vue"
import ADD from "../components/ADD.vue"
const routes = [
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/ADD',
        name: 'ADD',
        component: ADD
    },
    {
        path: '/JOB_EDIT/:id',
        name: 'EDIT',
        component: EDIT,
        props : true

    },
    {
        path: '/SHOW',
        name: 'SHOW',
        component: SHOW,
        props : true
    },
    {
        path: '/JOB_DETAIL/:id',
        name: 'JOB_DETAIL',
        component: JOB_DETAIL,
        props : true
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
