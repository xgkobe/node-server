const app = require('express')();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
// 中间件bodyparser的配置固定步骤
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('*', (req: any,res: any,next: any) => {

    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/', (req: any,res: any) => {
    const html =  fs.readFileSync(path.join(__dirname,'index.html'), 'utf-8');
    res.writeHead(200, {
        'Content-type': 'text/html',
        'Set-cookie': ['id=123', 'name=xuguang' ],
    })
    res.end(html);
});

app.get('/hello.js', (req: any,res: any) => {
    const etag = req.headers['if-none-match'];
    if(etag === '456') {
        res.writeHead(304, {
            'Content-type': 'text/javascript',
            'Cache-Control': 'max-age=3000,no-cache',
            'last-Modified': '123',
            'Etag': '456',
            'Set-cookie': ['id=0', 'name=0;HttpOnly' ],
        })
        res.end('啊哈哈');
    } else {
        res.writeHead(200, {
            'Content-type': 'text/javascript',
            'Cache-Control': 'max-age=3000,no-cache',
            'last-Modified': '123',
            'Etag': '456',
            'Set-cookie': ['id=0', 'name=0' ],
        })
        res.end('console.log(12333)');
    }
});

app.get('/test', (req: any,res: any) => {
    console.log(req);
    res.json(req.body);
});

app.listen('8099', (err: any) => {
    if(!err) console.log('listen 8099');
})

// req.body就是请求的数据了
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })