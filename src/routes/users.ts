import { Elysia, t } from 'elysia'
import { db } from '@/db'
import { users } from '@/db/schema'
import { type TagObject } from '@/types'

export const userTag: TagObject = {
	name: 'Users',
	description: 'Users related endpoints',
}

export const Users = new Elysia({ name: userTag.name, prefix: '/users' })
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
	})
