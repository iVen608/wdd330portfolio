export default class ToDos{
    constructor(parentId){
        this.parentId = parentId;
        this.list = [];
    }
    getToDos(){
        return this.list;
    }
    setToDos(list){
        this.list = list;
    }
    addToDo(name, timestamp){
        let todo = {id: timestamp, title: name, completed: false}
        this.list.push(todo);
    }
    removeToDo(timestamp){
        const index = this.list.findIndex(x => x.id === timestamp);
        this.list.splice(index, index + 1);
        console.log(this.list);
    }
    toggleCompleted(timestamp){
        const index = this.list.findIndex(x => x.id === timestamp);
        if(this.list[index].completed === false){
            this.list[index].completed = true;
        } else {
            this.list[index].completed = false;
        }
        return this.list[index].completed;
    }
}
