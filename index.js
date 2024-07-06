const Login=async(emailId,password)=>{
    var users= await fetch("./users.json").then((response)=>{
        console.log("success");

        return response.json();
    });
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var user=users.users.find(
                (user)=>user.password===password &&user.email===emailId
            );
            if(user){
                resolve(user);
            }
            else{
                reject(new Error("Invalid email or password"));
            }
       },1000)
    });
};

document.getElementById("submitform").addEventListener("submit",async(e)=>{
    e.preventDefault();
    let password=document.querySelector("#password").value;
    let emailId=document.querySelector("#emailId").value;
   
    // document.getElementById("submitform").addEventListener("submit", function(event) {
    //     event.preventDefault(); // Prevent the default form submission behavior

   
    try{
        let user= await Login(emailId,password);
        console.log("User logged in:",user);
       if(user){
        window.location.href = "./Main.html";
       }
    }
    catch(error){
        console.log("Login error:",error.message);
        alert(error.message);
    }

});

