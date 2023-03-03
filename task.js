export class Task {
  id;
  text;
  is_completed;

  constructor(id, text, is_completed) {
    this.id = id;
    this.text = text;
    this.is_completed = is_completed;
  }

}