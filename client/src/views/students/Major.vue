<template>
  <div style="margin: 20px 0" class="btn_box">
    <el-button type="primary" @click="handleAdd">新增专业</el-button>
  </div>
  <div>
    <el-table :data="majors" style="width: 100%" height="380">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="majorname" label="专业名称" />
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
    <el-dialog v-model="majorFormVisible" title="添加专业" width="500">
      <el-form
        :model="major"
        ref="majorFormRef"
        label-position="right"
        label-width="100px"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="专业名称" prop="majorname">
          <el-input v-model="major.majorname" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              major._id == null
                ? addData(majorFormRef)
                : updateDate(majorFormRef)
            "
          >
            确定
          </el-button>
          <el-button type="primary" @click="majorFormVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { majorInfoData } from '@/api/major/type'
import userMajorStore from '@/store/modules/major'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

let majorStore = userMajorStore()

//数据
const majors = ref<majorInfoData[]>([
  {
    majorname: '',
    _id: '',
  },
])
//获取专业列表
const getMajorList = () => {
  majorStore
    .getMajorList({ page: currentPage.value, size: pageSize.value })
    .then((res) => {
      majors.value = res?.data as majorInfoData[]
      total.value = res?.total as number
    })
}
//编辑方法
const handleEdit = (_id: string) => {
  handleAdd()
  majorStore.getMajorById(_id).then((res: any) => {
    major.value = res
  })
}
//删除方法
const handleDelete = (_id: string) => {
  ElMessageBox.confirm('是否要删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    majorStore.deleteMajor(_id).then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getMajorList()
    })
  })
}

// 分页组件
let currentPage = ref(1)

let pageSize = ref(5)

let total = ref(0)

let handleSizeChange = (val: number) => {
  pageSize.value = val
  getMajorList()
}

let handleCurrentChange = (val: number) => {
  currentPage.value = val
  getMajorList()
}
onMounted(() => {
  getMajorList()
})
//新增专业的方法
let majorFormVisible = ref(false)
const majorFormRef = ref<FormInstance>()
const major = ref<majorInfoData>({
  _id: '',
  majorname: '',
})
const handleAdd = () => {
  majorFormVisible.value = true
  nextTick(() => {
    majorFormRef.value?.resetFields()
  })
  major.value = {
    //@ts-ignore
    _id: null,
    majorname: '',
  }
}
let rules = reactive<FormRules>({
  majorname: [
    {
      message: '请输入专业名称',
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
      majorStore.addMajor(major.value).then(() => {
        majorFormVisible.value = false
        getMajorList()
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
      majorStore.updateMajor(major.value).then(() => {
        majorFormVisible.value = false
        getMajorList()
      })
    } else {
      return false
    }
  })
}
</script>
<style scoped></style>
