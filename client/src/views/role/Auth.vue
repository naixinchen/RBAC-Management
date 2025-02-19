<template>
  <el-form
    :model="updateRole"
    ref="roleForm"
    label-position="right"
    label-width="100px"
    style="width: 400px"
    :rules="rules"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="updateRole.name" placeholder="请输入角色名" />
    </el-form-item>
  </el-form>
  <!-- 树形结构 -->
  <el-tree
    :data="authList"
    show-checkbox
    node-key="index"
    :default-expand-all="true"
    @check-change="handleCheckChange"
    :default-checked-keys="checkedKeys"
  />
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import menuList from '@/config/menuConfig'
// import type Node from "element-plus/es/components/cascader-panel/src/node"
import type { roleInfoData } from '@/api/role/type'
import { ref, reactive, onMounted } from 'vue'

interface Tree {
  index: string
}

const props = defineProps(['role'])
// console.log(props);

let updateRole: roleInfoData = reactive({
  name: '',
})
let authList = ref([])
let checkedKeys = reactive<any>([])
let roleForm = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur',
    },
  ],
})
const getMenus = () => {
  updateRole.menus = checkedKeys
  return updateRole
}
defineExpose({
  getMenus,
})
const handleCheckChange = (
  data: Tree,
  checked: boolean,
  _indeterminate: boolean,
) => {
  if (checked) {
    if (data.index != '/students' && checkedKeys.indexOf(data.index) === -1) {
      checkedKeys.push(data.index)
    }
  } else {
    if (checkedKeys.indexOf(data.index) !== -1) {
      checkedKeys.splice(checkedKeys.indexOf(data.index), 1)
    }
  }
}
const getAuthNodes = (menuList: any) => {
  return menuList.map((item: any) => {
    if (!item.children) {
      return {
        index: item.index,
        label: item.title,
      }
    } else {
      return {
        index: item.index,
        label: item.title,
        children: getAuthNodes(item.children),
      }
    }
  })
}
onMounted(() => {
  authList.value = getAuthNodes(menuList)
  updateRole = reactive({ ...props.role })
  checkedKeys = props.role.menus
})
</script>
<style scoped></style>
