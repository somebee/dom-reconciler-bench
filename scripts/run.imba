var puppeteer = require "puppeteer"
var path = require "path"
var fs = require "fs"
var gz = require 'node-gzip'

var getMetrics = do |page,key|
	var gc
	await page.evaluate(do gc())
	var metrics = await page.metrics
	return key ? metrics[key] : metrics


def run
	var dirs = fs.readdirSync(path.resolve(__dirname,"..","apps"), withFileTypes: true)
	var apps = dirs.filter(|dir| dir.isDirectory() ).map(|v| v:name)
	# var apps = ['imba','imba2','react','vue']
	var browser = await puppeteer.launch(args: [ '--js-flags=--expose-gc' ])

	for app in apps
		var stats = await Promise.new do |resolve|
			var page = await browser.newPage
			var url = path.resolve(__dirname,"..","apps",app,"index.html")
			var metrics

			var cb = do |c|
				console.log('callback called!!')

			var stats = {
				name: app
				size: 0
				gz: 0
				files: []
			}

			var files = []

			page.on('response') do |response|
				var url = response:_url
				if url.match(/\.js$/) && url.indexOf('/shared/') == -1
					var buf = await response.buffer()
					console.log "response",url,buf:length
					var file = {
						src: url.split('/apps/')[1]
						size: buf:length
						body: buf
					}
					files.push(file)

			page.on 'console' do |msg|
				switch msg:_text
					when 'ready'
						stats:memoryBeforeRun = await getMetrics(page,'JSHeapUsedSize')
						page.evaluate(do API.benchmark())
					
					when 'done'
						stats:memoryAfterRun = await getMetrics(page,'JSHeapUsedSize')
						var metrics = await page.metrics
						var benchmark = await page.evaluate(do API:stats)
						stats:benchmark = benchmark
						stats:metrics = metrics
						stats:hz = benchmark:hz
						for file in files
							stats:size += file:size
							let compressed = await gz.gzip(file:body)
							file:gz = (compressed:length || compressed:size)
							stats:gz += file:gz
							delete file:body
							stats:files.push(file)

						resolve(stats)

			page.goto("file://" + url)

		console.log stats
		var statsrc = path.resolve(__dirname,"..","results","{app}.json")
		fs.writeFileSync(statsrc,JSON.stringify(stats,null,2))
run()