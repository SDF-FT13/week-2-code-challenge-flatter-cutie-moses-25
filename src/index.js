// java script findex.html 

const rendercharacters = async () => {
let url = "http://localhost:3000/characters"

const response = await fetch(url);
const characters = await response.json();
console.log(characters);

}

