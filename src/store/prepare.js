import { defineStore } from 'pinia'
import { api } from "@/helpers"
import router  from "@/route"
import { close, start } from '@/helpers/nprogress'
export const usePrepareStore = defineStore('prepare-store',  {
  state:()=>{
    return{
      custptypes:[],
      provinces:[],
      custpcodes:[],
      contractnos:[],
      equips:[],
      dcustptypes:[],
      dprovinces:[],
      dcustpcodes:[],
    }
  },
  actions:{
    setSCustptype(data){
      this.custptypes=data.map((it,i)=>it)
    },
    setSCustpcode(data){
      this.custpcodes=data.map((it,i)=>it)
    },
    setSProvince(data){
      this.provinces=data.map((it,i)=>it)
    },
    setSContract(data){
      this.contractnos=data.map((it,i)=>it)
    },
    setSEquip(data){
      this.equips=data.map((it,i)=>it)
    },
    setSDCustptype(data){
      this.dcustptypes=data.map((it,i)=>it)
    },
    setSDCustpcode(data){
      this.dcustpcodes=data.map((it,i)=>it)
    },
    setSDProvince(data){
      this.dprovinces=data.map((it,i)=>it)
    },
  }
})
