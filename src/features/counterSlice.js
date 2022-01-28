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
  }
   
  },
 
 
});

export const {setIcon,setSearchDestinationText, setDestinationName,setDistance,setMaps, setTab,setDriver,setUsers,setMe,setCourse,setLoading,setType,setDepart,setDestination } = counterSlice.actions;


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
export default counterSlice.reducer;
