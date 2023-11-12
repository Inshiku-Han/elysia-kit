# Elysia with Bun runtime

## Commands

- Install dependencies

```bash
bun i
```

- Run dev server

```bash
bun run dev
```

- Generate SQL using drizzle-kit

```bash
bun run generate
```

- Migrate SQL to database

```bash
bun run migrate
```

- Build Docker image

```bash
docker build --pull -t elysia .
```

- Run Docker image

```bash
docker run -d -p 4000:4000 elysia
```

- Format code

```bash
bun run format
```

- Lint code

```bash
bun run lint
```
