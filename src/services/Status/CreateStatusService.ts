import { Room } from "../../models/Room";
import { Status } from "../../models/Status";

interface ICreateStatusService {
  file?: Express.Multer.File;
  message?: String;
  owner: String;
  color: String
}

class CreateStatusService {
  async execute({ color, owner, file, message }: ICreateStatusService){
    const myRooms = await Room.find({ users: {  $in: owner } })
    const destinedTo = [] as String[]
    
    myRooms.forEach(item => 
      item.users.forEach(user => 
        String(user) !== String(owner) && destinedTo.push(user)))
    
    const status = await Status.create({ color, owner, file: file.path, message, destinedTo })
    return status;
  }
}
export default new CreateStatusService()