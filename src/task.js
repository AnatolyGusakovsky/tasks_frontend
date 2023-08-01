class Task {
  id;
  text;
  is_completed;
  is_deleted;

  constructor(id, text, is_completed, is_deleted) {
    this.id = id;
    this.text = text;
    this.is_completed = is_completed;
    this.is_deleted = is_deleted;
  }

  complete() {
    this.is_completed = true;
  }

  incomplete() {
    this.is_completed = false;
  }

  edit_text(new_text) {
    this.text = new_text;
  }

  delete(){
    this.is_deleted = true
  }
}

export {Task};