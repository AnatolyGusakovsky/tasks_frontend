export class Task {
  id;
  text;
  is_completed;

  constructor(id, text, is_completed) {
    this.id = id;
    this.text = text;
    this.is_completed = is_completed;
  }

  complete(){
    this.is_completed = true;
  }

  incomplete(){
    this.is_completed = false;
  }

  edit_text(new_text){
    this.text = new_text;
  }
}