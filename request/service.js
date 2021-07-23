
const baseUrl = 'http://crm.weiqisheng.net'
const api = baseUrl + '/api/'
// const picapi = 'http://crm.weiqisheng.net/'
// const qrpicapi = 'https://duomen.br-ee.cn/uploads/'
// const bgapi = 'https://duomen.br-ee.cn/index.php/index'

const poast = function(url, data, method, callback) {
	let res = null
	let err = null
	uni.request({
		header: {
			token: '9314ccc283927a157c8282672495b261'
		},
		url: api + url,
		data: data || "",
		method: method,
		dataType: 'json',
		success(res) {
			res.baseUrl = baseUrl;
			return callback(res, err);
		},
		fail(err) {
			res.baseUrl = baseUrl;
			return callback(res, err);
		}
	})
}

// const getUsers = function(id) {
// 	let ret = '';
// 	ret = uni.request({
// 		url: api + 'User/getinfo',
// 		data: {
// 			id: id
// 		},
// 		success(res) {
// 			let ret = res.data
// 			uni.setStorageSync('userInfo', res.data)
// 		}
// 	})
// 	console.log(ret);
// 	return ret;
// }
// const addUser = function(userInfo) {
// 	let users = getUsers();
// 	users.push({
// 		mobile: userInfo.mobile,
// 		password: userInfo.password
// 	});
// 	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
// }
// const checkLogin = function(data) {
// 	let ret = '';
// 	uni.getStorage({
// 		key: 'userInfo',
// 		success: function(result) {
// 			ret = true
// 		}
// 	})
// 	return ret;
// }
// const getUserid = function() {
// 	let uz = uni.getStorageSync('userInfo');

// 	let userid = uz.id;
// 	// uni.getStorage({
// 	// 	key:'userInfo',
// 	// 	success:function(res){
// 	// 		console.log(res)
// 	// 		userid  = res.data.id
// 	// 	}
// 	// })
// 	return userid;
// }

export default {
	// getUsers,
	// addUser,
	// api,
	// picapi,
	// checkLogin,
	// getUserid,
	// qrpicapi,
	// bgapi,
	poast,
	// baseUrl
}
