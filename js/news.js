/* ============ load all news category ============ */
const loadAllCategories = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

/* ============ display all news category ============ */
const displayAllCategories = (categories) => {
  console.log(categories);
  const categoriesNavbar = document.getElementById("categories-navbar");
  categories.forEach((category) => {
    //console.log(category);
    const ulCategory = document.createElement("ul");
    ulCategory.classList.add("navbar-nav", "mx-auto", "mb-2", "mb-lg-0");
    ulCategory.innerHTML = `
        <li class="nav-item px-3">
        <a class="nav-link" aria-current="page" onclick="loadNewsInACategory('${category.category_id}', '${category.category_name}')"
        > ${category.category_name}</a>
        </li>
        `;
    categoriesNavbar.appendChild(ulCategory);
  });
};


/* ============ load news in a category ============ */
const loadNewsInACategory = (categoryId, categoryName) => {
  console.log(categoryId);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsInACategory(data.data, categoryName))
    .catch((error) => console.log(error));
};


/* ============ display news in a category ============ */
const displayNewsInACategory = (allNews, categoryName) => {
  allNews.sort((a, b) => b.total_view - a.total_view);
  console.log(allNews);

  const newsContainer = document.getElementById("news-in-category");
  newsContainer.textContent = "";
  allNews.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add('col');
    newsDiv.innerHTML = `
        <div class="card mb-3" >
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
              <h5 class="card-title">${news.title}</h5>

              <p class="card-text">
                ${news.details.length > 250 ? news.details.slice(0, 250) +
        "..." : news.details}
              </p>

            
            </div>
          </div>
        </div>
      </div>
    `;
    newsContainer.appendChild(newsDiv);
  });

  // category items found result
  const categoryFound = document.getElementById("category-found");
  const newsNumberInCategory = allNews.length;
  if (newsNumberInCategory > 0) {
    categoryFound.value = `${allNews.length} items found for category ${categoryName}`;
  } else {
    categoryFound.value = `No items found for category ${categoryName}`;
  }
};

loadAllCategories();
