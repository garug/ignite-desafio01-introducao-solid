import e from "express";
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, {
      name, email
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(u => u.id === receivedUser.id);
    this.users[userIndex].admin = !this.users[userIndex].admin;
    this.users[userIndex].updated_at = new Date();
    return this.users[userIndex];
  }

  list(): User[] {
    return [...this.users];
  }
}

export { UsersRepository };
