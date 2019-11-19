
var appendScript = function(src,cache){
	if(cache) src = src + '?' + Math.random();
	document.write('<script src="' + src + '"></script>')
}

appendScript("../../shared/lodash.js")
appendScript("../../shared/benchmark.js")

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

var filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed )
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed )
  }
}

var state = {
	todos: []
}

var stats = {
	mutations: 0
}

API = {
	store: state,
	state: state,
	pool: [],
	cache: {},
	nextId: 0,
	seed: 1,
	_count: 50,
	steps: 0,
	name: document.location.href.match(/apps\/(\w+)/)[1],
	observer: null,
	stats: stats,
	get count(){
		return this._count;
	},

	set count(value){
		if(this._count != value){
			this._count = value;
			this.reset();
		}
	},

	// synchronous render
	// should bring the view in sync with models++
	// no matter how or where the models have changed
	forceUpdate(force){
		this.render();
		return;
	},

	render(){

	},

	todos(){
		return this.state.todos;
	},

	remaining(){
		return this.cache.active = this.cache.active || filters.active(this.todos());
	},

	completed(){
		return this.cache.completed = this.cache.completed || filters.completed(this.todos());
	},

	dirty(){
		this.cache = {};
		return this;
	},

	addTodo(title){
		var todo = {
			id: this.nextId++,
			title: title,
			completed: false
		};
		this.state.todos.push(todo);
	},

	renameTodo(todo,title) {
		todo.title = title;
		return todo;
	},

	removeTodo(todo){
		this.state.todos.splice(this.state.todos.indexOf(todo),1);
		this.dirty();
		return todo;
	},

	toggleTodo(todo){
		todo.completed = !todo.completed;
		this.dirty();
	},
	
	toggleAll(state){
		this.state.todos.forEach(function(todo){ todo.completed = !!state; });
		this.dirty();
	},

	clearAllTodos() {
		this.state.todos.length = 0;
		this.dirty();
	},

	clearCompleted(){
		var todos = this.state.todos;
		var i = todos.length;

		while(i > 0){
			if(todos[--i].completed){ todos.splice(i,1); }
		}
		this.dirty();
		return;
	},

	reset(){
		stats.mutations = 0;
		this.steps = 0;
		this.seed = 1;
		this.clearAllTodos();

		var i = 0;

		while(i++ < this.count){
			this.addTodo(titles[i % titles.length]);
		}

		this.forceUpdate();
	},

	startObserver(){

		stats.mutations = 0;
		this.observer = new MutationObserver(function(muts){
			stats.mutations = stats.mutations + muts.length;
			if(this.debug) console.log(API.name,muts);
		});
		this.observer.observe(document.body,{
			attributes: true,
			childList: true,
			characterData: true,
			subtree: true
		});
	},

	stopObserver(){
		this.observer.takeRecords();
		this.observer.disconnect();
		this.observer = null;
	},

	checkImplementation() {
		var todos = this.state.todos;
		var prevTitle = todos[0].title;
		var newTitle = "This is an item " + Math.random();
		todos[0].title = newTitle;
		this.forceReconcile();
		var after = document.body.innerHTML;
		todos[0].title = prevTitle;
		this.forceReconcile();
		if(after.indexOf(newTitle) == -1){
			console.warn("Implementation is not synchronous!");
			return false;
		}
		return true;
	},

	// predictable random number from seed
	random (max,min) {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		return Math.round(min + (this.seed / 233280) * (max - min));
	},

	// step - do a single iteration
	step () {
		var step  = this.steps++;
		var todos = this.state.todos;
		var index = this.random(0,Math.min(todos.length - 1,20));
		var todo  = todos[index];

		switch (step % 5) {

			case 0:
				this.pool.push(this.removeTodo(todo));
				this.forceUpdate();
				break;

			case 1:
				todos.splice(index,0,this.pool.pop());
				this.dirty();
				this.forceUpdate();
				break;

			case 2:
				this.renameTodo(todo, titles[(step + index) % titles.length]);
				// todo.title = titles[(step + index) % titles.length];
				this.forceUpdate();
				break;

			case 3:
				this.toggleTodo(todo);
				// todo.completed = !todo.completed;
				this.forceUpdate();
				break;

			case 4:
				// use separate method for vue that actually forces update
				// without relying on observable (since counter is not observed)
				this.forceReconcile();
				break;
		}
	},

	warmup(count) {
		var i = 0;
		count = count || 1000;
		this.reset();
		while(++i < count){ this.step(); }
	},

	profile(times,step) {
		// console.time(this.name);
		if(step){
			this.reset(this.count || 6);
		}

		console.profile(this.name);
		var t0 = window.performance.now();
		var k = (times || 100000);
		for(var i = 0; i < k; i++){
			step ? this.step() : this.forceReconcile(true);
		}
		var t1 = window.performance.now();
		console.profileEnd(this.name);
		console.log(this.name,times,t1 - t0);
	},
	benchmark(callback){
		stats.state = 'running';
		callback && callback('start');
		this.reset();
		var api = this;

		api.post('start');

		var bench = new Benchmark({
			name: this.name,
			fn: this.step.bind(this),
			maxTime: 3,

			onReset(){
				// console.log('should reset');
			},

			onCycle(){
				// console.log('on cycle',api.steps,bench.stats);
				callback && callback('cycle',bench.stats);
			},

			onComplete(){
				console.log('did run',bench,bench.stats,this);
				stats.hz = this.hz;
				stats.mean = this.stats.mean;
				stats.moe = this.stats.moe;
				stats.rme = this.stats.rme;
				stats.variance = this.stats.variance;
				stats.state = 'done';
				callback && callback('complete',stats);
				api.post('done');
			}
		});
		// bench.on('complete',function() {
		// 	console.log('did run',bm,bm.stats);
		// });
		callback && callback('start',bench);
		bench.run({async: true,queued: false});
	},

	ready() {
		this.reset();
		stats.state = 'ready';
		this.post('ready');
	},

	post(msg){
		console.log(msg);
		if(window.parent){
			window.postMessage(msg,'*')
		}
	}
}

API.forceReconcile = API.forceUpdate;
API.step = API.step.bind(API); // bind the stepper to api

window.addEventListener('load', function (e) {
	console.log('readyz');
});

