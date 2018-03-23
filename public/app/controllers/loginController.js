angular
.module('mainApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$route','AuthFactory'];

function LoginController($scope, $location, $route, AuthFactory){
	$scope.login = login;
	
	activate();

	///////////

	function activate(){
	}

	function login(email, password){
		$scope.loginForm.password = '';
		$scope.loginForm.email = '';
		AuthFactory.login(email, password).then(function(res){
			if(res.data.isValid){
				$location.path('/waiting-room');
	          	$route.reload();
			}else{
				$location.path('/login');
	          	$route.reload();
			}
		}).catch(error => console.log('reject'));
	}

	function logout(){
		AuthFactory.logout().then(function(res){
			if(!res.data.user){
				$location.path('/login');
	          	$route.reload();
			}
		}).catch(error => console.log('reject'));
	}

}
