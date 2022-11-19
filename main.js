const links = [
    {
        label: "Week 1 Notes",
        link: "week1/index.html"
    },
    {label: "Week 2 Notes", link: "week2Notes/index.html"},
    {label: "Week 2 Coding Examples", link: "week2Code/index.html"},
    {label: "Week 3 Chapter 14.1 Mountains Code", link: "W3-14-1-Code/index.html"},
    {label: "Week 3 Chapter 14.2 Elements By Tag Name", link: "W3-14-2-Code/index.html"},
    {label: "Week 3 Chapter 14.3 Cat in a Hat", link: "W3-14-3-Code/index.html"},
    {label: "Week 3 Notes", link: "week3Notes/index.html"},
    {label: "Week 4 Notes", link: "week4Notes/index.html"},
    {label: "Week 5 Notes", link: "week5Notes/index.html"},
    {label: "Week 5 ToDos", link: "W5-ToDo/index.html"},
    {label: "Week 6 Notes", link: "week6Notes/index.html"},
    {label: "Week 7 Notes", link: "week7Notes/index.html"},
    {label: "Week 8 Notes", link: "week8Notes/index.html"},
    {label: "Week 9 Notes", link: "week9Notes/index.html"},
    {label: "Notes Formatter", link: "noteFormatCreator/index.html"},
]
var list_container = document.getElementById("list-container");
for (let i = 0; i < links.length; i++){
    var ilink = links[i].link;
    var ilabel = links[i].label;
    var list_object = document.createElement("li");
    list_object.classList.add("white", "center");
    var hyper_object = document.createElement("a");
    hyper_object.innerText = ilabel;
    hyper_object.href = ilink;
    list_object.append(hyper_object);
    list_container.append(list_object);
}