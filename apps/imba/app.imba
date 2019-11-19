
var api = API
var store = api:state
		
tag Todo < li
	def render
		<self .completed=(@data:completed)>
			<div.view>
				<label :dblclick='edit'> @data:title
				<input.toggle type='checkbox' checked=@data:completed :tap.prevent.toggle>
				<button.destroy :tap='drop'>
			<input@input.edit type='text' :keydown.enter.submit :keydown.esc.cancel>

	def edit
		flag('editing')
		@input.value = data:title
		setTimeout(&,10) do @input.focus

	def drop
		API.removeTodo(data)
		
	def toggle
		API.toggleTodo(data)

	def submit
		unflag('editing')
		if let title = @input.value.trim
			API.renameTodo(data,title)
		else
			drop

	def onfocusout e
		submit if hasFlag('editing')

	def cancel
		unflag('editing')
		@input.blur

tag App
	def addItem
		if data:newTodo
			API.addTodo(data:newTodo)
			data:newTodo = ""

	def clearCompleted
		API.clearCompleted
		
	def mount
		window.addEventListener('hashchange') do
			@route = window:location:hash

	def render
		var all    = API.todos
		var items  = all
		var done   = API.completed
		var active = API.remaining

		# for todo in all
		# 	todo:completed ? done.push(todo) : active.push(todo)

		if @route == '#/completed'
			items = done

		elif @route == '#/active'
			items = active

		<self>
			<header.header>
				<input[@data:newTodo].new-todo
					type='text'
					placeholder='What to do?'
					autofocus=true
					:keyup.enter='addItem'>
			
			<section.main>
				<ul.todo-list>
					for todo in items
						<Todo[todo]@{todo:id}>
			<footer.footer .hidden=(!all:length)>
				<span.todo-count>
					<strong> active:length
					<span> " item{active:length != 1 ? 's' : ''} left"
				<ul.filters>
					<li> <a .selected=(items == all)    href='#/'> "All"
					<li> <a .selected=(items == active) href='#/active'> "Active"
					<li> <a .selected=(items == done)   href='#/completed'> "Completed"
				<button.clear-completed .hidden=(!done:length) :tap='clearCompleted'> 'Clear completed'


# create an instance of the app (with id app)
var app = <App[store]#app.todoapp>

def api.render
	app.render

Imba.mount(app)
api.ready()

	


