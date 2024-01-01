import { swagger } from '@elysiajs/swagger'
import { userTag } from '@/routes/users'

const SWAGGER_PATH = '/swagger'

export const Swagger = swagger({
	path: SWAGGER_PATH,
	documentation: {
		info: {
			title: 'Elysia',
			description: 'API description',
			version: '0.1.0',
		},
		tags: [userTag],
	},
	exclude: [SWAGGER_PATH, '/'],
})
