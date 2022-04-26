import ENDPOINT from "src/constants/api";

const getData = async () => {
	const URL = ENDPOINT.FISH;
	const data = await fetch(URL, {
		method: "GET",
		mode: "cors",  // CORSを使うことを宣言
	});
	const json = await data.json();
	console.log("json", json);
	return json;
};

export default getData;