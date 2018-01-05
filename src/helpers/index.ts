export const compareUnique = (datas: any[], data: any, namesFields: string[1]): boolean => {
	return datas.findIndex(value =>
		value[namesFields[0]] === data[namesFields[0]] &&
		value[namesFields[0]] === data[namesFields[0]]) !== -1
}

export const getRandomData = async (modelDatas: any, ...numExcluded: number[]): Promise<any> => {
	const numRandom: number = getRandomInt(0, modelDatas.length -1);
	return modelDatas.models[numRandom];
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}