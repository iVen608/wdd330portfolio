export default class NASA {
    constructor(obj){
        this.url = obj.url;
        this.copyright = obj.copyright;
        this.date = obj.date;
        this.description = obj.explanation;
        this.title = obj.title;
    }
    getUrl(){
        return this.url;
    }
    getCopyright(){
        return this.copyright;
    }
    getDate(){
        return this.date;
    }
    getDescription(){
        return this.description;
    }
    getTitle(){
        return this.title;
    }
}