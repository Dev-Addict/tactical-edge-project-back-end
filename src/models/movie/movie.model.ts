import {model, Schema, Types} from 'mongoose';

import {validateMovieYear} from '../../utils/validators/movie-year.validator';

export interface MovieModel {
	title: string;
	year: number;
	coverId: Types.ObjectId;
	userId: Types.ObjectId;
}

export interface IMovie extends MovieModel, Document {}

export const movieSchema = new Schema<IMovie>(
	{
		title: {
			type: String,
			required: true,
			maxlength: 255,
			minlength: 1,
		},
		year: {
			type: Number,
			required: true,
			validate: validateMovieYear,
		},
		coverId: {
			type: Schema.Types.ObjectId,
			ref: 'Image',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{timestamps: true}
);

export const Movie = model<IMovie>('Movie', movieSchema);
