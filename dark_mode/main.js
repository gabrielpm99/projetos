const btn = document.querySelector("[data-darkmode]");

btn.addEventListener("click", () => 
{
	document.body.classList.add("transicao");
	document.body.classList.toggle("dark-mode");
	
	if(document.body.classList.contains("dark-mode")) {
		localStorage.setItem("darkmode", true);
	} else {
		localStorage.setItem("darkmode", false);
	}
})

window.onload = () => 
{
	const darkmode = JSON.parse(localStorage.getItem("darkmode"));

	if(darkmode === true) {
		document.body.classList.remove("transicao");
		document.body.classList.add("dark-mode");
	}
}
