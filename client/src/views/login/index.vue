<template>
  <div class="login-container">
    <el-form
      :rules="rules"
      ref="ruleFormRef"
      :model="form"
      label-width="auto"
      class="login-form"
      status-icon
    >
      <h1 class="login-title">登录</h1>
      <el-form-item prop="username">
        <el-input
          class="input"
          type="text"
          v-model="form.username"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="input"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'

let $router = useRouter()
let userStore = useUserStore()

const form = reactive({
  username: '',
  password: '',
})
const ruleFormRef = ref<FormInstance>()
const validateUserName = (_rule: any, value: any, callback: any) => {
  value = value.trim()
  const length = value && value.length
  const pwdReg = /^[a-zA-Z0-9]+$/
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (length < 4 || length > 12) {
    callback(new Error('长度应该在4-12个字符'))
  } else if (!pwdReg.test(value)) {
    callback(new Error('账号必须是英文 数字 或下划线组成'))
  } else {
    callback()
  }
}
const rules = reactive<ruleFormRef>({
  username: [
    {
      validator: validateUserName,
      required: true,
      trigger: ['change', 'blur'],
    },
  ],
  password: [
    {
      message: '必须输入密码',
      required: true,
      trigger: ['change', 'blur'],
    },
  ],
})

let submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate(async (vaild) => {
    if (vaild) {
      try {
        await userStore.userLogin(form)
        $router.push('/')
        ElMessage({
          type: 'success',
          message: '登录成功',
        })
      } catch (error) {
        ElMessage({
          type: 'error',
          message: '失败',
        })
      }
    } else {
      ElMessage({
        type: 'error',
        message: '验证失败',
      })
      return
    }
  })
}
</script>
<style lang="scss" scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  /* background-color: rgb(255, 255, 255, 0.7); */
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(3px) brightness(95%);
  h1 {
    color: chartreuse;
  }
}

.login-title {
  text-align: center;
  color: #fff;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../../assets/bj.jpg') no-repeat center/100% 100%;
}

.login {
  width: 100%;
  margin: 10px auto 0px;
  background-color: #fff;
  border: rgb(69, 69, 69) 1px solid;
  height: 40px;
  font-size: 18px;
  border-radius: 20px;
  color: rgb(69, 69, 69);
}

.el-input__wrapper {
  margin: 4px auto;
  width: 100%;
  height: 40px;
  border: rgb(69, 69, 69) 1px solid;
  border-radius: 20px;
  font-size: 16px;
}
</style>
