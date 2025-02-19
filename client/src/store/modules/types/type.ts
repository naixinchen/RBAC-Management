import type { userInfoData } from '@/api/user/type'
import type { roleInfoData } from '@/api/role/type'
import type { schoolInfoData } from '@/api/school/type'
import type { majorInfoData } from '@/api/major/type'
import type { classInfoData } from '@/api/class/type'
import type { studentInfoData } from '@/api/student/type'

export interface UserState {
  user: userInfoData | null
  users: userInfoData[]
}

export interface RoleState {
  roles: roleInfoData[]
}

export interface SchoolState {
  schools: schoolInfoData[]
}

export interface MajorState {
  majors: majorInfoData[]
}

export interface ClassState {
  classes: classInfoData[]
}

export interface StudentState {
  students: studentInfoData[]
}
