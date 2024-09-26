docker-up:
	docker-compose up -d

prisma-studio:
	pnpm dlx prisma studio

prisma-generate:
	pnpm dlx prisma generate

prisma-migrate:
	pnpm dlx prisma migrate dev