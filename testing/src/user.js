export default class User {
    constructor(color, position, name, todo, habit){
        this.color = color;
        this.position = position;
        this.name = name;
        this.todo = todo;
        this.habit = habit;
    }
    getHabits(){
        return this.habit;
    }
    setHabits(habitList){
        this.habit = habitList;
    }
    getToDos(){
        return this.todo;
    }
    setToDos(todosList){
        this.todo = todosList;
    }
    getColor(){
        return this.color;
    }
    setColor(color){
        this.color = color;
    }
    getPosition(){
        return this.position;
    }
    setPosition(position){
        this.habit = position;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }    
}