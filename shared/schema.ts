import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cpfConsultas = pgTable("cpf_consultas", {
  id: serial("id").primaryKey(),
  cpf: text("cpf").notNull().unique(),
  nome: text("nome").notNull(),
  nomeMae: text("nome_mae"),
  dataNascimento: text("data_nascimento"),
  sexo: text("sexo"),
  consultadoEm: timestamp("consultado_em").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCpfConsultaSchema = createInsertSchema(cpfConsultas).pick({
  cpf: true,
  nome: true,
  nomeMae: true,
  dataNascimento: true,
  sexo: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCpfConsulta = z.infer<typeof insertCpfConsultaSchema>;
export type CpfConsulta = typeof cpfConsultas.$inferSelect;
