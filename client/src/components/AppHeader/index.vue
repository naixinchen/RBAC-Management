<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/vue.svg" width="25px" />
      <span class="company">学员管理系统</span>
    </a>
    <!-- 右侧下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userStore.user?.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="date">{{ currentTime }}</span>
    <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
      <el-form
        :model="userForm"
        label-position="right"
        label-width="100px"
        :rules="rules"
        ref="userFormRef"
      >
        <el-form-item label="原始密码" prop="oldPass">
          <el-input v-model="userForm.oldPass" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="userForm.pass" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="userForm.checkPass" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd(userFormRef)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { formateTime } from '@/utils/dateUtils'
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import useUserStore from '@/store/modules/user'
//引入路由
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { reqCheckPwd, reqUpdatePwd } from '@/api/user'

let userStore = useUserStore()
let $router = useRouter()

const handleCommand = (command: string) => {
  switch (command) {
    case 'a':
      handlePwd()
      break
    case 'b':
      handleLogout()
      break
    default:
      console.log('123')
      break
  }
}
let currentTime = ref<string>('')
let obj = { timer: 1 }
const getTime = () => {
  obj.timer = setInterval(() => {
    currentTime.value = formateTime(Date.now())
  }, 1000)
}
onMounted(() => {
  getTime()
})
onUnmounted(() => {
  clearInterval(obj.timer)
})

//退出登录
let handleLogout = () => {
  userStore.removeUser()
  if (!userStore.user) {
    $router.replace('/login')
  }
}
//修改密码
const dialogFormVisible = ref(false)
let userForm = reactive({
  oldPass: '',
  pass: '',
  checkPass: '',
})
const handlePwd = () => {
  dialogFormVisible.value = true
  nextTick(() => {
    userFormRef.value?.resetFields()
  })
}
//密码校验
const userFormRef = ref<FormInstance>()
const validateOldPass = (_rule: any, value: any, callback: any) => {
  reqCheckPwd({ userId: userStore.user?._id as string, password: value }).then(
    (res) => {
      console.log('res', res)
      if (res.status == 0) {
        callback()
      } else {
        callback(new Error(res.msg))
      }
    },
  )
}
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value != userForm.pass) {
    callback(new Error('新密码请保持一致'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  oldPass: [
    {
      validator: validateOldPass,
      required: true,
      trigger: ['blur'],
    },
  ],
  pass: [
    {
      message: '必须输入密码',
      required: true,
      trigger: ['blur'],
    },
  ],
  checkPass: [
    {
      validator: validatePass,
      required: true,
      trigger: ['change'],
    },
  ],
})
const updatePwd = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      reqUpdatePwd({
        userId: userStore.user?._id as string,
        password: userForm.pass,
      }).then((res) => {
        if (res.status == 0) {
          handleLogout()
          dialogFormVisible.value = false
        }
      })
    }
  })
}
</script>
<style scoped>
.logo {
  margin: 0 10px;
  vertical-align: middle;
}

.company {
  color: #fff;
  position: absolute;
}

.el-dropdown {
  float: right;
  line-height: 50px;
  height: 50px;
  margin-right: 30px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  outline: none;
}

.date {
  color: #fff;
  float: right;
  padding-right: 20px;
}
</style>
