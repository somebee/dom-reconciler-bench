

extern Benchmark

var packages = require:context('./', true, /apps\/[\w\-]+\/index\.html$/)
var results = require:context('./', true, /results\/[\w\-]+\.json$/)

var colors =
	react: 'rgb(15, 203, 255)'
	imba2: '#709CB2'
	imba: '#709CB2'
	vue: '#4fc08d'

var randomColors = [
	'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
]

var apps = []

for src in packages.keys
	# if let m = src.match(/apps\/([\w-\.]*)\/([^\.\/]*)\.json/)
	if let m = src.match(/apps\/([\w-\.]*)\//)
		let name = m[1]
		# let name = m[2]
		let package = packages(src)
		console.log(package)
		let app = {
			name: name
			path: "{name}/index.html"
			color: randomColors.shift
			stats: {state: 'loading'}
			result: {}
			api: {}
		}
		for own k,v of colors
			if name.indexOf(k) >= 0
				break app:color = v
		apps.push(app)
		apps[name] = app

for src in results.keys
	if let m = src.match(/results\/([\w-\.]*)\.json/)
		apps[m[1]] && apps[m[1]]:result = results(src)

console.log apps
# for app in apps
# 	window[app:name.toUpperCase.split('@').shift] = app

# custom iframe that waits for example to load and
# links up a reference to the api


var state = {
	count: 6
	current: null
	fastest: null
	ins: 1
	rem: 1
}

state:reset = do
	for app in apps
		app:api.reset(state:count,state)

state:step = do |times|
	for app in apps
		let i = 0
		while i++ < times
			app:api.step
	return

state:run = do
	state:fastest = null
	var bm = state:bench = Benchmark.Suite.new("benchmark")

	for app,i in apps
		app:api.reset(state:count,state)
		bm.add(app:name, app:api:step)
		app:bm = bm[i]

	var nr = 0
	state:current = apps[nr]

	bm.on 'cycle' do |e|
		state:current = apps[++nr]
		Imba.commit

	bm.on 'complete' do
		state:fastest = bm.filter('fastest')[0]
		state:bench = null
		Imba.commit

	bm.run(async: true, queued: false)
	
tag Stepper < button
	def ontouchstart t
		app:api.startObserver for app in apps
		@timeout = setTimeout(&,200) do
			@interval = setInterval(&,1000 / 60) do
				state.step(1)
				app:el.render for app in apps

		state.step(1)
		app:el.render for app in apps
		self
	
	def ontouchend t
		clearTimeout(@timeout)
		clearInterval(@interval)
		app:api.stopObserver for app in apps
		Imba.commit
		
	def ontouchcancel t
		ontouchend(t)


tag AppFrame < iframe
	def setup
		dom:onload = do
			data:window = dom:contentWindow
			data:api = data:window.API
			data:stats = data:api:stats
			data:ready = yes
			data:window:onmessage = do |e|
				console.log('message from window',e);
				parent.render

tag Framework
	def setup
		data:el = self

	def app
		data

	def stats
		data:stats

	def api
		data:api

	def render
		<self.app css:color=data:color>
			<header>
				String(data:bm or data:name)
				<span.aps> String(stats:hz)
				<span.steps> String(api:steps)
				<span.mutations> stats:mutations

			<AppFrame[app] src="apps/{app:path}" css:minHeight='340px' name=app:name>

var fields = [{
	key: 'hz'
	fmt: 'ops'
	name: "render"
	conv: do |v| Math.round(v) + " ops/s"
	hib: yes
},{
	key: 'memoryAfterRun'
	name: "memory"
	fmt: 'MB'
	conv: do |v| (v / 1000 / 1000).toFixed(2) + "MB"
},{
	key: 'size'
	fmt: 'kb'
	conv: do |v| Math.round(v / 1000) + "kb"
},{
	key: 'gz'
	name: 'gzipped'
	fmt: 'kb'
	conv: do |v| Math.round(v / 1000) + "kb"
}]

tag tdstat < td
	prop app
	prop field
	prop reference

	def val
		data:stats[field:key] or data:result[field:key] or 0

	def formatted
		let key = field:key
		let fmt = field:fmt
		let val = self.val
		let ref = reference && (reference:stats[key] or reference:result[key]) or val

		let str = val.toFixed(3)
		let res = {value: field.conv(val)}
		res:diff = (val / ref)
		return res

	def render
		let out = formatted
		<self.num>
			<span .{field:fmt}> out:value
			if out:diff < 1
				<span.diff.less> (1 / out:diff).toFixed(2)
			elif out:diff > 1
				<span.diff.more> out:diff.toFixed(2)

tag Results
	prop reference

	def render
		<self>
			<table>
				<thead> <tr>
					<th> "Framework"
					for field in fields
						<th.stat> field:name or field:key

				<tbody> for app in apps
					<tr .{app:stats:state} css:color=app:color :click.setReference(app)>
						<td.stat> <span> app:name
						for field in fields
							<tdstat[app] field=field reference=reference>


tag Main
	
	prop count watch: yes

	def run
		var runs = apps.slice(0)

		var run = do
			render
			if var app = runs.shift
				var cb = do |event|
					app:el.render
					if event == 'complete'
						run()

				unless app:api.checkImplementation
					console.warn app:name,"not reconciling synchronously"
					app:stats:state = 'error'
					return run()

				app:api.benchmark(cb)
		return run()
	
	def profile times = 100000
		for app in apps
			app:api.profile(times)
		self
	
	def step times
		for app in apps
			app:api.step
		self
	
	def reset
		for app in apps
			app:api.reset()
		self

	def countDidSet count
		for app in apps
			app:api:count = count

	def render
		<self>
			<header#header>
				<input[count] type="range" min=10 max=1000 step=10>
				<span.flex> "todos"
				<button :tap.reset> "reset"
				<Stepper> "step"
				<button.primary :tap.run disabled=(state:bench)> "Run benchmark"
			<section.apps> for app in apps
				<Framework[app]>
			<section.results>
				<Results>
	
Imba.mount MAIN = <Main>
