export default class User {
    constructor(color, position, name, todo, habit, focus){
        this.color = color;
        this.position = position;
        this.name = name;
        this.todo = todo;
        this.focus = focus;
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
    getFocus(){
        return this.focus;
    }
    setFocus(focus){
        this.focus = focus;
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