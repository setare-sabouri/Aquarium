import {create} from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'


export default create(subscribeWithSelector(
  (set)=>({
    rockCount: 10,
    hiddenBallIndex: Math.floor(Math.random() * 10),
    blockSeed:0,
    startTime: 0,
    endtime: 0,
    gamePhase: 'ready',

    startGame:()=>{
      set((state)=>{
        if(state.gamePhase === 'ready'){
          return{
            gamePhase:'playing',
            startTime:Date.now(),
            hiddenBallIndex: Math.floor(Math.random() * state.rockCount)
          }
        }
        
        else return{}
      
      })

    },

    restartGame:()=>{
      set((state)=>{
        if(state.gamePhase === 'playing' || state.gamePhase === 'ended'){
          return{
            gamePhase:'ready', blockSeed:Math.random(),
          }
        }
        else return{}
       
      })
    },

    endGame:()=>{
      set((state)=>{

        if(state.gamePhase==='playing'){

          return{ gamePhase:'ended',endtime:Date.now() }
        }
        else return{}
      
      })
    }
})
))