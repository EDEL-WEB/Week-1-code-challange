
const ramens = [
  { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/ramen-4593402_1280.jpg", rating: 5, comment: "Delicious!" },
  { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/ramen-2199962_1280.jpg", rating: 4, comment: "Very flavorful!" },
  { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/bars-ramen-in-saigon-3227774_1280.jpg"}
];

function displayRamens() {
  const ramenMenu = document.getElementById("ramen-menu");

  ramens.forEach(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id; 
      img.className = "ramen-image"; 

      
      img.addEventListener("click", () => handleClick(ramen));

      ramenMenu.appendChild(img);
  });

  
  if (ramens.length > 0) {
      handleClick(ramens[0]);
  }
}


function handleClick(ramen) {
  const detailImage = document.querySelector("#ramen-detail img");
  const name = document.querySelector("#ramen-detail .name");
  const restaurant = document.querySelector("#ramen-detail .restaurant");
  const rating = document.querySelector("#ramen-detail .rating");
  const comment = document.querySelector("#ramen-detail .comment");

  
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  rating.textContent = `Rating: ${ramen.rating}/10`;
  comment.textContent = `Comment: ${ramen.comment}`;

  
  document.getElementById("edit-rating").value = ramen.rating;
  document.getElementById("edit-comment").value = ramen.comment;


  const editForm = document.getElementById("edit-ramen");
  editForm.onsubmit = (e) => {
      e.preventDefault();
      ramen.rating = document.getElementById("edit-rating").value;
      ramen.comment = document.getElementById("edit-comment").value;
      handleClick(ramen); 
  };

  
  const deleteButton = document.getElementById("delete-ramen");
  deleteButton.onclick = () => deleteRamen(ramen);
}


function deleteRamen(ramen) {
  const index = ramens.findIndex(r => r.id === ramen.id);
  if (index !== -1) {
      ramens.splice(index, 1);
      const ramenMenu = document.getElementById("ramen-menu");
      ramenMenu.innerHTML = ""; 
      displayRamens(); 
      if (ramens.length > 0) {
          handleClick(ramens[0]); 
      } else {
          
          const detailImage = document.querySelector("#ramen-detail img");
          const name = document.querySelector("#ramen-detail .name");
          const restaurant = document.querySelector("#ramen-detail .restaurant");
          const rating = document.querySelector("#ramen-detail .rating");
          const comment = document.querySelector("#ramen-detail .comment");

          detailImage.src = "";
          detailImage.alt = "";
          name.textContent = "";
          restaurant.textContent = "";
          rating.textContent = "";
          comment.textContent = "";
      }
  }
}


function addSubmitListener() {
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", (e) => {
      e.preventDefault(); 

      
      const name = document.getElementById("name").value;
      const restaurant = document.getElementById("restaurant").value;
      const image = document.getElementById("image").value;
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;

      
      const newRamen = {
          id: ramens.length + 1, 
          name,
          restaurant,
          image,
          rating,
          comment
      };

      
      ramens.push(newRamen);

      
      const ramenMenu = document.getElementById("ramen-menu");
      const img = document.createElement("img");
      img.src = newRamen.image;
      img.alt = newRamen.name;
      img.dataset.id = newRamen.id;
      img.className = "ramen-image"; 

      
      img.addEventListener("click", () => handleClick(newRamen));

      ramenMenu.appendChild(img);

      
      form.reset();
  });
}


function main() {
  displayRamens();
  addSubmitListener();
}


document.addEventListener("DOMContentLoaded", main);