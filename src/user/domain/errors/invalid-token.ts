import { ErrorStatus } from "@core/domain/entities"

export class InvalidToken extends Error {
  public status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Token expirado. Faça o login novamente")
  }
}
