import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ email, name }: IRequest): void {
    const userAlreadyExists = this.usersRepository.findByEmail(email)
    if (userAlreadyExists) {
      throw new Error("Esse email já existe!")
    }
    this.usersRepository.create({ name, email })
  }
}

export { CreateUserUseCase };
