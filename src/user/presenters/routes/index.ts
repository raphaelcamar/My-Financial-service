import { Express } from "express"
import { UserController } from "@user/presenters/controllers"
import { VerifyAccessTokenMiddleware } from "@core/presenters/middlewares"

const userController = new UserController()
const middlewareToken = new VerifyAccessTokenMiddleware()

const routes = (app: Express) => {
  app.post("/user/login", (req, res) => userController.login(req, res))
  app.post("/user/create", (req, res) => userController.create(req, res))
  app.put("/user/update", middlewareToken.verify, (req, res) => userController.update(req, res))
  app.post("/user/verify", middlewareToken.verify, (req, res) =>
    userController.verifyAccessToken(req, res)
  )
}

export default routes
