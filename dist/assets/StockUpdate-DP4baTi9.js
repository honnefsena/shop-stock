import{_ as a,o as n,c as u,a as e,t as l,w as m,b as c,v as p}from"./index-DyvGHz3B.js";const b={name:"StockUpdate",props:{product:{type:Object,required:!0}},data(){return{formData:{quantity:0}}},mounted(){this.product.currentQuantity!==void 0&&(this.formData.quantity=this.product.currentQuantity)},methods:{handleSubmit(){this.$emit("save",this.formData)}}},f={class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"},y={class:"relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"},g={class:"mt-3"},h={class:"text-lg font-medium text-gray-900"},v={class:"mb-4"},x={class:"mt-6 flex justify-end space-x-3"};function w(r,t,d,_,s,i){return n(),u("div",f,[e("div",y,[e("div",g,[e("h3",h," Atualizar estoque de "+l(d.product.name),1),e("form",{onSubmit:t[2]||(t[2]=m((...o)=>i.handleSubmit&&i.handleSubmit(...o),["prevent"])),class:"mt-4"},[e("div",v,[t[3]||(t[3]=e("label",{class:"block text-sm font-medium text-gray-700"},"Qtde",-1)),c(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>s.formData.quantity=o),type:"number",required:"",min:"0",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"},null,512),[[p,s.formData.quantity,void 0,{number:!0}]])]),e("div",x,[e("button",{type:"button",onClick:t[1]||(t[1]=o=>r.$emit("close")),class:"px-4 py-2 border rounded-md hover:bg-gray-100"}," Cancelar "),t[4]||(t[4]=e("button",{type:"submit",class:"px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"}," Atualizar ",-1))])],32)])])])}const k=a(b,[["render",w]]);export{k as S};
