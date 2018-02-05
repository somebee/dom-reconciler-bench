/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

export class TodoItem extends React.Component {

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
};
