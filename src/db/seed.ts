import { db } from '.';
import { users } from './schema';

await db.insert(users).values([
	{
		email: 'admin@example.com',
		name: 'Admin',
	},
]);
