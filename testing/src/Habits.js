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
        const index = this.list.findIndex(x => x.id === timestamp);
        this.list[index].streak += 1;
        this.list[index].previous = new Date();
    }
    validDate(timestamp){
        const index = this.list.findIndex(x => x.id === timestamp);
        const element = this.list[index];
        if(element.previous === element.created){
            return true;
        } else if(element.frequency === 'daily'){
            const current = new Date().getDate();
            const previous = new Date(element.previous).getDate();
            if(current > previous){
                return true;
        }
        }else if(element.frequency === 'weekly'){
            const d = new Date();
            const previous = new Date(element.previous);
            const previousDayOfWeek = previous.getDay();
            const previousDate = previous.getDate();
            const lastDayOfWeek = new Date(d.getFullYear(), d.getMonth(), previousDate + (6-previousDayOfWeek));
            if(d > lastDayOfWeek){
                return true;
            }
        }else{
            const current = new Date().getMonth();
            const previous = new Date(element.previous).getMonth();
            if(current > previous || (current+11) === previous){
                return true;
            }
        }
        return false;   
    }
}
