import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login',
    },
    {
      path: '/',
      component: () => import('@/views/logout/index.vue'),
      name: 'logout',
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/Home.vue'),
          meta: { title: '首页' },
        },
        {
          path: '/user',
          component: () => import('@/views/user/User.vue'),
          meta: { title: '用户管理' },
        },
        {
          path: '/role',
          component: () => import('@/views/role/Role.vue'),
          meta: { title: '角色管理' },
        },
        {
          path: '/school',
          component: () => import('@/views/students/School.vue'),
          meta: { title: '学校管理' },
        },
        {
          path: '/majors',
          component: () => import('@/views/students/Major.vue'),
          meta: { title: '专业管理' },
        },
        {
          path: '/class',
          component: () => import('@/views/students/Class.vue'),
          meta: { title: '班级管理' },
        },
        {
          path: '/student',
          component: () => import('@/views/students/Student.vue'),
          meta: { title: '学生管理' },
        },
        {
          path: '/student/update/:_id',
          component: () =>
            import('@/views/students/components/StudentUpdate.vue'),
          meta: { title: '学生添加/编辑' },
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/404/index.vue'),
      name: '404',
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404/index.vue'),
      name: 'Any',
    },
  ],
})

export default router
