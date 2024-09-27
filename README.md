# EDUZZ MARKET #

## Rodar com Docker ##

Para subir a aplicação utilize `docker compose up -d`.

Antes de executar a aplicação execute as migrations para geração das tabelas `make prisma-migrate` ou `npx prisma migrate dev`.

A aplicação irá subir por default no porta **3000**.

## Rodar local ##

Para subir a aplicação utilize `npm i`.

Será necessário subir o banco de dados, para isso pode utilizar `docker compose up -d`, lembrando que isso também subirá uma aplicação, caso deseje subir apenas o banco comente no `docker-compose.yml` a parte responsável por subir a aplicação.

Com o banco de pé execute `npx prisma migrate dev` para rodar as migrations.

Após isso execute `npx prisma generate` para gerar o prisma client baseado no prisma schema.

Agora é possivel rodar a aplicação `npm run dev`.

A aplicação irá subir por default no porta **3000**, isso pode ser alterado alterando a váriavel de ambiente `APP_PORT` no **.env**.

## Crons ##

Existem 2 crons rodando na aplicação, são eles:

- collect-btc-price (Utilizado para coletar o preco do bitcoin de 10 em 10 minutos).
    - Caso deseje alterar a recorrencia acesse o arquivo `src/main/crons/jobs/collect-btc-price.job.ts` e altere a cron expression para a recorrência desejada.
- purge-old-bitcoin-history (Utilizado para expurgar o histórico de preços com mais de 90 dias, é executado todo dia às 00:00).
    - Caso deseje alterar a recorrencia acesse o arquivo `src/main/crons/jobs/purge-old-bitcoin-history.job.ts` e altere a cron expression para a recorrência desejada.
    - Caso queira expurgar dados mais novos você pode alterar a variável de ambiente `PURGE_BITCOIN_HISTORY_DAY`.

### Observações ###

- A aplicação foi toda desenvolvida utilizando o node **v20.17.0**.
- Caso deseje usar os comando do makefile instale o **pnpm**.
- Fiz o commit com **.env** para ser mais fácil a execução e por não conter nenhuma chave publica, mas a abordagem correta seria não comitar.