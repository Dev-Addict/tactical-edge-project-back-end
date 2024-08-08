import {Document, model, Schema} from 'mongoose';

/**
 * Image model
 * @property {number} width.required - Image's width
 * @property {number} height.required - Image's height
 * @property {string} src.required - Image's source
 */
export interface ImageModel {
	width: number;
	height: number;
	src: string;
}

/**
 * Image document
 * @extends ImageModel
 * @extends Document
 */
export interface IImage extends ImageModel, Document {}

export const imageSchema = new Schema<IImage>(
	{
		width: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		src: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

export const Image = model<IImage>('Image', imageSchema);
