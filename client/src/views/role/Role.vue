<template>
  <div>
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handleAdd">创建角色</el-button>
      <el-button
        type="primary"
        :disabled="currentRow == null ? true : false"
        @click="roleAuthVisible = true"
      >
        设置角色权限
      </el-button>
    </div>
    <el-table
      :data="roleList"
      height="380"
      style="width: 100%"
      class="role_table"
      ref="singleTable"
      highlight-current-row
      border
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column property="name" label="角色名称" />
      <el-table-column
        property="create_time"
        label="创建时间"
        :formatter="resetDate"
      />
      <el-table-column
        property="auth_time"
        label="授权时间"
        :formatter="resetDate"
      />
      <el-table-column property="auth_name" label="授权人" />
    </el-table>
    <!-- 下面是创建角色弹出框 -->
    <el-dialog v-model="roleFormVisible" title="添加角色" width="500">
      <el-form
        :model="role"
        label-position="right"
        label-width="100px"
        ref="roleFormRef"
      >
        <el-form-item label="角色名称" prop="oldPass">
          <el-input v-model="role.name" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addData(roleFormRef)">
            确定
          </el-button>
          <el-button @click="roleFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 下面是设置权限弹出框 -->
    <el-dialog v-model="roleAuthVisible" title="角色权限" width="500">
      <Auth :role="currentRow" v-if="roleAuthVisible" ref="authRef"></Auth>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="updateData">确定</el-button>
          <el-button @click="roleAuthVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { formateDate } from '@/utils/dateUtils'
import useRoleStore from '@/store/modules/role'
import useUserStore from '@/store/modules/user'
import type { roleInfoData } from '@/api/role/type'
import { FormInstance } from 'element-plus'
import Auth from './Auth.vue'

let roleStore = useRoleStore()
let userStore = useUserStore()
const resetDate = (_row: any, _column: any, cellValue: any, _index: any) => {
  return formateDate(cellValue)
}
let roleList = ref<roleInfoData[]>([])
let currentRow = ref(null)
const handleCurrentChange = (val: any) => {
  currentRow.value = val
}
const handleAdd = () => {
  roleFormVisible.value = true
  nextTick(() => {
    role.name = ''
  })
}
const getRoleList = () => {
  roleStore.roleList().then(() => {
    roleList.value = roleStore.roles
  })
}
onMounted(() => {
  getRoleList()
})
//新增角色
let role = reactive({
  name: '',
})
let roleFormVisible = ref(false)
let roleFormRef = ref<FormInstance>()
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  roleStore.useAddRole(role).then(() => {
    roleFormVisible.value = false

    getRoleList()
  })
}
//添加权限
const roleAuthVisible = ref(false)
//子组件
let authRef = ref()
//查看当前的登录人
let updateData = () => {
  const newRole = authRef.value.getMenus()
  //@ts-ignore
  currentRow.value.menus = newRole.menus
  //@ts-ignore
  currentRow.value.name = newRole.name
  //@ts-ignore
  currentRow.value.auth_name = userStore.user?.username
  //@ts-ignore
  roleStore.useUpdateRole(currentRow.value).then(() => {
    roleAuthVisible.value = false
    getRoleList()
  })
}
</script>
<style scoped></style>
