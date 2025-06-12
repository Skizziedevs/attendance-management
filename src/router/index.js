import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import EmployeeDashboard from '../pages/EmployeeDashboard.vue'
import RequestLeave from '../pages/RequestLeave.vue'
import MyLeaves from '../pages/MyLeaves.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AttendanceList from '../pages/AttendanceList.vue'
import UserAttendance from '../pages/UserAttendance.vue'
import LeaveRequests from '../pages/LeaveRequests.vue'
import EmployeeList from '../pages/EmployeeList.vue'
import EmployeeAttendance from '../pages/EmployeeAttendance.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: EmployeeDashboard },
  { path: '/request-leave', component: RequestLeave },
  { path: '/my-leaves', component: MyLeaves },
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/admin/attendance', component: AttendanceList },
  { path: '/admin/attendance/:userId', component: UserAttendance },
  { path: '/admin/employee/:userId/attendance', component: EmployeeAttendance },
  { path: '/admin/leaves', component: LeaveRequests },
  { path: '/admin/employees', component: EmployeeList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
