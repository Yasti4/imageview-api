export const controlLimitSeeder = (items: any[], limit: number): any => {
	let a: boolean = false;
	let b: boolean = true;
	let limitMax: number = 0;
	items.forEach((item) => {
		a = a && item.length < 1 ;
		if (b) {
			b = b && (limit > item.length );
			limitMax = item.length;
		}
	});
	const result = {
		IsMissingDataLength: a,
		IsNotMinimumData: b,
		TheDataIsNotCorrect: a || b,
		limitMax: limitMax
	}
	 return result;
}

export const compareUnique = (datas: any[], data: any, namesFields: string[1]): boolean => {
	return datas.findIndex(value =>
		value[namesFields[0]] === data[namesFields[0]] &&
		value[namesFields[1]] === data[namesFields[1]]) !== -1
}

export const getRandomData = async (modelDatas: any, ...numExcluded: number[]): Promise<any> => {
	const numRandom: number = getRandomInt(0, modelDatas.length -1);
	return modelDatas.models[numRandom];
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}