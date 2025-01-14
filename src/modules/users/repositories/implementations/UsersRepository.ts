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

  create({ name, email }: ICreateUserDTO): void {
    const user = new User()
    Object.assign(user, {
      name,
      email,
      userAdmin: false,
      created_at: new Date(),
      updated_at: new Date()
    })
    this.users.push(user)
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id)

    return user
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(user => user.email === email)
    return user
  }

  turnAdmin(receivedUser: User): void {
    const userAdm = receivedUser
    userAdm.userAdmin = true
    userAdm.updated_at = new Date()

  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
