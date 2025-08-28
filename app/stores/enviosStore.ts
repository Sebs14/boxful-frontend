'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Envio {
  id: string;
  numeroOrden: string;
  nombre: string;
  apellidos: string;
  departamento: string;
  municipio: string;
  paquetes: number;
  fecha: string;
  estado: 'Entregado' | 'En tránsito' | 'Pendiente' | 'Sin recoger';
}

interface FiltrosState {
  busqueda: string;
  fechas: [string, string] | null;
}

interface EnviosState {
  // Data
  envios: Envio[];
  
  // Selection
  selectedItems: string[];
  
  // Filters
  filtros: FiltrosState;
  filtrosTemp: FiltrosState;
  
  // UI State
  loading: boolean;
  
  // Computed
  enviosFiltrados: Envio[];
  selectAll: boolean;
  
  // Actions - Data
  setEnvios: (envios: Envio[]) => void;
  
  // Actions - Selection
  toggleSelectAll: () => void;
  toggleSelectItem: (id: string) => void;
  clearSelection: () => void;
  
  // Actions - Filters
  setFiltroTemp: (campo: keyof FiltrosState, valor: any) => void;
  aplicarFiltros: () => void;
  limpiarFiltros: () => void;
  
  // Actions - UI
  setLoading: (loading: boolean) => void;
  
  // Actions - Utilities
  downloadSelected: () => void;
  updateEnviosFiltrados: () => void;
}

const enviosMock: Envio[] = [
  {
    id: '1',
    numeroOrden: '3446788',
    nombre: 'Julio',
    apellidos: 'Almendarez',
    departamento: 'San Salvador',
    municipio: 'San Salvador',
    paquetes: 4,
    fecha: '2024-01-15',
    estado: 'Entregado',
  },
  {
    id: '2',
    numeroOrden: '2024020',
    nombre: 'María',
    apellidos: 'García',
    departamento: 'Cundinamarca',
    municipio: 'Bogotá',
    paquetes: 1,
    fecha: '2024-01-16',
    estado: 'En tránsito',
  },
  {
    id: '3',
    numeroOrden: '2024021',
    nombre: 'Carlos',
    apellidos: 'López',
    departamento: 'Valle',
    municipio: 'Cali',
    paquetes: 3,
    fecha: '2024-01-17',
    estado: 'Pendiente',
  },
];

const filtrosIniciales: FiltrosState = {
  busqueda: '',
  fechas: null,
};

export const useEnviosStore = create<EnviosState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      envios: enviosMock,
      selectedItems: [],
      filtros: filtrosIniciales,
      filtrosTemp: filtrosIniciales,
      loading: false,
      enviosFiltrados: enviosMock,
      selectAll: false,
      
      // Actions - Data
      setEnvios: (envios) => {
        set({ envios });
        get().updateEnviosFiltrados();
      },
      
      // Actions - Selection
      toggleSelectAll: () => {
        const { selectAll, enviosFiltrados } = get();
        const newSelectedItems = selectAll ? [] : enviosFiltrados.map(e => e.id);
        set({ 
          selectedItems: newSelectedItems,
          selectAll: !selectAll 
        });
      },
      
      toggleSelectItem: (id) => {
        const { selectedItems } = get();
        const newSelectedItems = selectedItems.includes(id)
          ? selectedItems.filter(item => item !== id)
          : [...selectedItems, id];
        
        set({ selectedItems: newSelectedItems });
        
        // Update selectAll state
        const { enviosFiltrados } = get();
        const allSelected = enviosFiltrados.length > 0 && 
          enviosFiltrados.every(envio => newSelectedItems.includes(envio.id));
        set({ selectAll: allSelected });
      },
      
      clearSelection: () => set({ 
        selectedItems: [], 
        selectAll: false 
      }),
      
      // Actions - Filters
      setFiltroTemp: (campo, valor) => set((state) => ({
        filtrosTemp: { ...state.filtrosTemp, [campo]: valor }
      })),
      
      aplicarFiltros: () => {
        const { filtrosTemp } = get();
        set({ filtros: { ...filtrosTemp } });
        get().updateEnviosFiltrados();
        get().clearSelection(); // Limpiar selección al aplicar filtros
      },
      
      limpiarFiltros: () => {
        set({ 
          filtros: filtrosIniciales,
          filtrosTemp: filtrosIniciales 
        });
        get().updateEnviosFiltrados();
        get().clearSelection();
      },
      
      // Actions - UI
      setLoading: (loading) => set({ loading }),
      
      // Actions - Utilities
      downloadSelected: () => {
        const { selectedItems, envios } = get();
        const selectedEnvios = envios.filter(envio => selectedItems.includes(envio.id));
        
        console.log(`Descargando ${selectedItems.length} orden(es):`, selectedEnvios);
        alert(`Descargando ${selectedItems.length} orden(es) seleccionada(s)`);
        
        // Aquí iría la lógica real de descarga
        // Por ejemplo: API call, generar PDF, etc.
      },
      
      updateEnviosFiltrados: () => {
        const { envios, filtros } = get();
        
        const filtrados = envios.filter((envio) => {
          // Filtro de búsqueda
          const cumpleBusqueda = !filtros.busqueda || 
            envio.numeroOrden.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            envio.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
            envio.apellidos.toLowerCase().includes(filtros.busqueda.toLowerCase());

          // Filtro de fecha
          let cumpleFecha = true;
          if (filtros.fechas && filtros.fechas[0] && filtros.fechas[1]) {
            const fechaEnvio = new Date(envio.fecha);
            const fechaInicio = new Date(filtros.fechas[0]);
            const fechaFin = new Date(filtros.fechas[1]);
            cumpleFecha = fechaEnvio >= fechaInicio && fechaEnvio <= fechaFin;
          }

          return cumpleBusqueda && cumpleFecha;
        });
        
        set({ enviosFiltrados: filtrados });
        
        // Update selectAll state based on filtered results
        const { selectedItems } = get();
        const allSelected = filtrados.length > 0 && 
          filtrados.every(envio => selectedItems.includes(envio.id));
        set({ selectAll: allSelected });
      },
    }),
    {
      name: 'envios-storage',
      partialize: (state) => ({
        // Solo persistir los filtros, no los datos ni selecciones
        filtros: state.filtros,
        filtrosTemp: state.filtrosTemp,
      }),
    }
  )
);
