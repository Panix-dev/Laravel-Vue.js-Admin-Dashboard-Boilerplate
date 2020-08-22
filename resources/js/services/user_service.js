import {http, httpFile} from './http_service';

export function userScope() {
	return http().get('/user-scope');
}

export function adminScope() {
	return http().get('/admin-scope');
}