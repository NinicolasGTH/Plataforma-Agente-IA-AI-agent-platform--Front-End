# Agente IA - Frontend

Frontend em Next.js para autenticação, chat, planos e checkout.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Funcionalidades

- Login e cadastro
- Confirmação de e-mail
- Recuperação e redefinição de senha
- Chat autenticado
- Página de planos e redirecionamento para checkout Stripe
- Página de sucesso de pagamento com validação de status

## Executar localmente

1. Instalar dependências

```bash
npm install
```

2. Criar `.env` com base no `.env.example`

3. Subir app

```bash
npm run dev
```

Aplicação: `http://localhost:3000`

## Build de produção

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Use `.env.example` como referência.

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_API_URL_MOBILE`

Em produção, normalmente ambas podem apontar para a API pública.

## Deploy (Vercel)

1. Importar o repositório no Vercel
2. Definir variáveis de ambiente
3. Deploy
4. Confirmar que o frontend chama a URL pública do backend

## Checklist pós-deploy

1. Cadastro e login
2. Confirmação de e-mail
3. Recuperação/redefinição de senha
4. Chat com token válido
5. Fluxo de planos/checkout
6. Página de sucesso com status do plano

