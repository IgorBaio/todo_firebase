'use strict'

const repository = require('../repositories/tasks_repository');

// Pega todas as tarefas do usuário
exports.get = async (req, res, next,) => {
    try {
        let data = await repository.get(req.params.uid);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

//Remove a tarefa no banco de dados
exports.delete = async (req, res, next,) => {
    try {
        let data = await repository.remove(req.body.idlocal);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

//Atualiza a tarefa no banco de dados
exports.put = async (req, res, next,) => {
    try {
        //Insere no banco de dados
        const data = await repository.update({
            title: req.body.title,
            desc: req.body.desc,
            doneAt: req.body.doneAt,
            estimateAt: req.body.estimateAt,
            status: req.body.status,
            uid: req.body.uid,
            idlocal: req.body.idlocal,
        });
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}


//Insere a tarefa no banco de dados
exports.post = async (req, res, next,) => {
    console.log(`${req.body.doneAt}`)
    try {
        //Insere no banco de dados
        const data = await repository.create({
            title: req.body.title,
            desc: req.body.desc,
            doneAt: req.body.doneAt,
            estimateAt: req.body.estimateAt,
            status: req.body.status,
            uid: req.body.uid,
            idlocal: req.body.idlocal,
        });
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

