export type ListFoundationModelsDdlOutput = {
	models: ModelSummary[];
	nextToken?: string;
};

export type ModelSummary = {
	id: string;
	title: string;
	description: string;
};