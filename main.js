// --Course 1
// const name = "Silitonga"
// console.log(name)


// --Course 2--
// const greet = (name) => {
//     console.log(`Hello, ${name}`)
// }

// greet("Jeremia")
// greet("Daniel")
// // Global Object
// console.log(global)

// setTimeout( () => {
//     console.log("In the TimeOut")
//     clearInterval(int)
// }, 3000)

// const int = setInterval( () => {
//     console.log("In The Interval")
// }, 1000)

// Modules and Require 
// const peopleModule = require('./people')
// const { people, ages } = require('./people') //Akses yang di export secara destructuring

// console.log(peopleModule) // Akan mereturn {} jika tidak ada keyword module.exports di module people.js
// console.log(peopleModule.people, peopleModule.ages) // Akses jika ada lebih dari satu export pada people.js
// console.log(people) //Akses jika menggunakan destructuring

// const fs = require('fs') //Built-in Module di Node Js

// fs.readFile('./docs/teks.txt', ( err, data ) => {  //Membaca file
//     if (err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// })

// fs.writeFile('./docs/teks.txt', "Kalimat ini menimpa kalimat yang lama", ( err, data ) => { //Menulis File
//     err? console.log("Gagal Menulis") : console.log("Berhasil Menulis")
// })
// fs.writeFile('./docs/teksBaru.txt', "Ini akan membentuk File yang baru karena tidak ditemukan file bernama teksBaru", ( err, data ) => { //Membuat file baru dan menulis karena tidak ditemukan file bernama seperti yang dicari
//     err? console.log("Gagal Menulis") : console.log("Berhasil Menulis")
// })

// if (!fs.existsSync('./folderBaruTest')){ //Mengecek apakah sudah ada folder bernama folderBaruTest
//     fs.mkdir('./folderBaruTest', ( err ) => { //Membuat Folder
//         err? console.log("Gagal Membuat Folder") : console.log("Berhasil Membuat Folder")
//     })
// } else {
//     fs.rmdir('./folderBaruTest', ( err ) => { //Menghapus Folder
//         err? console.log("Gagal Menghapus Folder") : console.log("Berhasil Menghapus Folder")
//     })
// }
    
// if(fs.existsSync('./docs/teksBaru.txt')) { //Mengecek keberadaan file teksBaru.txt
//     fs.unlink('./docs/teksBaru.txt', ( err ) => { //Menghapus File
//         err ? console.log("Gagal Menghapus File") : console.log("Berhasil Menghapus File")
//     })
// }

// const readStream = fs.createReadStream('./docs/teksPanjang.txt', { encoding: 'utf8' }) //Membaca secara stream dengan format utf-8 yang artinya readable oleh manusia
// const writeStream = fs.createWriteStream('./docs/teksPanjangBaru.txt') //

// readStream.on('data', ( chunck ) => { //Membuka akses readStream dan mulai membaca
//     console.log('--New Chuck--') 
//     console.log(chunck) // chunck merupakan bagian bagian kecil yang bisa diambil saat stream
//     writeStream.write('--New Chunck')
//     writeStream.write(chunck) // Menulis chunck ke file teksPanjangBaru.txt
// })

// readStream.pipe(writeStream) //Pipe adalah cara memindahkan yang sedang dibaca ke file yang akan ditulis atau istilah nya adalah copy

// --Course 3--
// Clients & Servers
const http = require('http') //http merupakan module built in yang menyediakan fungsi untuk server
const fs = require('fs') // Ini nantinya akan digunakan untuk membaca file index.html
const _ = require('lodash')

const server = http.createServer( ( req, res ) => { // Membuat Server
    const num = _.random(0,20)
    console.log(num)
    // console.log(req.url) // Menampilkan URL yang ada
    // console.log(req.method) // Menampilkan method yang digunakan kepada server dari client

    //Response
    res.setHeader('Content-Type', 'text/html') //Mengatur Header dari Response tentang Tipe-Content

    // res.write("<h1>Ini adalah Contoh Response</h1>") //Membuat Response untuk ditampilkan pada Client
    // res.end() //Penanda Response Selesai

    //Membuat Simple Routing
    let path = './views/'
    switch(req.url){
        case '/':
            path += 'blogs.html'
            break;
        case '/form':
            path += 'form.html'
            break;
        case '/form-new': //Redirecting simple dengan basic routing
            res.statusCode = 301
            res.setHeader('Location', '/form')
            res.end()
            break;
        default:
            path += '404.html'
            break;
    }

    fs.readFile(path, ( err, data ) => { //dengan module fs kita bisa membaca tag tag html yang nantinya diubah menjadi response untuk request dari client
        if(err){
            console.log(err)
        } else {
            res.write(data)
        }
        res.end()
    })

})

server.listen(3001, 'localhost', () => { //Membuat Server menerima Request di Port 3001
    console.log('Berjalan di port 3001')
})

