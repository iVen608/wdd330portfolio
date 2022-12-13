export default class User {
    constructor(color, name, todo, habit, focus, units){
        this.color = color;
        this.name = name;
        this.todo = todo;
        this.focus = focus;
        this.habit = habit;
        this.units = units;
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
    getName(){
        return this.name;
    }
    setName(name){
        this.name = name;
    }
    getUnits(){
        return this.units;
    }
    setUnits(units){
        this.units = units;
    }  
}