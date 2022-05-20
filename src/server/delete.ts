import ENDPOINT from "src/constants/api";

const deleteFish = async (id: string, generation: number) => {
	const URL = ENDPOINT.FISH;
	const data = await fetch(URL, {
		method: "DELETE",
		mode: "cors",  // CORSを使うことを宣言
		body: JSON.stringify({
			id,
			generation
		})
	});
	const json = await data.json();
	return json;
};

export default deleteFish;