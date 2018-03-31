const addSpend = (state = [], action) => {
  switch (action.type) {
    case "ADD_SPEND":
      return [
        ...state,
        {
          id: action.id,
          value: action.value,
          name: action.name
        }
      ];
    default:
      return state;
  }
};

export default addSpend;
