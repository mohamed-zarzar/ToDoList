import {createSlice } from '@reduxjs/toolkit'
import { ModeType } from '../../../type/type';
import { DarkIcon,LightIcon} from '../../images/indext';


const LIGHT_MODE : ModeType = {
    name:"light",
    mainBackgroundColor: "#FAFAFA",
    taskBackgroundColor: "#FFFFFF",
    textColor : "#49485A",
    icon: LightIcon,
}
const DARK_MODE : ModeType = {
    name:"dark",
    mainBackgroundColor: "#181824",
    taskBackgroundColor: "#25273C",
    textColor : "#8A8CA3",
    icon: DarkIcon,
}

const initialState : ModeType = LIGHT_MODE;



const modeSlice = createSlice({
    name: 'modeSlice',
    initialState,
    reducers: {
        changeMode: (state) => {
            if(state.name === "light") return DARK_MODE;
            return LIGHT_MODE;
        },
    },
}
)

export default modeSlice.reducer;
export const { changeMode} = modeSlice.actions;