import { defineStore } from 'pinia'
import { StudentState } from './types/type'
import type {
  studentInfoData,
  studentListFormData,
  studentAllResponseData,
  studentListResponseData,
  studentResponseData,
} from '@/api/student/type'

import {
  reqStudentAll,
  reqStudentList,
  reqStudentAdd,
  reqStudentByID,
  reqStudentUpdate,
  reqStudentDelete,
} from '@/api/student/index'

const useStudentStore = defineStore('Student', {
  state: (): StudentState => {
    return {
      students: [],
    }
  },
  actions: {
    async getStudentAll() {
      const result: studentAllResponseData = await reqStudentAll()
      if (result.status === 0) {
        this.students = result.data as studentInfoData[]
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getStudentList(data: studentListFormData) {
      const result: studentListResponseData = await reqStudentList(data)
      if (result.status === 0) {
        this.students = result.data?.data as studentInfoData[]
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async addStudent(data: studentInfoData) {
      const result: studentResponseData = await reqStudentAdd(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getStudentById(_id: string) {
      const result: studentResponseData = await reqStudentByID(_id)
      if (result.status == 0) {
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async updateStudent(data: studentInfoData) {
      const result: studentResponseData = await reqStudentUpdate(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteStudent(studentId: string) {
      const result: studentResponseData = await reqStudentDelete(studentId)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
})

export default useStudentStore
