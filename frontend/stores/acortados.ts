import { Store } from "@tanstack/react-store";
import { AcortadoResponse } from '@/types'


const initialState = {
  data: [],
  links: {
    next: null,
    previous: null,
    page: 0,
    total: 0,
    per_page: 0,
  },
  isLoading: false,
} as AcortadoResponse;

const useAcortados = new Store(initialState);

export default useAcortados;