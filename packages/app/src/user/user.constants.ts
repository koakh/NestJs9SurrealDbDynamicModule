const adminId = 'efeed3eb-c0a2-4b3e-816f-2a42ca8451b3';
const adminCurrentUser = {
  userId: adminId,
  username: 'admin',
  roles: ['ROLE_USER', 'ROLE_ADMIN'],
}

export const constants = {
  adminId,
  johnDoeId: '520c2eb5-e83b-4ef5-a343-85756bcce149',
  // to impersonate admin user
  adminUser: {
    id: adminId,
    username: 'admin',
    roles: ['ROLE_USER', 'ROLE_ADMIN'],
    // 12345678
    password: '$2b$10$U9AVUdkRnFsrMjPg/XyTeOWmF.gu73gd1hJGR1s1OnKTshjJYdGpW',
    firstName: 'Pietra',
    lastName: 'Heine',
    email: 'pheine0@illinois.edu',
    createdDate: 1597444307,
    createdBy: adminId,
    metaData: {
      key: 'value'
    },
  },
  adminCurrentUser,
}