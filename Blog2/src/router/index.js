import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";
import Post from "../components/PostDetailView.vue";
import Create from "../components/CreatePostView.vue";
import EDIT from  "../components/EditPost.vue";
import Tag from  "../components/Tag.vue";
const routes = [
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/Tag/:name',
        name: 'Tag',
        component: Tag,
        props : true
    },
    {
        path: '/Post/:id',
        name: 'Post',
        component: Post,
        props : true
    },
    {
        path: '/Create',
        name: 'Create',
        component: Create
    },
    {
        path: '/EDIT/:id',
        name: 'EDIT',
        component: EDIT,
        props : true
    },


    

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
