
const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var api = API;
var store = API.store;

class TodoItem extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {editText: props.todo.title};
	  }

	handleSubmit(event) {
		var val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
	}

	handleEdit() {
		this.props.onEdit();
		this.setState({editText: this.props.todo.title});
	}

	handleKeyDown(event) {
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.todo.title});
			this.props.onCancel(event);
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	}

	handleChange(event) {
		this.setState({editText: event.target.value});
	}

	getInitialState() {
		return {editText: this.props.todo.title};
	}
	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	componentDidUpdate(prevProps) {
		if (!prevProps.editing && this.props.editing) {
			var node = this.textInput;
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	render() {
		var classes = classNames({
			completed: this.props.todo.completed,
			editing: this.props.editing
		});
		return (<li className={classes}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onChange={this.props.onToggle}
					/>
					<label onDoubleClick={this.handleEdit.bind(this)}>{this.props.todo.title}</label>
					<button className="destroy" onClick={this.props.onDestroy}></button>
				</div>
				<input
					ref={(input => this.textInput = input)}
					className={"edit"}
					value={this.state.editText}
					onBlur={this.handleSubmit.bind(this)}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
			</li>);
	}
};

class TodoFooter extends React.Component {

	render() {
		var activeTodoWord = this.props.count == 1 ? 'item' : 'items';
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					className="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed
				</button>
			);
		}

		var nowShowing = this.props.nowShowing;
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li><a href="#/" className={classNames({selected: nowShowing === ALL_TODOS})}>All</a></li>
					<li><a href="#/active" className={classNames({selected: nowShowing === ACTIVE_TODOS})}>Active</a></li>
					<li><a href="#/completed" className={classNames({selected: nowShowing === COMPLETED_TODOS})}>Completed</a></li>
				</ul>
				{clearButton}
			</footer>
		);
	}
}


class TodoApp extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			nowShowing: ALL_TODOS,
			editing: null
		};
	}

	componentDidMount() {
		var setState = this.setState;
		var router = Router({
			'/': setState.bind(this, {nowShowing: ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
		});
		router.init('/');
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.newField.value.trim();

		if (val) {
			this.props.api.addTodo(val);
			this.newField.value = '';
		}
	}

	toggleAll(event) {
		var checked = event.target.checked;
		API.toggleAll(checked);

	}

	toggle(todo) {
		API.toggleTodo(todo);
		this.forceUpdate();
	}

	destroy(todo) {
		API.removeTodo(todo);
		this.forceUpdate();
	}

	edit(todo) {
		this.setState({editing: todo.id});
	}

	save(todo, text) {
		API.renameTodo(todo,text);
		this.setState({editing: null});
	}

	cancel() {
		this.setState({editing: null});
	}

	clearCompleted() {
		API.clearCompleted();
		this.forceUpdate();
	}

	render() {
		var footer;
		var main;
		var api = this.props.api;
		var todos = api.todos();
		var active = api.remaining();
		var shownTodos = todos;

		if(this.state.nowShowing == ACTIVE_TODOS){
			shownTodos = active;
		} else if(this.state.nowShowing == COMPLETED_TODOS){
			shownTodos = api.completed();
		}

		// var shownTodos = todos.filter(function (todo) {
		// 	switch (this.state.nowShowing) {
		// 	case ACTIVE_TODOS:
		// 		return !todo.completed;
		// 	case COMPLETED_TODOS:
		// 		return todo.completed;
		// 	default:
		// 		return true;
		// 	}
		// }, this);

		var todoItems = shownTodos.map(function (todo,index) {
			return (<TodoItem
				key={todo.id}
				todo={todo}
				onToggle={this.toggle.bind(this, todo)}
				onDestroy={this.destroy.bind(this, todo)}
				onEdit={this.edit.bind(this, todo)}
				editing={this.state.editing === todo.id}
				onSave={this.save.bind(this, todo)}
				onCancel={this.cancel}
			/>);
		}, this);

		// var activeTodoCount = todos.reduce(function (accum, todo) {
		// 	return todo.completed ? accum : accum + 1;
		// }, 0);

		var completedCount = todos.length - active.length;

		if (todos.length) {
			footer = <TodoFooter
				count={active.length}
				completedCount={completedCount}
				nowShowing={this.state.nowShowing}
				onClearCompleted={this.clearCompleted.bind(this)}
			/>
		}

		if (todos.length) {
			main = (<section className="main">
				<ul className="todo-list">{todoItems}</ul>
			</section>);
		}

		return (
			<div>
				<header className="header">
					<input
						className={"new-todo"}
						placeholder={"What to do?"}
						onKeyDown={this.handleNewTodoKeyDown.bind(this)}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
};

var component = ReactDOM.render(
	React.createElement(TodoApp, {api: API}),
	document.getElementsByClassName('todoapp')[0]
);

API.render = function(){ component.forceUpdate(); }
API.ready(function(){ component.forceUpdate(); });
