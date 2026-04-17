import "dotenv/config";
import { defineConfig } from "prisma/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
    // directUrl: process.env["DIRECT_URL"]!,
  },
  // adapter: () => {
  //   const pool = new Pool({
  //     connectionString: process.env.DIRECT_URL!,
  //   });
  //   return new PrismaPg(pool);
  // },
});