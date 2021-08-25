import { IStatusSchema, Status } from "../../models/Status"

class ListStatusToMeService {
  async execute(my_id: string){
    const currentDate = new Date()
    const statusToMe = await Status.find({ destinedTo : { $in: my_id } })
    const statusToMeUpdated = []

    statusToMe.forEach(async (item: IStatusSchema) => {
      if(item.validity.getTime() < currentDate.getTime()) {
        await Status.deleteOne(item._id)
        return
      }
      const itemFormatted = {
        _id: item._id,
        file: item.file,
        owner: item.owner,
        color: item.color,
        message: item.message
      } 
      statusToMeUpdated.push(itemFormatted)
    })
    return statusToMeUpdated
  } 
}
export default new ListStatusToMeService()