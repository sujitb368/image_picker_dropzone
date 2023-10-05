

const select_file = document.querySelector("#select_file");
const select_file_custom = document.querySelector("#select_file_custom");
const select_file_custom_text = document.querySelector("#select_file_custom_text");

const submit_file = document.querySelector("#submit_file");
const gallery = document.querySelector(".gallery");
const image = gallery.querySelector(".image");

// image to be store 
let gallery_img = [];

// click default input by clicking custom input button
select_file_custom.addEventListener("click",()=>{
    select_file.click()
})

// reading the input file one by one from the object which is return by default input button 
const readFile = (filesObject) => {
    
    Object.keys(filesObject).forEach(i => {
        
        const file = filesObject[i];
        
        let reader = new FileReader();
        
        reader.addEventListener("load", function () {
            
            gallery_img.push(reader.result);
        })
        
        reader.readAsDataURL(file)
    })
    filesObject = "";
}

// event Listener to default input(type=file) button
select_file.addEventListener("change", (e) => {
    console.log(e);
    let fileInput = e.target;
    console.log(e.target);
    let files = fileInput.files;
    // console.log(files);
    
    if(select_file.value){
        //Regular Expression: /[\/\\]([\w\d\s\.\-\(\)]+)$/

        select_file_custom_text.innerHTML = files.length + " Image selected";
        
    }else{
        select_file_custom_text.innerHTML = "No file chosen, yet";
    }
    if (files.length > 0) {
        
        readFile(files);

    }

})

// show to Ui by clicking submit button
submit_file.addEventListener("click", () => {
    if (gallery_img.length > 0) {
        gallery_img.forEach((imgURL, i) => {
            gallery.innerHTML += ` 
            <div class="img_wrapper" id="img_wrapper${i}"> 
                <i id="del${i}" class="fa fa-times delete_icon" onclick ="delete_img(image${i},del${i},img_wrapper${i})">
                </i>
                <img class="image" id="image${i}" src="${imgURL}" alt="image">
               
            </div>`

        })
        select_file_custom_text.innerHTML = ""
        gallery_img = []
    } else {
        alert("Select a file")
    }

})


function delete_img(i,j,w) {
    // i respective image, j respective delete_icon, w respective img_wrapper
    
    i.remove();
    j.remove()
    w.remove()
}



