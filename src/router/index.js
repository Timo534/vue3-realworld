import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { get } from '@/utils/storage'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: () => import('../views/ArticleList.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'feed',
        name: 'FeedArticleList',
        component: () => import('../views/ArticleList.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'tag/:tag?',
        name: 'TagArticleList',
        component: () => import('../views/ArticleList.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/Login.vue'),
        meta: {
          needLogin: false
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('../views/Editor.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../views/Article.vue'),
        meta: {
          needLogin: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(to => {
  const needLogin = to.meta.needLogin
  const user = get('user')
  const homePageNoNeedLogin = to.name === 'ArticleList' || to.name === 'TagArticleList'

  if (homePageNoNeedLogin) return true
  else if (needLogin && !user) return '/login'
  else if (!needLogin && user) return '/'
  else return true
})

export default router
