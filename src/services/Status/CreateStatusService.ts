import { Room } from "../../models/Room";
import { Status } from "../../models/Status";
import handleControlFileOnCloud from "./handleControlFileOnCloud";

interface ICreateStatusService {
  file?: Express.Multer.File;
  message?: String;
  owner: String;
  color: String;
}

class CreateStatusService {
  async execute({ color, owner, file, message }: ICreateStatusService){
    const myRooms = await Room.find({ users: {  $in: owner } })
    const destinedTo = [] as String[]
    
    const file_data = await handleControlFileOnCloud.upload(file)
    
    myRooms.forEach(item => 
      item.users.forEach(user => 
        String(user) !== String(owner) && destinedTo.push(user)))
    
    const statusData = {
      color, 
      owner, 
      message, 
      destinedTo,
      file: undefined,
      format: undefined,
      public_id: undefined
    }
    if(file){
      statusData.file = file.path
      statusData.format = file_data.format
      statusData.public_id = file_data.public_id
    }
    
    const status = await Status.create(statusData)

    delete status.public_id
    return status;
  }
}
export default new CreateStatusService()