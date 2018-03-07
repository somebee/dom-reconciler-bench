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

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALL_TODOS = 'all';
var ACTIVE_TODOS = 'active';
var COMPLETED_TODOS = 'completed';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var api = API;
var store = API.store;

var TodoItem = function (_React$Component) {
	_inherits(TodoItem, _React$Component);

	function TodoItem(props) {
		_classCallCheck(this, TodoItem);

		var _this = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this, props));

		_this.state = { editText: props.todo.title };
		return _this;
	}

	_createClass(TodoItem, [{
		key: 'handleSubmit',
		value: function handleSubmit(event) {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({ editText: val });
			} else {
				this.props.onDestroy();
			}
		}
	}, {
		key: 'handleEdit',
		value: function handleEdit() {
			this.props.onEdit();
			this.setState({ editText: this.props.todo.title });
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({ editText: this.props.todo.title });
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(event) {
			this.setState({ editText: event.target.value });
		}
	}, {
		key: 'getInitialState',
		value: function getInitialState() {
			return { editText: this.props.todo.title };
		}
		/**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (!prevProps.editing && this.props.editing) {
				var node = this.textInput;
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var classes = classNames({
				completed: this.props.todo.completed,
				editing: this.props.editing
			});
			return React.createElement(
				'li',
				{ className: classes },
				React.createElement(
					'div',
					{ className: 'view' },
					React.createElement('input', {
						className: 'toggle',
						type: 'checkbox',
						checked: this.props.todo.completed,
						onChange: this.props.onToggle
					}),
					React.createElement(
						'label',
						{ onDoubleClick: this.handleEdit.bind(this) },
						this.props.todo.title
					),
					React.createElement('button', { className: 'destroy', onClick: this.props.onDestroy })
				),
				React.createElement('input', {
					ref: function ref(input) {
						return _this2.textInput = input;
					},
					className: "edit",
					value: this.state.editText,
					onBlur: this.handleSubmit.bind(this),
					onChange: this.handleChange.bind(this),
					onKeyDown: this.handleKeyDown.bind(this)
				})
			);
		}
	}]);

	return TodoItem;
}(React.Component);

;

var TodoFooter = function (_React$Component2) {
	_inherits(TodoFooter, _React$Component2);

	function TodoFooter() {
		_classCallCheck(this, TodoFooter);

		return _possibleConstructorReturn(this, (TodoFooter.__proto__ || Object.getPrototypeOf(TodoFooter)).apply(this, arguments));
	}

	_createClass(TodoFooter, [{
		key: 'render',
		value: function render() {
			var activeTodoWord = this.props.count == 1 ? 'item' : 'items';
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = React.createElement(
					'button',
					{
						className: 'clear-completed',
						onClick: this.props.onClearCompleted },
					'Clear completed'
				);
			}

			var nowShowing = this.props.nowShowing;
			return React.createElement(
				'footer',
				{ className: 'footer' },
				React.createElement(
					'span',
					{ className: 'todo-count' },
					React.createElement(
						'strong',
						null,
						this.props.count
					),
					' ',
					activeTodoWord,
					' left'
				),
				React.createElement(
					'ul',
					{ className: 'filters' },
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '#/', className: classNames({ selected: nowShowing === ALL_TODOS }) },
							'All'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '#/active', className: classNames({ selected: nowShowing === ACTIVE_TODOS }) },
							'Active'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							'a',
							{ href: '#/completed', className: classNames({ selected: nowShowing === COMPLETED_TODOS }) },
							'Completed'
						)
					)
				),
				clearButton
			);
		}
	}]);

	return TodoFooter;
}(React.Component);

var TodoApp = function (_React$Component3) {
	_inherits(TodoApp, _React$Component3);

	function TodoApp(props) {
		_classCallCheck(this, TodoApp);

		var _this4 = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

		_this4.state = {
			nowShowing: ALL_TODOS,
			editing: null
		};
		return _this4;
	}

	_createClass(TodoApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, { nowShowing: ALL_TODOS }),
				'/active': setState.bind(this, { nowShowing: ACTIVE_TODOS }),
				'/completed': setState.bind(this, { nowShowing: COMPLETED_TODOS })
			});
			router.init('/');
		}
	}, {
		key: 'handleNewTodoKeyDown',
		value: function handleNewTodoKeyDown(event) {
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
	}, {
		key: 'toggleAll',
		value: function toggleAll(event) {
			var checked = event.target.checked;
			API.toggleAll(checked);
		}
	}, {
		key: 'toggle',
		value: function toggle(todo) {
			API.toggleTodo(todo);
			this.forceUpdate();
		}
	}, {
		key: 'destroy',
		value: function destroy(todo) {
			API.removeTodo(todo);
			this.forceUpdate();
		}
	}, {
		key: 'edit',
		value: function edit(todo) {
			this.setState({ editing: todo.id });
		}
	}, {
		key: 'save',
		value: function save(todo, text) {
			API.renameTodo(todo, text);
			this.setState({ editing: null });
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			this.setState({ editing: null });
		}
	}, {
		key: 'clearCompleted',
		value: function clearCompleted() {
			API.clearCompleted();
			this.forceUpdate();
		}
	}, {
		key: 'render',
		value: function render() {
			var footer;
			var main;
			var api = this.props.api;
			var todos = api.todos();
			var active = api.remaining();
			var shownTodos = todos;

			if (this.state.nowShowing == ACTIVE_TODOS) {
				shownTodos = active;
			} else if (this.state.nowShowing == COMPLETED_TODOS) {
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

			var todoItems = shownTodos.map(function (todo, index) {
				return React.createElement(TodoItem, {
					key: todo.id,
					todo: todo,
					onToggle: this.toggle.bind(this, todo),
					onDestroy: this.destroy.bind(this, todo),
					onEdit: this.edit.bind(this, todo),
					editing: this.state.editing === todo.id,
					onSave: this.save.bind(this, todo),
					onCancel: this.cancel
				});
			}, this);

			// var activeTodoCount = todos.reduce(function (accum, todo) {
			// 	return todo.completed ? accum : accum + 1;
			// }, 0);

			var completedCount = todos.length - active.length;

			if (todos.length) {
				footer = React.createElement(TodoFooter, {
					count: active.length,
					completedCount: completedCount,
					nowShowing: this.state.nowShowing,
					onClearCompleted: this.clearCompleted.bind(this)
				});
			}

			if (todos.length) {
				main = React.createElement(
					'section',
					{ className: 'main' },
					React.createElement(
						'ul',
						{ className: 'todo-list' },
						todoItems
					)
				);
			}

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'header' },
					React.createElement(
						'h1',
						null,
						store.counter
					),
					React.createElement('input', {
						className: "new-todo",
						placeholder: "What to do?",
						onKeyDown: this.handleNewTodoKeyDown.bind(this),
						autoFocus: true
					})
				),
				main,
				footer
			);
		}
	}]);

	return TodoApp;
}(React.Component);

;

var component = ReactDOM.render(React.createElement(TodoApp, { api: API }), document.getElementsByClassName('todoapp')[0]);

API.render = function () {
	component.forceUpdate();
};
API.READY = true;
API.reset(6);

/***/ })
/******/ ]);