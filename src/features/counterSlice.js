import {  createSlice } from '@reduxjs/toolkit';


const initialState = {
  tab:0,
  driver:null,
  users:[],
  me:null,
  course:null,
  loading:false,
  type:0,
  icon:null,
  depart:null,
  destination:null,
  destinationName:"",
  distance:0,
  map:null,
  searchDestinationText:"",
  tarifs:[],
  publicites:[],
  publicite:null,
  courses:[],
  adminPilote:null,
  adminSoldeClient:[],
  adminClient:null,
  adminClients:[],
  etape:1,
  code:null,
  login:null,
  oldLogin:null,
  onLine:false,
  
};



export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    setTab:(state,action)=>{
      state.tab=action.payload;
    },
    setDriver:(state,action)=>{
      state.driver=action.payload;
    },
    setUsers:(state,action)=>{
      state.users=action.payload;
    },
    setMe:(state,action)=>{
      state.me=action.payload;
    },
	setCourse:(state,action)=>{
		state.course=action.payload;
	},
	setLoading:(state,action)=>{
		state.loading=action.payload;
	},
  setType:(state,action)=>{
    state.type=action.payload;
  },

  setDepart:(state,action)=>{
    state.depart=action.payload;
  },

  setDestination:(state,action)=>{
    state.destination=action.payload;
  },

  setMaps:(state,action)=>{
    state.map=action.payload;
  },

  setDistance:(state,action)=>{
    state.distance=action.payload;
  },

  setDestinationName:(state,action)=>{
    state.destinationName=action.payload;
  },

  setSearchDestinationText:(state,action)=>{
    state.searchDestinationText=action.payload;
  },
  setIcon:(state,action)=>{
    state.icon=action.payload;
  },

  setTarifs:(state,action)=>{
    state.tarifs=action.payload;
  },

  setPublicites:(state,action)=>{
    state.publicites=action.payload;
  },
  setPublicite:(state,action)=>{
    state.publicite=action.payload;
  },
  setCourses:(state,action)=>{
    state.courses=action.payload;
  },
  setAdminPilote:(state,action)=>{
    state.adminPilote=action.payload;
  },
  setAdminSoldeClient:(state,action)=>{
    state.adminSoldeClient=action.payload;
  },
  setAdminClient:(state,action)=>{
    state.adminClient=action.payload;
  },
  setAdminClients:(state,action)=>{
    state.adminClients=action.payload;
  },
  setEtape:(state,action)=>{
    state.etape=action.payload;
  },
  setCode:(state,action)=>{
    state.code=action.payload;
  },
  setLogin:(state,action)=>{
    state.login=action.payload;
  },
  setOldLogin:(state,action)=>{
    state.oldLogin=action.payload;
  },
  setOnline:(state,action)=>{
    state.onLine=action.payload;
  }
   
  

},
});

export const {
  setIcon,
  setSearchDestinationText, 
  setDestinationName,
  setDistance,setMaps, 
  setTab,
  setDriver,
  setUsers,
  setMe,
  setCourse,
  setLoading,
  setType,
  setDepart,
  setDestination,
  setTarifs,
  setPublicites,
  setPublicite,
  setCourses,
  setAdminPilote,
  setAdminSoldeClient,
  setAdminClient,
  setAdminClients,
  setEtape,
  setCode,
  setLogin,
  setOldLogin,
  setOnline

} = counterSlice.actions;


export const selectTab = (state) => state.counter.tab;
export const selectDriver=(state)=>state.counter.driver;
export const selectUsers= (state) => state.counter.users;
export const selectMe=(state)=> state.counter.me;
export const selectCourse=(state)=>state.counter.course;
export const selectLoading=(state)=>state.counter.loading;
export const selectType=(state)=> state.counter.type;
export const selectDepart=(state)=> state.counter.depart;
export const selectDestination=(state)=> state.counter.destination;
export const selectMap=(state)=> state.counter.map;
export const selectDistance=(state)=> state.counter.distance;
export const selectDestinationName=(state)=> state.counter.destinationName;
export const selectSearchDestinationText=(state)=> state.counter.searchDestinationText;
export const selectIcon=(state)=> state.counter.icon;
export const selectTarifs=(state)=> state.counter.tarifs;
export const selectPublicites=(state)=> state.counter.publicites;
export const selectPulicite=(state)=> state.counter.publicite;
export const selectCourses=(state)=> state.counter.courses;
export const selectAdminPilote=(state)=> state.counter.adminPilote;
export const selectAdminSoldeClient=(state)=> state.counter.adminSoldeClient;
export const selectAdminClient=(state)=> state.counter.adminClient;
export const selectAdminClients=(state)=> state.counter.adminClients;
export const selectEtape=(state)=> state.counter.etape;
export const selectCode=(state)=> state.counter.code;
export const selectLogin=(state)=> state.counter.login;
export const selectOldLogin=(state)=> state.counter.oldLogin;
export const selectOnline=(state)=> state.counter.onLine;

export default counterSlice.reducer;
