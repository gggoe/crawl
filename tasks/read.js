/**
 * 1. 向网址发出请求得到响应体
 * 2. 把得到的Buffer 转成字符串
 * 3. 从字符串提取我们需要的内容
 * 4. 把提取到的结果传入回调函数
 */
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let debug = require('debug')('crawl:read');

module.exports = function (url, callback) {
    request({url, encoding: null}, function (err, response, body) {
        body = iconv.decode(body, 'gbk');
        let $ = cheerio.load(body);
        let movies = [];
        $('.keyword a.list-title').each(function () {
            let $this = $(this);
            let movie = {
                name: $this.text(),
                url: $this.attr('href')
            };
            debug(`读到电影:${movie.name}`);
            movies.push(movie);
        });
        callback(err, movies);
    })
};
// let url = 'http://top.baidu.com/buzz?b=26&c=1';
// module.exports(url, function (err, movies) {
//     console.log(movies); // 查看爬取到的数据
// });