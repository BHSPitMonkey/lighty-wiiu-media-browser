function BrowserCtrl($scope, $http) {
	$scope.currentPath = "/";
	$scope.breadcrumbs = [];
	$scope.files = [];
	
	$scope.loadFromPath = function(path) {
		var ext = path.split('.').pop().toLowerCase();
		console.log("loadFromPath called, ext: " + ext);
		if (['mp4', 'm4v', 'aac', 'jpg', 'jpeg', 'png', 'gif'].indexOf(ext) != -1) {
			window.location.href = path;
			return;
		}
		else if (ext[ext.length-1] != '/') {
			console.log("This appears to be a file we can't open!");
			window.location.href = path;
			return;
		}
		
		// $http returns a promise, which has a then function, which also returns a promise
		var promise = $http.get(path).then(function (response) {
			// The then function here is an opportunity to modify the response
			console.log(response);
			// The return value gets picked up by the then in the controller.
			if (response.status == 200) {
				$scope.currentPath = path;
				$scope.breadcrumbs = path.split('/');
				$scope.breadcrumbs[0] = "Root";
				var fileObjs = [];
				var el = document.createElement( 'div' );
				el.innerHTML = response.data;
				var tbody = el.getElementsByTagName('tbody')[0];
				for (var i=0; i<tbody.children.length; i++) {
					var tr = tbody.children[i];
					var obj = {};
					for (var j=0; j<tr.children.length; j++) {
						var td = tr.children[j];
						
						switch (td.className) {
							case 'n':
								var a = td.children[0];
								obj['href'] = $scope.currentPath + a.getAttribute('href');
								obj['name'] = a.innerHTML;
								break;
							case 't':
								obj['type'] = td.innerHTML;
								break;
						}
					}
					if (obj['name'] != "Parent Directory" && obj['href'] != "/wiiu/")
						fileObjs.push(obj);
				}
				// Clear out $scope.files, and insert files into it in groups of four
				$scope.files = [];
				var row = [];
				for (var i=0; i<fileObjs.length; i++) {
					row.push(fileObjs[i]);
					if (i % 4 == 3 || i == fileObjs.length-1) {
						$scope.files.push(row);
						row = [];
					}
				}
			}
			
			return response.data;
		});
	};
	
	$scope.loadFromPath('/');

	$scope.todos = [
		{text:'learn angular', done:true},
		{text:'build an angular app', done:false}];
	 
	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	};
	 
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};
	 
	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
		});
	};
}
