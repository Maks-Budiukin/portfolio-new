import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      scrollPos: {
        top: 0,
        left: 0
      }
    }
  },
  {
    path: '/:id',
    name: 'projects',
    component: ProjectsView
  }
]
const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition || to.meta?.scrollPos || { top: 0, left: 0 }
}
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior
})
router.beforeEach((_, from, next) => {
  from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)
  return next()
})

export default router
