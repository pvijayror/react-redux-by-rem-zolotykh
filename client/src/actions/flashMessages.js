import shortid from 'shortid';
import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from '../actionTypes';

export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message: {
      id: shortid.generate(),
      ...message
    }
  }
}

export const removeFlashMessage = (id) => {
  return {
    type: REMOVE_FLASH_MESSAGE,
    id
  }
}
