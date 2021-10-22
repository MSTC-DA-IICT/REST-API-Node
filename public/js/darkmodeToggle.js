document.getElementsByClassName("slider")[0].addEventListener("click",function(e){
    e.preventDefault();
    if(  document.getElementById("darkModeCheck").getAttribute("checked")==null){
        document.getElementById("darkModeCheck").setAttribute("checked","checked")
        document.getElementsByClassName("navbar-default")[0].style.background="#138765";
        document.getElementsByClassName("navbar-default")[0].style.border="none";
        document.getElementsByClassName("footer")[0].style.background="#138765";
    
    }
    else{
        document.getElementById("darkModeCheck").removeAttribute("checked")
  
        document.getElementsByClassName("navbar-default")[0].style.background="#1abc9c";
        document.getElementsByClassName("navbar-default")[0].style.borderBottomColor="#c9c6c6";
        document.getElementsByClassName("footer")[0].style.background="#1abc9c";
        document.getElementsByClassName("navbar-default")[0].style.borderBottomStyle="solid";
    }
    var bodyElement = document.body;
    bodyElement.classList.toggle("dark-mode");

})
    
