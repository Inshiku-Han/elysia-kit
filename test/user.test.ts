import { edenTreaty } from '@elysiajs/eden'
import { expect, it } from 'bun:test'
import Elysia from 'elysia'
import { Users } from '../src/routes/users'

const PORT = Number(Bun.env.SERVER_PORT)

const app = new Elysia().use(Users).listen(PORT)

const api = edenTreaty<typeof app>(`http://localhost:${PORT}`)

it('GET /users', async () => {
	const res = await api.users[''].get()
	expect(res.status).toBe(200)
})
