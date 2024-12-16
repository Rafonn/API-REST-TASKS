const Task = require('../models/Task');
const Yup = require('yup');

class TaskController{
    async index(req, res){
        const tasks = await Task.findAll({
            where: { user_id: req.user_id, check: false },
        })
        return res.json(tasks);
    }

    async store(req, res){
        const { task } = req.body;
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Failed to register." });
        };

        const tasks = await Task.create({
            user_id: req.user_id,
            task,
        })

        return res.json(tasks);
    }

    async update(req, res){
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(400).json({ error: "task doesn't exist." });
        }

        await task.update(req.body);

        return res.json(task);
    }

    async delete(req, res){
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);

        if(!task){
            return res.status(400).json({ error: "Task doesn't exist." });
        }

        if(task.user_id !== req.user_id){
            return res.status(401).json({ error: "Req not authorized." });
        }

        await task.destroy();

        return res.send();
    }
}

module.exports = new TaskController();