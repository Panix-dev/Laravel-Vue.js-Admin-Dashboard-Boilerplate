# Laravel & Vue.js Admin Dashboard Boilerplate

> A boilerplate ready to use for your custom dashboard projects

This repo contains the structure for an admin dashboard using Laravel and Vue.js. Laravel handles anything related to the data storage, server-side validation, CRUD operations, and API routing as well as the setup for JWT token authentication. Vue.js provides the reactive user experience and the consumption of the authentication token. The boilerplate uses Vuex to store global information and the Vue Router to handle the front end navigation.


## Table of Contents


> Try `clicking` on each of the `anchor links` below so you can get redirected to the appropriate section.


- [Example Services](#example-services)
- [Flash Messages](#flash-messages)
- [Load Categories](#load-categories)
- [Update Category](#update-category)

- [Laravel API Routes](#laravel-api-routes)

- [Contact Details](#contact-details)
- [Inspiration](#inspiration)


## Example Services


```javascript
export function http() {
	return axios.create({
		baseURL: store.state.apiURL
	});
}

export function httpFile() {
	return axios.create({
		baseURL: store.state.apiURL,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}
```


## Flash Messages


```javascript
this.flashMessage.error({
    message: 'Some error occured. Please refresh!',
    time: 5000
});
```


## Load Categories


```javascript
loadCategories: async function() {
    try { 
        const response = await categoryService.loadCategories();
        this.categories = response.data.data;

        if(response.data.current_page < response.data.last_page) {
            this.moreExists = true;
            this.nextPage = response.data.current_page + 1;
        } else {
            this.moreExists = false;
        }
    } catch(error) {
        this.flashMessage.error({
            message: 'Some error occured. Please refresh!',
            time: 5000
        });
    }
}
```


## Update Category


```javascript
updateCategory: async function() {
    try {
        const formData = new FormData();
        formData.append('name', this.editCategoryData.name);
        formData.append('image', this.editCategoryData.image);
        formData.append('_method', 'put');
        const response = await categoryService.updateCategory(this.editCategoryData.id, formData);
        this.categories.map(category => {
            if(category.id == response.data.id) {
                for(let key in response.data) {
                    category[key] = response.data[key];
                }
            }
        });
        this.hideEditCategoryModal();
        this.flashMessage.success({
            message: 'Category updated successfully!',
            time: 5000
        });
    } catch(e) {
        this.flashMessage.error({
            message: error.response.data.message,
            time: 5000
        });
    }
}
```


## Laravel API Routes


```javascript

```


## Contact Details


> :computer: [https://pagapiou.com](https://pagapiou.com)

> :email: [hello@pagapiou.com](mailto:hello@pagapiou.com)

> :iphone: [LinkedIn](https://www.linkedin.com/in/agapiou/)

> :iphone: [Instagram](https://www.instagram.com/panos_agapiou/)

> :iphone: [Facebook](https://www.facebook.com/panagiotis.agapiou)


## Inspiration


- **[Softgear Technology](https://www.youtube.com/channel/UCtQz2-DHytXrXCnzfHNAvkA)**
