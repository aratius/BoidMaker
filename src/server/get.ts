import ENDPOINT from "src/constants/api";
import Vec2 from "vec2";

const getData = async () => {
	const URL = ENDPOINT.FISH;
	const data = await fetch(URL, {
		method: "GET",
		mode: "cors",  // CORSを使うことを宣言
	});
	const json = await data.json();
	console.log("json", json);
};

export default getData;