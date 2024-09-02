async function fetchData(){
    const response = await fetch("mongodb+srv://ap:bangtan%40123@cluster0.kzhz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const data = await response.json();
    console.log(data)
}

fetchData()

function search(){

}var input