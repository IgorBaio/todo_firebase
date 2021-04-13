'use strict'

const mongoose = require("mongoose");
const Tasks = mongoose.model('Tasks');

// Busca as tarefas do usuário cadastradas
exports.get = async (uid) => {
    console.log('uid', uid)
    const res = await Tasks.find({ uid: uid }).exec();
    const res_aux = res.map(item=> {
      return  {
            title: item.title,
            desc: item.desc,
            doneAt: item.doneAt,
            estimateAt: item.estimateAt,
            status: item.status,
            uid: item.uid,
            idlocal: item.idlocal
        }})
        
    return res_aux;
}

// Insere tarefas banco de dados
exports.create = async (body) => {
    console.log(body)
    var tasks = new Tasks(body);
    await tasks.save();
}

// Atualiza tarefas banco de dados
exports.update = async (body) => {
    console.log(body.idlocal)
    var tasks = await Tasks.updateOne({ idlocal: body.idlocal },{
        title: body.title,
        desc: body.desc,
        doneAt: body.doneAt,
        estimateAt: body.estimateAt,
        status: body.status,
        uid: body.uid,
        });
    await tasks.save();
}

// Remove tarefas banco de dados
exports.remove = async (id) => {
    console.log(id)
    var tasks = await Tasks.deleteOne({ idlocal: id });
    await tasks.save();
}