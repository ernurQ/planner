export const apiBaseUrl = 'http://localhost:3000/api'

export const apiEndpoints = {
  register: () => '/auth/register',
  login: () => '/auth/login',
  getMyPlans: () => '/plans',
  getUserPlans: (username: string) => `/plans/${username}`,
  getPlan: (ownerName: string, planTitle: string) =>
    `/plans/${ownerName}/${planTitle}`,
  createNote: () => '/notes',
  createTask: () => '/tasks',
  updatePlan: (planTitle: string) => `/plans/${planTitle}`,
  updatePlanIsPrivate: (planTitle: string) => `/plans/${planTitle}/is-private`,
  updatePlanIsTemplate: (planTitle: string) =>
    `/plans/${planTitle}/is-template`,
  deletePlan: (planTitle: string) => `/plans/${planTitle}`,
  createPlan: () => '/plans',
  createPlanWithTemplate: () => '/templates',
}
