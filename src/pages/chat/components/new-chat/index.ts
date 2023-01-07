import {Component} from "../../../../utils/Component";
import template from "./new-chat.hbs";
import {BaseForm} from "../../../../components/base-form";
import ChatsController from "../../../../controllers/ChatsController";
import {CreateChatData} from "../../../../api/data/Chats";

export class NewChat extends Component {
  init() {
    this.children.form = new BaseForm({
      action: (data: object) => this.onChatAdd(data),
      submitText: 'Добавить',
      inputs: [
        {
          type: 'text',
          placeholder: 'Название чата',
          name: 'title',
          events: {},
          errors: [],
        },
      ],
    })
  }


  protected addCustomEvents() {
    this.showModal();
  }

  showModal() {
    let el = this.getContent()?.querySelector('#new-chat-add') as HTMLElement;
    if (el) {
      el.onclick = () => {
        document.getElementById('new-chat-modal')?.classList.toggle('hide');
      };
    }
  }

  hideModal() {
    document.getElementById('new-chat-modal')?.classList.add('hide');
  }

  onChatAdd(data: object) {
    ChatsController.create(data as CreateChatData)
    this.hideModal()
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props, children: this.children });
  }
}
