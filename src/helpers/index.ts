export const getRandomData = async (modelDatas: any): Promise<any> => {
	const numRandom: number = getRandomInt(0, modelDatas.length);
	return modelDatas.models[numRandom];
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}