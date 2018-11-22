import Component, { tracked } from '@glimmer/component';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';

const api = typeof API !== 'undefined' ? API : { store: {}};
const store = api.store;

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const IS_DEV = window.location.port === '4200';

export default class Glimmer extends Component {
  public counter = 2;

  @tracked
  public editedTodo = null;

  @tracked
  public todos = [];

  @tracked
  public newField = '';

  @tracked
  public filterIteration = 1;

  @tracked
  public get filteredTodos() {
    const filterType = this.nowShowing;
    if (filterType === ALL_TODOS) {
      return this.todos;
    } else {
      return this.todos.filter((todo) => {
        return filterType === ACTIVE_TODOS ? !todo.completed : todo.completed;
      });
    }
  }

  @tracked
  public get remaining() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  @tracked
  get nowShowing() {
    return (
      (this.filterIteration && window.location.hash.replace('#/', '')) || ALL_TODOS
    );
  }

  public onEdit(todo) {
    this.editedTodo = todo;
  }

  public onRemove(todo) {
    this.todos = this.todos.filter((item) => item !== todo);
  }

  public updateTodo(oldTodo, newTodo) {
    this.todos = this.todos.map((item) => {
      if (item === oldTodo) {
        return newTodo;
      } else {
        return item;
      }
    });
  }

  public maybeFinishEdit(todo, event) {
    if (event.keyCode === ENTER_KEY || event.type === 'blur') {
      const newTodo = { ...todo, ...{ title: event.target.value } };
      this.updateTodo(todo, newTodo);
      this.editedTodo = null;
    } else if (event.keyCode === ESCAPE_KEY) {
      this.editedTodo = null;
    }
  }

  public onCheck(todo, event) {
    const newTodo = { ...todo, ...{ completed: event.target.checked } };
    this.updateTodo(todo, newTodo);
  }

  public handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = event.target.value.trim();

    if (val) {
      this.newField = '';
      this.todos = this.todos.concat({
        completed: false,
        id: Date.now(),
        title: val
      });
    }
  }

  public onClearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  public onChangeFilter() {
    this.filterIteration = this.filterIteration + 1;
  }
}
