import ENDPOINT from "src/constants/api";
import Vec2 from "vec2";

const upload = async (points: Vec2[], center: Vec2) => {
	const URL = ENDPOINT.FISH;
	const data = await fetch(URL, {
		method: "POST",
		mode: "cors",  // CORSを使うことを宣言
		body: JSON.stringify({ points, center, parents: [] })
	});
	const json = await data.json();
	console.log("json", json);
};

export default upload;