import { UserRepositoryData, CryptoRepositoryData } from "@user/infra/repositories"
import { Request, Response } from "@main/handlers"
import {
  CreateUser,
  VerifyAccessCredentials,
  CreateJWToken,
  VerifyAccessToken,
} from "@user/data/use-cases"
import { User } from "@user/domain/entities"
import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/presenters/utils"

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const useCase = new CreateUser(req.body, userRepositoryData, cryptoRepositoryData)
      const user = await useCase.execute()

      const result = await this.tokenCreate(user, cryptoRepositoryData, userRepositoryData)

      delete result.password

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (err) {
      res
        .status(err?.status || ErrorStatus.INTERNAL)
        .json({ message: err?.message || "Algo deu errado" })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const useCase = new VerifyAccessCredentials(
        email,
        password,
        userRepositoryData,
        cryptoRepositoryData
      )
      const user = await useCase.execute()
      const result = await this.tokenCreate(user, cryptoRepositoryData, userRepositoryData)

      delete result.password

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async verifyAccessToken(req: Request, res: Response) {
    try {
      const { token } = req.body || {}

      const userRepositoryData = new UserRepositoryData()
      const cryptoRepository = new CryptoRepositoryData()
      const useCase = new VerifyAccessToken(token, userRepositoryData)

      const user = await useCase.execute()

      const result = await this.tokenCreate(user, cryptoRepository, userRepositoryData)

      delete result.password

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  private async tokenCreate(
    user: User,
    cryptoRepositoryData: CryptoRepositoryData,
    userRepositoryData: UserRepositoryData
  ): Promise<User> {
    const createToken = new CreateJWToken(user, cryptoRepositoryData)

    const token = await createToken.execute()
    const result = await userRepositoryData.updateJWToken(user, token)

    return result
  }
}
