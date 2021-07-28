import { Messages } from "../../models/Message";
import { IRoom, Room } from "../../models/Room";
import { IUser } from "../../models/Users";

interface ICreateMessageService {
  message: string;
  assignedTo: IRoom["_id"];
  user_id: IUser["_id"];
}

class CreateMessageService {
  async execute({ message, assignedTo, user_id }: ICreateMessageService) {
    const newMessage = await Messages.create({
      message,
      assignedTo,
      user: user_id,
    });

    const room = await Room.findById(assignedTo);
    await room.messages.push(newMessage);

    await room.save();

    return newMessage;
  }
}
export default new CreateMessageService();
