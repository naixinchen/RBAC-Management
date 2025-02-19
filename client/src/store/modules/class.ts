import { defineStore } from 'pinia'
import { ClassState } from './types/type'
import type {
  classInfoData,
  classListFormData,
  classAllResponseData,
  classListResponseData,
  classResponseData,
} from '@/api/class/type'

import {
  reqClassAll,
  reqClassList,
  reqClassAdd,
  reqClassByID,
  reqClassUpdate,
  reqClassDelete,
} from '@/api/class/index'

const useClassStore = defineStore('Class', {
  state: (): ClassState => {
    return {
      classes: [],
    }
  },
  actions: {
    async getClassAll() {
      const result: classAllResponseData = await reqClassAll()
      if (result.status === 0) {
        this.classes = result.data as classInfoData[]
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getClassList(data: classListFormData) {
      const result: classListResponseData = await reqClassList(data)
      if (result.status === 0) {
        this.classes = result.data?.data as classInfoData[]
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async addClass(data: classInfoData) {
      const result: classResponseData = await reqClassAdd(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getClassById(_id: string) {
      const result: classResponseData = await reqClassByID(_id)
      if (result.status === 0) {
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async updateClass(data: classInfoData) {
      const result: classResponseData = await reqClassUpdate(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteClass(classId: string) {
      const result: classResponseData = await reqClassDelete(classId)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
})

export default useClassStore
