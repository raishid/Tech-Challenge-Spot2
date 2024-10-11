import { Store } from "@tanstack/react-store";

const initialState = {
  url: "",
  error: "",
  isLoading: false,
  shorten: "",
};

const useAcortadorStore = new Store(initialState);

export default useAcortadorStore;
