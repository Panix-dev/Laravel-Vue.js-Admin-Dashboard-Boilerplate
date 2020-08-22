<template>
	<div id="layoutAuthentication">
	    <div id="layoutAuthentication_content">
	        <main>
	            <div class="container">
	                <div class="row justify-content-center">
	                    <div class="col-lg-5">
	                        <div class="card shadow-lg border-0 rounded-lg mt-5">
	                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
	                            <div class="card-body">
	                                <form v-on:submit.prevent="login">
	                                    <div class="form-group">
	                                    	<input class="form-control py-4" id="email" type="email" placeholder="Enter email address" v-model="user.email" />
	                                    	<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
	                                    </div>
	                                    <div class="form-group">
	                                    	<input class="form-control py-4" id="password" type="password" placeholder="Enter password" v-model="user.password" />
	                                    	<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
	                                    </div>
	                                    <div class="form-group">
	                                        <div class="custom-control custom-checkbox">
	                                        	<input class="custom-control-input" id="remember_me" type="checkbox" v-model="user.remember_me" />
	                                        	<label class="custom-control-label" for="rememberPasswordCheck">Remember password</label>
	                                        </div>
	                                    </div>
	                                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
	                                    	<router-link to="/reset-password" class="small">
		                                		Forgot Password?
		                                	</router-link>
		                                	<button type="submit" class="btn btn-primary">Login</button>
	                                    </div>
	                                </form>
	                            </div>
	                            <div class="card-footer text-center">
	                                <div class="small">
	                                	<router-link to="/register">
	                                		Need an account? Sign up!
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
		name: 'Login',
		created() {
			document.querySelector('body').style.backgroundColor = '#007bff';
		},
		data() {
			return {
				user: {
					email: '',
					password: '',
					remember_me: false
				},
				errors: {}
			}
		},
		methods: {
			login: async function() {
				try {
					const response = await auth.login(this.user);
					this.errors = {};
					this.$router.push('/home');
				} catch (error) {
					switch (error.response.status) {
						case 422:
							this.errors = error.response.data.errors;
							break;
						case 401:
							this.flashMessage.error({
							    message: error.response.data.message,
							    time: 5000
							});
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
