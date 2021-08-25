import { IStatusSchema, Status } from "../../models/Status"

class ListStatusToMeService {
  async execute(my_id: string){
    const currentDate = new Date()
    const statusToMe = await Status.find({ destinedTo : { $in: my_id } })
    const statusToMeUpdated = []

    console.log("status para mim ",statusToMe)

    statusToMe.forEach(async (item: IStatusSchema) => {
      console.log('item date:', item.validity.getTime() )
      console.log('current date:', currentDate.getTime())

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
    console.log(statusToMeUpdated)
    return statusToMeUpdated
  } 
}
export default new ListStatusToMeService()