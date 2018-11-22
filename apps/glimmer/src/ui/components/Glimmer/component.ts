import Component, { tracked } from "@glimmer/component";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class Glimmer extends Component {
  public counter = 2;

  @tracked
  public todos = [];

  @tracked
  public get filteredTodos() {
      return this.todos;
  }

  @tracked
  public newField = '';

  public handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = event.target.value.trim();

    if (val) {
        this.newField = '';
        this.todos = this.todos.concat({
            id: Date.now(),
            completed: false,
            title: val
        });
    }
  }

  public toggleAll(event) {
    const checked = event.target.checked;
    // API.toggleAll(checked);
  }

  public toggle(todo) {
    // API.toggleTodo(todo);
    // this.forceUpdate();
  }

  public destroy(todo) {
    // API.removeTodo(todo);
    // this.forceUpdate();
  }

  public edit(todo) {
    this.setState({ editing: todo.id });
  }

  public save(todo, text) {
    // API.renameTodo(todo, text);
    // this.setState({ editing: null });
  }

  public cancel() {
    // this.setState({ editing: null });
  }

  public clearCompleted() {
    // API.clearCompleted();
    // this.forceUpdate();
  }
}
