// import { createAction, props } from '@ngrx/store';

import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Item] Add To Cart',
  props<{ productDetails: any }>()
);
