<template>
	<div>
		<Header />
	    <div id="layoutSidenav">
	        <Sidebar />
	        <div id="layoutSidenav_content">
	         	<router-view></router-view>
	            <Footer />
	        </div>
	    </div>
    </div>
</template>

<script>

	import Header from '../components/Header.vue';
	import Footer from '../components/Footer.vue';
	import Sidebar from '../components/Sidebar.vue';

	export default {
		components: {
			Header,
			Footer,
			Sidebar
		},
		created() {
			document.querySelector('body').style.backgroundColor = '#fff';
		},
	}
</script>