import{_ as y,o as i,c,a as e,b as _,v as f,F as p,r as h,t as l,f as x,m as S,d as v,i as $,g as b,e as w}from"./index-QeQczCHG.js";const k={name:"SearchableSelect",props:{products:{type:Array,required:!0},modelValue:{type:[String,Number],default:""}},data(){return{searchQuery:"",showDropdown:!1,selectedProduct:null,closeListener:null}},computed:{filteredProducts(){const s=this.searchQuery.toLowerCase();return this.products.filter(t=>t.name.toLowerCase().includes(s))}},watch:{value:{immediate:!0,handler(s){s&&(this.selectedProduct=this.products.find(t=>t.id===s),this.searchQuery=this.selectedProduct?this.selectedProduct.name:"")}}},methods:{handleInput(){this.searchQuery===""&&this.clearSelection()},clearSelection(){this.selectedProduct=null,this.searchQuery="",this.$emit("input",""),this.$emit("change","")},selectProduct(s){this.selectedProduct=s,this.searchQuery=s.name,this.showDropdown=!1,this.$emit("update:modelValue",s.id),this.$emit("change",s.id)},handleClickOutside(s){this.$el.contains(s.target)||(this.showDropdown=!1)}},mounted(){this.closeListener=s=>this.handleClickOutside(s),document.addEventListener("click",this.closeListener)},beforeDestroy(){this.closeListener&&document.removeEventListener("click",this.closeListener)}},I={class:"relative"},C={class:"relative mt-1"},D=["placeholder"],P={key:0,class:"absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto"},N={class:"py-1"},V=["onClick"],q={key:0,class:"px-3 py-2 text-gray-500"};function L(s,t,a,g,o,n){return i(),c("div",I,[t[3]||(t[3]=e("label",{class:"block text-sm font-medium text-gray-700"},"Produto",-1)),e("div",C,[_(e("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500","onUpdate:modelValue":t[0]||(t[0]=d=>o.searchQuery=d),onInput:t[1]||(t[1]=(...d)=>n.handleInput&&n.handleInput(...d)),onFocus:t[2]||(t[2]=d=>o.showDropdown=!0),placeholder:o.selectedProduct?o.selectedProduct.name:"Selecione um Produto"},null,40,D),[[f,o.searchQuery]]),o.showDropdown?(i(),c("div",P,[e("ul",N,[(i(!0),c(p,null,h(n.filteredProducts,d=>(i(),c("li",{key:d.id,onClick:r=>n.selectProduct(d),class:"px-3 py-2 hover:bg-gray-100 cursor-pointer"},l(d.name)+" - R$"+l(d.sell_price),9,V))),128)),n.filteredProducts.length===0?(i(),c("li",q," Nenhum produto encontrado ")):x("",!0)])])):x("",!0)])])}const T=y(k,[["render",L]]),Q={name:"NewSale",components:{SearchableSelect:T},data(){return{currentItem:{product_id:"",quantity:1,discount_percentage:0,unit_price:0},items:[]}},computed:{...S("products",{products:s=>s.items,loading:s=>s.loading,error:s=>s.error}),canAddItem(){return this.currentItem.product_id&&this.currentItem.quantity>0&&this.currentItem.unit_price>0},calculateTotal(){return this.items.reduce((t,a)=>t+parseFloat(this.calculateItemTotal(a)),0).toFixed(2)}},methods:{...v("products",["fetchProducts"]),...v("sales",["createSale"]),onProductChange(){if(this.currentItem.product_id){const s=this.products.find(t=>t.id===this.currentItem.product_id);this.currentItem.unit_price=s.sell_price}else this.currentItem.unit_price=0},getProductName(s){const t=this.products.find(a=>a.id===s);return t?t.name:""},calculateItemTotal(s){const t=s.unit_price*s.quantity,a=t*(s.discount_percentage/100);return(t-a).toFixed(2)},addItem(){this.canAddItem&&(this.items.push({...this.currentItem}),this.currentItem={product_id:"",quantity:1,discount_percentage:0,unit_price:0})},removeItem(s){this.items.splice(s,1)},async completeSale(){try{await this.createSale({items:this.items}),this.$emit("sale-complete")}catch(s){console.error("Error creating sale:",s)}}},mounted(){this.fetchProducts()}},j={class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"},F={class:"relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white"},M={class:"mt-3"},R={class:"flex justify-between items-center"},A={class:"mt-4"},B={class:"flex space-x-4"},E={class:"flex-1"},U={class:"w-32"},O={class:"w-32"},z={class:"flex items-end"},G=["disabled"],H={class:"mt-6"},J={class:"mt-2"},K={class:"min-w-full divide-y divide-gray-200"},W={class:"divide-y divide-gray-200"},X={class:"px-4 py-2"},Y={class:"px-4 py-2"},Z={class:"px-4 py-2"},ee={class:"px-4 py-2"},te={class:"px-4 py-2"},se={class:"px-4 py-2"},oe=["onClick"],le={class:"mt-6 flex justify-end"},ne={class:"text-lg font-medium"},de={class:"mt-6 flex justify-end space-x-3"},re=["disabled"];function ie(s,t,a,g,o,n){const d=b("SearchableSelect");return i(),c("div",j,[e("div",F,[e("div",M,[e("div",R,[t[8]||(t[8]=e("h3",{class:"text-lg font-medium text-gray-900"},"Nova Venda",-1)),e("button",{onClick:t[0]||(t[0]=r=>s.$emit("close")),class:"text-gray-400 hover:text-gray-500"},t[7]||(t[7]=[e("span",{class:"sr-only"},"Fechar",-1),e("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),e("div",A,[e("div",B,[e("div",E,[$(d,{products:s.products,modelValue:o.currentItem.product_id,"onUpdate:modelValue":t[1]||(t[1]=r=>o.currentItem.product_id=r),onChange:n.onProductChange},null,8,["products","modelValue","onChange"])]),e("div",U,[t[9]||(t[9]=e("label",{class:"block text-sm font-medium text-gray-700"},"Qtd.",-1)),_(e("input",{"onUpdate:modelValue":t[2]||(t[2]=r=>o.currentItem.quantity=r),type:"number",min:"1",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"},null,512),[[f,o.currentItem.quantity,void 0,{number:!0}]])]),e("div",O,[t[10]||(t[10]=e("label",{class:"block text-sm font-medium text-gray-700"},"Desconto %",-1)),_(e("input",{"onUpdate:modelValue":t[3]||(t[3]=r=>o.currentItem.discount_percentage=r),type:"number",min:"0",max:"100",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"},null,512),[[f,o.currentItem.discount_percentage,void 0,{number:!0}]])]),e("div",z,[e("button",{onClick:t[4]||(t[4]=(...r)=>n.addItem&&n.addItem(...r)),disabled:!n.canAddItem,class:"px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"}," Adicionar Item ",8,G)])])]),e("div",H,[t[12]||(t[12]=e("h4",{class:"text-sm font-medium text-gray-700"},"Itens da Venda",-1)),e("div",J,[e("table",K,[t[11]||(t[11]=e("thead",null,[e("tr",null,[e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Produto "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Qtd. "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Preço "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Desconto "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Total "),e("th",{class:"px-4 py-2"})])],-1)),e("tbody",W,[(i(!0),c(p,null,h(o.items,(r,u)=>(i(),c("tr",{key:u},[e("td",X,l(n.getProductName(r.product_id)),1),e("td",Y,l(r.quantity),1),e("td",Z,"R$"+l(r.unit_price),1),e("td",ee,l(r.discount_percentage)+"%",1),e("td",te,"R$"+l(n.calculateItemTotal(r)),1),e("td",se,[e("button",{onClick:m=>n.removeItem(u),class:"text-red-600 hover:text-red-900"}," Remover ",8,oe)])]))),128))])])])]),e("div",le,[e("div",ne,"Total: R$"+l(n.calculateTotal),1)]),e("div",de,[e("button",{onClick:t[5]||(t[5]=r=>s.$emit("close")),class:"px-4 py-2 border rounded-md hover:bg-gray-100"}," Cancelar "),e("button",{onClick:t[6]||(t[6]=(...r)=>n.completeSale&&n.completeSale(...r)),disabled:o.items.length===0,class:"px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"}," Concluir Venda ",8,re)])])])])}const ae=y(Q,[["render",ie]]),ce={name:"SaleDetails",props:{sale:{type:Object,required:!0}},computed:{totalItems(){return this.sale.items.reduce((s,t)=>s+t.quantity,0)}},methods:{calculateItemTotal(s){const t=s.unit_price*s.quantity,a=t*(s.discount_percentage/100);return(t-a).toFixed(2)}}},ue={class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"},me={class:"relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white"},pe={class:"mt-3"},he={class:"flex justify-between items-center mb-4"},xe={class:"text-lg font-medium text-gray-900"},ye={class:"mb-6"},ge={class:"grid grid-cols-2 gap-4"},_e={class:"text-sm font-medium"},fe={class:"text-sm font-medium"},ve={class:"border rounded-lg overflow-hidden"},be={class:"min-w-full divide-y divide-gray-200"},we={class:"bg-white divide-y divide-gray-200"},Se={class:"px-4 py-2 text-sm"},$e={class:"px-4 py-2 text-sm"},ke={class:"px-4 py-2 text-sm"},Ie={class:"px-4 py-2 text-sm"},Ce={class:"px-4 py-2 text-sm"},De={class:"mt-6 flex justify-between items-center"},Pe={class:"text-sm text-gray-500"},Ne={class:"text-lg font-medium"},Ve={class:"mt-6 flex justify-end"};function qe(s,t,a,g,o,n){return i(),c("div",ue,[e("div",me,[e("div",pe,[e("div",he,[e("h3",xe," Detalhes da venda #"+l(a.sale.id),1),e("button",{onClick:t[0]||(t[0]=d=>s.$emit("close")),class:"text-gray-400 hover:text-gray-500"},t[2]||(t[2]=[e("span",{class:"sr-only"},"Fechar",-1),e("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),e("div",ye,[e("div",ge,[e("div",null,[t[3]||(t[3]=e("p",{class:"text-sm text-gray-500"},"Data",-1)),e("p",_e,l(new Date(a.sale.sale_date).toLocaleString()),1)]),e("div",null,[t[4]||(t[4]=e("p",{class:"text-sm text-gray-500"},"Valor total",-1)),e("p",fe,"R$ "+l(a.sale.total_amount),1)])])]),e("div",ve,[e("table",be,[t[5]||(t[5]=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Produto "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Qtde "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Preço "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Desconto "),e("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Total ")])],-1)),e("tbody",we,[(i(!0),c(p,null,h(a.sale.items,d=>(i(),c("tr",{key:d.id},[e("td",Se,l(d.product_name),1),e("td",$e,l(d.quantity),1),e("td",ke,"R$ "+l(d.unit_price),1),e("td",Ie,l(d.discount_percentage)+"% ",1),e("td",Ce," R$ "+l(n.calculateItemTotal(d)),1)]))),128))])])]),e("div",De,[e("div",Pe," Total de itens: "+l(n.totalItems),1),e("div",Ne," Total: R$ "+l(a.sale.total_amount),1)]),e("div",Ve,[e("button",{onClick:t[1]||(t[1]=d=>s.$emit("close")),class:"px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"}," Fechar ")])])])])}const Le=y(ce,[["render",qe]]),Te={name:"Sales",components:{NewSale:ae,SaleDetails:Le},data(){return{showNewSaleModal:!1,selectedSale:null}},computed:{...S("sales",{sales:s=>s.items,loading:s=>s.loading,error:s=>s.error})},methods:{...v("sales",["fetchSales"]),viewSaleDetails(s){this.selectedSale=s},onSaleComplete(){this.showNewSaleModal=!1,this.fetchSales()}},mounted(){this.fetchSales()}},Qe={class:"container"},je={class:"mb-6 flex justify-between items-center"},Fe={class:"bg-white shadow rounded-lg overflow-hidden"},Me={class:"min-w-full divide-y divide-gray-200"},Re={class:"bg-white divide-y divide-gray-200"},Ae={class:"px-6 py-4 whitespace-nowrap"},Be={class:"px-6 py-4 whitespace-nowrap"},Ee={class:"px-6 py-4"},Ue={class:"px-6 py-4 whitespace-nowrap"},Oe={class:"px-6 py-4 whitespace-nowrap"},ze=["onClick"];function Ge(s,t,a,g,o,n){const d=b("NewSale"),r=b("SaleDetails");return i(),c("div",Qe,[e("div",je,[t[3]||(t[3]=e("h2",{class:"text-2xl font-bold text-gray-900"},"Vendas",-1)),e("button",{onClick:t[0]||(t[0]=u=>o.showNewSaleModal=!0),class:"bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"}," + Nova venda ")]),e("div",Fe,[e("table",Me,[t[4]||(t[4]=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," ID Venda "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Data "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Itens "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Total "),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Ações ")])],-1)),e("tbody",Re,[(i(!0),c(p,null,h(s.sales,u=>(i(),c("tr",{key:u.id},[e("td",Ae,"#"+l(u.id),1),e("td",Be,l(new Date(u.sale_date).toLocaleDateString()),1),e("td",Ee,[(i(!0),c(p,null,h(u.items,m=>(i(),c("div",{key:m.id,class:"text-sm"},l(m.quantity)+"x "+l(m.product_name),1))),128))]),e("td",Ue," $"+l(u.total_amount),1),e("td",Oe,[e("button",{onClick:m=>n.viewSaleDetails(u),class:"text-indigo-600 hover:text-indigo-900"}," Detalhes ",8,ze)])]))),128))])])]),o.showNewSaleModal?(i(),w(d,{key:0,onClose:t[1]||(t[1]=u=>o.showNewSaleModal=!1),onSaleComplete:n.onSaleComplete},null,8,["onSaleComplete"])):x("",!0),o.selectedSale?(i(),w(r,{key:1,sale:o.selectedSale,onClose:t[2]||(t[2]=u=>o.selectedSale=null)},null,8,["sale"])):x("",!0)])}const Je=y(Te,[["render",Ge]]);export{Je as default};
