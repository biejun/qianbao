export function getNowTime() {
	let date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/*
 ** 时间戳转换成指定格式日期
 ** eg. 
 ** dateFormat(11111111111111, 'Y年m月d日 H时i分')
 ** → "2322年02月06日 03时45分"
 */
export function dateFormat(timestamp, formats) {
	// formats格式包括
	// 1. Y-m-d
	// 2. Y-m-d H:i:s
	// 3. Y年m月d日
	// 4. Y年m月d日 H时i分
	formats = formats || 'Y-m-d';

	var zero = function(value) {
		if (value < 10) {
			return '0' + value;
		}
		return value;
	};

	var myDate = timestamp ? new Date(timestamp) : new Date();

	var year = myDate.getFullYear();
	var month = zero(myDate.getMonth() + 1);
	var day = zero(myDate.getDate());

	var hour = zero(myDate.getHours());
	var minite = zero(myDate.getMinutes());
	var second = zero(myDate.getSeconds());

	return formats.replace(/Y|m|d|H|i|s/ig, function(matches) {
		return ({
			Y: year,
			m: month,
			d: day,
			H: hour,
			i: minite,
			s: second
		})[matches];
	});
};

export function combination(aadd, size) {
	var resultArr = [];
	deepCompute(aadd, size - 1, 0, "", resultArr);

	function deepCompute(arr, choselen, index, str) {
		for (var a = index; a < arr.length - choselen; a++) {
			if (choselen != 0) {
				deepCompute(arr, choselen - 1, a + 1, str + arr[a] + ",")
			} else {
				resultArr.push(str + arr[a])
			}
		}
	}

	return resultArr;
}

export function toGroup(arr1 = [], arr2 = []) {
	let str = arr1.join(',');
	let len = arr2.length;
	let arr = [];
	for(let i = 0; i < len; i++) {
		arr.push(arr1.concat(arr2[i]).join(','));
	}
	return arr;
}