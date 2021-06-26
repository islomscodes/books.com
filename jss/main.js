const baseUrl = `https://api.nytimes.com/svc/books/v3`;
const apiKey = ` 0nG5do2caU59G7F2PT1eRQD0RAsaX5Du   `;

const getLists = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/names.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik yuz berdi: " + error);
    return { success: false };
  }
};

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const list = document.getElementById("list");

let lastActive;

const setLists = async () => {
  // list.innerHTML = ``;
  error.classList.add("d-none");

  const res = await getLists();
  console.log(res);

  loading.classList.add("d-none");

  if (res.success) {
    res.data.results.map((v, i) => {
      const a = document.createElement("a");
      a.href = "#";
      a.onclick = (event) => {
        event.target.classList.add("active");
        lastActive.classList.remove("active");
        lastActive = event.target;
        setBooks(v);
      };
      a.className = `list-group-item list-group-item-action`;
      a.innerHTML = `
            ${v.list_name}
            <p
            class="
                mt-2
                mb-0
                d-flex
                justify-content-between
                align-items-center
            "
            >
            <span><i class="far fa-calendar-alt me-1"></i> ${v.newest_published_date}</span>
            <span class="badge bg-warning text-dark">${v.updated}</span>
            
            </p>
        `;

      list.appendChild(a);
    });

    if (list.children.length > 0) {
      list.children[0].classList.add("active");
      lastActive = list.children[0];
      setBooks(res.data.results[0]);
    }
  } else {
    error.classList.remove("d-none");
  }
};

setLists();

//books
const getBooks = async (list_name_encoded) => {
  try {
    const res = await axios.get(
      `${baseUrl}/lists/current/${list_name_encoded}.json?api-key=${apiKey}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Xatolik yuz berdi: " + error);
    return { success: false };
  }
};

const loading2 = document.getElementById("loading2");
const error2 = document.getElementById("error2");
const books = document.getElementById("books");
const listName = document.getElementById("list-name");
const moreInfo = document.getElementById("moreInfo");
const modals = document.getElementById("exampleModal");

const setBooks = async (obj) => {
  // books.innerHTML = "";
  loading2.classList.remove("d-none");
  error2.classList.add("d-none");

  listName.innerHTML = obj.list_name;
  const res = await getBooks(obj.list_name_encoded);

  loading2.classList.add("d-none");

  if (res.success) {
    console.log(res.data);
    res.data.results.books.map((v, i) => {
      console.log(v);
      const col = document.createElement("div");
      col.className = `col-sm-6 col-lg-4 col-xl-3 mb-3`;
      col.innerHTML = `
            <div
            class="
                shadow
                rounded
                p-3
                h-100
                d-flex
                flex-column
                justify-content-between
            "
            >
            <div class="w-100">
                <img
                src="${v.book_image}"
                class="rounded w-100 mb-3"
                alt=""
                />
                <p class="fw-bold m-0">${v.title}</p>
                <p class="text-secondary my-1">author: ${v.author}</p>
                <p>Price: <span class="text-warning">${v.price}</span></p>
            </div>
            <div class="d-flex"> 
   
            <button
            type="button"
            class="btn btn-primary "
            data-toggle="modal"
            data-target="#exampleModal"
            id="moreInfo"
            >
            More Info
            </button>
            <a href="${v.amazon_product_url}" class="btn btn-dark rounded w-50 ">Buy</a>

            </div>
             <div
      class="modal fade w-100"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id
      
      >
      <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Info of Book</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
   
    <div class="modal-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="albumId">choose sites</label>
            <select class="form-control" id="albumId">
              <option value="1">${v.buy_links.Amazon}</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
        <img  class="w-50" src="${v.book_image}" alt="">
        </div>
        <div class="col-md-12">
          <div class="form-group">
           <h2>Description</h2>
           <p>${v.description}</p>
          </div>

        </div>
        <div class="col-md-2 w-100 rounded shedow   w-100 rounded shedow ">
          <div class="card bg-light shadow m-0 p-0">

          <span class="span">print length</span>
          <i class="far fa-images"></i>
          <span class="span">${v.book_image_width}</span>
            <span>${v.book_image_width}</span>
          </div>

        </div>

         <div class="col-md-2 w-100 rounded shedow ">
          <div class="card bg-light shadow m-0 p-0 ">
          <span  class="span"   >Language</span>
          <span  class="span">English</span>
          </div>
        </div>
            <div class="col-md-2 w-100 rounded shedow ">
            <div class="card bg-light shadow m-0 p-0">
            <span  class="span">publisher</span>
            <span  class="span">${v.publisher}</span>
            </div>
          </div>
            <div class="col-md-2 w-100 rounded shedow ">
            <div class="card bg-light shadow m-0 p-0">
            <span class="span">Publication date</span>
            <span class="span">June 1, 2021</span>
            </div>
          </div>
           <div class="col-md-2">
            <div class="card bg-light shadow m-0 p-0">
            <span  class="span">ISBN-10</span>
            <span  class="span">${v.isbn10}</span>
            </div>
          </div>
           <div class="col-md-2 w-100 rounded shedow ">
            <div class="card bg-light shadow m-0 p-0">
            <span  class="span">ISBN-13</span>
            <span  class="span">${v.isbn13}</span>
            </div>
          </div>
          
        
        
       
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        add to card
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onclick="postPhoto()"
      >
        Buy
      </button>
    </div>
  </div>
        </div>
      </div>

      `;
      books.appendChild(col);
    });
  } else {
    error2.classList.remove("d-none");
  }
};

// modalss
// const infoBooks = async (obj) => {
//   moreInfo.innerHTML = "";
// };
