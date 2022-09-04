/* ============ load all news category ============ */
const loadAllCategories = () => {
  toggleSpinner(true); // start spinner
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

/* ============ display all news category ============ */
const displayAllCategories = (categories) => {
  const categoriesNavbar = document.getElementById("categories-navbar");
  categories.forEach((category) => {
    const ulCategory = document.createElement("ul");
    ulCategory.classList.add("navbar-nav", "mx-auto", "mb-2", "mb-lg-0");
    ulCategory.innerHTML = `
        <li class="nav-item px-3 category">
        <a role="button" class="nav-link" aria-current="page" onclick="loadNewsInACategory('${category.category_id}', '${category.category_name}')"
        > ${category.category_name}</a>
        </li>
        `;
    categoriesNavbar.appendChild(ulCategory);
  });
};

/* ========== spinner ========== */
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

/* ============ load news in a category ============ */
const loadNewsInACategory = (categoryId, categoryName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsInACategory(data.data, categoryName))
    .catch((error) => console.log(error));
};
loadNewsInACategory("03", "International News");

/* ============ display news in a category ============ */
const displayNewsInACategory = (allNews, categoryName) => {
  // sorting news by total view
  allNews.sort((a, b) => b.total_view - a.total_view);

  const newsContainer = document.getElementById("news-in-category");
  newsContainer.textContent = "";
  allNews.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
      <div class="container card mb-3 p-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="${news.image_url}"
              class="img-fluid rounded-start"
              alt=""
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title.length > 70
        ? news.title.slice(0, 70) + "..."
        : news.title
      }</h5>
              <p class="card-text">
                ${news.details.length > 165
        ? news.details.slice(0, 165) + "..."
        : news.details
      }
              </p>
              <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <div>
                    <img class="rounded-pill"
                      src="${news.author.img}"
                      width="36px" />
                  </div>
                </div>
                <div class="mt-3">
                  <p class="fw-semibold text-md">${news.author.name ? news.author.name : "No author found"
      }</p>
                </div>
              </div>
              <div class="d-flex gap-2 mt-3">
                <p><i class="fa-solid fa-eye"></i></p>
                <p class="fw-bold">${news.total_view ? news.total_view : "No views"
      }</p>
              </div>
              <div class="d-none d-sm-block">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-regular fa-star-half-stroke text-warning"></i>
                <i class="fa-regular fa-star text-warning"></i>
                <i class="fa-regular fa-star text-warning"></i>
              </div>
              <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${news._id
      }')">Details
              </button>
             </div>
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(newsDiv);
    toggleSpinner(false); //stop spinner
  });

  /* ============ category news number found  ============ */
  const categoryFound = document.getElementById("category-found");
  const newsNumberInCategory = allNews.length;
  if (newsNumberInCategory > 0) {
    categoryFound.value = `${allNews.length} items found for category ${categoryName}`;
  } else {
    categoryFound.value = `No items found for category ${categoryName}`;
  }
};

/* ============ load news details ============ */
const loadNewsDetails = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (newsDetails) => {
  const newsDetailsModal = document.getElementById("newsDetailsModalLabel");
  newsDetailsModal.innerText = newsDetails.title;
  const newsAuthor = document.getElementById("news-details");
  newsAuthor.innerHTML = `
  <div id="news-details" class="modal-body">
    <img class="img-fluid mb-4" src="${newsDetails.image_url}" alt="">
    <p><b>Published Date:</b> ${newsDetails.author.published_date
      ? newsDetails.author.published_date
      : "No published date found"
    } </p>
    <p><b>Author Name:</b> ${newsDetails.author.name ? newsDetails.author.name : "No author found"
    } </p>
    <p><b>Total Views:</b> ${newsDetails.total_view ? newsDetails.total_view : "No views"
    }</p>
    <p><b>Ratings:</b> ${newsDetails.rating.number ? newsDetails.rating.number : "No ratings found"
    } </p>
    <p class="mb-0"><b>Description:</b> ${newsDetails.details}</p>
</div>
  `;
};
loadAllCategories();
