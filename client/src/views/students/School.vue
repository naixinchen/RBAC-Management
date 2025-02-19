<template>
  <div style="margin: 20px 0" class="btn_box">
    <el-button type="primary" @click="handleAdd">新增学校</el-button>
  </div>
  <div>
    <el-table :data="schools" style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="schoolname" label="学校名称" />
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
    <el-dialog v-model="schoolFormVisible" title="添加学校" width="500">
      <el-form
        :model="school"
        ref="schoolFormRef"
        label-position="right"
        label-width="100px"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="学校名称" prop="schoolname">
          <el-input v-model="school.schoolname" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              school._id == null
                ? addData(schoolFormRef)
                : updateDate(schoolFormRef)
            "
          >
            确定
          </el-button>
          <el-button type="primary" @click="schoolFormVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { schoolInfoData } from '@/api/school/type'
import userSchoolStore from '@/store/modules/school'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

let schoolStore = userSchoolStore()

//数据
const schools = ref<schoolInfoData[]>([
  {
    schoolname: '',
    _id: '',
  },
])
//获取学校列表
const getSchoolList = () => {
  schoolStore
    .getSchoolList({ page: currentPage.value, size: pageSize.value })
    .then((res) => {
      schools.value = res?.data as schoolInfoData[]
      total.value = res?.total as number
    })
}
//编辑方法
const handleEdit = (_id: string) => {
  handleAdd()
  schoolStore.getSchoolById(_id).then((res: any) => {
    school.value = res
  })
}
//删除方法
const handleDelete = (_id: string) => {
  ElMessageBox.confirm('是否要删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    schoolStore.deleteSchool(_id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getSchoolList()
    })
  })
}

// 分页组件
let currentPage = ref(1)

let pageSize = ref(5)

let total = ref(0)

let handleSizeChange = (val: number) => {
  pageSize.value = val
  getSchoolList()
}

let handleCurrentChange = (val: number) => {
  currentPage.value = val
  getSchoolList()
}
onMounted(() => {
  getSchoolList()
})
//新增学校的方法
let schoolFormVisible = ref(false)
const schoolFormRef = ref<FormInstance>()
const school = ref<schoolInfoData>({
  _id: '',
  schoolname: '',
})
const handleAdd = () => {
  schoolFormVisible.value = true
  nextTick(() => {
    schoolFormRef.value?.resetFields()
  })
  school.value = {
    //@ts-ignore
    _id: null,
    schoolname: '',
  }
}
let rules = reactive<FormRules>({
  schoolname: [
    {
      message: '请输入学校名称',
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
      schoolStore.addSchool(school.value).then(() => {
        schoolFormVisible.value = false
        getSchoolList()
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
      schoolStore.updateSchool(school.value).then(() => {
        schoolFormVisible.value = false
        getSchoolList()
      })
    } else {
      return false
    }
  })
}
</script>
<style scoped></style>
