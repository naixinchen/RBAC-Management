<template>
  <div style="margin: 20px 0" class="btn_box">
    <el-button type="primary" @click="handleAdd">新增用户</el-button>
  </div>
  <div>
    <el-table :data="users" style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <!-- 需要将 创建时间 所属角色 进行格式化  -->
      <el-table-column
        prop="create_time"
        :formatter="resetDate"
        label="创建时间"
      />
      <el-table-column
        prop="role_id"
        :formatter="formatRole"
        label="所属角色"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button
              size="small"
              type="success"
              @click="handleEdit(scope.row._id)"
            >
              编辑
            </el-button>
          </div>
          <div>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 弹出框 -->
    <el-dialog v-model="userFormVisible" title="添加用户" width="500">
      <el-form
        :model="user"
        ref="userFormRef"
        label-position="right"
        label-width="100px"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="user.role_id" placeholder="请选择角色">
            <el-option
              v-for="option in roleOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="user.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              user._id == null ? addData(userFormRef) : updateDate(userFormRef)
            "
          >
            确定
          </el-button>
          <el-button type="primary" @click="userFormVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { formateDate } from '@/utils/dateUtils'
import type { roleInfoData } from '@/api/role/type'
import useRoleStore from '@/store/modules/role'
import useUserStore from '@/store/modules/user'
import type { userInfoData } from '@/api/user/type'

import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

// 用户名的验证规则
const validateUserName = (_rule: any, value: any, callback: any) => {
  value = value.trim()
  const length = value && value.length
  const pwdReg = /^[a-zA-Z0-9_]+$/
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (length < 4 || length > 12) {
    callback(new Error('长度应该在4-12之间'))
  } else if (!pwdReg.test(value)) {
    callback(new Error('账号必须是英文 数字 或下划线组成'))
  } else {
    callback()
  }
}

// 手机号的验证规则
const validatePhone = (_rule: any, value: any, callback: any) => {
  value = value.trim()
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
// 编辑用户 新增用户的数据
const user = ref<userInfoData>({
  // @ts-ignore
  _id: null,
  username: '',
  password: '',
  name: '',
  phone: '',
  role_id: '',
})

// 决定是否显示 编辑用户窗口
const userFormVisible = ref(false)

// 表单对象
const userFormRef = ref<FormInstance>()

// 验证规则
const rules = reactive<FormRules>({
  username: [
    {
      validator: validateUserName,
      required: true,
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      message: '输入新密码',
      required: true,
      trigger: ['blur'],
    },
    { min: 3, message: '长度大于3', trigger: ['blur'] },
  ],
  phone: [
    {
      validator: validatePhone,
      required: true,
      trigger: ['blur', 'change'],
    },
  ],
  name: [
    {
      message: '请输入姓名',
      required: true,
      trigger: ['blur'],
    },
  ],
  role_id: [
    {
      message: '请选择角色',
      required: true,
      trigger: ['blur'],
    },
  ],
})

// 打开弹出框的方法
const handleAdd = () => {
  userFormVisible.value = true
  nextTick(() => {
    userFormRef.value?.resetFields()
  })
  user.value = {
    //@ts-ignore
    _id: null,
    username: '',
    password: '',
    name: '',
    phone: '',
    role_id: '',
  }
}

// 新增用户的方法
const addData = (data: any) => {
  if (!data) {
    return
  }
  data.validate(async (valid: any) => {
    if (valid) {
      userStore.addUser(user.value).then(() => {
        userFormVisible.value = false
        getUserList()
      })
    }
  })
}

let userStore = useUserStore()
let roleStore = useRoleStore()
const users = ref<userInfoData[] | undefined>([])
// 获取用户列表的方法
const getUserList = () => {
  userStore
    .getUserList({ page: currentPage.value, size: pageSize.value })
    .then((res) => {
      users.value = userStore.users
      total.value = res?.total as number
    })
}

const handleEdit = (_id: any) => {
  handleAdd()
  userStore.getUserById(_id).then((res: any) => {
    user.value = res
  })
}

const handleDelete = (_id: any) => {
  ElMessageBox.confirm('是否要删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userStore.deleteUser(_id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getUserList()
    })
  })
}

// 角色列表
let roleOptions = ref<roleInfoData[] | undefined>([])

const resetDate = (_row: any, _column: any, cellValue: any, _index: any) => {
  return formateDate(cellValue)
}
// 角色的格式化
const formatRole = (_row: any, _column: any, cellValue: any, _index: any) => {
  let role = roleOptions.value?.find((item: any) => item._id == cellValue)
  if (role) {
    return role.name
  }
}

const getRoleLIst = () => {
  if (roleStore.roles.length) {
    roleOptions.value = roleStore.roles
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles
    })
  }
}

onMounted(() => {
  getRoleLIst()
  getUserList()
})

// 分页组件
let currentPage = ref(1)

let pageSize = ref(5)

let total = ref(0)

let handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList()
}

let handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUserList()
}
//更新数据的方法
const updateDate = (data: any) => {
  if (!data) {
    return
  }
  data.validate(async (valid: any) => {
    if (valid) {
      userStore.updateUser(user.value).then(() => {
        userFormVisible.value = false
        getUserList()
      })
    } else {
      return false
    }
  })
}
</script>
<style scoped></style>
