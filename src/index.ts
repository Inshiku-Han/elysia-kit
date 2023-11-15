import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { db } from './db'
import { users } from './db/schema'

type Tag = { name: string; description?: string }

const userTag: Tag = { name: 'Users', description: 'Users related endpoints' }
const tags: Tag[] = [userTag]

const app = new Elysia()
	.get('/', () => Bun.file('src/assets/elysia.svg'))
	.use(
		swagger({
			path: '/swagger',
			documentation: {
				info: {
					title: 'Elysia',
					description: 'API description',
					version: '0.1.0',
				},
				tags,
			},
		}),
	)
	.use(
		new Elysia({ name: userTag.name, prefix: '/users' })
			.model({
				usersResponse: t.Array(
					t.Object({
						id: t.Number(),
						email: t.String(),
						name: t.Unsafe({ ...t.String(), nullable: true }),
					}),
				),
				usersCreateBody: t.Object({
					email: t.String(),
					name: t.Optional(t.String()),
				}),
			})
			.get('/', () => db.select().from(users), {
				response: 'usersResponse',
				detail: {
					tags: [userTag.name],
				},
			})
			.post('/', ({ body }) => db.insert(users).values(body).returning(), {
				body: 'usersCreateBody',
				response: 'usersResponse',
				error: ({ error }) => {
					console.log(error)
					return error
				},
				detail: {
					tags: [userTag.name],
				},
			}),
	)
	.listen(4000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
