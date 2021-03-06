import { RESET_ALL_TYPE } from '../reset-all/reset-all-type';
import {registrationType} from './registration.types';


const INITIAL_STATE={
    success:false,
    isSecondStep:false,
    isThirdStep:false,
    isBrand:true,
    email:'',
    password:'',
    agree:'',
    confiremed_password:'',
    isError:{
        password:false,
        email:false,
        confiremed_password:false,
        registration:false,
    },
    errorMessage:{
        password:'',
        email:'',
        confiremed_password:'',
        registration:''

    },
    brand:{
        name:'',
        url:'',
        activities:'',
        isError:{
            name:false,
            url:false,
            activities:false
        },
        errorMessage:{
            name:'',
            url:'',
            activities:''
        }
    },
    individual:{
        name:'',
        isError:{
            name:false
        },
        errorMessage:{
            name:''
        }
    },
    isLoading: false
}

export const registrationReducer=(state=INITIAL_STATE,action)=>{
    if(action === undefined) return {
        ...INITIAL_STATE
    }
    switch (action.type) {
        case registrationType.SET_INITIAL_STATE:
            return INITIAL_STATE
        case registrationType.SET_USER_TYPE:
            return {
                ...state,
                isBrand:action.payload
            }
        case registrationType.TOGGLE_SECOND_STEP:
            return {
                ...state,
                isSecondStep:action.payload,
            }
        case registrationType.TOGGLE_THIRD_STEP:
            return {
                    ...state,
                    isThirdStep:action.payload,
            }

        case registrationType.SET_EMAIL:
            return {
                ...state,
                email:action.payload
            }
        case registrationType.SET_PASSWORD:
            return {
                ...state,
                password:action.payload
            }
        case registrationType.SET_CONFIRMATION_PASSWORD:
            return {
                ...state,
                confiremed_password:action.payload
            }
        case registrationType.SET_EMAIL_ERROR:
            return {
                    ...state,
                    isError:{
                        ...state.isError,
                        email:action.payload

                    }
                }
        case registrationType.SET_EMAIL_ERROR_MESSAGE:
            return {
                    ...state,
                    errorMessage:{
                        ...state.errorMessage,
                        email:action.payload

                    }
                        }

        case registrationType.SET_PASSWORD_ERROR:
            return {
                    ...state,
                    isError:{
                        ...state.isError,
                        password:action.payload

                    }
                }
        case registrationType.SET_PASSWORD_ERROR_MESSAGE:
            return {
                    ...state,
                    errorMessage:{
                        ...state.errorMessage,
                        password:action.payload

                    }
                        }
        case registrationType.SET_PASSWORD_CONFIRMATION_ERROR:
            return {
                    ...state,
                    isError:{
                        ...state.isError,
                        confiremed_password:action.payload

                    }
                }
        case registrationType.SET_PASSWORD_CONFIRMATION_ERROR_MESSAGE:
            return {
                    ...state,
                    errorMessage:{
                        ...state.errorMessage,
                        confiremed_password:action.payload

                    }
                        }

        case registrationType.SET_BRAND_NAME:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        name:action.payload

                    }
                        }
        case registrationType.SET_BRAND_NAME_ERROR:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        isError:{
                            ...state.brand.isError,
                            name:action.payload
                        }

                    }
                        }    
        case registrationType.SET_BRAND_NAME_ERROR_MESSAGE:
            return {
                ...state,
                brand:{
                    ...state.brand,
                    errorMessage:{
                        ...state.brand.errorMessage,
                        name:action.payload
                    }

                }
                    }     
        case registrationType.SET_BRAND_URL:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        url:action.payload

                    }
                        }
        case registrationType.SET_BRAND_URL_ERROR:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        isError:{
                            ...state.brand.isError,
                            url:action.payload
                        }

                    }
                        }    
        case registrationType.SET_BRAND_URL_ERROR_MESSAGE:
            return {
                ...state,
                brand:{
                    ...state.brand,
                    errorMessage:{
                        ...state.brand.errorMessage,
                        url:action.payload
                    }

                }
                    }   
        case registrationType.SET_BRAND_ACTIVITY:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        activities:action.payload

                    }
                        }
        case registrationType.SET_BRAND_ACTIVITY_ERROR:
            return {
                    ...state,
                    brand:{
                        ...state.brand,
                        isError:{
                            ...state.brand.isError,
                            activities:action.payload
                        }

                    }
                        }    
        case registrationType.SET_BRAND_ACTIVITY_ERROR_MESSAGE:
            return {
                ...state,
                brand:{
                    ...state.brand,
                    errorMessage:{
                        ...state.brand.errorMessage,
                        activities:action.payload
                    }

                }
                    }
                    
        case registrationType.SET_INDIVIDUAL_NAME:
            return {
                    ...state,
                    individual:{
                        ...state.individual,
                        name:action.payload

                    }
                        }
        case registrationType.SET_INDIVIDUAL_NAME_ERROR:
            return {
                    ...state,
                    individual:{
                        ...state.individual,
                        isError:{
                            ...state.individual.isError,
                            name:action.payload
                        }

                    }
                        }    
        case registrationType.SET_REGISTRATION_ERROR:
            return {
                ...state,
                isError:{
                    ...state.isError,
                    registration:action.payload

                }
                    } 
        case registrationType.SET_INDIVIDUAL_NAME_ERROR_MESSAGE:
            return {
                ...state,
                individual:{
                    ...state.individual,
                    errorMessage:{
                        ...state.individual.errorMessage,
                        name:action.payload
                    }

                }
                    }    
        case registrationType.SET_REGISTRATION_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage:{
                    ...state.errorMessage,
                   registration:action.payload

                },
                isLoading: false,
            }
        case registrationType.REGISTER_SUCCESS:
            return {
                ...state,
                success: true,
                isLoading: false
            }
        case registrationType.REGISTER_REQUEST:
            return {
                ...state,       
                isLoading: true         
            }
        case RESET_ALL_TYPE.RESET_ALL:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;



    }



}