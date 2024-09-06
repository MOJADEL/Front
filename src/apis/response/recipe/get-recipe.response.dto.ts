import Recipe from 'types/interface/recipe.interface';
import ResponseDto from '../Response.dto';

export default interface GetRecipeResponseDto extends ResponseDto, Recipe {

}