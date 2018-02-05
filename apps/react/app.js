/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';

var TodoItem = __webpack_require__(1).TodoItem;
var TodoFooter = __webpack_require__(2).TodoFooter;

var ENTER_KEY = 13;

var api = API;
var store = API.store;

class TodoApp extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			nowShowing: app.ALL_TODOS,
			editing: null
		};
	}

	componentDidMount() {
		var setState = this.setState;
		var router = Router({
			'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
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
		this.props.api.toggleAll(checked);
	}

	toggle(todoToToggle) {
		todoToToggle.completed = !todoToToggle.completed;
		// this.props.api.toggle(todoToToggle);
	}

	destroy(todo) {
		this.props.api.removeTodo(todo);
		// this.props.model.destroy(todo);
	}

	edit(todo) {
		this.setState({editing: todo.id});
	}

	save(todoToSave, text) {
		todoToSave.title = text;
		// this.props.model.save(todoToSave, text);
		this.setState({editing: null});
	}

	cancel() {
		this.setState({editing: null});
	}

	clearCompleted() {
		this.props.api.clearCompleted();
	}

	render() {
		var footer;
		var main;
		var todos = this.props.api.todos();

		var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case app.ACTIVE_TODOS:
				return !todo.completed;
			case app.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this);

		var todoItems = shownTodos.map(function (todo,index) {
			return (
				React.createElement(TodoItem, {
					key: index, 
					todo: todo, 
					onToggle: this.toggle.bind(this, todo), 
					onDestroy: this.destroy.bind(this, todo), 
					onEdit: this.edit.bind(this, todo), 
					editing: this.state.editing === todo.id, 
					onSave: this.save.bind(this, todo), 
					onCancel: this.cancel}
				)
			);
		}, this);

		var activeTodoCount = todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);

		var completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				React.createElement(TodoFooter, {
					count: activeTodoCount, 
					completedCount: completedCount, 
					nowShowing: this.state.nowShowing, 
					onClearCompleted: this.clearCompleted}
				);
		}

		if (todos.length) {
			main = (
				React.createElement("section", {className: "main"}, 
					React.createElement("input", {
						className: "toggle-all", 
						type: "checkbox", 
						onChange: this.toggleAll, 
						checked: activeTodoCount === 0}
					), 
					React.createElement("ul", {className: "todo-list"}, 
						todoItems
					)
				)
			);
		}

		return (
			React.createElement("div", null, 
				React.createElement("header", {className: "header"}, 
					React.createElement("h1", null, "" + store.counter),
					React.createElement("input", {
						ref: (input => this.newField = input ),
						className: "new-todo", 
						placeholder: "What to do?", 
						onKeyDown: this.handleNewTodoKeyDown.bind(this), 
						autoFocus: true}
					)
				), 
				main, 
				footer
			)
		);
	}
};

function render() {
	
}

var component = ReactDOM.render(
	React.createElement(TodoApp, {api: API}),
	document.getElementsByClassName('todoapp')[0]
);

API.render = function(){ component.forceUpdate(); }
API.READY = true;
API.reset(6);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

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
		return (
			React.createElement("li", {className: classNames({
				completed: this.props.todo.completed,
				editing: this.props.editing
			})}, 
				React.createElement("div", {className: "view"}, 
					React.createElement("input", {
						className: "toggle", 
						type: "checkbox", 
						checked: this.props.todo.completed, 
						onChange: this.props.onToggle}
					), 
					React.createElement("label", {onDoubleClick: this.handleEdit}, 
						this.props.todo.title
					), 
					React.createElement("button", {className: "destroy", onClick: this.props.onDestroy})
				), 
				React.createElement("input", {
					ref: (input => this.textInput = input ), 
					className: "edit", 
					value: this.state.editText, 
					onBlur: this.handleSubmit, 
					onChange: this.handleChange, 
					onKeyDown: this.handleKeyDown}
				)
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["TodoItem"] = TodoItem;
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

var Utils = __webpack_require__(3).Utils;

class TodoFooter extends React.Component {

	render() {
		var activeTodoWord = Utils.pluralize(this.props.count, 'item');
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				React.createElement("button", {
					className: "clear-completed", 
					onClick: this.props.onClearCompleted}, 
					"Clear completed"
				)
			);
		}

		// React idiom for shortcutting to `classSet` since it'll be used often
		// var cx = React.addons.classSet;
		var nowShowing = this.props.nowShowing;
		return (
			React.createElement("footer", {className: "footer"}, 
				React.createElement("span", {className: "todo-count"}, 
					React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"
				), 
				React.createElement("ul", {className: "filters"}, 
					React.createElement("li", null, 
						React.createElement("a", {
							href: "#/", 
							className: classNames({selected: nowShowing === app.ALL_TODOS})}, 
								"All"
						)
					), 
					' ', 
					React.createElement("li", null, 
						React.createElement("a", {
							href: "#/active", 
							className: classNames({selected: nowShowing === app.ACTIVE_TODOS})}, 
								"Active"
						)
					), 
					' ', 
					React.createElement("li", null, 
						React.createElement("a", {
							href: "#/completed", 
							className: classNames({selected: nowShowing === app.COMPLETED_TODOS})}, 
								"Completed"
						)
					)
				), 
				clearButton
			)
		);
	}
}
/* harmony export (immutable) */ __webpack_exports__["TodoFooter"] = TodoFooter;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });

var Utils = {
	uuid: function () {
		/*jshint bitwise:false */
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
				.toString(16);
		}

		return uuid;
	},

	pluralize: function (count, word) {
		return count === 1 ? word : word + 's';
	},

	store: function (namespace, data) {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		var store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || [];
	},

	extend: function () {
		var newObj = {};
		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	}
};

/***/ })
/******/ ]);