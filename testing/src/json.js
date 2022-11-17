export default class JSONcall{
    async getResults(url){
        const results = await fetch(url);
        if(results.ok){
            const jsonObj = await results.json();
            return jsonObj;
        }
    }
}