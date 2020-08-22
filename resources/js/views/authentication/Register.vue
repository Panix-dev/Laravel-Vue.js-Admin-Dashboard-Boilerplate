<template>
	<div id="layoutAuthentication">
	    <div id="layoutAuthentication_content">
	        <main>
	            <div class="container">
	                <div class="row justify-content-center">
	                    <div class="col-lg-7">
	                        <div class="card shadow-lg border-0 rounded-lg mt-5">
	                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
	                            <div class="card-body">
	                                <form v-on:submit.prevent="register">
	                                    <div class="form-row">
	                                        <div class="col-md-6">
	                                            <div class="form-group">
	                                            	<input class="form-control py-4" id="name" type="text" placeholder="Enter full name" v-model="user.name" />
	                                            	<div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
	                                            </div>
	                                        </div>
	                                        <div class="col-md-6">
	                                            <div class="form-group">
			                                    	<input class="form-control py-4" id="email" type="email" aria-describedby="emailHelp" placeholder="Enter email address" v-model="user.email" />
			                                    	<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
			                                    </div>
	                                        </div>
	                                    </div>
	                                    <div class="form-row">
	                                        <div class="col-md-6">
	                                            <div class="form-group">
	                                            	<input class="form-control py-4" id="password" type="password" placeholder="Enter password" v-model="user.password" />
	                                            	<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
	                                            </div>
	                                        </div>
	                                        <div class="col-md-6">
	                                            <div class="form-group">
	                                            	<input class="form-control py-4" id="password_confirmation" type="password" placeholder="Confirm password" v-model="user.password_confirmation" />
	                                            	<div class="invalid-feedback" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</div>
	                                            </div>
	                                        </div>
	                                    </div>
	                                    <div class="form-group mt-4 mb-0">
	                                    	<button type="submit" class="btn btn-primary btn-block">Create Account</button>
	                                    </div>
	                                </form>
	                            </div>
	                            <div class="card-footer text-center">
	                                <div class="small">
	                                	<router-link to="/login">
	                                		Have an account? Go to login
	                                	</router-link>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </main>
	    </div>
	    <div id="layoutAuthentication_footer">
	        <footer class="py-4 bg-light mt-auto">
	            <div class="container-fluid">
	                <div class="d-flex align-items-center justify-content-between small">
	                    <div class="text-muted">Copyright &copy; Your Website 2019</div>
	                    <div>
	                        <a href="#">Privacy Policy</a>
	                        &middot;
	                        <a href="#">Terms &amp; Conditions</a>
	                    </div>
	                </div>
	            </div>
	        </footer>
	    </div>
	</div>
</template>

<script>
	
	import * as auth from '../../services/auth_service';

	export default {
		name: 'Register',
		created() {
			document.querySelector('body').style.backgroundColor = '#007bff';
		},
		data() {
			return {
				user: {
					name: '',
					email: '',
					password: '',
					password_confirmation: ''
				},
				errors: {},
			}
		},
		methods: {
			register: async function() {
				try {
					await auth.register(this.user);
					this.errors = {};
					this.$router.push('/login');
				} catch (error) {
					switch (error.response.status) {
						case 422:
							this.errors = error.response.data.errors;
							break;
						case 500:
							this.flashMessage.error({
							    message: error.response.data.message,
							    time: 5000
							});
						default:
							this.flashMessage.error({
							    message: 'An error occurred, please try again!',
							    time: 5000
							});
							break;
					}
				}
			}
		}
	}
</script>
