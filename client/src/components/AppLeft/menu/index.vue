<template>
  <div>
    <template v-for="(item, index) in menuList" :key="item.index">
      <el-menu-item v-if="!item.children" :index="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>

  <!-- <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">用户管理</el-menu-item>
    <el-menu-item index="3">角色管理</el-menu-item>
    <el-sub-menu index="4">
        <template #title>
            <span>学员</span>
        </template>
        <el-menu-item index="4-1">学校管理</el-menu-item>
        <el-menu-item index="4-2">专业管理</el-menu-item>
        <el-menu-item index="4-3">班级管理</el-menu-item>
        <el-menu-item index="4-4">学生管理</el-menu-item>
    </el-sub-menu> -->
</template>
<script lang="ts">
export default {
  name: 'Menu',
  props: ['menuList'],
}
</script>
<style scoped></style>
