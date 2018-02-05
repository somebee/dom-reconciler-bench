extern Benchmark

var apps = [
	{name: 'imba@1.3.0', path: "imba/index.html", color: '#709CB2', libSize: '54kb'}
	{name: 'vue@2.5.13', path: "vue/index.html", color: '#4fc08d', libSize: '87kb'}
	{name: 'react@16.prod', path: "react/index.html", color: 'rgb(15, 203, 255)', libSize: '101kb'}
	{name: 'react@16.dev', path: "react/index.dev.html", color: 'rgb(15, 203, 255)'}
]

# custom iframe that waits for example to load and
# links up a reference to the api
tag AppFrame < iframe
	def setup
		dom:onload = do
			data:api = dom:contentWindow.API
			data:ready = yes

var state = {
	count: 6
	apps: apps
	current: null
	fastest: null
}

state:reset = do
	for app in apps
		app:api.reset(state:count)

state:step = do |times|
	for app in apps
		let i = 0
		while i++ < times
			app:api.step
	return

state:run = do
	var bm = state:bench = Benchmark.Suite.new("benchmark")

	for app,i in apps
		app:api.reset(state:count)
		bm.add(app:name, app:api:step)
		app:bm = bm[i]

	var nr = 0
	state:current = apps[nr]

	bm.on 'cycle' do |e|
		state:current = apps[++nr]
		Imba.commit

	bm.on 'complete' do
		state:fastest = bm.filter('fastest')[0]
		Imba.commit

	bm.run(async: true, queued: false)
	
tag Stepper < button
	def ontouchstart t
		@interval = setInterval(&,10) do
			state.step(1)
	
	def ontouchend t
		clearInterval(@interval)
		
	
Imba.mount <div[state].root ->
	<header#header>
		<input type="number" model.number='count'>
		<span> "todos "
		<button :tap='reset'> "reset"
		<Stepper> "step"
		<span.flex>
		<button :tap='run'> "Run benchmark"

	<section.apps> for app in apps
		<div[app].app css:color=app:color>
			<header> app:name + " " + String(app:bm or '') # ? String(app:bm) : @status
			<AppFrame[app] src="apps/{app:path}" css:minHeight='340px'>
			<footer>
				if app:bm and data:fastest
					<div.ops>
						<span.value> Math.round(app:bm:hz)
						<i> "ops/sec"
					if app:bm == data:fastest
						<div.small.compare> <span> "baseline"
					elif app:bm:hz < data:fastest:hz
						<div.small.compare.slower>
							<span.x.s> (data:fastest:hz / app:bm:hz).toFixed(2) + 'x'
							<i> "slower"
				<div.small.size>
					<i> 'library'
					<span.value> app:libSize
