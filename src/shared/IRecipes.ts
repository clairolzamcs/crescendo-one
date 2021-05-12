export interface IRecipe {
  uuid: String;
  title: String;
  description: String;
  images: {
    full: String;
    medium: String;
    small: String;
  };
  servings: Number;
  prepTime: Number;
  cookTime: Number;
  postDate: Date;
  editDate: Date;
  ingredients: IIngredient[];
  directions: IDirection[];
}

export interface IIngredient {
  uuid: String;
  amount: Number;
  measurement: String;
  name: String;
}

export interface IDirection {
  instructions: String;
  optional: Boolean;
}

export interface ISpecial {
  uuid: String;
  ingredientId: String;
  type: String;
  title: String;
  geo?: String;
  text?: String;
}
