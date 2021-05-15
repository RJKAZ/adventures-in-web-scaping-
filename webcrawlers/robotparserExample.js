var robotsParser = require('robots-parser');

var robots = robotsParser('http://www.example.com/robots.txt', [
	'User-agent: *',
	'Disallow: /dir/',
  "Disallow: hello.html",
	'Disallow: /test.html',
	'Allow: /dir/test.html',
	'Allow: /test.html',
	'Crawl-delay: 1',
	'Sitemap: http://example.com/sitemap.xml',
	'Host: example.com'
].join('\n'));

console.log(robots.isAllowed('http://www.example.com/hello.html', 'Sams-Bot/1.0')); // false
robots.isAllowed('http://www.example.com/dir/test.html', 'Sams-Bot/1.0'); // true
robots.isDisallowed('http://www.example.com/dir/test2.html', 'Sams-Bot/1.0'); // true
robots.getCrawlDelay('Sams-Bot/1.0'); // 1
robots.getSitemaps(); // ['http://example.com/sitemap.xml']
