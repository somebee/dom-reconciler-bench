
var titles = [
	"Buy milk",
	"Shave the Yak",
	"Big Rewrite",
	"Debug errors",
	"Procrastinate",
	"Argue about indentation",
	"Indent using spaces",
	"Handle exceptions",
	"Refactor",
	"Re-refactor",
	"Publish to NPM",
	"git reset head --hard",
	"Write tests",
	"Forget tests",
	"Convert to tabs",
	"Use camelCase",
	"Read twitter",
	"Buy Rubberduck",
	"Go back to Sublime",
	"Disbelieve benchmark",
	"Hold step button",
	"Listen to Heavyweight",
	"Commit changes",
	"Rebase with master",
	"Count to 10",
	"Mutate state"
]

API = {
	store: {
		counter: 0,
		todos: []
	},
	pool: [],
	nextId: 0,
	seed: 1,
	mutations: 0,
	name: document.location.href.match(/apps\/(\w+)/)[1],
	observer: null,

	// synchronous render
	// should bring the view in sync with models++
	// no matter how or where the models have changed
	forceUpdate: function(force){
		this.render();
		return;
	},

	render: function(){

	},

	todos: function(){
		return this.store.todos;
	},

	addTodo: function(title){
		var todo = {
			id: this.nextId++,
			title: title,
			completed: false
		};
		this.store.todos.push(todo);
	},

	removeTodo: function(todo){
		this.store.todos.splice(this.store.todos.indexOf(todo),1);
		return todo;
	},

	toggleTodo: function(todo){
		todo.completed = !todo.completed;
	},
	
	toggleAll: function(state){
		this.store.todos.forEach(function(todo){ todo.completed = !!state; });
	},

	clearAllTodos: function() {
		this.store.todos.length = 0;
	},

	clearCompleted: function(){
		var todos = this.store.todos;
		var i = todos.length;

		while(i > 0){
			if(todos[--i].completed){ todos.splice(i,1); }
		}

		return;
	},

	reset: function(count){
		this.mutations = 0;
		this.seed = 1;
		this.clearAllTodos();
		this.store.counter = 0;

		var i = 0;

		while(i++ < count){
			this.addTodo(titles[i % titles.length]);
		}

		this.forceUpdate();
	},

	startObserver: function(){
		this.mutations = 0;
		this.observer = new MutationObserver(function(muts){
			API.mutations = API.mutations + muts.length;
			if(this.debug) console.log(API.name,muts);
		});
		this.observer.observe(document.body,{
			attributes: true,
			childList: true,
			characterData: true,
			subtree: true
		});
	},

	stopObserver: function(){
		this.observer.takeRecords();
		this.observer.disconnect();
		this.observer = null;
	},

	// predictable random number from seed
	random: function(max,min) {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		return Math.round(min + (this.seed / 233280) * (max - min));
	},

	// step - do a single iteration
	step: function(){
		var step  = this.store.counter++;
		var todos = this.store.todos;
		var index = this.random(0,todos.length - 1);
		var todo  = todos[index];

		switch (step % 5) {

			case 0:
				this.pool.push(this.removeTodo(todo));
				break;

			case 1:
				todos.splice(index,0,this.pool.pop());
				break;

			case 2:
				todo.title = titles[(step + index) % titles.length];
				break;

			case 3:
				todo.completed = !todo.completed;
				break;

			case 4:
				// change nothing but the counter
				break;
		}

		// Force the application to render
		this.forceUpdate();
	},

	warmup: function(count){
		var i = 0;
		count = count || 1000;
		this.reset(12);
		while(++i < count){ this.step(); }
	},

	profile: function(times){
		// console.time(this.name);
		console.profile(this.name);
		var t0 = window.performance.now();
		var k = (times || 100000);
		for(var i = 0; i < k; i++){
			this.forceReconcile(true);
		}
		var t1 = window.performance.now();
		console.profileEnd(this.name);
		console.log(this.name,times,t1 - t0);
	}
}

API.forceReconcile = API.forceUpdate;
API.step = API.step.bind(API); // bind the stepper to api
