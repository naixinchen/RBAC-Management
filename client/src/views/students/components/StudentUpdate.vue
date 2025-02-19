<template>
  <div class="student-update">
    <el-button icon="back" @click="$router.push('/student')" circle></el-button>
    <el-form
      status-icon
      :model="updateStudent"
      ref="studentFormRef"
      label-position="right"
      label-width="120px"
      style="width: 100%"
      height="100%"
      :rules="rules"
      class="update-form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateStudent.name" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select
          v-model="updateStudent.gender"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in genderOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="所在学校" prop="school">
        <el-autocomplete
          v-model="updateStudent.school"
          :fetch-suggestions="querySearchSchool"
          class="inline-input"
          placeholder="请选择学校"
        />
      </el-form-item>

      <el-form-item label="专业" prop="major">
        <el-autocomplete
          v-model="updateStudent.major"
          :fetch-suggestions="querySearchMajor"
          class="inline-input"
          placeholder="请选择专业"
        />
      </el-form-item>

      <el-form-item label="年级" prop="grade">
        <el-select
          v-model="updateStudent.grade"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in gradeOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="学历" prop="education">
        <el-select
          v-model="updateStudent.education"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in educationOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="学习方向" prop="direction">
        <el-select
          v-model="updateStudent.direction"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in directionOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号" prop="id_number">
        <el-input v-model="updateStudent.id_number" />
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="updateStudent.phone" />
      </el-form-item>
      <el-form-item label="家长姓名" prop="parent">
        <el-input v-model="updateStudent.parent" />
      </el-form-item>
      <el-form-item label="家长联系电话" prop="parent_phone">
        <el-input v-model="updateStudent.parent_phone" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input v-model="updateStudent.address" />
      </el-form-item>
      <el-form-item label="QQ号" prop="qq">
        <el-input v-model="updateStudent.qq" />
      </el-form-item>

      <el-form-item label="所在班级" prop="class">
        <el-select
          v-model="updateStudent.class"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.classname"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="入学时间" prop="admission_date">
        <el-date-picker
          v-model="updateStudent.admission_date"
          type="date"
          placeholder="请点击选择"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="授课教师" prop="teacher_id">
        <el-select
          v-model="updateStudent.teacher_id"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
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
        <el-select
          v-model="updateStudent.manager_id"
          placeholder="请点击选择"
          width="600px"
          class="filter-item"
        >
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="照片" prop="pictures">
        <el-upload
          :action="baseApi + '/manage/img/upload'"
          list-type="picture-card"
          :auto-upload="true"
          name="image"
          :file-list="fileList"
          accept="image/*"
          :on-change="handleChange"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" width="100%" alt="Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <Editor
          v-model="updateStudent.note"
          :api-key="tiny.apiKey"
          :init="tiny.init"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="
          updateStudent._id == null
            ? addData(studentFormRef)
            : updateData(studentFormRef)
        "
      >
        确定
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import useMajorStore from '@/store/modules/major'
import useClassStore from '@/store/modules/class'
import useRoleStore from '@/store/modules/role'
import useUserStore from '@/store/modules/user'
import useSchoolStore from '@/store/modules/school'
import useStudentStore from '@/store/modules/student'
import type { classInfoData } from '@/api/class/type'
import type { roleInfoData } from '@/api/role/type'
import type { userInfoData } from '@/api/user/type'
import type { schoolInfoData } from '@/api/school/type'
import type { majorInfoData } from '@/api/major/type'
import type { studentInfoData } from '@/api/student/type'
import type { FormInstance, FormRules } from 'element-plus'

import request from '@/utils/request'
import { UploadProps, UploadUserFile } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
// 使用富文本编辑框
import Editor from '@tinymce/tinymce-vue'

let majorStore = useMajorStore()
let classStore = useClassStore()
let roleStore = useRoleStore()
let userStore = useUserStore()
let schoolStore = useSchoolStore()
let studentStore = useStudentStore()

//角色列表 用户列表 班级列表 教师列表 学管列表
let roleOptions = ref<roleInfoData[] | undefined>([])
let userOptions = ref<userInfoData[] | undefined>([])
let classOptions = ref<classInfoData[] | undefined>([])
let schoolOptions = ref<schoolInfoData[]>([])
let majorOptions = ref<majorInfoData[]>([])
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

const updateStudent = ref({
  _id: null,
  name: '',
  gender: '',
  school: '',
  major: '',
  grade: '',
  education: '',
  direction: '',
  id_number: '',
  phone: '',
  parent: '',
  parent_phone: '',
  address: '',
  qq: '',
  class: '',
  admission_date: '',
  teacher_id: '',
  manager_id: '',
  pictures: [''],
  note: '',
})

//获取数据
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
//获取学校列表
const getSchoolList = () => {
  schoolStore.getSchoolAll().then(() => {
    schoolOptions.value = schoolStore.schools
  })
}
//获取专业列表
const getMajorList = () => {
  majorStore.getMajorAll().then(() => {
    majorOptions.value = majorStore.majors
  })
}

onMounted(() => {
  getRoleList()
  getUserList()
  getClassList()
  getSchoolList()
  getMajorList()
  getStudentList()
})

//输入的建议
const querySearchSchool = (queryString: any, callback: any) => {
  schoolOptions.value.forEach((item: any) => {
    item.value = item.schoolname
  })
  let result = queryString
    ? schoolOptions.value.filter(createFilter(queryString))
    : schoolOptions.value
  callback(result)
}
const querySearchMajor = (queryString: any, callback: any) => {
  majorOptions.value.forEach((item: any) => {
    item.value = item.majorname
  })
  let result = queryString
    ? majorOptions.value.filter(createFilter(queryString))
    : majorOptions.value
  callback(result)
}

const createFilter = (queryString: string) => {
  return (res: any) => {
    return res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

//照片
const baseApi = import.meta.env.VITE_APP_BASE_API
const baseUrl = import.meta.env.VITE_APP_SERVITE_URL
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref<UploadUserFile[]>([])
//删除
const handleRemove = (file: UploadFile) => {
  request
    .post<any, any>('/manage/img/delete', { name: file.name })
    .then((res) => {
      console.log(res)
      if (res.status == 0) {
        fileList.value.splice(fileList.value.indexOf(file), 1)
      }
    })
}
//放大
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFile.status == 'success') {
    const result: any = uploadFile.response
    if (result.status == 0) {
      let { name, url } = result.data
      uploadFile = uploadFiles[uploadFiles.length - 1]
      uploadFile.name = name
      uploadFile.url = url
    }
  }
  fileList.value = uploadFiles
}
const getImgs = () => {
  return fileList.value.map((item) => item.name)
}

const tiny = reactive({
  apiKey: 'w8593t1vo6t8c9rf9zdr5m40p28g9j790kfdk0lema1vq658',
  init: {
    toolbar_mode: 'sliding',
    // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (_request: any, respondWith: any) =>
      respondWith.string(() =>
        Promise.reject('See docs to implement AI Assistant'),
      ),
  },
})

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
// 身份证号的验证规则
const validateIdNumber = (_rule: any, value: any, callback: any) => {
  value = value.trim()
  const phoneReg =
    /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
  if (value === '') {
    callback(new Error('请输入身份证号'))
  } else if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}
let studentFormRef = ref<FormInstance>()

let rules = reactive<FormRules>({
  phone: [{ validator: validatePhone, required: true, trigger: ['blur'] }],
  parent_phone: [
    { validator: validatePhone, required: true, trigger: ['blur'] },
  ],
  id_number: [
    { validator: validateIdNumber, required: true, trigger: ['blur'] },
  ],
  name: [{ message: '请添加姓名', required: true, trigger: ['blur'] }],
  gender: [{ message: '请选择性别', required: true, trigger: ['blur'] }],
  class: [{ message: '请添加班级', required: true, trigger: ['blur'] }],
  teacher_id: [{ message: '请选择教师', required: true, trigger: ['blur'] }],
  manager_id: [{ message: '请选择学管', required: true, trigger: ['blur'] }],
  admission_date: [
    { message: '请添加入学时间', required: true, trigger: ['blur'] },
  ],
  direction: [{ message: '请选择学习方向', required: true, trigger: ['blur'] }],
})

//提交数据
import { useRoute, useRouter } from 'vue-router'
let $route = useRoute()
let $router = useRouter()
const addData = (formEl: any) => {
  if (!formEl) {
    return
  }
  formEl.validate(async (valid: any) => {
    if (valid) {
      updateStudent.value.pictures = getImgs()
      studentStore.addStudent(updateStudent.value).then(() => {
        $router.replace('/student')
      })
    } else {
      return false
    }
  })
}
//获取学生数据
const getStudentList = () => {
  const { _id } = $route.params
  if (_id != '-1') {
    studentStore.getStudentById(_id as string).then((res) => {
      // @ts-ignore
      updateStudent.value = res
      const { pictures } = res as studentInfoData
      if (pictures && pictures.length > 0) {
        fileList.value = pictures.map((img, index) => {
          return {
            uid: -index,
            name: img,
            status: 'success',
            url: baseUrl + '/upload/' + img,
          }
        })
      }
    })
  }
}
//更新数据
const updateData = (data: any) => {
  if (!data) {
    return
  }
  data.validate(async (valid: any) => {
    if (valid) {
      updateStudent.value.pictures = getImgs()
      studentStore.updateStudent(updateStudent.value).then(() => {
        $router.replace('/student')
      })
    } else {
      return false
    }
  })
}
</script>
<style scoped></style>
