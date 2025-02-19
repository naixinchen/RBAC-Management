<template>
  <div class="navbar">
    <!-- 菜单组件 -->
    <el-menu
      :router="true"
      :default-active="$route.path"
      :default-openeds="['/students']"
    >
      <Menu :menuList="menuNodes" menuNodes></Menu>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import Menu from './menu/index.vue'
import MenuList from '@/config/menuConfig'
import type { MenuData, MenuChildrenData } from './types/type'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import menuList from '@/config/menuConfig'

let userStore = useUserStore()
let $router = useRouter()
const hashAuth = (item: MenuData) => {
  const { index, isPublic } = item
  const menus = userStore.user?.role.menus
  const username = userStore.user?.username

  if (username === 'admin' || isPublic || menus?.indexOf(index) != -1) {
    return true
  } else if (item.children) {
    return !item.children.find((child: MenuChildrenData) => {
      return menus.indexOf(child.index) != -1
    })
  } else {
    return false
  }
}
let menuNodes: any[] = []
const getMenuNodes = () => {
  menuList.forEach((item) => {
    if (!item.children) {
      if (hashAuth(item)) {
        menuNodes.push(item)
      }
    } else {
      let tempArr: any[] = []
      item.children.forEach((i) => {
        if (hashAuth(i)) {
          tempArr.push(i)
        }
      })
      let obj = { ...item, children: tempArr }
      menuNodes.push(obj)
    }
  })
}
getMenuNodes()
</script>
<style scoped></style>
