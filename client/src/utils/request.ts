import axios from 'axios'
import { ElMessage, ElLoading, ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    if (config.url != '/menus' && config.url != '/login') {
      loading.open()
      getMenus()
    }
    return config
  },
  (error) => {
    loading.close()
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status != 0) {
      ElNotification({
        title: '警告',
        message: res.msg,
        type: 'error',
        position: 'top-left',
      })
    }
    loading.close()
    return response.data
  },
  (err) => {
    loading.close()
    let msg = ''
    const status = err.response.status
    switch (status) {
      case 401:
        msg = 'token过期了'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址有误'
        break
      case 500:
        msg = '服务器内部问题'
        break
      default:
        msg = '网络不佳'
        break
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(err)
  },
)

//获取权限的列表
const getMenus = () => {
  const userStore = useUserStore()
  const roleId = userStore.user?.role_id
  const userMenus = userStore.user?.role.menus
  if (userStore.user?.username == 'admin') {
    return
  }
  request({
    url: '/menus',
    method: 'post',
    data: { roleId },
  }).then((response) => {
    const res = response
    if (res.status == 0) {
      const menus = res.data.menus
      if (userMenus?.length === menus.length) {
        userMenus?.forEach((item) => {
          if (menus.indexOf(item) == -1) {
            userStore.removeUser()
            ElMessage({
              message: '当前登陆的用户权限被修改',
              type: 'warning',
            })
            window.location.href = '/login'
          }
        })
      } else {
        userStore.removeUser()
        ElMessage({
          message: '当前登陆的用户权限被修改',
          type: 'warning',
        })
        window.location.href = '/login'
      }
    }
  })
}

const loading = {
  loadingInstance: null,
  open() {
    if (this.loadingInstance == null) {
      this.loadingInstance = ElLoading.service({
        text: '努力加载中......',
        background: 'rgba(0,0,0,0.5)',
        target: '.main',
      })
    }
  },
  close() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  },
}

export default request
