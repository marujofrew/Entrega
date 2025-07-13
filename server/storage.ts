import { users, type User, type InsertUser, type CpfConsulta, type InsertCpfConsulta } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCpfConsulta(cpf: string): Promise<CpfConsulta | undefined>;
  createCpfConsulta(consulta: InsertCpfConsulta): Promise<CpfConsulta>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cpfConsultas: Map<string, CpfConsulta>;
  currentUserId: number;
  currentCpfId: number;

  constructor() {
    this.users = new Map();
    this.cpfConsultas = new Map();
    this.currentUserId = 1;
    this.currentCpfId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCpfConsulta(cpf: string): Promise<CpfConsulta | undefined> {
    return this.cpfConsultas.get(cpf);
  }

  async createCpfConsulta(insertCpfConsulta: InsertCpfConsulta): Promise<CpfConsulta> {
    const id = this.currentCpfId++;
    const cpfConsulta: CpfConsulta = { 
      ...insertCpfConsulta, 
      id,
      consultadoEm: new Date()
    };
    this.cpfConsultas.set(insertCpfConsulta.cpf, cpfConsulta);
    return cpfConsulta;
  }
}

export const storage = new MemStorage();
