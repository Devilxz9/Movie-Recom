This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Awwwards MCP

This project includes a workspace-scoped MCP configuration for
[awwwards-mcp](https://github.com/INSANE0777/Awwwards-mcp). In VS Code, enable
the `awwwards` server when prompted. VS Code will download the pinned
`awwwards-mcp@1.15.1` package through `npx` on first use.

The server provides design-inspiration search, site details, screenshots, and
design-brief tools. It runs outside the Next.js application and does not add
runtime dependencies to the web app.

## Genjutsu

The project also includes a project-scoped Genjutsu skill for art direction,
motion, and interface polish. Its canonical visual tokens and motion rules live
in [`MASTER.md`](./MASTER.md). Use the `paint` workflow for a full visual
identity or homepage redesign, and `cast` for a focused animation or interaction
refinement. The skill is locked in `skills-lock.json`; it is not a runtime
dependency of the Next.js app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
