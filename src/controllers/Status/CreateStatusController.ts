import { Request, Response } from "express"
import CreateStatusService from "../../services/Status/CreateStatusService"

class CreateStatusController {
  async handle(request: Request, response: Response) {
    const { color, message } = request.body
    const my_id = request.user_id
    const file = request.file as Express.Multer.File

    const status = await CreateStatusService.execute({
      color,
      owner: my_id,
      file,
      message
    })

    return response.json(status)
  }
}
export default new CreateStatusController()