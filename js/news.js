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
        <a class="nav-link" aria-current="page" href="index.html" onclick="loadNewsInACategory('${category.category_id}', '${category.category_name}')"
        > ${category.category_name}</a>
        </li>
        `;
        categoriesNavbar.appendChild(ulCategory);
    });
};



loadAllCategories();
