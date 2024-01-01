import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { Users } from '@/routes/users'
import { Swagger } from '@/lib/swagger'

const app = new Elysia()
	.use(cors())
	.get('/', () => Bun.file('src/assets/elysia.svg'))
	.use(Swagger)
	.use(Users)
	.listen(Number(Bun.env.SERVER_PORT))

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
