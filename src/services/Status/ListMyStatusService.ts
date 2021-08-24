import { Status } from "../../models/Status"

class ListMyStatusService {
  async execute(my_id: string){
    const my_status = await Status.find({ owner: my_id }).sort('validity')

    return my_status
  }
}
export default  new ListMyStatusService()