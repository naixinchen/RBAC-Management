<template>
  <div>
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
      ref="searchFormRef"
    >
      <el-form-item style="width: 200px" prop="teacher_id">
        <el-select v-model="searchMap.teacher_id" placeholder="根据教师查询">
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="width: 200px" prop="manager_id">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-for-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button type="primary" @click="resetForm(searchFormRef)">
          重置
        </el-button>
        <el-button type="primary" @click="handleAdd">新增班级</el-button>
      </el-for-item>
    </el-form>
    <el-table :data="classes" style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="classname" label="班级名称" />
      <el-table-column
        prop="teacher_id"
        label="授课教师"
        :formatter="formatTeacher"
      />
      <el-table-column
        prop="manager_id"
        label="学管"
        :formatter="formatManager"
      />
      <!-- 需要将 创建时间 所属角色 进行格式化  -->
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
    <el-dialog v-model="classFormVisible" title="添加班级" width="500">
      <el-form
        :model="updateClass"
        ref="classFormRef"
        label-position="right"
        label-width="100px"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="updateClass.classname" />
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            placeholder="请选择授课教师"
          >
            <el-option
              v-for="option in teacherOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学管" prop="manager_id">
          <el-select v-model="updateClass.manager_id" placeholder="请选择学管">
            <el-option
              v-for="option in managerOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              updateClass._id == null
                ? addData(classFormRef)
                : updateDate(classFormRef)
            "
          >
            确定
          </el-button>
          <el-button type="primary" @click="classFormVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { classInfoData } from '@/api/class/type'
import userClassStore from '@/store/modules/class'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

let classStore = userClassStore()

import type { userInfoData } from '@/api/user/type'
import type { roleInfoData } from '@/api/role/type'
import useUserStore from '@/store/modules/user'
import useRoleStore from '@/store/modules/role'
//用户仓库  角色仓库
let userStore = useUserStore()
let roleStore = useRoleStore()
//用户列表  角色列表
let userOptions = ref<userInfoData[]>([])
let roleOptions = ref<roleInfoData[]>([])
//教师列表  学管列表
let teacherOptions = ref<userInfoData[] | undefined>([])
let managerOptions = ref<userInfoData[] | undefined>([])
//教师ID   学管ID
const teacher_role_id = ref<string | undefined>('')
const manager_role_id = ref<string | undefined>('')

//获取角色列表的方法
const getRoleList = () => {
  roleStore.roleList().then(() => {
    roleOptions.value = roleStore.roles
    roleOptions.value.forEach((item) => {
      if (item.name == '教师') {
        teacher_role_id.value = item._id
      } else if (item.name == '学管') {
        manager_role_id.value = item._id
      }
    })
  })
}

//获取用户列表
const getUserList = () => {
  userStore.getUserAll().then(() => {
    userOptions.value = userStore.users
    userOptions.value.forEach((item) => {
      if (item.role_id == teacher_role_id.value) {
        // @ts-ignore
        teacherOptions.value?.push(item)
      } else if (item.role_id == manager_role_id.value) {
        //@ts-ignore
        managerOptions.value?.push(item)
      }
    })
  })
}

//格式化
const formatTeacher = (
  _row: any,
  _column: any,
  cellValue: any,
  _index: any,
) => {
  let teacher = teacherOptions.value?.find((item) => item._id == cellValue)
  return teacher?.name
}
const formatManager = (
  _row: any,
  _column: any,
  cellValue: any,
  _index: any,
) => {
  let manager = managerOptions.value?.find((item) => item._id == cellValue)
  return manager?.name
}

//数据
const classes = ref<classInfoData[]>([])
let searchMap = reactive({
  teacher_id: '',
  manager_id: '',
})
//获取班级列表
const getClassList = () => {
  classStore
    .getClassList({ page: currentPage.value, size: pageSize.value, searchMap })
    .then((res) => {
      classes.value = res?.data as classInfoData[]
      total.value = res?.total as number
    })
}
//编辑方法
const handleEdit = (_id: string) => {
  handleAdd()
  classStore.getClassById(_id).then((response) => {
    updateClass.value = response as classInfoData
  })
}
//删除方法
const handleDelete = (_id: string) => {
  ElMessageBox.confirm('是否要删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    classStore.deleteClass(_id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getClassList()
    })
  })
}

// 分页组件
let currentPage = ref(1)

let pageSize = ref(5)

let total = ref(0)

let handleSizeChange = (val: number) => {
  pageSize.value = val
  getClassList()
}

let handleCurrentChange = (val: number) => {
  currentPage.value = val
  getClassList()
}
onMounted(() => {
  getRoleList()
  getUserList()
  getClassList()
})
//新增专业的方法
let classFormVisible = ref(false)
const classFormRef = ref<FormInstance>()
const updateClass = ref<classInfoData>({
  //@ts-ignore
  _id: null,
  classname: '',
  teacher_id: '',
  manager_id: '',
})
const handleAdd = () => {
  classFormVisible.value = true
  nextTick(() => {
    classFormRef.value?.resetFields()
  })
  updateClass.value = {
    //@ts-ignore
    _id: null,
    classname: '',
    teacher_id: '',
    manager_id: '',
  }
}
let rules = reactive<FormRules>({
  name: [
    {
      message: '请输入专业名称',
      required: true,
      trigger: ['blur'],
    },
  ],
  teacher_id: [
    {
      message: '请选择教师',
      required: true,
      trigger: ['blur'],
    },
  ],
  manager_id: [
    {
      message: '请选择学管',
      required: true,
      trigger: ['blur'],
    },
  ],
})

const addData = (data: any) => {
  if (!data) {
    return
  }
  data.validate(async (valid: any) => {
    if (valid) {
      classStore.addClass(updateClass.value).then(() => {
        classFormVisible.value = false
        getClassList()
      })
    }
  })
}
//更新数据
const updateDate = (data: any) => {
  if (!data) {
    return
  }
  data.validate(async (valid: any) => {
    if (valid) {
      classStore.updateClass(updateClass.value).then(() => {
        classFormVisible.value = false
        getClassList()
      })
    } else {
      return false
    }
  })
}
let searchFormRef = ref<FormInstance>()
//查询方法
const searchData = () => {
  currentPage.value = 1
  getClassList()
}
//重置
const resetForm = (data: any) => {
  if (!data) {
    return
  }
  data.resetFields()
  currentPage.value = 1
  getClassList()
  console.log(111)
}
</script>
<style scoped></style>
