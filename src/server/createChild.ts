import ENDPOINT from "src/constants/api";
import Vec2 from "vec2";

interface Fish {
	id: string,
	points: Vec2[],
	center: Vec2[],
}

const createChild = async (parents: [Fish, Fish], generation: number) => {
	const URL = ENDPOINT.CHILD;
	const data = await fetch(URL, {
		method: "POST",
		mode: "cors",  // CORSを使うことを宣言
		body: JSON.stringify({
			parents,
			generation
		})
	});
	const json = await data.json();
	console.log("json", json);
};

export default createChild;