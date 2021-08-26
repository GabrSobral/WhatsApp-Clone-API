import { IStatusSchema, Status } from "../../models/Status"
import { IUser } from "../../models/Users"

interface IStatusFormat {
  _id: String;
  file: String;
  color: String;
  message: String;
  createdAt: Date;
}

interface IStatusDataFormat {
  owner?: IUser;
  status?: IStatusFormat[]
}

class ListStatusToMeService {
  async execute(my_id: string){
    const currentDate = new Date()
    const usersThatHasStatus: IStatusDataFormat[] = []
    let currentUser = ''
    let currentIndex = 0
    const statusToMe = 
      await Status.find({ destinedTo : { $in: my_id } }).populate('owner')

      statusToMe.forEach(async (item: IStatusSchema) => {
        if(item.validity.getTime() < currentDate.getTime()) {
          await Status.findByIdAndDelete(item._id)
          return
      }

      const itemFormatted = {
        _id: item._id,
        file: item.file,
        color: item.color,
        message: item.message,
        createdAt: item.createdAt,
        viewed: item.viewedBy.includes(my_id)
      }
      
      if(String(item.owner._id) !== String(currentUser)) {
        currentUser = item.owner._id
        usersThatHasStatus.push({ owner: item.owner, status: [] })
        currentIndex = usersThatHasStatus.length - 1
      }

      usersThatHasStatus[currentIndex].status.push(itemFormatted)
    })
    return usersThatHasStatus
  } 
}
export default new ListStatusToMeService()