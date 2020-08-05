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

export function toDecimal(num, decimal) {
  num = num.toString()
  let index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  return parseFloat(num).toFixed(decimal)
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
	deepCompute(aadd, size - 1, 0, "");

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

export function toGroup(arr1 = [], arr2 = [], size) {
	let str = arr1.join(',');
	let resultArr = [];
	deepCombition(arr2, size - 1, 0, str !== '' ? str + ',' : '');
	
	function deepCombition(arr, choselen, index, str) {
		for (var a = index; a < arr.length - choselen; a++) {
			if (choselen != 0) {
				deepCombition(arr, choselen - 1, a + 1, str + arr[a] + ",")
			} else {
				resultArr.push(str + arr[a])
			}
		}
	}
	return resultArr;
}

export function getRandomArray(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// 精度计算  begin

//加法函数
export const accAdd = function(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	return (num1 * baseNum + num2 * baseNum) / baseNum;
};


//减法函数
export const subtr = function(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//last modify by deeka
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = function(arg1, arg2) {
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {}
	return  Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export const accDiv = function(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return accMul(r1 / r2, Math.pow(10, t2 - t1));
}