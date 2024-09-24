export const routes = {
	home: () => '/',

	register: () => '/auth/register',
	login: () => '/auth/login',

	userProfile: (username: string) => `/user/${username}`,

	plan: (ownerName: string, planTitle: string) =>
		`/plan/${ownerName}/${planTitle}`,
	planSettings: (ownerName: string, planTitle: string) =>
		`/plan/${ownerName}/${planTitle}/settings`,
	createPlan: () => '/plan/create',
	createPlanWithTemplate: () => `/plan/create/with-template`
}
