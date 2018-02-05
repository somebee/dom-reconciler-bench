
var api = API

var store = api:store =
	counter: 0
	todos: []
	allDone: no
	newTodo: ""
		
tag Todo < li
	
	def render
		# var todo = @data
		<self .completed=(@data:completed) >
			<div.view>
				<label :dblclick='edit'> "{@data:title}"
				<input.toggle type='checkbox' model='completed'>
				<button.destroy :tap='drop'>
			<input@input.edit type='text' :keydown.enter='submit' :keydown.esc='cancel'>

	def edit
		flag('editing')
		@input.value = data:title
		setTimeout(&,10) do @input.focus

	def drop
		api.removeTodo(data)

	def submit
		unflag('editing')
		(data:title = @input.value.trim) || drop

	def onfocusout e
		submit if hasFlag('editing')

	def cancel
		unflag('editing')
		@input.blur

tag App

	def hash
		@hash

	def addItem
		if data:newTodo
			api.addTodo(data:newTodo)
			data:newTodo = ""

	def toggleAll
		api.toggleAll(data:allDone = !data:allDone)

	# remove all completed todos
	def clearCompleted
		api.clearCompleted
		data:allDone = no

	def render
		@hash = '' # document:location:hash
		var all    = data:todos
		var items  = all
		var done   = []
		var active = []

		for todo in all
			todo:completed ? done.push(todo) : active.push(todo)

		if @hash == '#/completed'
			items = done

		elif @hash == '#/active'
			items = active

		<self>
			<header.header>
				<h1> "{@data:counter}"
				<input.new-todo
					type='text'
					placeholder='What to do?'
					autofocus=true
					model.trim='newTodo'
					:keyup.enter='addItem'>

			if all:length > 0
				<section.main>
					<input.toggle-all :tap='toggleAll' type='checkbox' checked=@data:allDone>
					<ul.todo-list> for todo in items
						<Todo[todo]>

			if all:length > 0
				<footer.footer>
					<span.todo-count>
						<strong> "{active:length} "
						<span> active:length == 1 ? 'item left' : 'items left'
					<ul.filters>
						<li> <a .selected=(items == all)    href='#/'> 'All'
						<li> <a .selected=(items == active) href='#/active'> 'Active'
						<li> <a .selected=(items == done)   href='#/completed'> 'Completed'
					if done:length > 0
						<button.clear-completed :tap='clearCompleted'> 'Clear completed'


# create an instance of the app (with id app)
var app = <App[store]#app.todoapp>

def api.render
	app.render

Imba.mount(app)

	


