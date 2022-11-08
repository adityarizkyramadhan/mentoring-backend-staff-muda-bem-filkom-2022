//import database sequelize
const { Sequelize, DataTypes } = require('sequelize');

//import framework http
const express = require('express')
const app = express()

//import body parser
const bodyParser = require('body-parser')

//Init express & sequelize
const DATABASE_SERVER_NAME = 'postgres://postgres:adityarizky1020@db.jgjyjvyldoamqndazixl.supabase.co:5432/postgres'

const sequelize = new Sequelize(DATABASE_SERVER_NAME)

//Init Model
const todoList = sequelize.define('todo_lists', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_kegiatan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})


// CRUD todo list database

const tambahData = (namaKegiatan) => {
    return todoList.create({
        nama_kegiatan: namaKegiatan
    }).then(function (data) {
        return data
    }).catch(function (_error) {
        return null
    })
}

const hapusData = (idParam) => {
    return todoList.destroy({
        where: {
            id: idParam
        }
    }).then(function (data) {
        return data
    }).catch(function (_error) {
        return null
    })
}

const bacaSemuaData = () => {
    return todoList.findAll().then(function (data) {
        return data
    }).catch(function (_error) {
        return null
    })
}

const updateData = (id, check) => {
    return todoList.update({
        is_check: check
    }, {
        where: {
            id: id
        }
    }).then(function (data) {
        return data
    }).catch(function (_error) {
        return null
    })
}

sequelize.sync({})

//CRUD controller
// app.post('/', async (req, res) => {

// })

// app.get('/', async (req, res) => {

// })

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.post('/', async (req, res) => {
    const { nama_kegiatan } = req.body
    const isCreated = await tambahData(nama_kegiatan)
    if (isCreated == null){
        return res.status(500).send("Gagal bikin data")
    }
    return res.status(201).send("Sukses bikin data")
})

// app.get('/', async (req, res) => {
//     let data = {
//         id: 1,
//         nama_kegiatan: "Makan sampai kenyang",
//         is_check: false
//     }
//     res.status(200).json(data)
// })

app.listen('8080', () => {
    console.log(`Example app listening on port 8080`)
})




//Run server
