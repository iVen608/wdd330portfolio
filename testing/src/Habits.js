export default class Habits{
    constructor(parentId){
        this.parentId = parentId;
        this.list = [];
    }
    getHabits(){
        return this.list;
    }
    setHabits(list){
        this.list = list;
    }
    addHabit(name, timestamp, date, frequency){
        let todo = {id: timestamp, habit: name, streak: 0, previous: date, created: date, frequency: frequency}
        this.list.push(todo);
    }
    removeHabit(timestamp){
        const index = this.list.findIndex(x => x.id === timestamp);
        this.list.splice(index, 1);
    }
    addStreak(timestamp){
        
    }
    getFilteredList(value){
        
    }
}
