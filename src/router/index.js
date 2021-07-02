import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          index:'/'
        }
      },
      {
        path: '/label',
        name: 'Label',
        component: () => import('../views/label/Label.vue'),
        meta: {
          title: '标签页',
          index:'/label'
        }
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../views/article/List.vue'),
        meta: {
          title: '已发布',
          index:'/list'
        }
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/article/Publish.vue'),
        meta: {
          title: '发表文章',
          index:'/publish'
        }
      },
      {
        path: '/edit',
        name: 'Edit',
        component: () => import('../views/article/Edit.vue'),
        meta: {
          title: '编辑文章',
          index:'/list'
        }
      },
      {
        path: '/details',
        name: 'Details',
        component: () => import('../views/article/Details.vue'),
        meta: {
          title: '文章详情',
          index:'/list'
        }
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../views/statistics/Statistics.vue'),
        meta: {
          title: '统计',
          index:'/statistics'
        }
      },
      {
        path: '/pictureupload',
        name: 'PictureUpload',
        component: () => import('../views/pictureupload/PictureUpload.vue'),
        meta: {
          title: '图片上传',
          index:'/pictureupload'
        }
      },
      {
        path: '/exportexcel',
        name: 'ExportExcel',
        component: () => import('../views/exportexcel/ExportExcel.vue'),
        meta: {
          title: '导出Excel',
          index:'/exportexcel'
        }
      },
      {
        path: '/signout',
        name: 'SignOut',
        component: () => import('../views/signout/SignOut.vue'),
        meta: {
          title: '退出系统',
          index:'/signout'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '*',
    name: 'Erro',
    component: () => import('../views/erro/Erro.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  //判断是否登录
  let user = localStorage.getItem('xa_user')
  if (to.name === 'Login') {
    next()
  } else {
    user ? next() : next('/login')
  }
  // next()
})

export default router
