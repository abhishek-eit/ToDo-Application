const form = document.querySelector("#form1");
const task = document.querySelector("#textField");
const list = document.querySelector('#taskList');
const del_all = document.querySelector("#clearBtn");
const filter = document.querySelector('#filter');

let tasks;

if(localStorage.tasks){
    tasks = JSON.parse(localStorage.tasks);
    tasks.forEach(function(x){
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(x));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.className = 'float-right ';
        link.innerHTML = '<i class="fa fa-times del_icon" aria-hidden="true"></i>';
        li.appendChild(link);
        list.appendChild(li);
    });
} else{
    tasks = [];
}

form.addEventListener('submit',function(e){
    if(task.value != ''){
        //create li
        let li = document.createElement('li');
        //add class
        li.className = 'list-group-item';
        //append task
        li.appendChild(document.createTextNode(task.value));
        //create link
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.className = 'float-right ';
        link.innerHTML = '<i class="fa fa-times del_icon" aria-hidden="true"></i>';
        //append link to li
        li.appendChild(link);

        //append to ul
        list.appendChild(li);

        //save to local Storage
        tasks.push(task.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        task.value = '';
    }

    e.preventDefault();
});

del_all.addEventListener('click', function(e){
    list.innerHTML='';
    localStorage.removeItem('tasks');
});



filter.addEventListener('keyup', function(e){
    console.log(1);
    document.querySelectorAll('.list-group-item').forEach(function(item){
        if(item.firstChild.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1)
        {
            item.style.display= 'block';
        }
        else{
            item.style.display= 'none';
        }
    });

});

list.addEventListener('click',function(e){
    if(e.target.parentElement.parentElement.parentElement.classList.contains('list-group')){
        //delete from localStorage
        var liNumber;
        var temp=0;
        document.querySelectorAll('.list-group-item').forEach(function(item){
            if(item.firstChild === e.target.parentElement.parentElement.firstChild){
                liNumber = temp;
            }
            temp++;
        });
        tasks.splice(liNumber,1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        e.target.parentElement.parentElement.remove();
    }
    e.preventDefault();
});