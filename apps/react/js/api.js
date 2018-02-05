
// Public api for benchmark
API.render = function(force){
	app.render(force);
	return API.RENDERCOUNT;
}

API.getModels = function(){
	return app.model;
}

API.addTodo = function(text) {
	app.model.addTodo(text);
}

// expose interface for renaming todo
API.renameTodoAtIndex = function(index,text) {
	var todo = app.model.todos[index];
	todo.title = text;
	return todo;
}

API.getTodoAtIndex = function (index){
	return app.model.todos[index];
};

API.insertTodoAtIndex = function (todo,index){
	var list = app.model.todos;
	var len  = list.length;
	var from = list.indexOf(todo);

	if (index >= len) {
		list.push(todo);
	} else {
		list.splice(index,0,todo);
	};
	return todo;
};

API.removeTodoAtIndex = function (index){
	var todo = API.getTodoAtIndex(index);
	app.model.todos.splice(index,1);
	return todo;
};

API.clearAllTodos = function() {
	app.model.clearAll();
}

API.toggleTodoAtIndex = function(index) {
	var todo = app.model.todos[index];
	todo.completed = !todo.completed;
}