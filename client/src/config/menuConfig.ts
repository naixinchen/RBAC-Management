const menuList = [
  {
    title: '首页',
    index: '/home',
    icon: 'House',
    isPublish: true,
  },
  {
    title: '用户管理',
    index: '/user',
    icon: 'User',
  },
  {
    title: '角色管理',
    index: '/role',
    icon: 'MostlyCloudy',
  },
  {
    title: '学员',
    index: '/students',
    icon: 'User',
    children: [
      {
        title: '学校管理',
        index: '/school',
        icon: 'School',
        isPublish: true,
      },
      {
        title: '专业管理',
        index: '/majors',
        icon: 'ElementPlus',
      },
      {
        title: '班级管理',
        index: '/class',
        icon: 'ElementPlus',
      },
      {
        title: '学生管理',
        index: '/student',
        icon: 'ElementPlus',
      },
    ],
  },
]

export default menuList
