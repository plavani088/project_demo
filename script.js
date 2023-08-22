document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const categorySelect = document.getElementById('categorySelect');
    const categoryInput = document.getElementById('categoryInput');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoriesSection = document.getElementById('categoriesSection');

    // Load categories and tasks from session storage when the page loads
    loadCategoriesAndTasks();

    addCategoryBtn.addEventListener('click', () => {
        const categoryName = categoryInput.value.trim();
        
        if (categoryName !== '') {
            addCategory(categoryName);
            saveCategory(categoryName);

            categoryInput.value = '';
        }
    });

    addTaskBtn.addEventListener('click', () => {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        const selectedCategory = categorySelect.value;

        if (taskText !== '' && selectedCategory !== '') {
            addTaskToCategory(selectedCategory, taskText);
            saveTask(selectedCategory, taskText);

            taskInput.value = '';
        }
    });

    // Function to add a category
    function addCategory(categoryName) {
        // Create new category option
        const newOption = document.createElement('option');
        newOption.value = categoryName;
        newOption.textContent = categoryName;
        categorySelect.appendChild(newOption);

        // Create new category container
        const newCategory = document.createElement('div');
        newCategory.classList.add('category');
        newCategory.id = categoryName.replace(/\s/g, '');
        newCategory.innerHTML = `
            <h2>${categoryName}</h2>
            <ul class="category-tasks"></ul>
        `;
        categoriesSection.appendChild(newCategory);
    }

    // Function to add a task to a category
    function addTaskToCategory(categoryName, taskText) {
        const categoryTasks = document.getElementById(categoryName.replace(/\s/g, ''));
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <label><input type="checkbox" class="task-checkbox">${taskText}</label>
        `;
        categoryTasks.querySelector('.category-tasks').appendChild(taskItem);
    }

    // Function to save category to session storage
    function saveCategory(categoryName) {
        const categories = JSON.parse(sessionStorage.getItem('categories')) || [];
        categories.push(categoryName);
        sessionStorage.setItem('categories', JSON.stringify(categories));
    }

    // Function to save task to session storage
    function saveTask(categoryName, taskText) {
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
        tasks[categoryName] = tasks[categoryName] || [];
        tasks[categoryName].push({ text: taskText, completed: false });
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load categories and tasks from session storage
    function loadCategoriesAndTasks() {
        const categories = JSON.parse(sessionStorage.getItem('categories')) || [];
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};

        for (const category of categories) {
            addCategory(category);
            const categoryTasks = tasks[category] || [];
            for (const task of categoryTasks) {
                addTaskToCategory(category, task.text);
            }
        }
    }
});