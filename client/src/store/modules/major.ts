import { defineStore } from 'pinia'
import { MajorState } from './types/type'
import type {
  majorInfoData,
  majorListFormData,
  majorAllResponseData,
  majorListResponseData,
  majorResponseData,
} from '@/api/major/type'

import {
  reqMajorAll,
  reqMajorList,
  reqMajorAdd,
  reqMajorByID,
  reqMajorUpdate,
  reqMajorDelete,
} from '@/api/major/index'

const useMajorStore = defineStore('Major', {
  state: (): MajorState => {
    return {
      majors: [],
    }
  },
  actions: {
    async getMajorAll() {
      const result: majorAllResponseData = await reqMajorAll()
      if (result.status === 0) {
        this.majors = result.data as majorInfoData[]
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getMajorList(data: majorListFormData) {
      const result: majorListResponseData = await reqMajorList(data)
      if (result.status === 0) {
        this.majors = result.data?.data as majorInfoData[]
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async addMajor(data: majorInfoData) {
      const result: majorResponseData = await reqMajorAdd(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getMajorById(_id: string) {
      const result: majorResponseData = await reqMajorByID(_id)
      if (result.status === 0) {
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async updateMajor(data: majorInfoData) {
      const result: majorResponseData = await reqMajorUpdate(data)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteMajor(majorId: string) {
      const result: majorResponseData = await reqMajorDelete(majorId)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
})

export default useMajorStore
