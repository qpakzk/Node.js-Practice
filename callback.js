a = [3, 1, 2];
console.log('increasing sort');
console.log(a.sort());

console.log('decreasing sort');
function b(val1, val2) {
	console.log('c', val1, val2);
	return val2 - val1;
}
console.log(a.sort(b));

console.log('use anonymous callback function');
console.log(a.sort(function(val1, val2) {return val2 - val1}));

console.log('define callback function');
function func(callback) {
	callback();
}

func(function() {
	console.log('Hello Callback');
});