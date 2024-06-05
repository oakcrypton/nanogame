module.exports = {
	validateAppUrl: (url) => {
		const secret_key = "dZvktof0Wuke74GIL4CG";
		const query_params = url
			.slice(url.indexOf("?") + 1)
			.split("&")
			.reduce((a, x) => {
				const data = x.split("=");
				a[data[0]] = data[1];
				return a;
			}, {});
		const sign_params = {};
		Object.keys(query_params)
			.sort()
			.forEach((key) => {
				if (!key.startsWith("vk_")) return;
				sign_params[key] = query_params[key];
			});
		const sign_str = Object.keys(sign_params)
			.reduce((a, x) => {
				a.push(x + "=" + sign_params[x]);
				return a;
			}, [])
			.join("&");
		var sign = require("crypto")
			.createHmac("sha256", secret_key)
			.update(sign_str)
			.digest()
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=$/, "");
		var status = sign === query_params["sign"];
		var statu = {
			status: status,
			sign: sign,
			vk: query_params["sign"],
		};
		return statu;
	},
	validateWalletUrl: (url) => {
		const secret_key = "glJ6mwd2VnZuLyCkOtAp";
		const query_params = url
			.slice(url.indexOf("?") + 1)
			.split("&")
			.reduce((a, x) => {
				const data = x.split("=");
				a[data[0]] = data[1];
				return a;
			}, {});
		const sign_params = {};
		Object.keys(query_params)
			.sort()
			.forEach((key) => {
				if (!key.startsWith("vk_")) return;
				sign_params[key] = query_params[key];
			});
		const sign_str = Object.keys(sign_params)
			.reduce((a, x) => {
				a.push(x + "=" + sign_params[x]);
				return a;
			}, [])
			.join("&");
		var sign = require("crypto")
			.createHmac("sha256", secret_key)
			.update(sign_str)
			.digest()
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=$/, "");
		var status = sign === query_params["sign"];
		var statu = {
			status: status,
			sign: sign,
			vk: query_params["sign"],
		};
		return statu;
	},
	generateMinesToString: (mines) => {
		var text_m = ``;
		for (var i = 0; i < mines.length; i++) {
			if (i != 24) text_m += `${i},`;
			else text_m += `${i}`;
		}
	},
	generateMines: (count, rowCount = 5, colCount = 5) => {
		function intRand(maxVal) {
			return Math.round((maxVal + 1) * Math.random() - 0.5);
		}
		const fillMines = (rowCount, colCount, minesCount) => {
			var res = [];
			for (var i = 0; i < rowCount * colCount; i++) {
				res.push(false);
			}
			var mines = minesCount;
			while (mines > 0) {
				var n = intRand(rowCount * colCount - 1);
				if (res[n] != true) {
					res[n] = true;
					mines--;
				}
			}
			return res;
		};
		return fillMines(rowCount, colCount, count);
	},
	str_rand: (num) => {
		let result = "";
		let words = "01234567890123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		let max_position = words.length - 1;
		for (let i = 0; i < num; ++i) {
			let position = Math.floor(Math.random() * max_position);
			result += words.substring(position, position + 1);
		}
		return result;
	},
	getUrlVars: function (url) {
		var hash;
		var myJson = {};
		var hashes = url.slice(url.indexOf("?") + 1).split("&");
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split("=");
			myJson[hash[0]] = hash[1];
		}
		return {
			id: myJson.vk_user_id,
		};
	},
	random: function (min, max) {
		const range = max - min + 1;
		const byteArray = require("crypto").randomBytes(4); // 4 байта для числа от 0 до 4294967295

		// Преобразование байтов в число
		const randomValue = byteArray.readUInt32BE(0);
		const randomFloat = min + (randomValue / 0xffffffff) * range;

		// Приведение числа к нужному диапазону
		return Math.floor(randomFloat);
		// return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},

	random_1: function (min, max) {
		const range = max - min + 1;
		const byteArray = require("crypto").randomBytes(4); // 4 байта для числа от 0 до 4294967295

		// Преобразование байтов в число
		const randomValue = byteArray.readUInt32BE(0);
		const randomFloat = min + (randomValue / 0xffffffff) * range;

		// Приведение числа к нужному диапазону
		return randomFloat;
		// return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (m) => {
		function random(x, y) {
			return y
				? Math.round(Math.random() * (y - x)) + x
				: Math.round(Math.random() * x);
		}
		var i = random(0, m.length - 1);
		return {
			res: m[i],
			index: i,
		};
	},
	getUnix: () => {
		return new Date().getTime();
	},
	save: (file = "users", data = []) => {
		require("fs").writeFileSync(
			`./database/${file}.json`,
			JSON.stringify(data, null, "\t")
		);
	},
	number_format: (number, decimals, dec_point, thousands_sep) => {
		var i, j, kw, kd, km;
		if (isNaN((decimals = Math.abs(decimals)))) {
			decimals = 2;
		}
		if (dec_point == undefined) {
			dec_point = ".";
		}
		if (thousands_sep == undefined) {
			thousands_sep = " ";
		}
		i = parseInt((number = (+number || 0).toFixed(decimals))) + "";
		if ((j = i.length) > 3) {
			j = j % 3;
		} else {
			j = 0;
		}
		km = j ? i.substr(0, j) + thousands_sep : "";
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		kd = decimals
			? dec_point +
			  Math.abs(number - i)
					.toFixed(decimals)
					.replace(/-/, 0)
					.slice(2)
			: "";
		return km + kw + kd;
	},
};
