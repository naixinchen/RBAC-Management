# RBAC Management

[![Vue](https://img.shields.io/badge/Vue-3.3.4-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)

> 基于Vue3组合式API的学校成员管理系统，采用前后端分离架构，提供高效的教育管理解决方案。

## 🌟 项目特色

- **权限管理**：动态菜单展示与角色权限控制
- **数据可视化**：ECharts实现学员统计图表
- **高效管理**：解决传统手工管理的信息滞后问题
- **模块化设计**：包含学校/专业/班级/学生多级管理体系

## 🛠️ 技术栈

### 前端
- **框架**: Vue3 + TypeScript + Vite
- **UI组件**: Element Plus
- **状态管理**: Pinia
- **可视化**: ECharts 5.4
- **路由**: Vue Router 4.2
- **HTTP**: Axios 1.5
- **富文本**: Tinymce 6.8

### 后端
- **数据库**: MongoDB 6.0
- **接口规范**: RESTful API

### 工具链
- 代码规范：ESLint + Prettier
- 包管理：pnpm 8.9

## 📋 功能列表

| 模块        | 功能                     | 特性                          |
|-------------|--------------------------|-------------------------------|
| 用户管理    | 新增/编辑/删除用户       | 身份验证 + 密码修改           |
| 角色管理    | 权限分配                 | 动态菜单控制                  |
| 学校管理    | 多级机构配置             | 专业/班级树形结构             |
| 学生管理    | 综合查询                 | 支持班级/专业/教师多条件筛选  |
| 数据统计    | 学员人数可视化           | 年度趋势图表                  |

## 🚀 快速启动

### 环境要求
- Node.js 18+
- MongoDB 6.0+
- pnpm 8.x

### 安装步骤
1. 克隆：
```bash
git clone https://github.com/naixinchen/blog_platform.git
cd blog_platform
```

2. 启动服务端：
```bash
cd service
npm install
node app.js
```

3. 启动客户端：
```bash
cd ..
cd client
pnpm install
pnpm run dev
```
###