/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

var Utils = require('./utils').Utils;

export class TodoFooter extends React.Component {

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
