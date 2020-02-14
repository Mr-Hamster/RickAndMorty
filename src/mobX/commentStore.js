import { observable, action, decorate } from "mobx";

class Comment {
  value = '';
  comments = [];
  sizeBottomSheet = 'default';

  onChangeCommentText(text) {
    this.value = text;
  }

  changeSizeBottomSheet(size) {
    this.sizeBottomSheet = size;
  }

  sendComment() {
    this.comments.push(this.value);
    this.value = '';
    this.sizeBottomSheet = 'default';
    console.log(this.comments)
  }

  resetCommentStore() {
    this.value = '';
    this.comments = [];
    this.sizeBottomSheet = 'default';
  }
}

decorate(Comment, {
  value: observable,
  comments: observable,
  sizeBottomSheet: observable,

  onChangeCommentText: action,
  changeSizeBottomSheet: action,
  sendComment: action,
  resetCommentStore: action
})

const commentStore = new Comment();
export default commentStore;