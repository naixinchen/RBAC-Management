<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
      ref="searchFormRef"
    >
      <el-form-item style="width: 170px" prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="根据姓名査询"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 170px" prop="direction">
        <el-select v-model="searchMap.direction" placeholder="根据学习方向査询">
          <el-option
            v-for="option in directionOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item style="width: 170px" prop="class">
        <el-select v-model="searchMap.class" placeholder="根据所在班级査询">
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.classname"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item style="width: 170px" prop="teacher id">
        <el-select v-model="searchMap.teacher_id" placeholder="根据教师査询">
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item style="width: 170px" prop="manager id">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button type="primary" @click="resetForm(searchFormRef)">
          重置
        </el-button>
        <el-button type="primary" @click="handlerAdd">新增学生</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="students" border style="width: 100%" height="380">
      <el-table-column type="expand">
        <template #default="props">
          <div style="padding-left: 20px">
            <p>学生姓名:{{ props.row.name }}</p>
            <p>性别:{{ dataFilter(props.row.gender, genderOptions) }}</p>
            <p>所在学校:{{ props.row.school }}</p>
            <p>专业:{{ props.row.major }}</p>
            <p>年级:{{ dataFilter(props.row.grade, gradeOptions) }}</p>
            <p>学历:{{ dataFilter(props.row.education, educationOptions) }}</p>
            <p>
              学习方向:{{ dataFilter(props.row.direction, directionOptions) }}
            </p>
            <p>身份号码:{{ props.row.id_number }}</p>
            <p>电话号码:{{ props.row.phone }}</p>
            <p>家长姓名:{{ props.row.parent }}</p>
            <p>家长联系电话:{{ props.row.parent_phone }}</p>
            <p>家庭住址:{{ props.row.address }}</p>
            <p>QQ号码:{{ props.row.qq }}</p>
            <p>所在班级:{{ classFilter(props.row.class, classOptions) }}</p>
            <p>入学时间:{{ props.row.admission_date }}</p>
            <p>
              授课教师:{{ dataFilter(props.row.teacher_id, teacherOptions) }}
            </p>
            <p>学管:{{ dataFilter(props.row.manager_id, managerOptions) }}</p>
            <p>
              照片:
              <el-image
                v-for="(item, index) in props.row.pictures"
                :key="index"
                style="width: 200px; height: 200px"
                :src="baseApi + '/upload/' + item"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="getSrcList(props.row.pictures)"
                :initial-index="0"
                fit="cover"
              />
            </p>
            <p>
              备注信息:
              <span v-html="props.row.note"></span>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="name" label="学生姓名" width="100" />
      <el-table-column prop="gender" label="性别" width="60">
        <template #default="scope">
          {{ dataFilter(scope.row.gender, genderOptions) }}
        </template>
      </el-table-column>
      <el-table-column prop="direction" label="学习方向" width="100">
        <template #default="scope">
          {{ dataFilter(scope.row.direction, directionOptions) }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话号码" width="130" />
      <el-table-column prop="class" label="所在班级" width="100">
        <template #default="scope">
          {{ classFilter(scope.row.class, classOptions) }}
        </template>
      </el-table-column>
      <el-table-column prop="teacher_id" label="授课教师" width="100">
        <template #default="scope">
          {{ dataFilter(scope.row.teacher_id, teacherOptions) }}
        </template>
      </el-table-column>
      <el-table-column prop="manager_id" label="学管" width="100">
        <template #default="scope">
          {{ dataFilter(scope.row.manager_id, managerOptions) }}
        </template>
      </el-table-column>
      <el-table-column prop="admission_date" label="入学时间" width="150" />
      <el-table-column label="操作" width="100">
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import useStudentStore from '@/store/modules/student'
import useClassStore from '@/store/modules/class'
import useRoleStore from '@/store/modules/role'
import useUserStore from '@/store/modules/user'
import type { studentInfoData } from '@/api/student/type'
import type { classInfoData } from '@/api/class/type'
import type { roleInfoData } from '@/api/role/type'
import type { userInfoData } from '@/api/user/type'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
let $router = useRouter()

let studentStore = useStudentStore()
let classStore = useClassStore()
let roleStore = useRoleStore()
let userStore = useUserStore()

//角色列表 用户列表 班级列表 教师列表 学管列表
let roleOptions = ref<roleInfoData[] | undefined>([])
let userOptions = ref<userInfoData[] | undefined>([])
let classOptions = ref<classInfoData[] | undefined>([])
let teacherOptions = ref<userInfoData[] | undefined>([])
let managerOptions = ref<userInfoData[] | undefined>([])

//角色为教师的id 角色为学管的id
let teacher_role_id = ref<string | undefined>('')
let manager_role_id = ref<string | undefined>('')

interface FilterData {
  _id: string
  name: string
}

//性别数据列表
let genderOptions = ref<FilterData[]>([
  { _id: '0', name: '男' },
  { _id: '1', name: '女' },
])

//年级数据列表
let gradeOptions = ref<FilterData[]>([
  { _id: '0', name: '大一' },
  { _id: '1', name: '大二' },
  { _id: '2', name: '大三' },
  { _id: '3', name: '大四' },
  { _id: '4', name: '在读研究生' },
])

//学历数据列表
let educationOptions = ref<FilterData[]>([
  { _id: '0', name: '专科' },
  { _id: '1', name: '本科' },
  { _id: '2', name: '硕士' },
  { _id: '3', name: '社会' },
])

//学习方向数据
let directionOptions = ref<FilterData[]>([
  { _id: '0', name: 'A' },
  { _id: '1', name: 'B' },
  { _id: '2', name: 'C' },
  { _id: '3', name: 'D' },
])

//过滤
const dataFilter = (_id: string, options: any) => {
  const obj = options.find((item: any) => item._id == _id)
  return obj ? obj.name : ''
}
const classFilter = (_id: string, options: any) => {
  const obj = options.find((item: any) => item._id == _id)
  return obj ? obj.classname : ''
}

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
//获取班级列表
const getClassList = () => {
  classStore.getClassAll().then(() => {
    classOptions.value = classStore.classes
  })
}
//获取学生列表
const students = ref<studentInfoData[]>([])
//获取学生列表的方法
const getStudentList = () => {
  studentStore
    .getStudentList({
      page: currentPage.value,
      size: pageSize.value,
      searchMap,
    })
    .then((res) => {
      students.value = studentStore.students
      total.value = res?.total as number
    })
}
//条件查询
const searchMap = reactive({
  name: '',
  direction: '',
  teacher_id: '',
  manager_id: '',
  class: '',
})

onMounted(() => {
  getRoleList()
  getUserList()
  getClassList()
  getStudentList()
})

// 分页组件
let currentPage = ref(1)

let pageSize = ref(5)

let total = ref(0)

let handleSizeChange = (val: number) => {
  pageSize.value = val
}

let handleCurrentChange = (val: number) => {
  currentPage.value = val
}
//编辑
const handleEdit = (data: any) => {
  $router.push(`/student/update/${data}`)
}
//删除
const handleDelete = (data: any) => {
  ElMessageBox.confirm('是否要删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    studentStore.deleteStudent(data).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getStudentList()
    })
  })
}

const searchFormRef = ref<FormInstance>()
//查询
const searchData = () => {
  currentPage.value = 1
  getStudentList()
}
//重置
const resetForm = (data: any) => {
  if (!data) {
    return
  }
  data.resetFields()
  currentPage.value = 1
  getStudentList()
}
//添加
const handlerAdd = () => {
  $router.push(`/student/update/-1`)
}

const baseApi = import.meta.env.VITE_APP_BASE_API
const getSrcList = (imgList: string[]) => {
  return imgList.map((item) => `${baseApi}/upload/${item}`)
}
</script>
<style scoped></style>
