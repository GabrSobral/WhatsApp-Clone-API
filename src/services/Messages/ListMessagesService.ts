import { Messages } from "../../models/Message";

class ListMessagesService {
  async execute() {
    const messages = Messages.find().populate("users");

    return messages;
  }
}
export default new ListMessagesService();
