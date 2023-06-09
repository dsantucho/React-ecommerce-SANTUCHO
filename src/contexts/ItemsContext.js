import React, {createContext, useReducer,useEffect} from "react";
//PASOS
/*
1 - Crear el contexto con el hook createContext() 
2 - crear el componente provider
3 - retornar nuestro contexto con un .provider 
4 - props.children o children
*/
export const ItemsContext = createContext();
const CART_KEY = "cart";

//crear un contexto para items
//importante mantener el nombre Provider
//se convierte en hook [hight order component] => envolvedor de componentes para pasar propiedades
    
export const ItemsProvider = ({children}) =>{
    const reducer = (state,action)=>{
        switch(action.type){  
            case 'ADD': 
                //evitar el clicking en 1 item y que llene de basura el []
                const aux = state.filter((item)=> action.payload.id === item.id); //el nuevo item ya existe en el array?
                if(aux.length>0){
                    return state;
                }else{
                    return [...state,action.payload];
                }               
            case 'INCREASE':
                const itemIncrease = state.map((item)=>{
                    if(item.id === action.payload.id){
                       return {...item, quantity: item.quantity+1} //tengo el id del item y le sumo
                    }else{
                        return item;
                    }
                });
                return itemIncrease;
            case 'DECREASE':
                const itemDecrease = state.map((item)=>{
                    if(item.id === action.payload.id){
                       return {...item, quantity: item.quantity-1} //tengo el id del item y le sumo
                    }else{
                        return item;
                    }
                });
                return itemDecrease;
            case 'REMOVE':
                const itemRemoved = state.filter((item)=>item.id !== action.payload.id);
                return itemRemoved;
            case 'CLEAN':
                return [];
            default: return state;
        }    
    }

    const submittedReducer = (state, action) => {
        switch (action.type) {
          case "SUBMIT":
            return { submitted: true, purchaseID: action.payload.purchaseID };
          case "RESET":
            return { submitted: false, purchaseID: "" };
          default:
            return state;
        }
      };

    //const [state, dispatch]=useReducer(reducer,[])
    const [state, dispatch] = useReducer(reducer, [], () => {
        const localData = localStorage.getItem(CART_KEY);
        return localData ? JSON.parse(localData) : [];
      });
      
    const [submittedState, submittedDispatch] = useReducer(submittedReducer, {
        submitted: false,
        purchaseID: "",
      });

        // Read from local storage when initializing the state of the cart
    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem(CART_KEY));
        if (cartFromStorage) {
            dispatch({ type: "INITIALIZE", payload: cartFromStorage });
        }
    }, []);

      useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }, [state]);

    const methods={state,dispatch,submittedState,submittedDispatch}; //pongo todos los metodos en 1 arr

    return(
        <ItemsContext.Provider value = {{methods}}>{children}</ItemsContext.Provider>
    )
}

//provider va a envolver a los componentes para pasarse info