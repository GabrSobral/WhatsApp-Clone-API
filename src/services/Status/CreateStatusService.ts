import { IStatusSchema, Status } from "../../models/Status";

interface ICreateStatusService {
  file?: String;
  message?: String;
  owner: String;
  color: String
}

class CreateStatusService {
  async execute({ color, owner, file, message }: ICreateStatusService){
    const status = await Status.create({ color, owner, file, message })

    return status;
  }
}
export default new CreateStatusService()