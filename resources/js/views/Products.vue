<template>
	<div class="container-fluid">
        <h1 class="mt-4">Products</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
				<router-link to="/home">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active">Products</li>
        </ol>

        <div class="row">
            <div class="col-xl-12">
                <div class="card mb-4">
                    <div class="card-header d-flex">
                        <span>
                            <i class="fas fa-chart-area mr-1"></i>
                            Products Management
                        </span>
                        <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewProductModal"><span class="fa fa-plus"></span> Create New</button>
                    </div>
                    <div class="card-body">
                    	<table class="table">
                    		<thead>
                    			<tr>
                    				<td>#</td>
                    				<td>Category</td>
                                    <td>Name</td>
                    				<td>Image</td>
                    				<td>Action</td>
                    			</tr>
                    		</thead>
                    		<tbody>
                    			<tr v-for="(product, index) in products" :key="index">
                    				<td>{{ index+1 }}</td>
                    				<td>{{ findCategory(product.category_id ) }}</td>
                                    <td>{{ product.name }}</td>
                    				<td>
                                        <img class="table-image" :src="`${$store.state.serverPath}/storage/${product.image}`" :alt="product.name">
                                    </td>
                    				<td>
                    					<button class="btn btn-primary btn-sm" v-on:click="editProduct(product)"><span class="fa fa-edit"></span></button>
                    					<button class="btn btn-primary btn-sm" v-on:click="deleteProduct(product)"><span class="fa fa-trash"></span></button>
                    				</td>
                    			</tr>
                    		</tbody>
                    	</table>
                        <div class="text-center" v-show="moreExists">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="loadMore"><span class="fa fa-arrow-down"></span> Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal ref="newProductModal" hide-footer title="Add New product">
            <div class="d-block">
                <form v-on:submit.prevent="createProduct">
                    <div class="form-group">
                        <label for="category_id">Category</label>
                        <select name="category_id" id="category_id" v-model="productData.category_id" class="form-control">
                            <option value="">Choose Category</option>
                            <option v-for="(category, index) in categories" :value="category.id" :key="index">{{ category.name }}</option>
                        </select>
                        <div class="invalid-feedback" v-if="errors.category_id">{{ errors.category_id[0] }}</div>
                    </div>
                    <div class="form-group">
                        <label for="name">Enter Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter product name" v-model="productData.name">
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                    </div>
                    <div class="form-group">
                        <label for="image">Choose an image</label>
                        <div v-if="productData.image.name">
                            <img class="w-150px" src="" ref="newProductImageDisplay">
                        </div>
                        <input ref="newProductImage" type="file" class="form-control" id="image" v-on:change="attachImage">
                        <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
                    </div>
                    <hr>
                    <div class="text-right">
                        <button type="button" class="btn btn-default" v-on:click="hideNewProductModal">Cancel</button>
                        <button type="submit" class="btn btn-primary"><span class="fa fa-check"></span> Save</button>
                    </div>
                </form>
            </div>
        </b-modal>

        <b-modal ref="editProductModal" hide-footer title="Update product">
            <div class="d-block">
                <form v-on:submit.prevent="updateProduct">
                    <div class="form-group">
                        <label for="category_id">Category</label>
                        <select name="category_id" id="category_id" v-model="editProductData.category_id" class="form-control">
                            <option value="">Choose Category</option>
                            <option v-for="(category, index) in categories" :value="category.id" :key="index">{{ category.name }}</option>
                        </select>
                        <div class="invalid-feedback" v-if="errors.category_id">{{ errors.category_id[0] }}</div>
                    </div>
                    <div class="form-group">
                        <label for="name">Enter Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter product name" v-model="editProductData.name">
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                    </div>
                    <div class="form-group">
                        <label for="image">Choose an image</label>
                        <div>
                            <img class="w-150px" :src="`${$store.state.serverPath}/storage/${editProductData.image}`" ref="editProductImageDisplay">
                        </div>
                        <input ref="editProductImage" type="file" class="form-control" id="image" v-on:change="editAttachImage">
                        <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
                    </div>
                    <hr>
                    <div class="text-right">
                        <button type="button" class="btn btn-default" v-on:click="hideEditProductModal">Cancel</button>
                        <button type="submit" class="btn btn-primary"><span class="fa fa-check"></span> Update</button>
                    </div>
                </form>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import * as productService from '../services/product_service';

    export default {
        name: 'product',
        data() {
            return {
                categories: [],
                products: [],
                productData: {
                    category_id: '',
                    name: '',
                    image: ''
                },
                nextPage: 0,
                moreExists: false,
                editProductData: {},
                errors: {

                }
            }
        },
        mounted() {
            this.loadCategories();
            this.loadProducts();
        },
        methods: {
            loadCategories: async function() {
                try { 
                    const response = await productService.loadCategories();
                    this.categories = response.data;
                } catch(error) {
                    this.flashMessage.error({
                        message: 'Some error occured. Please refresh!',
                        time: 5000
                    });
                }
            },
            loadProducts: async function() {
                try { 
                    const response = await productService.loadProducts();
                    this.products = response.data.data;

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
            },
            attachImage() {
                this.productData.image = this.$refs.newProductImage.files[0];
                let reader = new FileReader();
                reader.addEventListener('load', function() {
                    this.$refs.newProductImageDisplay.src = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(this.productData.image);
            },
            hideNewProductModal() {
                this.$refs.newProductModal.hide();
            },
            showNewProductModal() {
                this.$refs.newProductModal.show();
            },
            createProduct: async function() {
                let formData = new FormData();
                formData.append('category_id', this.productData.category_id);
                formData.append('name', this.productData.name);
                formData.append('image', this.productData.image);

                try {
                    const response = await productService.createProduct(formData);
                    this.products.unshift(response.data);
                    this.hideNewProductModal();
                    this.flashMessage.success({
                        message: 'Product stored successfully!',
                        time: 5000
                    });
                    this.productData = {
                        category_id: '',
                        name: '',
                        image: ''
                    };
                } catch(error) {
                    // console.log(error);
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        default:
                            this.flashMessage.error({
                                message: 'Some error occured saving the product. Please try again!',
                                time: 5000
                            });
                            break;
                    }
                }
            },
            deleteProduct: async function(product) {
                if (!window.confirm(`Are you sure you want to delete ${product.name}`)) {
                    return;
                }
                try {
                    await productService.deleteProduct(product.id);
                    this.products = this.products.filter(obj => {
                        return obj.id != product.id;
                    });
                    this.flashMessage.success({
                        message: 'Product deleted successfully!',
                        time: 5000
                    });
                } catch(error) {
                    this.flashMessage.error({
                        message: error.response.data.message,
                        time: 5000
                    });
                }
            },
            hideEditProductModal() {
                this.$refs.editProductModal.hide();
            },
            showEditProductModal() {
                this.$refs.editProductModal.show();
            },
            editAttachImage() {
                this.editProductData.image = this.$refs.editProductImage.files[0];
                let reader = new FileReader();
                reader.addEventListener('load', function() {
                    this.$refs.editProductImageDisplay.src = reader.result;
                }.bind(this), false);
                reader.readAsDataURL(this.editProductData.image);
            },
            editProduct(product) {
                this.editProductData = {...product};
                this.showEditProductModal();
            },
            updateProduct: async function() {
                try {
                    const formData = new FormData();
                    formData.append('category_id', this.editProductData.name);
                    formData.append('name', this.editProductData.name);
                    formData.append('image', this.editProductData.image);
                    formData.append('_method', 'put');
                    const response = await productService.updateProduct(this.editProductData.id, formData);
                    this.products.map(product => {
                        if(product.id == response.data.id) {
                            for(let key in response.data) {
                                product[key] = response.data[key];
                            }
                        }
                    });
                    this.hideEditProductModal();
                    this.flashMessage.success({
                        message: 'Product updated successfully!',
                        time: 5000
                    });
                } catch(e) {
                    this.flashMessage.error({
                        message: error.response.data.message,
                        time: 5000
                    });
                }
            },
            loadMore: async function() {
                try {
                    const response = await productService.loadMore(this.nextPage);
                    if(response.data.current_page < response.data.last_page) {
                        this.moreExists = true;
                        this.nextPage = response.data.current_page + 1;
                    } else {
                        this.moreExists = false;
                    }
                    response.data.data.forEach(data => {
                        this.products.push(data);
                    });
                } catch(error) {
                    this.flashMessage.error({
                        message: 'Some error occured during loading more products!',
                        time: 5000
                    });
                }
            },
            findCategory(category_id) {
                let category_name = '';
                this.categories.forEach(category => {
                    if(category.id == category_id) {
                        category_name = category.name;
                    }
                });
                return category_name;
            }
        }
    }
</script>