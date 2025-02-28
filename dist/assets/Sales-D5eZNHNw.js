import{_ as g,o as r,c,a as t,b as m,v,F as h,r as x,t as l,f as y,m as k,d as b,i as I,j as _,g as w,e as S}from"./index-BKT9nEQQ.js";const $={name:"SearchableSelect",props:{products:{type:Array,required:!0},modelValue:{type:[String,Number],default:""}},data(){return{searchQuery:"",showDropdown:!1,selectedProduct:null,closeListener:null}},computed:{filteredProducts(){const s=this.searchQuery.toLowerCase();return this.products.filter(e=>e.name.toLowerCase().includes(s))}},watch:{value:{immediate:!0,handler(s){s&&(this.selectedProduct=this.products.find(e=>e.id===s),this.searchQuery=this.selectedProduct?this.selectedProduct.name:"")}}},methods:{handleInput(){this.searchQuery===""&&this.clearSelection()},clearSelection(){this.selectedProduct=null,this.searchQuery="",this.$emit("input",""),this.$emit("change","")},selectProduct(s){this.selectedProduct=s,this.searchQuery=s.name,this.showDropdown=!1,this.$emit("update:modelValue",s.id),this.$emit("change",s.id)},handleClickOutside(s){this.$el.contains(s.target)||(this.showDropdown=!1)}},mounted(){this.closeListener=s=>this.handleClickOutside(s),document.addEventListener("click",this.closeListener)},beforeDestroy(){this.closeListener&&document.removeEventListener("click",this.closeListener)}},C={class:"relative"},P={class:"relative mt-1"},M=["placeholder"],D={key:0,class:"absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto"},N={class:"py-1"},V=["onClick"],q={key:0,class:"px-3 py-2 text-gray-500"};function L(s,e,a,f,o,d){return r(),c("div",C,[e[3]||(e[3]=t("label",{class:"block text-sm font-medium text-gray-700"},"Produto",-1)),t("div",P,[m(t("input",{type:"text",class:"w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500","onUpdate:modelValue":e[0]||(e[0]=i=>o.searchQuery=i),onInput:e[1]||(e[1]=(...i)=>d.handleInput&&d.handleInput(...i)),onFocus:e[2]||(e[2]=i=>o.showDropdown=!0),placeholder:o.selectedProduct?o.selectedProduct.name:"Selecione um Produto"},null,40,M),[[v,o.searchQuery]]),o.showDropdown?(r(),c("div",D,[t("ul",N,[(r(!0),c(h,null,x(d.filteredProducts,i=>(r(),c("li",{key:i.id,onClick:n=>d.selectProduct(i),class:"px-3 py-2 hover:bg-gray-100 cursor-pointer"},l(i.name)+" - R$"+l(i.sell_price),9,V))),128)),d.filteredProducts.length===0?(r(),c("li",q," Nenhum produto encontrado ")):y("",!0)])])):y("",!0)])])}const T=g($,[["render",L]]),j={name:"NewSale",components:{SearchableSelect:T},data(){return{currentItem:{product_id:"",quantity:1,discount_percentage:0,unit_price:0},items:[],paymentMethod:"cartao"}},computed:{...k("products",{products:s=>s.items,loading:s=>s.loading,error:s=>s.error}),canAddItem(){return this.currentItem.product_id&&this.currentItem.quantity>0&&this.currentItem.unit_price>0},calculateTotal(){return this.items.reduce((e,a)=>e+parseFloat(this.calculateItemTotal(a)),0).toFixed(2)}},methods:{...b("products",["fetchProducts"]),...b("sales",["createSale"]),onProductChange(){if(this.currentItem.product_id){const s=this.products.find(e=>e.id===this.currentItem.product_id);this.currentItem.unit_price=s.sell_price}else this.currentItem.unit_price=0},getProductName(s){const e=this.products.find(a=>a.id===s);return e?e.name:""},calculateItemTotal(s){const e=s.unit_price*s.quantity,a=e*(s.discount_percentage/100);return(e-a).toFixed(2)},addItem(){this.canAddItem&&(this.items.push({...this.currentItem}),this.currentItem={product_id:"",quantity:1,discount_percentage:0,unit_price:0})},removeItem(s){this.items.splice(s,1)},async completeSale(){try{console.log("Sending sale data:",{items:this.items,payment_method:this.paymentMethod}),await this.createSale({items:this.items,payment_method:this.paymentMethod}),this.$emit("sale-complete")}catch(s){console.error("Error creating sale:",s)}}},mounted(){this.fetchProducts()}},Q={class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"},F={class:"relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white"},R={class:"mt-3"},A={class:"flex justify-between items-center"},U={class:"mt-4"},B={class:"flex space-x-4"},E={class:"flex-1"},O={class:"w-32"},X={class:"w-32"},z={class:"flex items-end"},G=["disabled"],H={class:"mt-6"},J={class:"mt-2"},K={class:"min-w-full divide-y divide-gray-200"},W={class:"divide-y divide-gray-200"},Y={class:"px-4 py-2"},Z={class:"px-4 py-2"},tt={class:"px-4 py-2"},et={class:"px-4 py-2"},st={class:"px-4 py-2"},ot={class:"px-4 py-2"},nt=["onClick"],lt={class:"mt-6"},dt={class:"mt-2 flex space-x-4"},it={class:"flex items-center"},rt={class:"flex items-center"},at={class:"flex items-center"},ct={class:"mt-6 flex justify-end"},ut={class:"text-lg font-medium"},mt={class:"mt-6 flex justify-end space-x-3"},pt=["disabled"];function ht(s,e,a,f,o,d){const i=w("SearchableSelect");return r(),c("div",Q,[t("div",F,[t("div",R,[t("div",A,[e[11]||(e[11]=t("h3",{class:"text-lg font-medium text-gray-900"},"Nova Venda",-1)),t("button",{onClick:e[0]||(e[0]=n=>s.$emit("close")),class:"text-gray-400 hover:text-gray-500"},e[10]||(e[10]=[t("span",{class:"sr-only"},"Fechar",-1),t("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),t("div",U,[t("div",B,[t("div",E,[I(i,{products:s.products,modelValue:o.currentItem.product_id,"onUpdate:modelValue":e[1]||(e[1]=n=>o.currentItem.product_id=n),onChange:d.onProductChange},null,8,["products","modelValue","onChange"])]),t("div",O,[e[12]||(e[12]=t("label",{class:"block text-sm font-medium text-gray-700"},"Qtd.",-1)),m(t("input",{"onUpdate:modelValue":e[2]||(e[2]=n=>o.currentItem.quantity=n),type:"number",min:"1",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"},null,512),[[v,o.currentItem.quantity,void 0,{number:!0}]])]),t("div",X,[e[13]||(e[13]=t("label",{class:"block text-sm font-medium text-gray-700"},"Desconto %",-1)),m(t("input",{"onUpdate:modelValue":e[3]||(e[3]=n=>o.currentItem.discount_percentage=n),type:"number",min:"0",max:"100",class:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"},null,512),[[v,o.currentItem.discount_percentage,void 0,{number:!0}]])]),t("div",z,[t("button",{onClick:e[4]||(e[4]=(...n)=>d.addItem&&d.addItem(...n)),disabled:!d.canAddItem,class:"px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"}," Adicionar Item ",8,G)])])]),t("div",H,[e[15]||(e[15]=t("h4",{class:"text-sm font-medium text-gray-700"},"Itens da Venda",-1)),t("div",J,[t("table",K,[e[14]||(e[14]=t("thead",null,[t("tr",null,[t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Produto "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Qtd. "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Preço "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Desconto "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Total "),t("th",{class:"px-4 py-2"})])],-1)),t("tbody",W,[(r(!0),c(h,null,x(o.items,(n,u)=>(r(),c("tr",{key:u},[t("td",Y,l(d.getProductName(n.product_id)),1),t("td",Z,l(n.quantity),1),t("td",tt,"R$"+l(n.unit_price),1),t("td",et,l(n.discount_percentage)+"%",1),t("td",st,"R$"+l(d.calculateItemTotal(n)),1),t("td",ot,[t("button",{onClick:p=>d.removeItem(u),class:"text-red-600 hover:text-red-900"}," Remover ",8,nt)])]))),128))])])])]),t("div",lt,[e[19]||(e[19]=t("label",{class:"block text-sm font-medium text-gray-700"},"Método pagto",-1)),t("div",dt,[t("div",it,[m(t("input",{id:"pix",name:"payment_method",type:"radio","onUpdate:modelValue":e[5]||(e[5]=n=>o.paymentMethod=n),value:"pix",class:"h-4 w-4 text-indigo-600 focus:ring-indigo-500"},null,512),[[_,o.paymentMethod]]),e[16]||(e[16]=t("label",{for:"pix",class:"ml-2 text-sm text-gray-700"},"PIX",-1))]),t("div",rt,[m(t("input",{id:"cartao",name:"payment_method",type:"radio","onUpdate:modelValue":e[6]||(e[6]=n=>o.paymentMethod=n),value:"cartao",class:"h-4 w-4 text-indigo-600 focus:ring-indigo-500"},null,512),[[_,o.paymentMethod]]),e[17]||(e[17]=t("label",{for:"cartao",class:"ml-2 text-sm text-gray-700"},"Cartão",-1))]),t("div",at,[m(t("input",{id:"dinheiro",name:"payment_method",type:"radio","onUpdate:modelValue":e[7]||(e[7]=n=>o.paymentMethod=n),value:"dinheiro",class:"h-4 w-4 text-indigo-600 focus:ring-indigo-500"},null,512),[[_,o.paymentMethod]]),e[18]||(e[18]=t("label",{for:"dinheiro",class:"ml-2 text-sm text-gray-700"},"Dinheiro",-1))])])]),t("div",ct,[t("div",ut,"Total: R$"+l(d.calculateTotal),1)]),t("div",mt,[t("button",{onClick:e[8]||(e[8]=n=>s.$emit("close")),class:"px-4 py-2 border rounded-md hover:bg-gray-100"}," Cancelar "),t("button",{onClick:e[9]||(e[9]=(...n)=>d.completeSale&&d.completeSale(...n)),disabled:o.items.length===0,class:"px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"}," Concluir Venda ",8,pt)])])])])}const xt=g(j,[["render",ht]]),yt={name:"SaleDetails",props:{sale:{type:Object,required:!0}},computed:{totalItems(){return this.sale.items.reduce((s,e)=>s+e.quantity,0)}},methods:{calculateItemTotal(s){const e=s.unit_price*s.quantity,a=e*(s.discount_percentage/100);return(e-a).toFixed(2)},formatPaymentMethod(s){return s?{pix:"PIX",cartao:"Cartão",dinheiro:"Dinheiro"}[s]||s:"Not Specified"}}},gt={class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"},ft={class:"relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white"},_t={class:"mt-3"},vt={class:"flex justify-between items-center mb-4"},bt={class:"text-lg font-medium text-gray-900"},wt={class:"mb-6"},St={class:"grid grid-cols-2 gap-4"},kt={class:"text-sm font-medium"},It={class:"text-sm font-medium"},$t={class:"text-sm font-medium"},Ct={class:"border rounded-lg overflow-hidden"},Pt={class:"min-w-full divide-y divide-gray-200"},Mt={class:"bg-white divide-y divide-gray-200"},Dt={class:"px-4 py-2 text-sm"},Nt={class:"px-4 py-2 text-sm"},Vt={class:"px-4 py-2 text-sm"},qt={class:"px-4 py-2 text-sm"},Lt={class:"px-4 py-2 text-sm"},Tt={class:"mt-6 flex justify-between items-center"},jt={class:"text-sm text-gray-500"},Qt={class:"text-lg font-medium"},Ft={class:"mt-6 flex justify-end"};function Rt(s,e,a,f,o,d){return r(),c("div",gt,[t("div",ft,[t("div",_t,[t("div",vt,[t("h3",bt," Detalhes da venda #"+l(a.sale.id),1),t("button",{onClick:e[0]||(e[0]=i=>s.$emit("close")),class:"text-gray-400 hover:text-gray-500"},e[2]||(e[2]=[t("span",{class:"sr-only"},"Fechar",-1),t("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),t("div",wt,[t("div",St,[t("div",null,[e[3]||(e[3]=t("p",{class:"text-sm text-gray-500"},"Data",-1)),t("p",kt,l(new Date(a.sale.sale_date).toLocaleString()),1)]),t("div",null,[e[4]||(e[4]=t("p",{class:"text-sm text-gray-500"},"Método de pagamento",-1)),t("p",It,l(d.formatPaymentMethod(a.sale.payment_method)),1)]),t("div",null,[e[5]||(e[5]=t("p",{class:"text-sm text-gray-500"},"Valor total",-1)),t("p",$t,"R$ "+l(a.sale.total_amount),1)])])]),t("div",Ct,[t("table",Pt,[e[6]||(e[6]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Produto "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Qtde "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Preço "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Desconto "),t("th",{class:"px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"}," Total ")])],-1)),t("tbody",Mt,[(r(!0),c(h,null,x(a.sale.items,i=>(r(),c("tr",{key:i.id},[t("td",Dt,l(i.product_name),1),t("td",Nt,l(i.quantity),1),t("td",Vt,"R$ "+l(i.unit_price),1),t("td",qt,l(i.discount_percentage)+"% ",1),t("td",Lt," R$ "+l(d.calculateItemTotal(i)),1)]))),128))])])]),t("div",Tt,[t("div",jt," Total de itens: "+l(d.totalItems),1),t("div",Qt," Total: R$ "+l(a.sale.total_amount),1)]),t("div",Ft,[t("button",{onClick:e[1]||(e[1]=i=>s.$emit("close")),class:"px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"}," Fechar ")])])])])}const At=g(yt,[["render",Rt]]),Ut={name:"Sales",components:{NewSale:xt,SaleDetails:At},data(){return{showNewSaleModal:!1,selectedSale:null}},computed:{...k("sales",{sales:s=>s.items,loading:s=>s.loading,error:s=>s.error})},methods:{...b("sales",["fetchSales"]),viewSaleDetails(s){this.selectedSale=s},onSaleComplete(){this.showNewSaleModal=!1,this.fetchSales()},formatPaymentMethod(s){return s?{pix:"PIX",cartao:"Cartão",dinheiro:"Dinheiro"}[s]||s:" - "}},mounted(){this.fetchSales()}},Bt={class:"container"},Et={class:"mb-6 flex justify-between items-center"},Ot={class:"bg-white shadow rounded-lg overflow-hidden"},Xt={class:"min-w-full divide-y divide-gray-200"},zt={class:"bg-white divide-y divide-gray-200"},Gt={class:"px-6 py-4 whitespace-nowrap"},Ht={class:"px-6 py-4 whitespace-nowrap"},Jt={class:"px-6 py-4 whitespace-nowrap"},Kt={class:"px-6 py-4"},Wt={class:"px-6 py-4 whitespace-nowrap"},Yt={class:"px-6 py-4 whitespace-nowrap"},Zt=["onClick"];function te(s,e,a,f,o,d){const i=w("NewSale"),n=w("SaleDetails");return r(),c("div",Bt,[t("div",Et,[e[3]||(e[3]=t("h2",{class:"text-2xl font-bold text-gray-900"},"Vendas",-1)),t("button",{onClick:e[0]||(e[0]=u=>o.showNewSaleModal=!0),class:"bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"}," + Nova venda ")]),t("div",Ot,[t("table",Xt,[e[4]||(e[4]=t("thead",{class:"bg-gray-50"},[t("tr",null,[t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," ID Venda "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Data "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Pagto "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Itens "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Total "),t("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"}," Ações ")])],-1)),t("tbody",zt,[(r(!0),c(h,null,x(s.sales,u=>(r(),c("tr",{key:u.id},[t("td",Gt,"#"+l(u.id),1),t("td",Ht,l(new Date(u.sale_date).toLocaleDateString()),1),t("td",Jt,l(d.formatPaymentMethod(u.payment_method)),1),t("td",Kt,[(r(!0),c(h,null,x(u.items,p=>(r(),c("div",{key:p.id,class:"text-sm"},l(p.quantity)+"x "+l(p.product_name),1))),128))]),t("td",Wt," $"+l(u.total_amount),1),t("td",Yt,[t("button",{onClick:p=>d.viewSaleDetails(u),class:"text-indigo-600 hover:text-indigo-900"}," Detalhes ",8,Zt)])]))),128))])])]),o.showNewSaleModal?(r(),S(i,{key:0,onClose:e[1]||(e[1]=u=>o.showNewSaleModal=!1),onSaleComplete:d.onSaleComplete},null,8,["onSaleComplete"])):y("",!0),o.selectedSale?(r(),S(n,{key:1,sale:o.selectedSale,onClose:e[2]||(e[2]=u=>o.selectedSale=null)},null,8,["sale"])):y("",!0)])}const se=g(Ut,[["render",te]]);export{se as default};
